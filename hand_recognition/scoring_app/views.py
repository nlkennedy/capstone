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
def matches(request):
    if request.method == 'GET':
        body = request.body.decode('utf-8')
        json_body = json.loads(body)
        queryset = Matches.objects.all().filter(team_match_id=json_body['team_match_id'])
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
    '''



def post_new_game(request):

def update_game(request):

def get_games(request):

def get_summary(request):

'''