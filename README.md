# Çift Yönlü Proxy Sunucusu

## Özellikler
- **GET Endpoint**: `/get?url=HEDEF_URL`
- **POST Endpoint**: `/post?url=HEDEF_URL` (JSON body ile)
- Sadece whitelist'teki originlerden erişime izin verir

## Kullanım

### GET İsteği
```javascript
fetch('https://your-render-app.onrender.com/get?url=https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));
```

### POST İsteği
```javascript
fetch('https://your-render-app.onrender.com/post?url=https://api.example.com/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Whitelist
- https://gokdumano.github.io
- http://localhost:3000 (development)
