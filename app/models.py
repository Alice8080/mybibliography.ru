from django.db import models
from .abstract_models import *

class User(models.Model):
    user_id = models.AutoField(primary_key=True)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return str(self.user_id)


class List(models.Model):
    list_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, default=0)
    list = models.CharField('ID списка', max_length=300, blank=True)

    class Meta:
        verbose_name = 'List'
        verbose_name_plural = 'Lists'

    def __str__(self):
        return str(self.list_id)


class Order(models.Model):
    class WorksChoices(models.TextChoices):
        ESSAY = 'essay','Реферат или доклад'
        COURSEWORK = 'coursework','Курсовая'
        ARTICLE = 'article', 'Статья'
        DIPLOMA = 'diploma','Диплом'
        DISSERTATION = 'dissertation','Диссертация'
        OTHER = 'other','Другое'

    class AgeChoices(models.TextChoices):
        NO_MATTER = 'no_matter', 'Не имеет значения'
        ONE = 'one', 'Не старше одного года'
        FIVE = 'five', 'Не старше пяти лет'
        TEN = 'ten', 'Не старше десяти лет'
        FIFTEEN = 'fifteen', 'Не старше пятнадцати лет'
    
    works = models.CharField('Тип работы', max_length=20, choices=WorksChoices.choices, default=WorksChoices.ESSAY)
    theme = models.CharField('Тема работы', max_length=300, blank=False, default='')
    amount = models.CharField('Необходимое количество источников', max_length=300, blank=False, default='')
    sourcesList = models.TextField('Список, который необходимо дополнить или отредактировать по ГОСТ', blank=True)
    info = models.TextField('Информация о работе и ключевые слова', blank=True)
    area = models.CharField('Название предмета или научной области, к которым относится работа', max_length=300, blank=True)
    age = models.CharField('Возраст источников', max_length=20, choices=AgeChoices.choices, default=AgeChoices.NO_MATTER)
    urgency = models.BooleanField('Нужен в течение суток', name='urgency')
    language = models.BooleanField('Включать в список источники на английском', name='language')
    email = models.EmailField('Электронная почта', blank=False)
    price = models.CharField('Стоимость работы', max_length=300, blank=True)
    created_at = models.CharField('Время создания', max_length=300, blank=True)
    user_id = models.CharField('User ID', max_length=300, blank=True)
    order = models.CharField('Order ID', max_length=300, blank=True, default='')

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

    def __str__(self):
        return self.email


class Request(models.Model):
    request = models.CharField('Поисковый запрос', max_length=300, blank=True)
    responses = models.CharField('Результаты', max_length=300, blank=True, default=0)
    created_at = models.DateTimeField('Время запроса', auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, default=0)
        
    class Meta:
        verbose_name = 'Поисковый запрос'
        verbose_name_plural = 'Поисковые запросы'

    def __str__(self):
        return self.request


class Book(Publication):
    title = models.CharField('Название книги', max_length=300, blank=False)
    place = models.CharField('Место издания', max_length=300, blank=False)
    publishing = models.CharField('Издательство', max_length=300, blank=False)
    year = models.CharField('Год издания книги', max_length=300, blank=False)
    pages = models.CharField('Количество страниц', max_length=300, blank=False)
    isbn = models.CharField('ISBN (если указан)', max_length=300, blank=True)
    fingerprint = models.CharField('Фингерпринт (для старопеч. изд.)', max_length=300, blank=True)
    size = models.CharField('Размер издания (в см)', max_length=300, blank=True)
    physical_characteristics = models.CharField('Физические характеристики', max_length=300, blank=True)

    class Meta:
        verbose_name = 'Книга'
        verbose_name_plural = 'Книги'


class SiteArticle(Source):
    title = models.CharField('Название статьи', max_length=300, blank=False)
    site_title = models.CharField('Название сайта', max_length=300, blank=False)
    url = models.CharField('URL', max_length=300, blank=False)

    class Meta:
        verbose_name = 'Статья с сайта'
        verbose_name_plural = 'Статьи с сайта'


