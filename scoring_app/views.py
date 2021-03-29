# pylint: disable=W0702 (bare-except)
import json
import re
import os
from functools import reduce
import io
import base64
import operator
import cv2
import numpy as np
import subprocess
from keras.models import load_model
from skimage.transform import resize
from imageio import imread
from django.conf import settings
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseNotFound
from django.views import View
from .models import Teams, Players, TeamMatches, Matches, Games

loaded_model = load_model(os.path.join(settings.BASE_DIR, 'scoring_app/model.h5'))
specialChars = re.compile(r'[@_!#$%^&*()<>?/\|}{~:=]')
DONE = False

class Assets(View):
    def get(self, _request, filename): # pylint: disable=R0201 (no-self-use)
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()

def represents_int(string):
    try:
        int(string)
        return True
    except ValueError:
        return False

def get_prediction(check, bg_model, frame): # pylint: disable=R0914 (too-many-locals)
    prediction = ''

    def remove_background(frame):
        fgmask = bg_model.apply(frame, learningRate = 0)
        kernel = np.ones((3, 3), np.uint8)
        fgmask = cv2.erode(fgmask, kernel, iterations = 1)
        res = cv2.bitwise_and(frame, frame, mask = fgmask)
        return res

    signals = {0: 'let', 1: 'nolet', 2: 'none', 3: 'stroke'}

    # smoothing filter
    frame = cv2.bilateralFilter(frame, 5, 50, 100)

    # remove the background only on the first time (based on check)
    if not check:
        bg_model = cv2.createBackgroundSubtractorMOG2(0, 50)
        check = True

    proper_prediction = False

    img = remove_background(frame)
    img = img[0:int(0.8 * frame.shape[0]),
            int(0.5 * frame.shape[1]):frame.shape[1]]
    # do the processing after capturing the image
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (41, 41), 0)
    _, thresh = cv2.threshold(blur,60,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
    image = resize(thresh, (64, 64))
    image = image.reshape(1, 64, 64, 1)

    # generate prediction using trained model
    result = loaded_model.predict(image)
    prediction = {}
    for idx, signal in signals.items():
        prediction[signal] = result[0][idx]
        if prediction[signal] >= 0.96:
            proper_prediction = True

    # sorting based on top prediction
    prediction = sorted(prediction.items(), key = operator.itemgetter(1), reverse = True)

    if proper_prediction is True:
        prediction = prediction[0][0]
        proper_prediction = True
        return prediction, check, bg_model

    return 'inconclusive', check, bg_model

@csrf_exempt
def predict_ref_signal(request):
    if request.method == 'POST':
        body = request.body.decode('utf-8')
        images = json.loads(body)

        counter = {
            'let' : 0,
            'nolet' : 0,
            'none' : 0,
            'stroke' : 0,
            'inconclusive': 0,
            'nodata': 0
        }

        signals_translated = {
            'let': 'LET',
            'nolet': 'NO LET',
            'none': 'NONE',
            'stroke': 'STROKE',
        }

        check = False
        bg_model = cv2.createBackgroundSubtractorMOG2(0, 50)

        # get prediction for each image
        for image in images['images']:
            if not image:
                counter['nodata'] += 1
                continue

            frame = imread(io.BytesIO(base64.b64decode(image.split(',')[1])))
            prediction, check, bg_model = get_prediction(check, bg_model, frame)
            counter[prediction] += 1

        # find top prediction
        counter.pop('none')
        counter.pop('nodata')
        counter.pop('inconclusive')

        if all(value == 0 for value in counter.values()):
            final_prediction = 'inconclusive'
        else:
            final_prediction = (
                signals_translated[max(counter.items(), key=operator.itemgetter(1))[0]]
            )

        response_data = json.dumps({'prediction': final_prediction})
        return HttpResponse(response_data, content_type='application/json')

    return HttpResponse(status=201)

@csrf_exempt
def teams(request):
    if request.method == 'GET':
        queryset = Teams.objects.all()
        data = serializers.serialize('json', queryset)
        return HttpResponse(data, content_type='application/json')

    if request.method == 'POST':
        try:
            body = request.body.decode('utf-8')
            json_body = json.loads(body)
            # verify name
            if specialChars.search(json_body['team_name']) is not None:
                return HttpResponse(status=400)

            Teams.objects.create(team_name=json_body['team_name'])
        except:
            return HttpResponse(status=500)

    return HttpResponse(status=201)

@csrf_exempt
def players(request):
    if request.method == 'GET':
        body = request.body.decode('utf-8')
        json_body = json.loads(body)

        # verify id
        if not represents_int(json_body['team_id']):
            return HttpResponse(status=400)

        queryset = Players.objects.all().filter(team_id=json_body['team_id'])
        data = serializers.serialize('json', queryset)
        return HttpResponse(data, content_type='application/json')

    if request.method == 'POST':
        try:
            body = request.body.decode('utf-8')
            json_body = json.loads(body)

            # verify data
            if not represents_int(json_body['team_id']):
                return HttpResponse(status=400)

            if specialChars.search(json_body['name']) is not None:
                return HttpResponse(status=400)

            Players.objects.create(
                team_id=Teams.objects.get(pk=json_body['team_id']),
                name=json_body['name']
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

    if request.method == 'POST':
        try:
            body = request.body.decode('utf-8')
            json_body = json.loads(body)

            # verify ids
            if (
                (not represents_int(json_body['home_team_id'])) or
                (not represents_int(json_body['away_team_id']))
            ):
                return HttpResponse(status=400)

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
        try:
            body = request.body.decode('utf-8')
            data = json.loads(body)

            # make sure there are no special characters in data passed from user
            if (
                (specialChars.search(data['home_team_name']) is not None) or
                (specialChars.search(data['away_team_name']) is not None)
            ):
                return HttpResponse(status=400)

            # create teams
            home_team = Teams.objects.create(team_name=data['home_team_name'])
            away_team = Teams.objects.create(team_name=data['away_team_name'])

            # create teammatch
            team_match = TeamMatches.objects.create(
                home_team_id=home_team,
                away_team_id=away_team,
            )

            for match in data['matches']:
                # verify no special characters and data
                if (
                    (specialChars.search(match['home_player']) is not None) or
                    (specialChars.search(match['away_player']) is not None) or
                    (not represents_int(match['match_rank'])) or
                    (not represents_int(match['court_number']))
                ):
                    return HttpResponse(status=400)

                # create players
                home_player = Players.objects.create(team_id=home_team, name=match['home_player'])
                away_player = Players.objects.create(team_id=away_team, name=match['away_player'])

                # create match
                Matches.objects.create(
                    team_match_id=team_match,
                    home_player_id=home_player,
                    away_player_id=away_player,
                    match_rank=match['match_rank'],
                    court_number=match['court_number']
                )

            data = json.dumps({"team_match_id": team_match.pk})
            return HttpResponse(data, content_type='application/json')
        except:
            return HttpResponse(status=500)

    return HttpResponse(status=201)

@csrf_exempt
def teammatches_summary(request):
    if request.method == 'GET':
        try:
            teammatches_objects = TeamMatches.objects.all()
            summary = []
            for teammatch in teammatches_objects:
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

    return HttpResponse(status=200)

@csrf_exempt
def matches(request): # pylint: disable=R0911 (too-many-return-statements)
    if request.method == 'GET':
        team_match_id = request.GET['team_match_id']

        # verify id
        if not represents_int(team_match_id):
            return HttpResponse(status=400)

        queryset = Matches.objects.all().filter(team_match_id=team_match_id)
        data = serializers.serialize('json', queryset)
        return HttpResponse(data, content_type='application/json')

    if request.method == 'POST':
        try:
            body = request.body.decode('utf-8')
            json_body = json.loads(body)

            # verify ids & data
            if (
                (not represents_int(json_body['team_match_id'])) or
                (not represents_int(json_body['home_player_id'])) or
                (not represents_int(json_body['away_player_id'])) or
                (not represents_int(json_body['match_rank'])) or
                (not represents_int(json_body['court_number']))
            ):
                return HttpResponse(status=400)

            Matches.objects.create(
                team_match_id=TeamMatches.objects.get(pk=json_body['team_match_id']),
                home_player_id=Players.objects.get(pk=json_body['home_player_id']),
                away_player_id=Players.objects.get(pk=json_body['away_player_id']),
                match_rank=json_body['match_rank'],
                court_number=json_body['court_number']
            )
            return HttpResponse(status=201)
        except:
            return HttpResponse(status=500)

    if request.method == 'PATCH':
        try:
            body = request.body.decode('utf-8')
            data = json.loads(body)

            if not isinstance(data['match_id'], int):
                return HttpResponse(status=400)

            match = Matches.objects.get(pk=data['match_id'])

            match.home_player_score = data['home_player_score']
            match.away_player_score = data['away_player_score']
            match.done = data['done']
            match.save()

            # check if teammatch is done and update as necesary
            all_matches = Matches.objects.filter(team_match_id=match.team_match_id.pk)
            team_match_done = reduce(lambda a, b : a & b.done, all_matches, True)
            if team_match_done:
                team_match = match.team_match_id
                team_match.done = team_match_done
                team_match.save()

            response_data = json.dumps({'match_id': match.pk})
            return HttpResponse(response_data, content_type='application/json')
        except:
            return HttpResponse(status=500)

    return HttpResponse(status=201)

@csrf_exempt
def matches_summary(request):
    if request.method == 'GET':
        try:
            team_match_id = request.GET['team_match_id']

            # verify id
            if not represents_int(team_match_id):
                return HttpResponse(status=400)

            teammatch = TeamMatches.objects.get(pk=team_match_id)
            matches_object = Matches.objects.all().filter(team_match_id=team_match_id)
            match_summary = []

            for match in matches_object:
                entry = {
                    "pk": match.pk,
                    "home_player_name": match.home_player_id.name,
                    "away_player_name": match.away_player_id.name,
                    "home_player_score": match.home_player_score,
                    "away_player_score": match.away_player_score,
                    "match_rank": match.match_rank,
                    "court_number": match.court_number,
                    "done": match.done
                }
                match_summary.append(entry)

            data = json.dumps({
                "pk": teammatch.pk,
                "home_team_name": teammatch.home_team_id.team_name,
                "away_team_name": teammatch.away_team_id.team_name,
                "matches": match_summary
            })

            return HttpResponse(data, content_type='application/json')
        except:
            return HttpResponse(status=500)

    return HttpResponse(status=200)

@csrf_exempt
def games(request): # pylint: disable=R0911 (too-many-return-statements)
    if request.method == 'GET':
        game_id = request.GET['game_id']

        # casting scoreboard of current game to chromecast
        # TODO: make it so that each ipad/game is hooked to some specific chromecast
        # in each squash court
        cast = "https://intellisquash.herokuapp.com/game/" + game_id + "/scoreboard"
        subprocess.run(["catt", "-d", "Chromey", "cast_site", cast])

        # verify id
        if not represents_int(game_id):
            return HttpResponse(status=400)

        game = Games.objects.get(pk=game_id)

        game_data = {
            'game_id': game.game_id,
            'home_player_score': game.home_player_score,
            'away_player_score': game.away_player_score,
            'game_number': game.game_number,
            'done': game.done
        }

        match_data = {
            'team_match_id': game.match_id.team_match_id.pk,
            'match_id': game.match_id.pk,
            'home_team_name': game.match_id.home_player_id.team_id.team_name,
            'away_team_name': game.match_id.away_player_id.team_id.team_name,
            'home_player_name': game.match_id.home_player_id.name,
            'away_player_name': game.match_id.away_player_id.name,
            'home_player_score': game.match_id.home_player_score,
            'away_player_score': game.match_id.away_player_score,
            'done': game.match_id.done
        }

        data = {
            'game_data': game_data,
            'match_data': match_data
        }

        response_data = json.dumps(data)
        return HttpResponse(response_data, content_type='application/json')

    if request.method == 'POST':
        try:
            body = request.body.decode('utf-8')
            data = json.loads(body)

            # verify id
            if not represents_int(data['match_id']):
                return HttpResponse(status=400)

            game = Games.objects.create(
                match_id=Matches.objects.get(pk=data['match_id']),
                game_number=data['game_number']
            )

            response_data = json.dumps({'game_id': game.pk})
            return HttpResponse(response_data, content_type='application/json')
        except:
            return HttpResponse(status=500)

    if request.method == 'PATCH':
        try:
            body = request.body.decode('utf-8')
            data = json.loads(body)

            # verify id
            if not represents_int(data['game_id']):
                return HttpResponse(status=400)

            game = Games.objects.get(pk=data['game_id'])

            game.home_player_score = data['home_player_score']
            game.away_player_score = data['away_player_score']
            game.done = data['done']
            game.save()

            response_data = json.dumps({'game_id': game.pk})
            return HttpResponse(response_data, content_type='application/json')
        except:
            return HttpResponse(status=500)

    return HttpResponse(status=201)

@csrf_exempt
def games_summary(request):
    if request.method == 'GET':
        match_id = request.GET['match_id']

        # verify id
        if not represents_int(match_id):
            return HttpResponse(status=400)

        games_objects = Games.objects.all().filter(match_id=match_id)
        games_summary_object = []

        for game in games_objects:
            entry = {
                "pk": game.pk,
                "home_player_score": game.home_player_score,
                "away_player_score": game.away_player_score,
                "game_number": game.game_number,
                "done": game.done
            }
            games_summary_object.append(entry)

        data = json.dumps(games_summary_object)
        return HttpResponse(data, content_type='application/json')

    return HttpResponse(status=200)
