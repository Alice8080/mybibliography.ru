from django.shortcuts import render
from django.db.models import Q
from django.db.models.functions import Lower
from django.shortcuts import render
from django_remote_forms.forms import RemoteForm
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from datetime import datetime, time
from yookassa import Configuration, Payment
import time
import uuid
from .models import *
from .serializers import Serializer, OrderSerializer
from .sources import SOURCES

def index(request):
    return render(request, 'build/index.html')

# API для получения информации обо всех типах источников
class SourcesView(APIView):
    def get(self, request):
        q = self.request.GET.get('q')
        if q == None: # запрос без параметров возвращает список источников для рендеринга страниц источников
            def form_sources(source):
                source_info = {
                    'name': source['name'], 
                    'title': source['model']._meta.verbose_name, 
                    'type': source['type'], 
                    'path': source['path']
                }
                return source_info
            
            sources = list(map(lambda source: form_sources(source), SOURCES.values()))
            return Response(sources)
        
        # запрос с переданным в параметр именем источника возвращает данные для рендеринга формы ввода информации о этом источнике 
        source = SOURCES[q]
        source_model = source['model']
        source_form = source['form']
        form = source_form()
        remote_form = RemoteForm(form)
        remote_form_dict = remote_form.as_dict()

        def form_fields(i):
            service_fields = ['id', 'pub_date', 'list_id', 'reference']
            if i not in service_fields:
                field = {
                    'name': i, 
                    'title': remote_form_dict['fields'][i]["label"], 
                    'placeholder': remote_form_dict['fields'][i]["widget"]["attrs"]["placeholder"], 
                    'isRequired': remote_form_dict['fields'][i]["widget"]["attrs"]["class"]
                }
                return field
        
        formed_fields = list(map(form_fields, remote_form_dict['fields']))
        fields = [field for field in formed_fields if field != None]
        response = {
            "title": source_model._meta.verbose_name, 
            'name': q, 
            "fields": fields
        }
        return Response(response)

    # отправка на сервер данных для формирования библиографического описания  
    def post(self, request, format=None):
        q = self.request.GET.get('q')
        new_list_id = str(uuid.uuid4())

        if "user_id" not in request.session: 
            user = User.objects.create()
            user.list_set.create(list=new_list_id)
            user.save()
            request.session['user_id'] = user.user_id
            request.session['list_id'] = new_list_id
        
        if "user_id" in request.session and "list_id" not in request.session: 
            user = User.objects.get(user_id=request.session['user_id'])
            user.list_set.create(list=new_list_id)
            user.save()
            request.session['list_id'] = new_list_id

        list_id = request.session['list_id']
        
        source = SOURCES[q]
        class SourceSerializer(Serializer):
            model = source['model']
            class Meta:
                model = source['model']
                fields = ('__all__')
        
        serializer = SourceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['pub_date'] = time.time()
            serializer.validated_data['list_id'] = list_id
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# API для взаимодействия со списком литерауры
class ListView(APIView):
    def get(self, request): # получение списка литературы по list_id в данных текущей сессии
        try:
            list_id = request.session['list_id']
        except:
            return Response([])

        def form_list_items(source):
            source_model = source['model']
            list_items = []
            filtered_items = source_model.objects.values().filter(
                Q(list_id__iregex=list_id)
            )
            items = list(filtered_items)
            for i in items:
                item = {
                    'id': str(uuid.uuid4()), 
                    'reference': i['reference'], 
                    'creation_time': i['pub_date']
                }
                list_items.append(item)
            return list_items

        formed_objects = list(map(lambda source: form_list_items(source), SOURCES.values()))

        object_list = []
        for item in formed_objects: 
            object_list.extend(item)
        if len(object_list) > 300:
            object_list = list(object_list)[:300]
        return Response(object_list)
    
    def post(self, request): # создание нового списка литературы
        try:
            list_id = str(uuid.uuid4())
            user_id = request.session['user_id']
            user = User.objects.get(user_id=user_id)
            user.list_set.create(list=list_id)
            user.save()
            request.session['list_id'] = list_id # установка нового list_id в данные текущей сессии для корректного отображения списка на клиенте
            return Response(status=status.HTTP_200_OK)
        except: 
            return Response(status=status.HTTP_400_BAD_REQUEST)


