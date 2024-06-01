from django.urls import path
from .views import  build_team, submit_team, team_list, get_strategies

urlpatterns = [
    path('build_team/', build_team, name='build_team'),  # 팀 구성 페이지
    path('submit_team/', submit_team, name='submit_team'),  # 팀 제출 처리
    path('team_list/', team_list, name='team_list'),  # 제출된 팀 목록 페이지
    path('get_strategies/', get_strategies, name='get_strategies'),
]
