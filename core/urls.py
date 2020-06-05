# chat/urls.py
from django.urls import path

from . import views

urlpatterns = [
    path('chat', views.chatroom, name='chatroom'),
    path('tags', views.view_tags, name='tags'),
    path('', views.index, name='index'),
]
