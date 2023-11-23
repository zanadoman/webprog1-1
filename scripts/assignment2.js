function loadUsers() {

    var url = 'https://reqres.in/api/users';
    var xhr = new XMLHttpRequest();
    var content = document.getElementById('content');

    content.innerHTML = ''; //Reset the content of the content

    xhr.open('GET', url);
    xhr.onreadystatechange = function() { //Handle state change

        if (this.readyState !== 4) { //Not ready yet
            return;
        }

        if (this.status === 200) { //Handle success

            var users = JSON.parse(this.response).data;

            var contentString = '<table>'; //Generating content for content
            for (var i = 0; i < users.length; i++) {

                contentString += `
                    <tr>
                        <td><img src="${users[i].avatar}"></td>
                        <td>${users[i].id}</td>
                        <td>${users[i].first_name}</td>
                        <td>${users[i].last_name}</td>
                        <td>${users[i].email}</td>
                    </tr>
                `;
            }
            contentString += '</table>';

            content.innerHTML = contentString; //Apply content
        }
    }

    xhr.send(null);
}