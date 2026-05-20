# 🏀 15$ NBA Lineup Builder

> 제한된 예산($15) 내에서 선수, 감독, 전술 데이터를 조회하고 조합하여 나만의 농구팀을 구성하는 프로그램입니다.

<br/>

## 📚 Coursework & Team Project
* **Subject**: Database System (데이터베이스 시스템 팀 프로젝트)
* **Stack**: 
  * **Front-end**: HTML5, CSS3, JavaScript
  * **Back-end**: Python Django Framework
  * **Database**: Relational Database (RDB)

<br/>

## 💾 Database Entities & Data
* **`player.csv` (선수 데이터)**: 포지션 및 시장 가치($1~$5)가 책정된 주요 NBA 선수 데이터
* **`coach.csv` (감독 데이터)**: 팀을 이끌 NBA 현역 감독 리스트
* **`strategy.csv` (전술 데이터)**: 공수 전략 유형(Motion Offense, Zone Defense 등) 데이터

<br/>

## 🌟 Key DB Functions
* **관계형 데이터 모델링**: 선수(Player), 감독(Coach), 전술(Strategy)의 개체를 정의하고 이들의 관계를 RDB 아키텍처로 설계.
* **제약 조건 및 데이터 검증**: 사용자가 선택한 라인업의 총 가치 합산이 예산 제한($15)을 초과하지 않도록 백엔드(Django) 단에서 데이터 유효성 검증 수행.

<br/>

## ⚠️ Limitations & Future Work (아쉬운 점 및 개선 방향)
* **데이터 가치 산정의 객관성 부족**: 외부 오픈 API나 공인된 데이터셋을 활용하는 대신, 개발자가 직접 선수의 가치를 주관적으로 매겼다는 한계점이 있습니다. 향후 실제 NBA 시즌 스탯(PER, WS 등)에 기반한 알고리즘적 가치 산정 방식을 도입하여 객관성을 보완할 계획입니다.
