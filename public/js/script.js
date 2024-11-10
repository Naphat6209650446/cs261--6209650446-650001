function submitLogin() {
    console.log('submitLogin function started');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Username:', username);
    console.log('Password:', password);

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUa9dcde19734981739fbc877c2c23aafa9178eb66b505093111b0980eaaf6bfe548624c65aac8fe29718172dcfce55f00'
        },
        body: JSON.stringify({ "UserName": username, "PassWord": password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            // ตรวจสอบค่าที่จะเก็บใน sessionStorage ก่อนเก็บ
            console.log('Status:', data.status);
            console.log('TU Status:', data.tu_status);
            console.log('Message:', data.message);
            console.log('Username:', data.username);
            console.log('Display Name (TH):', data.displayname_th);
            console.log('Display Name (EN):', data.displayname_en);
            console.log('Status ID:', data.statusid);
            console.log('Email:', data.email);      
            console.log('Type:', data.type);
            console.log('Department:', data.department);
            console.log('Faculty:', data.faculty);

            // เก็บข้อมูลลงใน sessionStorage
            sessionStorage.setItem('status', data.status);
            sessionStorage.setItem('tu_status', data.tu_status);
            sessionStorage.setItem('message', data.message);
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('displayname_th', data.displayname_th);
            sessionStorage.setItem('displayname_en', data.displayname_en);
            sessionStorage.setItem('statusid', data.statusid);
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('type', data.type);
            sessionStorage.setItem('department', data.department);
            sessionStorage.setItem('faculty', data.faculty);

            // เปลี่ยนหน้าไปยัง submitLogin.html
            window.location.href = 'submitLogin.html';

            // ตรวจสอบว่ามีการเก็บข้อมูลใน sessionStorage หรือไม่
            console.log('Stored status:', sessionStorage.getItem('status'));
        } else {
            // แจ้งเตือนหากการล็อกอินไม่สำเร็จ
            alert('Login failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials.');
    });
}
