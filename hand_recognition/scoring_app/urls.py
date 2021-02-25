from django.urls import path, include
from scoring_app import views
from django.contrib import admin

urlpatterns = [
    path('home.html', views.index, name='index'),
    path('predict.html', views.predict_page, name='predict_page'),
    path('video_feed', views.video_feed, name='video_feed'),
    path('api/teammatches', views.teammatches),
    path('api/games', views.games),
    path('api/matches', views.matches)
]