# API для поиска в базе данных источнков, соответствующих ключевым словам поискового запроса
# возвращает по 100 библиографических описаний из всех найденных результатов в целях оптимиции рендеринга контента на клиенте
# следующие результаты загружаются по 100 только по запросу пользователя, пока не будут загружены все результаты 
class SearchResultsView(APIView):
    def get(self, request):
        # получает 2 параметра:
        q = self.request.GET.get('q') # поисковый запрос
        offset = self.request.GET.get('offset') # отступ от начала общего числа результатов (отступ равен числу уже загруженных результатов)

        query = str(q).strip().lower()
        query_list = query.split() 
        
        if len(query) < 3:
            return Response([])
        
        def save_request(query, responses): # сохранение поискового запроса в базу запросов
            if "user_id" not in request.session: 
                user = User.objects.create()
                user.request_set.create(request=query, responses=responses)
                user.save()
                request.session['user_id'] = user.user_id
            else:
                user_id = request.session['user_id']
                user = User.objects.get(user_id=user_id)
                user.request_set.create(request=query, responses=responses)
                user.save()
        
        for i in query_list:
            if len(i) <= 2:
                query_list.remove(i)
        
        object_list = []
        for source in SOURCES.values():
            annotate_model = source['model'].objects.values().annotate(lower_reference=Lower('reference'))
            filtered_items = annotate_model.filter(
                Q(lower_reference__iregex=query_list[0])
            ).values_list('reference', flat=True)
            object_list.extend(filtered_items)
        
        if object_list == []:
            save_request(query, '0')
            return Response([])
        else:
            for i in range(len(query_list)):
                query_list.pop(0)
                if len(query_list) == 0:
                    save_request(query, len(object_list))
                    if offset != '0':
                        object_list = object_list[int(offset):]
                    if len(object_list) > 100:
                        del object_list[100:]
                    def form_reference(reference):
                        return {
                            'id': str(uuid.uuid4()),
                            'reference': reference
                        }
                    results = list(map(lambda reference: form_reference(reference), object_list))
                    return Response(results)
                else:
                    def find_in_item(item):
                        if (item.lower().find(query_list[0]) != -1):
                            return True
                        else:
                            return False
                    object_list = list(filter(find_in_item, object_list))
                    if object_list == []:
                        save_request(query, len(object_list))
                        return Response([])


Configuration.account_id = ''
Configuration.secret_key = ''

# API обработки запросов о заказах
class OrderView(APIView):
    def get(self, request): # получение актуальной информации о заказе по ID
        q = self.request.GET.get('q')
        payment = Payment.find_one(q) # поиск в базе платежей yookassa
        order = Order.objects.get(order=q)
        response = {
            "id": order.pk,
            "status": payment.status,
            "theme": order.theme,
            "urgency": order.urgency,
            "created_at": order.created_at,
            "price": order.price,
            "email": order.email
        }
        return Response(response)

    def post(self, request, format=None): # отравка данных о заказе на сервер
        if "user_id" not in request.session: 
            user = User.objects.create()
            user.save()
            request.session['user_id'] = user.user_id
        user_id = request.session['user_id']
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['user_id'] = user_id
            now = datetime.now()
            serializer.validated_data['created_at'] = now.strftime("%d.%m.%Y, %H:%M")
            idempotence_key = str(uuid.uuid4())
            payment = Payment.create({ # создание объекта платежа yookassa с полученными данными о заказе 
                "amount": { 
                    "value": serializer.validated_data['price'],
                    "currency": "RUB"
                },
                "confirmation": {
                    "type": "redirect",
                    "return_url": "http://localhost:8000/account" # localhost указан только для локального запуска приложения
                },
                "capture": True,
                "description": f"Заказ на список литературы по теме «{serializer.validated_data['theme']}»",
                "receipt": {
                    "customer": {
                        "email": serializer.validated_data['email']
                    },
                    "items": [
                        {
                        "description": "Оплата списка литературы",
                        "amount": {
                            "value": serializer.validated_data['price'],
                            "currency": "RUB"
                        },
                        "vat_code": 1,
                        "quantity": "1"
                        }
                    ]
                }
            }, idempotence_key)
            payment_id = str(payment.id)
            serializer.validated_data['order'] = payment_id
            serializer.save()
            # API возвращает url платежной формы, на который в случае успешного создания платежа перенаправляется пользователь
            return Response(payment.confirmation.confirmation_url) 

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