class EditedBook(PublicationWithoutAuthors):
    title = models.CharField('Название книги', max_length=300, blank=False)
    editor = models.CharField('Редакторы или составители', max_length=300, blank=True, help_text = "text")
    organization = models.CharField('Ответственные орг. (если указаны)', max_length=300, blank=True)
    place = models.CharField('Место издания', max_length=300, blank=False)
    publishing = models.CharField('Издательство', max_length=300, blank=False)
    year = models.CharField('Год издания книги', max_length=300, blank=False)
    pages = models.CharField('Количество страниц', max_length=300, blank=False)
    isbn = models.CharField('ISBN (если указан)', max_length=300, blank=True)
    fingerprint = models.CharField('Фингерпринт (для старопеч. изд.)', max_length=300, blank=True)
    size = models.CharField('Размер издания (в см)', max_length=300, blank=True)
    physical_characteristics = models.CharField('Физические характеристики', max_length=300, blank=True)
        
    class Meta:
        verbose_name = 'Книга без автора'
        verbose_name_plural = 'Книги без автора'


class ElectronicBook(Publication):
    title = models.CharField('Название книги', max_length=300, blank=False)
    place = models.CharField('Место издания', max_length=300, blank=False)
    publishing = models.CharField('Издательство', max_length=300, blank=False)
    year = models.CharField('Год издания книги', max_length=300, blank=False)
    pages = models.CharField('Количество страниц', max_length=300, blank=False)
    url = models.CharField('URL', max_length=300, blank=False)
    isbn = models.CharField('ISBN (если указан)', max_length=300, blank=True)
    access_mode = models.CharField('Режим доступа', max_length=300, blank=True)
    fingerprint = models.CharField('Фингерпринт (для старопеч. изд.)', max_length=300, blank=True)

    class Meta:
        verbose_name = 'Книга из ЭБС'
        verbose_name_plural = 'Книги из ЭБС'


class Chapter(SourceWithAuthors):
    section_title = models.CharField('Название главы или раздела', max_length=300, blank=False)
    section = models.CharField('Номер главы или раздела', max_length=300, blank=False)
    surname_chapter = models.CharField('Фамилия автора главы', max_length=300, blank=False)
    initials_chapter = models.CharField('Инициалы автора главы', max_length=300, blank=False)
    title = models.CharField('Название книги', max_length=300, blank=False)
    place = models.CharField('Место издания', max_length=300, blank=False)
    publishing = models.CharField('Издательство', max_length=300, blank=False)
    year = models.CharField('Год издания книги', max_length=300, blank=False)
    pages = models.CharField('Страницы', max_length=300, blank=False)
    edit_info = models.CharField('Сведения об издании (если указаны)', max_length=300, blank=True)
    isbn = models.CharField('ISBN (если указан)', max_length=300, blank=True)
    parallel = models.CharField('Параллельное заглавие', max_length=300, blank=True)
    type_doc = models.CharField('Сведения о заглавии', max_length=300, blank=True)
    responsibility = models.CharField('Сведения об ответственности', max_length=300, blank=True)
    par_edit_info = models.CharField('Пар. сведения об издании', max_length=300, blank=True)
    liability = models.CharField('Свед. об отв-ти, относ. к изданию', max_length=300, blank=True)
    place_of_distribution = models.CharField('Место распространения', max_length=300, blank=True)
    organization_of_distribution = models.CharField('Организация распространения', max_length=300, blank=True)
    distribution_date = models.CharField('Дата распространения', max_length=300, blank=True)
    manufacture = models.CharField('Сведения об изготовлении', max_length=300, blank=True)
    notes = models.CharField('Примечания', max_length=300, blank=True)
    general_notes = models.CharField('Примечания общего характера', max_length=300, blank=True)
    additional_information = models.CharField('Доп. свед-я идентификатора ресурса', max_length=300, blank=True)
    fingerprint = models.CharField('Фингерпринт (для старопеч. изд.)', max_length=300, blank=True)
    availability = models.CharField('Условия доступности', max_length=300, blank=True)
    content = models.CharField('Вид содержания', max_length=300, blank=True)
    content_type = models.CharField('Характеристика содержания', max_length=300, blank=True)
    access_means = models.CharField('Средство доступа', max_length=300, blank=True)
    explanations = models.CharField('Пояснения к заглавию, жанру и т.п.', max_length=300, blank=True)

    class Meta:
        verbose_name = 'Глава из книги'
        verbose_name_plural = 'Главы из книги'


