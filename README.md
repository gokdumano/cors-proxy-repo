# Özel CORS Proxy Sunucusu

Bu sunucu sadece **gokdumano.github.io** sitesinden gelen POST isteklerini kabul eder.

## Özellikler
- Sadece whitelist'lenmiş origin (gokdumano.github.io)
- Sadece POST metoduna izin verir
- JSON veri kabul eder

## Kullanım

```javascript
// Örnek istek (gokdumano.github.io'dan)
fetch('https://your-render-app.onrender.com/proxy', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://hedef-api.com/endpoint',
    data: { param1: 'deger1' } // API'ye gönderilecek veri
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Kurulum

1. Bu repo'yu Render'a deploy edin:
   - [Render Dashboard](https://dashboard.render.com/)
   - "New Web Service" seçeneği
   - GitHub repo'sunu bağlayın

2. Ortam değişkenleri gerekmez (tüm ayarlar kod içinde)

## Güvenlik
- Sunucu sadece belirtilen origin'den gelen istekleri kabul eder
- Başka sitelerden gelen istekler CORS hatası alır
