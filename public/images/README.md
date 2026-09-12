# Folder images

Drop foto asli ke sini sesuai struktur. Format yang disarankan: **WebP** (AVIF kalau pipeline mendukung).

```
public/images/
├── hero/
│   └── hero-main.webp
├── gallery/
│   ├── g01.webp ... g12.webp
├── members/
│   ├── m01.webp ... m08.webp
└── class-of-2024/
    └── group.webp
```

Path sudah ter-wire di `src/data/*.js` dan dirender oleh komponen `<Photo>`.
Saat file ada di lokasi yang sesuai, placeholder gradient otomatis tergantikan oleh foto asli
(karena `<Photo>` overlay `<img>` dengan `onError` fallback).

Ukuran rekomendasi: lebar max ~1600px, kualitas WebP 75–85.