class Multivolume(Publication):
    title = models.CharField('Название книги', max_length=300, blank=False)
    chapters = models.CharField('Количество томов', max_length=300, blank=False)
    place = models.CharField('Место издания', max_length=300, blank=False)
    publishing = models.CharField('Издательство', max_length=300, blank=False)
    year = models.CharField('Год издания книги', max_length=300, blank=False)
    pages = models.CharField('Количество страниц', max_length=300, blank=False)
    isbn = models.CharField('ISBN (если указан)', max_length=300, blank=True)
    fingerprint = models.CharField('Фингерпринт (для старопеч. изд.)', max_length=300, blank=True)
    size = models.CharField('Размер издания (в см)', max_length=300, blank=True)
    physical_characteristics = models.CharField('Физические характеристики', max_length=300, blank=True)

    class Meta:
        verbose_name = 'Многотомное издание'
        verbose_name_plural = 'Многотомные издания'


class Volume(Publication):
    title = models.CharField('Название книги', max_length=300, blank=False)
    chapters = models.CharField('Количество томов', max_length=300, blank=False)
    n_volume = models.CharField('Номер тома', max_length=300, blank=False)
    place = models.CharField('Место издания', max_length=300, blank=False)
    publishing = models.CharField('Издательство', max_length=300, blank=False)
    year = models.CharField('Год издания книги', max_length=300, blank=False)
    pages = models.CharField('Количество страниц', max_length=300, blank=False)
    isbn = models.CharField('ISBN (если указан)', max_length=300, blank=True)
    fingerprint = models.CharField('Фингерпринт (для старопеч. изд.)', max_length=300, blank=True)
    size = models.CharField('Размер издания (в см)', max_length=300, blank=True)
    physical_characteristics = models.CharField('Физические характеристики', max_length=300, blank=True)

    class Meta:
        verbose_name = 'Отдельный том многотомного издания'
        verbose_name_plural = 'Отдельные тома многотомного издания'


class MagazineArticle(Article):
    title = models.CharField('Название статьи', max_length=300, blank=False)
    journal_title = models.CharField('Название журнала', max_length=300, blank=False)
    volume_n = models.CharField('Номер тома (если указан)', max_length=300, blank=True)
    issue = models.CharField('Номер выпуска', max_length=300, blank=False)
    year = models.CharField('Год издания', max_length=300, blank=False)
    pages = models.CharField('Страницы статьи', max_length=300, blank=False)
    size = models.CharField('Размер издания (в см)', max_length=300, blank=True)

    class Meta:
        verbose_name = 'Статья из журнала'
        verbose_name_plural = 'Статьи из журнала'


class NewspaperArticle(Source):
    surname = models.CharField('Фамилия автора', max_length=300, blank=False)
    initials = models.CharField('Инициалы автора', max_length=300, blank=False)
    title = models.CharField('Название статьи', max_length=300, blank=False)
    journal_title = models.CharField('Название газеты', max_length=300, blank=False)
    issue = models.CharField('Номер выпуска', max_length=300, blank=True)
    pages = models.CharField('Страницы', max_length=300, blank=True)
    date = models.CharField('Дата выпуска', max_length=300, blank=True)
    year = models.CharField('Год издания', max_length=300, blank=True)
    issn = models.CharField('ISSN (если указан)', max_length=300, blank=True)
    parallel = models.CharField('Параллельное заглавие', max_length=300, blank=True)
    size = models.CharField('Размер издания (в см)', max_length=300, blank=True)
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
    doi = models.CharField('DOI', max_length=300, blank=True)
    additional_information = models.CharField('Доп. свед-я идентификатора ресурса', max_length=300, blank=True)
    key_title = models.CharField('Ключевое заглавие', max_length=300, blank=True)
    availability = models.CharField('Условия доступности', max_length=300, blank=True)
    content = models.CharField('Вид содержания', max_length=300, blank=True)
    content_type = models.CharField('Характеристика содержания', max_length=300, blank=True)
    access_means = models.CharField('Средство доступа', max_length=300, blank=True)
    explanations = models.CharField('Пояснения к заглавию, виду и т.п.', max_length=300, blank=True)

    class Meta:
        verbose_name = 'Статья из газеты'
        verbose_name_plural = 'Статьи из газеты'


