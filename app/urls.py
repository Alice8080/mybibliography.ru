from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('', views.index),
    path('spisok-literatury', views.index),
    path('zakazat-spisok-literatury', views.index),
    path('kniga', views.index),
    path('glava-iz-knigi', views.index),
    path('statya-iz-nauchnogo-sbornika', views.index),
    path('sbornik-gostov', views.index),
    path('avtoreferat-dissertacii', views.index),
    path('dissertaciya', views.index),
    path('kniga-bez-avtora', views.index),
    path('gost', views.index),
    path('internet-portal', views.index),
    path('zakon', views.index),
    path('elektronnaya-kniga', views.index),
    path('mnogotomnoe-izdanie', views.index),
    path('tom-iz-mnogotomnogo-izdaniya', views.index),
    path('sayt', views.index),
    path('statya-iz-gazety', views.index),
    path('statya-iz-zhurnala', views.index),
    path('statya-iz-enciklopedii', views.index),
    path('resurs-lokalnogo-dostupa', views.index),
    path('statya-iz-elektronnogo-zhurnala', views.index),
    path('statya-iz-elektronnoy-gazety', views.index),
    path('pravilo', views.index),
    path('patent', views.index),
    path('posobie', views.index),
    path('statya-s-sayta', views.index),
    path('tip-dokumenta', views.index),
    path('pravovaya-informaciya', views.index),
    path('kontakty', views.index),
    path('zakaz', views.index),
    path('success', views.index),
    path('search', views.index),
    path('account', views.index),
    path('about', views.index),
]