const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Tüm origin'lere izin ver (production'da spesifik origin'ler belirtin)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));

// Proxy endpoint'i
app.get('/proxy', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL parametresi gereklidir' });
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

// Health check endpoint
app.get('/', (req, res) => {
  res.send('CORS Proxy Sunucusu Çalışıyor');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