# API для получения информации о поисковых запросах, списках литературы и заказах пользователя
class UserInfoView(APIView):
    def get(self, request):
        try:
            user_id = request.session['user_id']
        except:
            response = {
                "user_id": 0,
                "requests": [],
                "lists": [],
                "orders": []
            }
            return Response(response)
        
        lists = list(List.objects.filter(
            Q(user=user_id)
        ).values_list('list', flat=True))

        user_lists = []
        for current_list_id in lists:
            references_list = {
                "list_id": current_list_id,
                "list": []
            }
            for source in SOURCES:
                source_model = source['model']
                filtered_items = source_model.objects.values().filter(
                    Q(list_id=current_list_id)
                )
                for i in list(filtered_items):
                    item = {
                        'id': str(uuid.uuid4()), 
                        'reference': i['reference']
                    }
                    references_list["list"].append(item)
            user_lists.append(references_list)
            
        user_requests = list(Request.objects.values().filter(
            Q(user=user_id)
        ).values_list('request', flat=True))
        user_requests.reverse()
        requests = [] 
        [requests.append(x) for x in user_requests if x not in requests]
        
        if len(requests) > 50:
            del requests[50:]
        
        orders = list(Order.objects.values().filter(
            Q(user_id__iregex=user_id)
        ).values('theme', 'order'))
        
        response = {
            "user_id": user_id,
            "requests": requests,
            "lists": user_lists,
            "orders": orders
        }
        return Response(response)


# API для получения статистики по количеству оформленных источников и выполненных поисковых запросов 
class StatisticsView(APIView):
    def get(self, request):
        main_sources = [
            Book.objects.count(),
            Site.objects.count(),
            MagazineArticle.objects.count(),
            SiteArticle.objects.count()
        ]
        others = [
            EditedBook.objects.count(),
            ElectronicBook.objects.count(),
            Chapter.objects.count(),
            Multivolume.objects.count(),
            Volume.objects.count(),
            NewspaperArticle.objects.count(),
            LocalAccess.objects.count(),
            InternetPortal.objects.count(),
            ElectronicJournal.objects.count(),
            ElectronicNewspaper.objects.count(),
            Gost.objects.count(),
            Dissertation.objects.count(),
            DissertationAbstract.objects.count(),
            Manual.objects.count(),
            Law.objects.count(),
            Rule.objects.count(),
            Patent.objects.count()
        ]
        all_sources = sum(main_sources) + sum(others)

        sources = {
            "books": Book.objects.count(),
            "sites": Site.objects.count(),
            "magazine_articles": MagazineArticle.objects.count(),
            "site_articles": SiteArticle.objects.count(),
            "others": sum(others)
        }

        def calcPercents(whole, part):
            return round(100 / whole * part, 2)

        percents = {
            "books": calcPercents(all_sources, Book.objects.count()),
            "sites": calcPercents(all_sources, Site.objects.count()),
            "magazine_articles": calcPercents(all_sources, MagazineArticle.objects.count()),
            "site_articles": calcPercents(all_sources, SiteArticle.objects.count()),
            "others": calcPercents(all_sources, sum(others))
        }
        
        response = {
            "all_sources": all_sources,
            "percents": percents,
            "sources": sources,
            "requests": Request.objects.count()
        }
        return Response(response)