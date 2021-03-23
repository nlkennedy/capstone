from django.urls import path
from scoring_app import views

urlpatterns = [
    path('api/predict_ref_signal', views.predict_ref_signal, name='predict_ref_signal'),
    path('api/teammatches', views.teammatches),
    path('api/teammatches-summary', views.teammatches_summary),
    path('api/teammatches-all', views.teammatches_all),
    path('api/games', views.games),
    path('api/games-summary', views.games_summary),
    path('api/matches', views.matches),
    path('api/matches-summary', views.matches_summary),
    path('api/players', views.players),
    path('api/teams', views.teams)
]
