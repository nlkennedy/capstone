from django.db import models

# Create your models here.

class Teams(models.Model):
    team_id = models.AutoField(primary_key=True)
    team_name = models.CharField(max_length=255)

class Players(models.Model):
    player_id = models.AutoField(primary_key=True)
    team_id = models.ForeignKey(Teams, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

class TeamMatches(models.Model):
    team_match_id = models.AutoField(primary_key=True)
    home_team_id = models.ForeignKey(Teams, on_delete=models.CASCADE, related_name='home_team')
    away_team_id = models.ForeignKey(Teams, on_delete=models.CASCADE, related_name='away_team')
    date_played = models.DateField(auto_now=True)
    done = models.BooleanField(default=False)

class Matches(models.Model):
    match_id = models.AutoField(primary_key=True)
    team_match_id = models.ForeignKey(TeamMatches, on_delete=models.CASCADE)
    home_player_id = (
        models.ForeignKey(Players, on_delete=models.CASCADE, related_name='home_player')
    )
    away_player_id = (
        models.ForeignKey(Players, on_delete=models.CASCADE, related_name='away_player')
    )
    home_player_score = models.IntegerField(default=0)
    away_player_score = models.IntegerField(default=0)
    match_rank = models.IntegerField()
    court_number = models.IntegerField()
    done = models.BooleanField(default=False)

class Games(models.Model):
    game_id = models.AutoField(primary_key=True)
    match_id = models.ForeignKey(Matches,on_delete=models.CASCADE)
    home_player_score = models.IntegerField(default=0)
    away_player_score = models.IntegerField(default=0)
    game_number = models.IntegerField()
    done = models.BooleanField(default=False)
