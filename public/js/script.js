const API_URL = 'https://restapi.tu.ac.th/api/v1/auth/Ad/verify2';
const APP_KEY = 'TUa9dcde19734981739fbc877c2c23aafa9178eb66b505093111b0980eaaf6bfe548624c65aac8fe29718172dcfce55f00';

function submitLogin() {
    console.log('submitLogin function started');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Username:', username);
    console.log('Password:', password);

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUa9dcde19734981739fbc877c2c23aafa9178eb66b505093111b0980eaaf6bfe548624c65aac8fe29718172dcfce55f00'
        },
        body: JSON.stringify({ "UserName": username, "PassWord": password })
    })
    .then(response => {
        console.log('Response:', response);
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message || 'Network response was not ok');
            });
        }
        return response.json();
    })
    .then(data => handleLoginResponse(data))
    .catch(error => handleError(error));
}

function handleLoginResponse(data) {
    console.log('Full Response Data:', data);  // Log the entire response

    if (!data) {
        document.getElementById('message').innerText = 'No data received from API.';
        return;
    }

    document.getElementById('status').value = data.status;

    const commonInfo = `
        <p><strong>Status:</strong> ${data.status}</p>
        <p><strong>Message:</strong> ${data.message}</p>
        <p><strong>Type:</strong> ${data.type}</p>
        <p><strong>Username:</strong> ${data.username}</p>
        <p><strong>tu_status:</strong> ${data.tu_status}</p>
        <p><strong>statusid:</strong> ${data.statusid}</p>
        <p><strong>Display Name (TH):</strong> ${data.displayname_th}</p>
        <p><strong>Display Name (EN):</strong> ${data.displayname_en}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Department:</strong> ${data.department}</p>
        <p><strong>Faculty:</strong> ${data.faculty}</p>
    `;

    if (data.type === "student") {
        document.getElementById('message').innerHTML += `
            ${commonInfo}
            <p><strong>Status:</strong> ${data.tu_status}</p>
            <p><strong>Status ID:</strong> ${data.statusid}</p>
        `;
    } else if (data.type === "employee") {
        document.getElementById('message').innerHTML += `
            ${commonInfo}
            <p><strong>Status:</strong> ${data.tu_status}</p>
            <p><strong>Status Work:</strong> ${data.StatusWork === "1" ? 'Working' : data.StatusWork === "0" ? 'Resigned' : 'Not Working'}</p>
            <p><strong>Organization:</strong> ${data.organization}</p>
        `;
    }
}



function handleError(error) {
    console.error('Error:', error);
    document.getElementById('message').innerText = 'Login failed: ' + error.message;
    alert('Failed to submit login. Please check your network or credentials.');
}
