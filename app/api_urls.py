from django.urls import path
from .views import *

urlpatterns = [
    path('sources/', SourcesView.as_view()),
    path('list/', ListView.as_view()),
    path('user/', UserInfoView.as_view()),
    path('search/', SearchResultsView.as_view()),
    path('order/', OrderView.as_view()),
    path('statistics/', StatisticsView.as_view()),
]