var users = [];

var displayCount;
var displayFrom;
var displayTo;

function loadUsers() {

    var url = 'https://reqres.in/api/users';
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.onreadystatechange = function() {

        if (this.readyState !== 4) {
            return;
        }

        if (this.status === 200) {

            response = JSON.parse(this.response).data;

            for (var i = 0; i < response.length; i++) {
                users[i] = response[i]
            }

            displayFrom = 0;
            displayTo = users.length;
            userCountSelector();
            initButtons();
            updateButtons();
            updateUsers();
        }
    }

    xhr.send(null);
}

function updateUsers() {
    
    var from;
    var to;
    var allUsers = document.getElementById('allUsers');

    if (displayFrom < 0) {

        from = 0;
        to = displayTo;
    }
    else if (users.length < displayTo) {

        from = displayFrom;
        to = users.length;
    }
    else
    {
        from = displayFrom;
        to = displayTo;
    }

    var content = '';
    for (var i = from; i < to; i++) {

        content += `
            <div class="row">
                <div class="col avatar"><img src="${users[i].avatar}"></div>
                <div class="col-5 data">
                    <ul>
                        <li>ID: ${users[i].id}</li>
                        <li>Név: ${users[i].last_name} ${users[i].first_name}</li>
                        <li>E-mail: ${users[i].email}</li>
                    </ul>
                </div>
                <div class="col buttons">
                    <div class="row"><button type="button" class="btn btn-secondary refresh${i}">Frissítés</button></div>
                    <div class="row"><button type="button" class="btn btn-secondary delete${i}">Törlés</button></div>
                </div>
            </div>
        `;
    }

    allUsers.innerHTML = content;
}

function userCountSelector() {

    var selector = document.getElementById('selector');

    var options = `<option value="${users.length}">Összes felhasználó</option>`;
    for (var i = 0; i < users.length - 1; i++) {

        options += `<option value="${i + 1}">${i + 1}db felhasználó</option>`
    }
    selector.innerHTML = options;

    displayCount = users.length;
    selector.addEventListener('change', function(event) {

        displayCount = event.target.value;
        displayFrom = 0;
        displayTo = displayCount;
        updateButtons();
        updateUsers();
    });
}

function initButtons() {

    var buttonPrevs = document.getElementsByClassName('buttonPrev');
    var buttonNexts = document.getElementsByClassName('buttonNext');

    for (var i = 0; i < buttonPrevs.length; i++) {

        buttonPrevs[i].addEventListener('click', function(event) {

            displayFrom = Number(displayFrom) - Number(displayCount);
            displayTo = Number(displayTo) - Number(displayCount);
            updateButtons();
            updateUsers();
        });
    }

    for (var i = 0; i < buttonNexts.length; i++) {

        buttonNexts[i].addEventListener('click', function(event) {

            displayFrom = Number(displayFrom) + Number(displayCount);
            displayTo = Number(displayTo) + Number(displayCount);
            updateButtons();
            updateUsers();
        });
    }
}

function updateButtons() {

    var buttonPrevs = document.getElementsByClassName('buttonPrev');
    var buttonNexts = document.getElementsByClassName('buttonNext');

    if (displayFrom <= 0) {

        for (var i = 0; i < buttonPrevs.length; i++) {

            buttonPrevs[i].disabled = true;
            buttonPrevs[i].classList.add('disabled');
        }
    }
    else {

        for (var i = 0; i < buttonPrevs.length; i++) {

            buttonPrevs[i].disabled = false;
            buttonPrevs[i].classList.remove('disabled');
        }
    }

    if (users.length <= displayTo) {

        for (var i = 0; i < buttonNexts.length; i++) {

            buttonNexts[i].disabled = true;
            buttonNexts[i].classList.add('disabled');
        }
    }
    else {

        for (var i = 0; i < buttonPrevs.length; i++) {

            buttonNexts[i].disabled = false;
            buttonNexts[i].classList.remove('disabled');
        }
    }
}