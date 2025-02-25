# Generated by Django 3.1.6 on 2021-02-26 17:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Teams',
            fields=[
                ('team_id', models.AutoField(primary_key=True, serialize=False)),
                ('team_name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='TeamMatches',
            fields=[
                ('team_match_id', models.AutoField(primary_key=True, serialize=False)),
                ('date_played', models.DateField(auto_now=True)),
                ('done', models.BooleanField(default=False)),
                ('away_team_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='away_team', to='scoring_app.teams')),
                ('home_team_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='home_team', to='scoring_app.teams')),
            ],
        ),
        migrations.CreateModel(
            name='Players',
            fields=[
                ('player_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('team_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scoring_app.teams')),
            ],
        ),
        migrations.CreateModel(
            name='Matches',
            fields=[
                ('match_id', models.AutoField(primary_key=True, serialize=False)),
                ('home_player_score', models.IntegerField(default=0)),
                ('away_player_score', models.IntegerField(default=0)),
                ('match_rank', models.IntegerField()),
                ('court_number', models.IntegerField()),
                ('done', models.BooleanField(default=False)),
                ('away_player_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='away_player', to='scoring_app.players')),
                ('home_player_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='home_player', to='scoring_app.players')),
                ('team_match_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scoring_app.teammatches')),
            ],
        ),
        migrations.CreateModel(
            name='Games',
            fields=[
                ('game_id', models.AutoField(primary_key=True, serialize=False)),
                ('home_player_score', models.IntegerField(default=0)),
                ('away_player_score', models.IntegerField(default=0)),
                ('game_number', models.IntegerField()),
                ('done', models.BooleanField(default=False)),
                ('match_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scoring_app.matches')),
            ],
        ),
    ]
