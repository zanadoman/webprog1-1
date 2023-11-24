var users = [];

function updateAllUsers(Count) {

    console.log(Count)
    var allUsers = document.getElementById('allUsers');

    var content = '<table>';
    for (var i = 0; i < Count; i++) {

        content += `
            <tr>
                <td><img src="${users[i].avatar}"></td>
                <td>${users[i].id}</td>
                <td>${users[i].first_name}</td>
                <td>${users[i].last_name}</td>
                <td>${users[i].email}</td>
            </tr>
        `;
    }
    content += '</table>';

    allUsers.innerHTML = content;
}

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

            userCountSelector();
            updateAllUsers(users.length);
        }
    }

    xhr.send(null);
}

function userCountSelector() {

    var selector = document.getElementById('userCountSelector');

    var options = `<option value="${users.length}">Összes felhasználó</option>`;
    for (var i = 0; i < users.length - 1; i++) {

        options += `<option value="${i + 1}">${i + 1}db felhasználó</option>`
    }
    selector.innerHTML = options;

    selector.addEventListener("change", function(event) {

        updateAllUsers(event.target.value);
    });
}