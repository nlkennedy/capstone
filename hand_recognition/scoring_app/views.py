from django.shortcuts import render
from django.http.response import StreamingHttpResponse
from scoring_app.camera import VideoCamera
from .models import Teams, Players, TeamMatches, Matches, Games
from django.core import serializers
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.


def index(request):
    return render(request, 'scoring_app/home.html')


def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


def video_feed(request):
    return StreamingHttpResponse(gen(VideoCamera()),
                    content_type='multipart/x-mixed-replace; boundary=frame')

@csrf_exempt
def teams(request):
    if request.method == 'GET':
        queryset = Teams.objects.all()
        data = serializers.serialize('json', queryset)
        return HttpResponse(data, content_type='application/json')
    elif request.method == 'POST':
        try:
            body = request.body.decode('utf-8')
            json_body = json.loads(body)
            Teams.objects.create(team_name=json_body['team_name'])
        except:
            return HttpResponse(status=500)
        return HttpResponse(status=201)

@csrf_exempt
def players(request):
    if request.method == 'GET':
        body = request.body.decode('utf-8')
        json_body = json.loads(body)
        queryset = Players.objects.all().filter(team_id=json_body['team_id'])
        data = serializers.serialize('json', queryset)
        return HttpResponse(data, content_type='application/json')
    elif request.method == 'POST':
        try:
            body = request.body.decode('utf-8')
            json_body = json.loads(body)
            Players.objects.create(
                team_id=Teams.objects.get(pk=json_body['team_id']),
                first_name=json_body['first_name'],
                last_name=json_body['last_name']
            )
        except:
            return HttpResponse(status=500)
        return HttpResponse(status=201)

@csrf_exempt
def teammatches(request):
    if request.method == 'GET':
        queryset = TeamMatches.objects.all()
        data = serializers.serialize('json', queryset)
        return HttpResponse(data, content_type='application/json')
    elif request.method == 'POST':
        try:
            body = request.body.decode('utf-8')
            json_body = json.loads(body)
            TeamMatches.objects.create(
                home_team_id=Teams.objects.get(pk=json_body['home_team_id']),
                away_team_id=Teams.objects.get(pk=json_body['away_team_id']),
            )
        except:
            return HttpResponse(status=500)
        return HttpResponse(status=201)

@csrf_exempt
def teammatches_all(request):
    if request.method == 'POST':
        # try:
        body = request.body.decode('utf-8')
        json_body = json.loads(body)
        print(json_body)

        # create teams

        # create players
        # REMOVE FIRST/LASTNAME

        # create teammatch

        # create matches
        # TeamMatches.objects.create(
        #     home_team_id=Teams.objects.get(pk=json_body['home_team_id']),
        #     away_team_id=Teams.objects.get(pk=json_body['away_team_id']),
        # )


        return HttpResponse(status=201)
        # except:
        #     return HttpResponse(status=500)
    else: 
        return HttpResponse(status=404)

@csrf_exempt
def teammatches_summary(request):
    if request.method == 'GET':
        try:
            teammatches = TeamMatches.objects.all()
            summary = []
            for teammatch in teammatches:             
                entry = {
                    "pk": teammatch.pk,
                    "home_team_name": teammatch.home_team_id.team_name,
                    "away_team_name": teammatch.away_team_id.team_name,
                    "date_played": str(teammatch.date_played),
                    "done": teammatch.done
                }
                summary.append(entry)

            data = json.dumps(summary)
            return HttpResponse(data, content_type='application/json')
        except:
            return HttpResponse(status=500)

@csrf_exempt
def matches(request):
    if request.method == 'GET':
        team_match_id = request.GET['team_match_id']
        queryset = Matches.objects.all().filter(team_match_id=team_match_id)
        data = serializers.serialize('json', queryset)
        return HttpResponse(data, content_type='application/json')
    elif request.method == 'POST':
        try:
            body = request.body.decode('utf-8')
            json_body = json.loads(body)
            Matches.objects.create(
                team_match_id=TeamMatches.objects.get(pk=json_body['team_match_id']),
                home_player_id=Players.objects.get(pk=json_body['home_player_id']),
                away_player_id=Players.objects.get(pk=json_body['away_player_id']),
                match_rank=json_body['match_rank'],
                court_number=json_body['court_number']
            )
        except:
            return HttpResponse(status=500)
        return HttpResponse(status=201)


@csrf_exempt
def matches_summary(request):
    if request.method == 'GET':
        try:
            team_match_id = request.GET['team_match_id']
            teammatch = TeamMatches.objects.get(pk=team_match_id)
            matches = Matches.objects.all().filter(team_match_id=team_match_id)
            match_summary = []

            for match in matches: 
                entry = {
                    "pk": match.pk,
                    "home_player_name": match.home_player_id.first_name + ' ' + match.home_player_id.last_name,
                    "away_player_name": match.away_player_id.first_name + ' ' + match.away_player_id.last_name,
                    "home_player_score": match.home_player_score,
                    "away_player_score": match.away_player_score,
                    "match_rank": match.match_rank,
                    "court_number": match.court_number,
                    "done": match.done
                }
                match_summary.append(entry)

            data = json.dumps({
                "home_team_name": teammatch.home_team_id.team_name,
                "away_team_name": teammatch.away_team_id.team_name,
                "matches": match_summary
            })

            return HttpResponse(data, content_type='application/json')
        except:
            return HttpResponse(status=500)

@csrf_exempt
def games(request):
    if request.method == 'GET':
        body = request.body.decode('utf-8')
        json_body = json.loads(body)
        queryset = Games.objects.all().filter(match_id=json_body['match_id'])
        data = serializers.serialize('json', queryset)
        return HttpResponse(data, content_type='application/json')
    elif request.method == 'POST':
        try:
            body = request.body.decode('utf-8')
            json_body = json.loads(body)
            Games.objects.create(
                match_id=Matches.objects.get(pk=json_body['match_id']),
                game_number=json_body['game_number']
            )
        except:
            return HttpResponse(status=500)
        return HttpResponse(status=201)    
    elif request.method == 'PUT':
        return HttpResponse(status=201)


@csrf_exempt
def games_summary(request):
    if request.method == 'GET':
        match_id = request.GET['match_id']
        games = Games.objects.all().filter(match_id=match_id)
        games_summary = []

        for game in games: 
            entry = {
                "pk": game.pk,
                "home_player_score": game.home_player_score,
                "away_player_score": game.away_player_score,
                "game_number": game.game_number,
                "done": game.done
            }
            games_summary.append(entry)

        
        print(games_summary)
        data = json.dumps(games_summary)

        return HttpResponse(data, content_type='application/json')





'''



def post_new_game(request):

def update_game(request):

def get_games(request):

def get_summary(request):

'''