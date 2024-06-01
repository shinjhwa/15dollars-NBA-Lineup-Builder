from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from .models import Player, Team, Coach
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# 팀을 구성하는 뷰
def build_team(request):
    players = Player.objects.all()
    coaches = Coach.objects.all()
    prices = list(range(1, 6))  # 1부터 5까지의 가격대 리스트를 생성

    return render(request, 'roster/build_team.html', {'players': players, 'coaches': coaches, 'prices': prices})

# 팀 제출을 처리하는 뷰
@csrf_exempt
def submit_team(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        player_ids = data.get('players', [])
        coach_id = data.get('coach', None)

        if len(player_ids) != 5:
            return JsonResponse({'status': 'fail', 'message': 'You must select exactly 5 players.'}, status=400)
        if not coach_id:
            return JsonResponse({'status': 'fail', 'message': 'You must select a coach.'}, status=400)

        team = Team(name='My Team')
        team.save()
        team.players.set(player_ids)
        team.coach_id = coach_id

        if team.total_price() > 15:
            team.delete()
            return JsonResponse({'status': 'fail', 'message': 'The total price of selected players cannot exceed 15 dollars.'}, status=400)

        team.save()
        return JsonResponse({'status': 'success', 'team_id': team.pk})

    return JsonResponse({'status': 'fail'}, status=400)

# 팀 목록을 보여주는 뷰
def team_list(request):
    teams = Team.objects.all()
    return render(request, 'roster/team_list.html', {'teams': teams})


def get_strategies(request):
    offense_strategies = Strategy.objects.filter(strategy_type='OFF')
    defense_strategies = Strategy.objects.filter(strategy_type='DEF')
    data = {
        'offense': [{"id": strategy.id, "name": strategy.name} for strategy in offense_strategies],
        'defense': [{"id": strategy.id, "name": strategy.name} for strategy in defense_strategies]
    }
    return JsonResponse(data, safe=False)
