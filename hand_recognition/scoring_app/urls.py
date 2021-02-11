from django.urls import path, include
from scoring_app import views
from django.contrib import admin

urlpatterns = [
    path('', views.index, name='index'),
    path('video_feed', views.video_feed, name='video_feed'),
]