class CollectionArticle(Publication):
    title = models.CharField('Название статьи', max_length=300, blank=False)
    collection_title = models.CharField('Название сборника', max_length=300, blank=False)
    place = models.CharField('Место издания', max_length=300, blank=False)
    publishing = models.CharField('Издательство (если указано)', max_length=300, blank=True)
    year = models.CharField('Год издания', max_length=300, blank=False)
    pages = models.CharField('Страницы', max_length=300, blank=False)
    isbn = models.CharField('ISBN (если указан)', max_length=300, blank=True)
    fingerprint = models.CharField('Фингерпринт (для старопеч. изд.)', max_length=300, blank=True)
    size = models.CharField('Размер издания (в см)', max_length=300, blank=True)
    physical_characteristics = models.CharField('Физические характеристики', max_length=300, blank=True)

    class Meta:
        verbose_name = 'Статья из научного сборника'
        verbose_name_plural = 'Статьи из научного сборника'


class Site(Source):
    title = models.CharField('Название сайта', max_length=300, blank=False)
    place = models.CharField('Город создания (если указан)', max_length=300, blank=True)
    year = models.CharField('Год создания (если указан)', max_length=300, blank=True)
    url = models.CharField('URL', max_length=300, blank=False)
    title_info = models.CharField('Информация о сайте', max_length=300, blank=True)
    update = models.CharField('Обновление', max_length=300, blank=True)
    explanations = models.CharField('Пояснения к заглавию, виду и т.п.', max_length=300, blank=True)
    site_type = models.CharField('Вид сайта', max_length=300, blank=True)
    availability = models.CharField('Условия доступности', max_length=300, blank=True)
    content = models.CharField('Вид содержания', max_length=300, blank=True)
    access_means = models.CharField('Средство доступа', max_length=300, blank=True)

    class Meta:
        verbose_name = 'Сайт'
        verbose_name_plural = 'Сайты'


class LocalAccess(Source):
    title = models.CharField('Название ресурса', max_length=300, blank=False)
    place = models.CharField('Место создания', max_length=300, blank=False)
    year = models.CharField('Год создания', max_length=300, blank=False)
    source = models.CharField('Источник основного заглавия', max_length=300, blank=False)
    system_requirements = models.CharField('Системные требования', max_length=300, blank=True)
    edit_info = models.CharField('Сведения об ресурсе', max_length=300, blank=True)
    parallel = models.CharField('Параллельное заглавие', max_length=300, blank=True)
    type_doc = models.CharField('Сведения о заглавии', max_length=300, blank=True)
    explanations = models.CharField('Пояснения к заглавию, виду и т.п.', max_length=300, blank=True)
    responsibility = models.CharField('Сведения об ответственности', max_length=300, blank=True)
    place_of_distribution = models.CharField('Место распространения', max_length=300, blank=True)
    organization_of_distribution = models.CharField('Организация распространения', max_length=300, blank=True)
    distribution_date = models.CharField('Дата распространения', max_length=300, blank=True)
    manufacture = models.CharField('Сведения об изготовлении', max_length=300, blank=True)
    physical_characteristics = models.CharField('Физические характеристики', max_length=300, blank=True)
    size = models.CharField('Размер издания (в см)', max_length=300, blank=True)
    accompanying = models.CharField('Сопроводительный материал', max_length=300, blank=True)
    content = models.CharField('Вид содержания', max_length=300, blank=True)
    content_type = models.CharField('Характеристика содержания', max_length=300, blank=True)
    access_means = models.CharField('Средство доступа', max_length=300, blank=True)

    class Meta:
        verbose_name = 'Электронный ресурс локального доступа'
        verbose_name_plural = 'Электронные ресурсы локального доступа'


class InternetPortal(Source):
    title = models.CharField('Название портала', max_length=300, blank=False)
    place = models.CharField('Город создания', max_length=300, blank=True)
    year = models.CharField('Год создания', max_length=300, blank=True)
    url = models.CharField('URL', max_length=300, blank=False)
    responsibility = models.CharField('Сведения об ответственности', max_length=300, blank=True)
    title_info = models.CharField('Информация о портале', max_length=300, blank=True)
    update = models.CharField('Обновление', max_length=300, blank=True)
    explanations = models.CharField('Пояснения к заглавию, виду и т.п.', max_length=300, blank=True)
    site_type = models.CharField('Вид портала', max_length=300, blank=True)
    availability = models.CharField('Условия доступности', max_length=300, blank=True)
    content = models.CharField('Вид содержания', max_length=300, blank=True)
    access_means = models.CharField('Средство доступа', max_length=300, blank=True)

    class Meta:
        verbose_name = 'Интернет-портал'
        verbose_name_plural = 'Интернет-порталы'


