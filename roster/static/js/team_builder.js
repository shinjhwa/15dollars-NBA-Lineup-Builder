document.addEventListener("DOMContentLoaded", function() {
    var teamPrice = 0;
    const maxBudget = 15;
    var currentOffenseStrategyIndex = 0;
    var currentDefenseStrategyIndex = 0;

    const strategies = {
        offense: [
            { id: 1, name: 'Princeton Offense' },
            { id: 2, name: 'Continuity Offense' },
            { id: 3, name: 'Motion Offense' },
            { id: 4, name: 'Triangle Offense' },
        ],
        defense: [
            { id: 1, name: 'Man-on-Man' },
            { id: 2, name: 'Zone Defense' },
            { id: 3, name: 'Hybrid Defenses' },
        ]
    };

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
        ev.dataTransfer.setData("type", ev.target.classList.contains('coach') ? 'coach' : 'player');
        ev.dataTransfer.setData("source", ev.target.parentNode.id); // 원래 위치를 저장
    }

    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        var type = ev.dataTransfer.getData("type");
        var source = ev.dataTransfer.getData("source");
        var element = document.getElementById(data);
        var target = ev.target;

        if (type === 'player') {
            var price = parseFloat(element.getAttribute('data-price'));
            var position = element.getAttribute('data-position');

            // 팀에 추가하는 경우
            if (source !== 'team' && target.id === 'team') {
                if (teamPrice + price > maxBudget) {
                    alert("Total price exceeds $15!");
                    return;
                }
                teamPrice += price;
                element.style.position = 'absolute';
                element.style.left = ev.offsetX + 'px';
                element.style.top = ev.offsetY + 'px';
                document.getElementById('team').appendChild(element);
            } 
            // 원래 위치로 되돌리기
            else if (source === 'team' && target.classList.contains('players-list')) {
                teamPrice -= price;
                var priceGroup = document.querySelector('.players-list[data-price="' + price + '"][data-position="' + position + '"]');
                priceGroup.appendChild(element);
                element.style.position = '';
                element.style.left = '';
                element.style.top = '';
            } 
            // 선수 리스트로 되돌리기
            else if (source !== 'team' && target.classList.contains('players-list')) {
                target.appendChild(element);
                element.style.position = '';
                element.style.left = '';
                element.style.top = '';
            } 
            // 올바르지 않은 드롭존
            else {
                alert("Invalid drop zone.");
            }
        } else if (type === 'coach') {
            // 코치 영역에 추가
            if (source !== 'coach-drop-zone' && target.id === 'coach-drop-zone') {
                document.getElementById('coach-drop-zone').appendChild(element);
            } 
            // 원래 위치로 되돌리기
            else if (source === 'coach-drop-zone' && target.classList.contains('coaches-list')) {
                document.getElementById('coaches').appendChild(element);
                element.style.position = '';
                element.style.left = '';
                element.style.top = '';
            } 
            // 코치 리스트로 되돌리기
            else if (source !== 'coach-drop-zone' && target.classList.contains('coaches-list')) {
                target.appendChild(element);
                element.style.position = '';
                element.style.left = '';
                element.style.top = '';
            } 
            // 올바르지 않은 드롭존
            else {
                alert("Invalid drop zone.");
            }
        }

        updateRemainingBudget();
    }

    function dropCoach(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        var type = ev.dataTransfer.getData("type");
        var source = ev.dataTransfer.getData("source");
        var element = document.getElementById(data);

        if (type === 'coach') {
            // 코치 영역에 추가
            if (source !== 'coach-drop-zone' && ev.target.id === 'coach-drop-zone') {
                document.getElementById('coach-drop-zone').appendChild(element);
            } 
            // 원래 위치로 되돌리기
            else if (source === 'coach-drop-zone' && ev.target.classList.contains('coaches-list')) {
                document.getElementById('coaches').appendChild(element);
                element.style.position = '';
                element.style.left = '';
                element.style.top = '';
            } 
            // 코치 리스트로 되돌리기
            else if (source !== 'coach-drop-zone' && ev.target.classList.contains('coaches-list')) {
                ev.target.appendChild(element);
                element.style.position = '';
                element.style.left = '';
                element.style.top = '';
            } 
            // 올바르지 않은 드롭존
            else {
                alert("Invalid drop zone.");
            }
        } else {
            alert("Only a coach can be placed in the coach area.");
        }
    }

    function submitTeam() {
        var teamPlayers = Array.from(document.querySelectorAll('#team .player')).map(player => player.id.replace('player-', ''));
        var coachElement = document.querySelector('#coach-drop-zone .coach');
        var coachId = coachElement ? coachElement.id.replace('coach-', '') : null;

        if (!coachId) {
            alert("You must select a coach.");
            return;
        }

        console.log('Submitting team with players:', teamPlayers, 'and coach:', coachId);

        fetch('/roster/submit_team/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ players: teamPlayers, coach: coachId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Team successfully submitted!');
                window.location.href = '/roster/team_list/';
            } else {
                alert('Failed to submit team: ' + data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function updateRemainingBudget() {
        var remainingBudget = maxBudget - teamPrice;
        document.getElementById('remaining-budget').textContent = remainingBudget;
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function updateOffenseStrategy() {
        const offenseStrategyElement = document.getElementById('offense-strategy');
        offenseStrategyElement.textContent = strategies.offense[currentOffenseStrategyIndex].name;
    }

    function updateDefenseStrategy() {
        const defenseStrategyElement = document.getElementById('defense-strategy');
        defenseStrategyElement.textContent = strategies.defense[currentDefenseStrategyIndex].name;
    }

    document.getElementById('prev-offense-strategy').addEventListener('click', function() {
        if (currentOffenseStrategyIndex > 0) {
            currentOffenseStrategyIndex--;
            updateOffenseStrategy();
        }
    });

    document.getElementById('next-offense-strategy').addEventListener('click', function() {
        if (currentOffenseStrategyIndex < strategies.offense.length - 1) {
            currentOffenseStrategyIndex++;
            updateOffenseStrategy();
        }
    });

    document.getElementById('prev-defense-strategy').addEventListener('click', function() {
        if (currentDefenseStrategyIndex > 0) {
            currentDefenseStrategyIndex--;
            updateDefenseStrategy();
        }
    });

    document.getElementById('next-defense-strategy').addEventListener('click', function() {
        if (currentDefenseStrategyIndex < strategies.defense.length - 1) {
            currentDefenseStrategyIndex++;
            updateDefenseStrategy();
        }
    });

    document.querySelectorAll('.player, .coach').forEach(item => {
        item.addEventListener('dragstart', drag);
    });

    document.querySelectorAll('.players-list').forEach(list => {
        list.addEventListener('drop', drop);
        list.addEventListener('dragover', allowDrop);
    });

    document.getElementById('team').addEventListener('drop', drop);
    document.getElementById('team').addEventListener('dragover', allowDrop);

    document.getElementById('coach-drop-zone').addEventListener('drop', dropCoach);
    document.getElementById('coach-drop-zone').addEventListener('dragover', allowDrop);

    document.querySelectorAll('.coaches-list').forEach(list => {
        list.addEventListener('drop', dropCoach);
        list.addEventListener('dragover', allowDrop);
    });

    document.getElementById('submit-button').addEventListener('click', submitTeam);
    document.getElementById('view-teams-button').addEventListener('click', function() {
        window.location.href = '/roster/team_list/';
    });

    // 초기 전략 설정
    updateOffenseStrategy();
    updateDefenseStrategy();
});
