from django.db import models 
from .descriptions import DESCRIPTIONS
from jinja2 import Template
from urllib.parse import unquote
from datetime import date

class Source(models.Model):
    reference = models.TextField('Библиографическое описание', blank=True)
    list_id = models.CharField(max_length=300, default='')
    pub_date = models.CharField(max_length=100, default='')

    class Meta:
        abstract = True

    @property
    def create_description(self): # создание библиографического описания
        context = self.__dict__ # информация об источнике, введенная пользователем
        source = DESCRIPTIONS[self._meta.model_name] # схема библиографического описания для этого типа источника
        
        try: # если у этого типа источника есть поле 'url', 
            context['url'] = unquote(context['url']) # url источника декодируется для замены escape-последовательностей %xx их односимвольными эквивалентами
        except: 
            pass
        
        try: # если у этого типа источника есть поле 'date', 
            date_today = date.today().strftime('%d.%m.%Y') # в библиографическое описание вставляется текущая дата
            context['date'] = date_today
        except: 
            pass
        
        try: # если у источника есть более одного автора
            authors = source['authors']
            data = source['data']
            return Template(f'{authors}{data}').render(context)
        except: # если у источника один автор или их нет
            return Template(source['data']).render(context) 

    def __str__(self):
        return self.reference

    def save(self, *args, **kwargs):
        self.reference = self.create_description.strip().replace("\n","")
        super().save(*args, **kwargs)


class SourceWithoutAuthors(Source):
    explanations = models.CharField('Пояснения к заглавию, жанру и т.п.', max_length=300, blank=True)
    content = models.CharField('Вид содержания', max_length=300, blank=True)
    access_means = models.CharField('Средство доступа', max_length=300, blank=True)

    class Meta:
        abstract = True

class SourceWithAuthors(SourceWithoutAuthors):
    surname = models.CharField('Фамилия автора', max_length=300, blank=False, default='')
    initials = models.CharField('Инициалы автора', max_length=300, blank=False, default='')
    second_surname = models.CharField('Фамилия второго автора', max_length=300, blank=True)
    second_initials = models.CharField('Инициалы второго автора', max_length=300, blank=True)
    second_surname_2 = models.CharField('Фамилия второго автора', max_length=300, blank=True)
    second_initials_2 = models.CharField('Инициалы второго автора', max_length=300, blank=True)
    third_surname = models.CharField('Фамилия третьего автора', max_length=300, blank=True)
    third_initials = models.CharField('Инициалы третьего автора', max_length=300, blank=True)
    second_surname_3 = models.CharField('Фамилия второго автора', max_length=300, blank=True)
    second_initials_3 = models.CharField('Инициалы второго автора', max_length=300, blank=True)
    third_surname_2 = models.CharField('Фамилия третьего автора', max_length=300, blank=True)
    third_initials_2 = models.CharField('Инициалы третьего автора', max_length=300, blank=True)
    fourth_surname = models.CharField('Фамилия четвертого автора', max_length=300, blank=True)
    fourth_initials = models.CharField('Инициалы четвертого автора', max_length=300, blank=True)
    second_surname_4 = models.CharField('Фамилия второго автора', max_length=300, blank=True)
    second_initials_4 = models.CharField('Инициалы второго автора', max_length=300, blank=True)
    third_surname_3 = models.CharField('Фамилия третьего автора', max_length=300, blank=True)
    third_initials_3 = models.CharField('Инициалы третьего автора', max_length=300, blank=True)

    class Meta:
        abstract = True

class OptionalInfo(models.Model):
    edit_info = models.CharField('Сведения об издании (если указаны)', max_length=300, blank=True)
    parallel = models.CharField('Параллельное заглавие', max_length=300, blank=True)
    type_doc = models.CharField('Сведения о заглавии', max_length=300, blank=True)
    responsibility = models.CharField('Сведения об ответственности', max_length=300, blank=True)
    par_edit_info = models.CharField('Пар. сведения об издании', max_length=300, blank=True)
    liability = models.CharField('Свед. об отв-ти, относ. к изданию', max_length=300, blank=True)
    place_of_distribution = models.CharField('Место распространения', max_length=300, blank=True)
    organization_of_distribution = models.CharField('Организация распространения', max_length=300, blank=True)
    distribution_date = models.CharField('Дата распространения', max_length=300, blank=True)
    manufacture = models.CharField('Сведения об изготовлении', max_length=300, blank=True)
    unnumbered_pages = models.CharField('Ненумерованные страницы', max_length=300, blank=True)
    illustrations = models.CharField('Ненумерованные листы, столбцы', max_length=300, blank=True)
    accompanying = models.CharField('Сопроводительный материал', max_length=300, blank=True)
    notes = models.CharField('Примечания', max_length=300, blank=True)
    general_notes = models.CharField('Примечания общего характера', max_length=300, blank=True)
    additional_information = models.CharField('Доп. свед-я идентификатора ресурса', max_length=300, blank=True)
    availability = models.CharField('Условия доступности', max_length=300, blank=True)
    content_type = models.CharField('Характеристика содержания', max_length=300, blank=True)

    class Meta:
        abstract = True

class SeriesInfo(models.Model):
    main_title = models.CharField('Основное заглавие серии', max_length=300, blank=True)
    parallel_series_title = models.CharField('Параллельное заглавие серии', max_length=300, blank=True)
    series_title_information = models.CharField('Свед-я, относ. к заглавию серии', max_length=300, blank=True)
    responsibility_info = models.CharField('Свед-я об отв-ти, относ. к серии', max_length=300, blank=True)
    number = models.CharField('Междунар. станд. номер серии', max_length=300, blank=True)
    serial_number = models.CharField('Номер выпуска серии', max_length=300, blank=True)
    sub_main_title = models.CharField('Основное заглавие подсерии', max_length=300, blank=True)
    sub_parallel_series_title = models.CharField('Пар. заглавие подсерии', max_length=300, blank=True)
    sub_series_title_information = models.CharField('Свед-я, относ. к заглавию подсерии', max_length=300, blank=True)
    sub_responsibility_info = models.CharField('Свед-я об отв-ти, относ. к подсерии', max_length=300, blank=True)
    sub_number = models.CharField('Междунар. станд. номер подсерии', max_length=300, blank=True)
    sub_serial_number = models.CharField('Номер выпуска подсерии', max_length=300, blank=True)

    class Meta:
        abstract = True


class Publication(SourceWithAuthors, OptionalInfo, SeriesInfo):
    class Meta:
        abstract = True

class PublicationWithoutAuthors(SourceWithoutAuthors, OptionalInfo, SeriesInfo):
    class Meta:
        abstract = True

class Article(SourceWithAuthors, SeriesInfo):
    issn = models.CharField('ISSN (если указан)', max_length=300, blank=True)
    parallel = models.CharField('Параллельное заглавие', max_length=300, blank=True)
    doi = models.CharField('DOI', max_length=300, blank=True)
    additional_information = models.CharField('Доп. свед-я идентификатора ресурса', max_length=300, blank=True)
    key_title = models.CharField('Ключевое заглавие', max_length=300, blank=True)
    availability = models.CharField('Условия доступности', max_length=300, blank=True)
    content_type = models.CharField('Характеристика содержания', max_length=300, blank=True)
    
    class Meta:
        abstract = True