class ElectronicJournal(Article):
    title = models.CharField('Название статьи', max_length=300, blank=False)
    journal_title = models.CharField('Название журнала', max_length=300, blank=False)
    url = models.CharField('URL', max_length=300, blank=False)
    publication_date = models.CharField('Дата публикации (если указана)', max_length=300, blank=True)
    
    class Meta:
        verbose_name = 'Статья из электронного журнала'
        verbose_name_plural = 'Статьи из электронного журнала'


class ElectronicNewspaper(Article):
    title = models.CharField('Название статьи', max_length=300, blank=False)
    journal_title = models.CharField('Название газеты', max_length=300, blank=False)
    url = models.CharField('URL', max_length=300, blank=False)
    issue = models.CharField('Номер выпуска', max_length=300, blank=True)
    pages = models.CharField('Страницы', max_length=300, blank=True)
    date = models.CharField('Дата выпуска', max_length=300, blank=True)
    application_date = models.CharField('Дата обращения', max_length=300, blank=True)
    year = models.CharField('Год издания', max_length=300, blank=True)
    
    class Meta:
        verbose_name = 'Статья из электронной газеты'
        verbose_name_plural = 'Статьи из электронной газеты'


class Gost(Source):
    title = models.CharField('Название', max_length=300, blank=False)
    place = models.CharField('Город издания', max_length=300, blank=False)
    publishing = models.CharField('Издательство', max_length=300, blank=False)
    year = models.CharField('Год издания', max_length=300, blank=False)
    date = models.CharField('Дата введения', max_length=300, blank=False)
    pages = models.CharField('Количество страниц', max_length=300, blank=False)
    introduction = models.CharField('Если введен впервые', max_length=300, blank=True)
    explanations = models.CharField('Пояснения к заглавию, виду и т.п.', max_length=300, blank=True)
    content = models.CharField('Вид содержания', max_length=300, blank=True)
    content_type = models.CharField('Характеристика содержания', max_length=300, blank=True)
    access_means = models.CharField('Средство доступа', max_length=300, blank=True)

    class Meta:
        verbose_name = 'ГОСТ'
        verbose_name_plural = 'ГОСТы'


class Dissertation(Source):
    title = models.CharField('Название', max_length=300, blank=False)
    surname = models.CharField('Фамилия автора', max_length=300, blank=False)
    initials = models.CharField('Инициалы автора', max_length=300, blank=False)
    full_name = models.CharField('Имя, отчество автора', max_length=300, blank=False)
    speciality = models.CharField('Специальность', max_length=300, blank=False)
    competition = models.CharField('Соискание', max_length=300, blank=False)
    bibliography = models.CharField('Страницы библиографии', max_length=300, blank=True)
    organization = models.CharField('Ответственная орг.', max_length=300, blank=True)
    place = models.CharField('Город', max_length=300, blank=False)
    year = models.CharField('Год', max_length=300, blank=False)
    pages = models.CharField('Количество страниц', max_length=300, blank=False)
    unnumbered_pages = models.CharField('Ненумерованные страницы', max_length=300, blank=True)
    illustrations = models.CharField('Ненумерованные листы, столбцы', max_length=300, blank=True)
    physical_characteristics = models.CharField('Физические характеристики', max_length=300, blank=True)
    content = models.CharField('Вид содержания', max_length=300, blank=True)
    content_type = models.CharField('Характеристика содержания', max_length=300, blank=True)
    access_means = models.CharField('Средство доступа', max_length=300, blank=True)
    explanations = models.CharField('Пояснения к заглавию, виду и т.п.', max_length=300, blank=True)

    class Meta:
        verbose_name = 'Диссертация'
        verbose_name_plural = 'Диссертации'


