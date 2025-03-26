# CORS Proxy Sunucusu

Glitch üzerinde çalışacak basit bir CORS proxy sunucusu.

## Kurulum

1. Bu repo'yu Glitch'e import edin:
   - Glitch'te "New Project" > "Import from GitHub"
   - Repo URL'sini yapıştırın

2. Otomatik olarak bağımlılıklar yüklenecek ve sunucu başlayacak

## Kullanım

```bash
GET /proxy?url=HEDEF_API_URL
```

## Örnek

```javascript
fetch('https://your-project-name.glitch.me/proxy?url=https://hedef-api.com/veri')
  .then(response => response.json())
  .then(data => console.log(data));
```