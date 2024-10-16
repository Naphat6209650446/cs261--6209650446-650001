function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUa9dcde19734981739fbc877c2c23aafa9178eb66b505093111b0980eaaf6bfe548624c65aac8fe29718172dcfce55f00'
        },
        body: JSON.stringify({username, password })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = `
            Status: ${data.status}
            TU Status: ${data.tu_status}
            Message: ${data.message}
            Username: ${data.username}
            Display Name (TH): ${data.displayname_th}
            Display Name (EN): ${data.displayname_en}
            Status ID: ${data.statusid}
            Email: ${data.email}
            Type: ${data.type}
            Department: ${data.department}
            Faculty: ${data.faculty}
        `;
    })
    .catch(error => console.error('Error:', error));
}



function call_REST_API_Hello() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const url = (
        'http://localhost:8080/hello?' +
        new URLSearchParams({ myName: username, lastName: password}).toString()
      );
    
    fetch(url)
    .then(data => {
        document.getElementById('message').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
}
