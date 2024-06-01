from django.db import models
from django.contrib.auth.models import User  # 사용자 모델을 사용하기 위해 import

# Create your models here.
class Player(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    position = models.CharField(max_length=50)

    def __str__(self):
      return self.name
  
class Coach(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class Strategy(models.Model):
    OFFENSE = 'OFF'
    DEFENSE = 'DEF'
    STRATEGY_TYPE_CHOICES = [
        (OFFENSE, 'Offense'),
        (DEFENSE, 'Defense'),
    ]
    name = models.CharField(max_length=100)
    strategy_type = models.CharField(max_length=3, choices=STRATEGY_TYPE_CHOICES)

    def __str__(self):
        return self.name
    
class Team(models.Model):
    name = models.CharField(max_length=100)  # 팀 이름
    players = models.ManyToManyField(Player)  # 선수들의 목록
    coach = models.ForeignKey(Coach, null=True, on_delete=models.SET_NULL)
    offense_strategy = models.ForeignKey(Strategy, null=True, related_name='offense_teams', on_delete=models.SET_NULL)
    defense_strategy = models.ForeignKey(Strategy, null=True, related_name='defense_teams', on_delete=models.SET_NULL)

    def __str__(self):
        return self.name

    def total_price(self):
        return sum(player.price for player in self.players.all())  # 팀의 총 비용 계산