class DissertationAbstract(Source):
    title = models.CharField('Название', max_length=300, blank=False)
    surname = models.CharField('Фамилия автора', max_length=300, blank=False)
    initials = models.CharField('Инициалы автора', max_length=300, blank=False)
    full_name = models.CharField('Имя, отчество автора', max_length=300, blank=False)
    speciality = models.CharField('Специальность', max_length=300, blank=False)
    competition = models.CharField('Соискание', max_length=300, blank=False)
    bibliography = models.CharField('Страницы библиографии', max_length=300, blank=True)
    organization = models.CharField('Ответственная орг.', max_length=300, blank=True)
    place = models.CharField('Город', max_length=300, blank=False)
    year = models.CharField('Год', max_length=300, blank=False)
    pages = models.CharField('Количество страниц', max_length=300, blank=False)
    protection = models.CharField('Место защиты', max_length=300, blank=True)
    unnumbered_pages = models.CharField('Ненумерованные страницы', max_length=300, blank=True)
    illustrations = models.CharField('Ненумерованные листы, столбцы', max_length=300, blank=True)
    physical_characteristics = models.CharField('Физические характеристики', max_length=300, blank=True)
    content = models.CharField('Вид содержания', max_length=300, blank=True)
    content_type = models.CharField('Характеристика содержания', max_length=300, blank=True)
    access_means = models.CharField('Средство доступа', max_length=300, blank=True)
    explanations = models.CharField('Пояснения к заглавию, виду и т.п.', max_length=300, blank=True)

    class Meta:
        verbose_name = 'Автореферат диссертации'
        verbose_name_plural = 'Авторефераты диссертации'


class Manual(SourceWithAuthors):
    title = models.CharField('Название', max_length=300, blank=False)
    manual_type = models.CharField('Вид пособия', max_length=300, blank=False)
    place = models.CharField('Место издания', max_length=300, blank=False)
    publishing = models.CharField('Издательство', max_length=300, blank=False)
    year = models.CharField('Год издания', max_length=300, blank=False)
    pages = models.CharField('Количество страниц', max_length=300, blank=False)
    bibliography = models.CharField('Страницы библиографии', max_length=300, blank=True)
    edit_info = models.CharField('Сведения об издании (если указаны)', max_length=300, blank=True)
    isbn = models.CharField('ISBN (если указан)', max_length=300, blank=True)
    parallel = models.CharField('Параллельное заглавие', max_length=300, blank=True)
    explanations = models.CharField('Пояснения к заглавию, виду и т.п.', max_length=300, blank=True)
    responsibility = models.CharField('Сведения об ответственности', max_length=300, blank=True)
    par_edit_info = models.CharField('Пар. сведения об издании', max_length=300, blank=True)
    liability = models.CharField('Свед. об отв-ти, относ. к изданию', max_length=300, blank=True)
    place_of_distribution = models.CharField('Место распространения', max_length=300, blank=True)
    organization_of_distribution = models.CharField('Организация распространения', max_length=300, blank=True)
    distribution_date = models.CharField('Дата распространения', max_length=300, blank=True)
    manufacture = models.CharField('Сведения об изготовлении', max_length=300, blank=True)
    unnumbered_pages = models.CharField('Ненумерованные страницы', max_length=300, blank=True)
    illustrations = models.CharField('Ненумерованные листы, столбцы', max_length=300, blank=True)
    physical_characteristics = models.CharField('Физические характеристики', max_length=300, blank=True)
    size = models.CharField('Размер издания (в см)', max_length=300, blank=True)
    accompanying = models.CharField('Сопроводительный материал', max_length=300, blank=True)
    notes = models.CharField('Примечания', max_length=300, blank=True)
    general_notes = models.CharField('Примечания общего характера', max_length=300, blank=True)
    additional_information = models.CharField('Доп. свед-я идентификатора ресурса', max_length=300, blank=True)
    availability = models.CharField('Условия доступности', max_length=300, blank=True)
    content = models.CharField('Вид содержания', max_length=300, blank=True)
    content_type = models.CharField('Характеристика содержания', max_length=300, blank=True)
    access_means = models.CharField('Средство доступа', max_length=300, blank=True)

    class Meta:
        verbose_name = 'Пособие'
        verbose_name_plural = 'Пособия'


