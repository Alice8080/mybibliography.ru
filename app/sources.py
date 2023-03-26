from .models import *
from .forms import *

SOURCES = {
    'book': {
        'name': 'book',
        'model': Book,
        'form': BookForm,
        'type': 'book',
        'path': 'kniga'
    },
    'edited_book': { 
        'name': 'edited_book',
        'model': EditedBook,
        'form': EditedBookForm,
        'type': 'book',
        'path': 'kniga-bez-avtora'
    },
    'chapter': { 
        'name': 'chapter',
        'model': Chapter,
        'form': ChapterForm,
        'type': 'book',
        'path': 'glava-iz-knigi'
    },
    'gost': { 
        'name': 'gost',
        'model': Gost,
        'form': GostForm,
        'type': 'document',
        'path': 'gost'
    },
    'collection_article': {
        'name': 'collection_article',
        'model': CollectionArticle,
        'form': CollectionArticleForm,
        'type': 'article',
        'path': 'statya-iz-nauchnogo-sbornika'
    },
    'dissertation_abstract': { 
        'name': 'dissertation_abstract',
        'model': DissertationAbstract,
        'form': DissertationAbstractForm,
        'type': 'scientific',
        'path': 'avtoreferat-dissertacii'
    },
    'dissertation': { 
        'name': 'dissertation',
        'model': Dissertation,
        'form': DissertationForm,
        'type': 'scientific',
        'path': 'dissertaciya'
    },
    'electronic_book': { 
        'name': 'electronic_book',
        'model': ElectronicBook,
        'form': ElectronicBookForm,
        'type': 'book',
        'path': 'elektronnaya-kniga'
    },
    'multivolume': { 
        'name': 'multivolume',
        'model': Multivolume,
        'form': MultivolumeForm,
        'type': 'book',
        'path': 'mnogotomnoe-izdanie'
    },
    'volume': { 
        'name': 'volume',
        'model': Volume,
        'form': VolumeForm,
        'type': 'book',
        'path': 'tom-iz-mnogotomnogo-izdaniya'
    },
    'law': { 
        'name': 'law',
        'model': Law,
        'form': LawForm,
        'type': 'document',
        'path': 'zakon'
    },
    'magazine_article': { 
        'name': 'magazine_article',
        'model': MagazineArticle,
        'form': MagazineArticleForm,
        'type': 'article',
        'path': 'statya-iz-zhurnala'
    },
    'newspaper_article': { 
        'name': 'newspaper_article',
        'model': NewspaperArticle,
        'form': NewspaperArticleForm,
        'type': 'article',
        'path': 'statya-iz-gazety'
    },
    'electronic_journal': { 
        'name': 'electronic_journal',
        'model': ElectronicJournal,
        'form': ElectronicJournalForm,
        'type': 'article',
        'path': 'statya-iz-elektronnogo-zhurnala'
    },
    'electronic_newspaper': { 
        'name': 'electronic_newspaper',
        'model': ElectronicNewspaper,
        'form': ElectronicNewspaperForm,
        'type': 'article',
        'path': 'statya-iz-elektronnoy-gazety'
    },
    'patent': {
        'name': 'patent',
        'model': Patent,
        'form': PatentForm,
        'type': 'document',
        'path': 'patent'
    },
    'manual': { 
        'name': 'manual',
        'model': Manual,
        'form': ManualForm,
        'type': 'scientific',
        'path': 'posobie'
    },
    'site_article': { 
        'name': 'site_article',
        'model': SiteArticle,
        'form': SiteArticleForm,
        'type': 'article',
        'path': 'statya-s-sayta'
    },
    'site': { 
        'name': 'site',
        'model': Site,
        'form': SiteForm,
        'type': 'electronic',
        'path': 'sayt'
    },
    'local_access': { 
        'name': 'local_access',
        'model': LocalAccess,
        'form': LocalAccessForm,
        'type': 'electronic',
        'path': 'resurs-lokalnogo-dostupa'
    },
    'internet_portal': { 
        'name': 'internet_portal',
        'model': InternetPortal,
        'form': InternetPortalForm,
        'type': 'electronic',
        'path': 'internet-portal'
    },
    'rule': { 
        'name': 'rule',
        'model': Rule,
        'form': RuleForm,
        'type': 'document',
        'path': 'pravilo'
    }
}