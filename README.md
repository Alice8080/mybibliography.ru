# My Bibliography

[mybibliography.ru](https://mybibliography.ru/) – сайт для поиска источников для научных и учебных работ и оформления ссылок на источники по ГОСТ. 

## Описание

![My Bibliography](/readme_assets/home.png)

Цель проекта — сделать поиск информации простым и эффективным, а работу с источниками — доступной и удобной. 

## Технологии

### Frontend:
- HTML5
- JavaScript (ES6)
- [SCSS](https://sass-scss.ru/)
- [React](https://ru.reactjs.org/)
- [БЭМ](https://ru.bem.info/)

#### Использованные библиотеки и пакеты
- [React Router](https://reactrouter.com/en/main) – навигация в приложении. Routes релизованы в компоненте [App](/frontend/src/components/App.jsx).
- [Formik](https://formik.org/), [Yup](https://github.com/jquense/yup) – валидация всех форм на фронтэнде. Пример: [форма заказа](/frontend/src/components/OrderForm.jsx).
- [Redux](https://redux.js.org/) – создание конфигурации [глобального состояния](/frontend/src/store/index.js).
- [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview) – работа с запросами к API сайта. Конфигурация асинхронных запросов описана в [apiSlice](/frontend/src/api/apiSlice.js).
- [Chart.js](https://www.chartjs.org/), [react-chartjs-2](https://react-chartjs-2.js.org/) – создание диаграмм. Использованы в [компоненте круговой диаграммы](/frontend/src/components/doughnutChart/DoughnutChart.jsx) и [компоненте столбчатой диаграммы](/frontend/src/components/barChart/BarChart.jsx).
- [React Bootstrap](https://react-bootstrap.github.io/). Использован при создании [компонента модального окна](/frontend/src/components/modal/Modal.jsx), [навигационной панели](/frontend/src/components/header/Header.jsx), [компоненте карусели](/frontend/src/components/carousel/Carousel.jsx).
- [Docx](https://docx.js.org/), [FileSaver.js](https://github.com/eligrey/FileSaver.js) – создание и загрузка .docx файлов. Использован при разработке [хука загрузки документа](/frontend/src/hooks/useDownload.js)
- [react-helmet-async](https://github.com/staylor/react-helmet-async) – формирование метатегов. Компонент [SEO](/frontend/src/components/SEO.jsx), использованный на всех страницах сайта. 
- [react-cookie](https://github.com/reactivestack/cookies) – работа с Cookie. 

### Backend:
- Python
- [Django](https://www.djangoproject.com/)
- [MySQL](https://www.mysql.com/)

#### Использованные библиотеки и пакеты
- [Django REST framework](https://www.django-rest-framework.org/) – создание API для взаимодействия фронтенда на React с бэкэндом на Django. 
- [django-remote-forms](https://github.com/WiserTogether/django-remote-forms) – сериализация форм Django для преобразования в JSON и предоставления доступа через API для рендеринга форм на клиенте.
- [Jinja2](https://jinja.palletsprojects.com/en/3.1.x/) – шаблонизация схем библиографических описаний. 
- [yookassa](https://github.com/yoomoney/yookassa-sdk-python) – создание объекта платежа при формировании заказа списка литературы.

## Описание функционала 

### Оформление ссылок

Через сайт можно оформлять ссылки на книги, статьи, сайты и другие источники. Все ссылки оформляются по ГОСТ Р 7.0.100–2018 «Библиографическая запись. Библиографическое описание. Общие требования и правила составления». Этот ГОСТ является обязательным к использованию при составлении списков литературы к курсовым работам, дипломам, докладам и другим работам.  

Логика составления библиографических описаний описана в файле [abstract_models.py](/app/abstract_models.py).

[Полный список типов документов](https://mybibliography.ru/tip-dokumenta), на которые можно оформить ссылку.

![Список типов документов](/readme_assets/types.png)

Оформленные пользователем ссылки добавляются в [список литературы](https://mybibliography.ru/spisok-literatury)

Список можно скопировать, загрузить в формате .docx, дополнить новыми ссылками, а также сортировать ссылки в нем по алфавиту или времени добавления. Чтобы начать работу с новым списком, предыдущий нужно очистить. Все созданные списки можно посмотреть в [личном кабинете](https://mybibliography.ru/account).

![Список литературы](/readme_assets/list.png)

### Поиск источников

Когда база данных оформленных ссылок превысила 100 000, в проект добавилась функция поиска по ней. Поиск проводится по ключевым словам запроса, исключая предлоги, союзы, междометия. Так как по некоторым запросам результатов может быть очень много, в целях оптимизации рендеринга найденные библиографические ссылки выводятся по 100 за раз с возможностью подгрузки оставшихся до тех пор, пока все результаты по поисковому запросу не будут загружены целиком.  

![Поиск](/readme_assets/search.png)

Воспользоваться функцией поиска можно на [главной странице сайта](https://mybibliography.ru), либо на [странице поиска](https://mybibliography.ru/search) 

![Результаты поиска](/readme_assets/search_results.png)

### Списки литературы на заказ

Для приема платежей реализована интеграция сайта с платёжным провайдером ЮKassa. Интеграция была проведена с использованием [API ЮKassa](https://yookassa.ru/developers/). Для валидации данных формы заказа на стороне клиента использованы [Formik](https://formik.org/) и [Yup](https://github.com/jquense/yup). 

Логика формирования объекта платежа описана в файле [views.py](/app/views.py).

[Форма для ввода данных о заказе](https://mybibliography.ru/zakazat-spisok-literatury) 

![Форма для ввода данных о заказе](/readme_assets/order.png)

### Аутентификация пользователей

Для аутентификации используются сессии Django. Данные сеанса пользователя хранятся на стороне сервера, а файлы cookie содержат session ID для авторизации на клиенте. 

### Личный кабинет

В [Личном кабинете](https://mybibliography.ru/account) пользователь может посмотреть все созданные им списки литературы и скопировать их; посмотреть свои последние 50 поисковых запросов и вернуться к поиску по любому из них; посмотреть информацию о созданных им заказах – введенные данные, статус, срок выполнения. 

![Личный кабинет](/readme_assets/account.png)

### Статистика сайта

На странице [О сайте](https://mybibliography.ru/about) представлена статистика количества оформленных ссылок и поисковых запросов, реализованных через сайт, в реальном времени. Компоненты диаграмм созданы с помощью библиотеки Chart.js. 

## Дополнительно

### Доступность

Все элементы сайта доступны через управление с клавиатуры. Используйте Tab для передвижения по элементам и Shift+Tab для обратного передвижения. 

В разработке сайта использована семантическая верстка, для всех элементов форм использованы подписи (label).

Подробнее о [доступности контента](https://ru.reactjs.org/docs/accessibility.html).

### Дизайн

Специально сайта разработана [дизайн-система](https://www.figma.com/file/6qxVfBVV8eLYsfYQ55Hfl5/Design-system-My-Bibliography?node-id=1%3A2029&t=TRebzgPj6Ag4lncZ-1). Компоненты дизайн-системы реализованы в формате миксинов, в которых описаны основные стили элементов сайта, указанные в дизайн-система цвета являются SCSS-переменными в коде проекта.

## Внести вклад в проект

My Bibliography — это бесплатная платформа с открытым исходным кодом. Вы можете присоединиться к разработке или предложить новые функции. 

Если вы обнаружили проблему на сайте, воспользуйтесь [формой проблемы](https://github.com/Alice8080/mybibliography.ru/issues/new). 

Если вы хотите внести вклад в разработку, склонируйте репозиторий и создайте отдельную ветку для ваших изменений. Когда вы закончите, создайте pull request и [разрешите внесение изменений](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork), чтобы вашу ветку можно было обновить для слияния.

Любые вопросы по проекту можно задать по почте info@mybibliography.ru.

## Локальный запуск

Системные требования: Python 3.10+, pip 22.3.1+, Node.js 14.16+.

Скопируйте репозиторий:

    git clone https://github.com/Alice8080/mybibliography.ru.git

В папке проекта создайте и активируйте виртуальную среду (активация для разных сред может различаться):

    cd mybibliography
    python -m venv venv

    # Linux/MacOS
    source venv/bin/activate
        
    # cmd.exe
    venv\Scripts\activate.bat

    # PowerShell
    venv\Scripts\Activate.ps1

Установите пакеты для бэкэнда:

	pip install -r requirements.txt

В корневой директории создайте файл .env со следующими данными, где key – секретный ключ приложения Django, который можно сгенерировать [здесь](https://djecrety.ir/):

    SECRET_KEY=key
    DB_NAME=db_name
    DB_USER=db_user
    DB_PASS=db_pass

В режиме разработки можно использовать SQLite, само приложение работает с MySQL. Для использования MySQL установите и запустите сервер MySQL, создайте базу данных с параметрами, соответствующие указанным в .env, и раскомментируйте соответствующие настройки базы данных в [settings.py](/main/settings.py).

Приложение использует библиотеку django_remote_forms, устаревший синтаксис которой может вызвать ошибки. Чтобы исправить их, используйте следующие команды:

    sed -i 's/Exception, e/Exception as e/' venv/lib/python3.10/site-packages/django_remote_forms/forms.py
    sed -i 's/Exception, e/Exception as e/' venv/lib/python3.10/site-packages/django_remote_forms/fields.py
    sed -i 's/force_unicode/force_str/' venv/lib/python3.10/site-packages/django_remote_forms/utils.py

Для Windows:

    get-content venv/lib/python3.10/site-packages/django_remote_forms/forms.py | %{$_ -replace "Exception, e","Exception as e"}
    get-content venv/lib/python3.10/site-packages/django_remote_forms/fields.py | %{$_ -replace "Exception, e","Exception as e"}
    get-content venv/lib/python3.10/site-packages/django_remote_forms/utils.py | %{$_ -replace "force_unicode","force_str"}


Проведите миграции:
	
	python manage.py makemigrations
	python manage.py migrate

Запустите сервер:

    python manage.py runserver

Перейдите в папку frontend и загрузите необходимые пакеты для фронтенда:
	
    cd frontend
    npm i 

Запуск в режиме разработки:

    npm start

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

Сборка приложения:

    npm run build

После сборки приложение будет доступно по адресу [http://localhost:8000](http://localhost:8000).