from django.urls import path, include
from scoring_app import views
from django.contrib import admin

urlpatterns = [
    path('', views.index, name='index'),
    path('video_feed', views.video_feed, name='video_feed'),
    path('api/teammatches', views.teammatches),
    path('api/games', views.games),
    path('api/matches', views.matches),
    path('api/players', views.players),
    path('api/teams', views.teams)
]