class Law(Source):
    title = models.CharField('Название', max_length=300, blank=False)
    organization = models.CharField('Вид закона', max_length=300, blank=False)
    place = models.CharField('Источник публикации', max_length=300, blank=False)
    publishing = models.CharField('Номер выпуска', max_length=300, blank=False)
    year = models.CharField('Год издания', max_length=300, blank=False)
    pages = models.CharField('Номер статьи', max_length=300, blank=False)

    class Meta:
        verbose_name = 'Закон'
        verbose_name_plural = 'Законы'


class Rule(Source):
    title = models.CharField('Название', max_length=300, blank=False)
    place = models.CharField('Место издания', max_length=300, blank=False)
    publishing = models.CharField('Издательство', max_length=300, blank=False)
    year = models.CharField('Год издания', max_length=300, blank=False)
    pages = models.CharField('Количество страниц', max_length=300, blank=False)
    isbn = models.CharField('ISBN (если указан)', max_length=300, blank=True)
    parallel = models.CharField('Параллельное заглавие', max_length=300, blank=True)
    edit_info = models.CharField('Сведения об издании (если указаны)', max_length=300, blank=True)
    par_edit_info = models.CharField('Пар. сведения об издании', max_length=300, blank=True)
    type_doc = models.CharField('Сведения о заглавии', max_length=300, blank=True)
    liability = models.CharField('Свед. об отв-ти, относ. к изданию', max_length=300, blank=True)
    place_of_distribution = models.CharField('Место распространения', max_length=300, blank=True)
    organization_of_distribution = models.CharField('Организация распространения', max_length=300, blank=True)
    distribution_date = models.CharField('Дата распространения', max_length=300, blank=True)
    manufacture = models.CharField('Сведения об изготовлении', max_length=300, blank=True)
    unnumbered_pages = models.CharField('Ненумерованные страницы', max_length=300, blank=True)
    illustrations = models.CharField('Ненумерованные листы, столбцы', max_length=300, blank=True)
    physical_characteristics = models.CharField('Физические характеристики', max_length=300, blank=True)
    size = models.CharField('Размер издания (в см)', max_length=300, blank=True)
    accompanying = models.CharField('Сопроводительный материал', max_length=300, blank=True)
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
    notes = models.CharField('Примечания', max_length=300, blank=True)
    general_notes = models.CharField('Примечания общего характера', max_length=300, blank=True)
    additional_information = models.CharField('Доп. свед-я идентификатора ресурса', max_length=300, blank=True)
    content = models.CharField('Вид содержания', max_length=300, blank=True)
    content_type = models.CharField('Характеристика содержания', max_length=300, blank=True)
    access_means = models.CharField('Средство доступа', max_length=300, blank=True)
    explanations = models.CharField('Пояснения к заглавию, виду и т.п.', max_length=300, blank=True)

    class Meta:
        verbose_name = 'Правило'
        verbose_name_plural = 'Правила'


class Patent(Source):
    title = models.CharField('Название патента', max_length=300, blank=False)
    info = models.CharField('Информация о патенте', max_length=300, blank=False)
    number = models.CharField('Номер заявки', max_length=300, blank=True)
    application = models.CharField('Заявление', max_length=300, blank=False)
    publication = models.CharField('Публикация', max_length=300, blank=False)
    author = models.CharField('Автор (авторы)', max_length=300, blank=False)
    pages = models.CharField('Количество страниц', max_length=300, blank=False)
    responsibility = models.CharField('Сведения об ответственности', max_length=300, blank=True)
    unnumbered_pages = models.CharField('Ненумерованные страницы', max_length=300, blank=True)
    illustrations = models.CharField('Ненумерованные листы, столбцы', max_length=300, blank=True)
    physical_characteristics = models.CharField('Физические характеристики', max_length=300, blank=True)
    size = models.CharField('Размер издания (в см)', max_length=300, blank=True)
    accompanying = models.CharField('Сопроводительный материал', max_length=300, blank=True)
    general_notes = models.CharField('Примечания общего характера', max_length=300, blank=True)
    content = models.CharField('Вид содержания', max_length=300, blank=True)
    content_type = models.CharField('Характеристика содержания', max_length=300, blank=True)
    access_means = models.CharField('Средство доступа', max_length=300, blank=True)
    explanations = models.CharField('Пояснения к заглавию, виду и т.п.', max_length=300, blank=True)

    class Meta:
        verbose_name = 'Патент'
        verbose_name_plural = 'Патенты'