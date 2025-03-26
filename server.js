// Basit CORS Proxy Sunucusu
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Middleware'ler
app.use(cors());
app.use(express.json());

// Proxy endpoint'i
app.get('/proxy', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'URL parametresi gerekli' });
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ 
      error: 'Proxy hatası',
      details: error.message 
    });
  }
});

// Kök dizin mesajı
app.get('/', (req, res) => {
  res.send(`
    <h1>CORS Proxy Sunucusu</h1>
    <p>Kullanım: /proxy?url=HEDEF_URL</p>
    <p>Örnek: <a href="/proxy?url=https://jsonplaceholder.typicode.com/todos/1">
      /proxy?url=https://jsonplaceholder.typicode.com/todos/1
    </a></p>
  `);
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy sunucusu ${PORT} portunda çalışıyor`);
});