from django.urls import path, include
from scoring_app import views
from django.contrib import admin

urlpatterns = [
    path('', views.index, name='index'),
    path('video_feed', views.video_feed, name='video_feed'),
    path('api/teammatches', views.teammatches),
    path('api/teammatches-summary', views.teammatches_summary),
    path('api/games', views.games),
    path('api/games-summary', views.games_summary),
    path('api/matches', views.matches),
    path('api/matches-summary', views.matches_summary),
    path('api/players', views.players),
    path('api/teams', views.teams)
]