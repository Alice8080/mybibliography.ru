from django.contrib import admin
from .models import *

admin.site.register(Book)
admin.site.register(EditedBook)
admin.site.register(ElectronicBook)
admin.site.register(Chapter)
admin.site.register(Multivolume)
admin.site.register(Volume)
admin.site.register(MagazineArticle)
admin.site.register(NewspaperArticle)
admin.site.register(CollectionArticle)
admin.site.register(Site)
admin.site.register(LocalAccess)
admin.site.register(InternetPortal)
admin.site.register(ElectronicJournal)
admin.site.register(ElectronicNewspaper)
admin.site.register(Gost)
admin.site.register(Dissertation)
admin.site.register(DissertationAbstract)
admin.site.register(Manual)
admin.site.register(Law)
admin.site.register(Patent)
admin.site.register(SiteArticle)
admin.site.register(Rule)
admin.site.register(User)

class OrderAdmin(admin.ModelAdmin):
    list_display = ("email", "amount", "price", "created_at")
admin.site.register(Order, OrderAdmin)

class RequestAdmin(admin.ModelAdmin):
    list_display = ("request", "responses", "user", "created_at")
admin.site.register(Request, RequestAdmin)

class ListAdmin(admin.ModelAdmin):
    list_display = ("user_id", "list")
admin.site.register(List, ListAdmin)