// ติดตั้ง Express และ cors ก่อน
// npm install express cors

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// ใช้ CORS
app.use(cors());

// ให้ Express รองรับ JSON
app.use(express.json());

// สร้าง route สำหรับ proxy ไปยัง API
app.post('/api/auth/Ad/verify', async (req, res) => {
    const apiUrl = 'https://restapi.tu.ac.th/api/auth/Ad/verify';
    const { UserName, PassWord } = req.body;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Application-Key': 'TUa9dcde19734981739fbc877c2c23aafa9178eb66b505093111b0980eaaf6bfe548624c65aac8fe29718172dcfce55f00'
            },
            body: JSON.stringify({ UserName, PassWord })
        });

        const data = await response.json();
        res.status(response.status).json(data); // ส่งกลับข้อมูลที่ได้รับ
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// เริ่มต้น server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
