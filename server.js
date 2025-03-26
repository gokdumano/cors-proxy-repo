const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// CORS ayarları
const allowedOrigins = [
  'https://gokdumano.github.io',
  'http://localhost:3000' // Geliştirme için
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Policy Blocked'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight
app.use(express.json());

// GET Proxy Endpoint
app.get('/get', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL parametresi gereklidir' });
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    handleProxyError(error, res);
  }
});

// POST Proxy Endpoint
app.post('/post', async (req, res) => {
  try {
    const { url } = req.query;
    const postData = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL parametresi gereklidir' });
    }

    const response = await axios.post(url, postData);
    res.json(response.data);
  } catch (error) {
    handleProxyError(error, res);
  }
});

// Hata yönetimi
function handleProxyError(error, res) {
  console.error('Proxy Error:', error);
  
  const statusCode = error.response?.status || 500;
  const errorData = {
    error: 'Proxy Hatası',
    details: error.message,
    originalError: error.response?.data
  };
  
  res.status(statusCode).json(errorData);
}

// Kök dizin bilgilendirme
app.get('/', (req, res) => {
  res.send(`
    <h1>Çift Yönlü Proxy Sunucusu</h1>
    <h2>GET Endpoint</h2>
    <p><code>/get?url=HEDEF_URL</code></p>
    
    <h2>POST Endpoint</h2>
    <p><code>/post?url=HEDEF_URL</code></p>
    <p>Body: JSON verisi</p>
    
    <p>İzin verilen originler: ${allowedOrigins.join(', ')}</p>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
