const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Sadece belirli origin'e izin ver
const corsOptions = {
  origin: 'https://gokdumano.github.io',
  methods: ['POST'] // Sadece POST isteklerine izin ver
};

app.use(cors(corsOptions));
app.use(express.json());

// POST istekleri için proxy endpoint'i
app.post('/proxy', async (req, res) => {
  try {
    const { url, data } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL parametresi gereklidir' });
    }

    const response = await axios.post(url, data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ 
      error: 'Proxy hatası',
      details: error.message 
    });
  }
});

// Kök dizin bilgilendirme mesajı
app.get('/', (req, res) => {
  res.send(`
    <h1>Özel CORS Proxy Sunucusu</h1>
    <p>Bu sunucu sadece gokdumano.github.io için çalışmaktadır</p>
    <p>Kullanım: POST /proxy { "url": "hedef_api_url", "data": { ... } }</p>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
