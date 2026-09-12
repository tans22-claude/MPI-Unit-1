# Requirements — Web Kenangan Mahasiswa Prodi

## 1\. Gambaran Umum

Project ini adalah sebuah **landing page digital memory** untuk unit/program studi di kampus.

Tujuan utama website:

* Mengabadikan kenangan mahasiswa selama menjalani masa perkuliahan.
* Menampilkan dokumentasi foto kegiatan dan kehidupan mahasiswa.
* Memberikan gambaran mengenai perjalanan satu generasi mahasiswa.
* Membentuk arsip visual yang dapat dikenang kembali oleh mahasiswa dan alumni.
* Menampilkan identitas dan karakter mahasiswa dalam satu halaman yang emosional namun tetap modern.

Website **tidak membutuhkan backend** pada tahap awal.

Fokus utama adalah:

> Visual storytelling + photography + interaction + motion.

\---

# 2\. Target Teknologi

Gunakan:

* React
* Vite
* Tailwind CSS
* GSAP
* Three.js
* React Three Fiber hanya jika memang diperlukan
* Lucide React untuk icon jika dibutuhkan

Package manager mengikuti package manager yang sudah digunakan project.

## Prinsip

Jangan menambahkan framework atau library besar yang tidak diperlukan.

Website hanya merupakan landing page sehingga:

* Tidak membutuhkan Laravel.
* Tidak membutuhkan database.
* Tidak membutuhkan authentication.
* Tidak membutuhkan API.
* Tidak membutuhkan backend.

\---

# 3\. Struktur Halaman

Website menggunakan **single-page architecture**.

Urutan utama:

1. Hero
2. Introduction / Story
3. Gallery
4. Class of 2024
5. Suka
6. Duka
7. Members
8. Closing / Memory
9. Footer

Navigasi dapat menggunakan anchor navigation.

Contoh:

```text
Home
Gallery
Class of 2024
Suka \& Duka
Members
```

\---

# 4\. Hero Section

Hero menjadi visual pertama yang dilihat pengguna.

Tujuan:

* Membentuk emotional impression.
* Menjelaskan identitas angkatan/prodi.
* Menampilkan foto utama.
* Memberikan kesan cinematic.

Komponen:

* Nama prodi/unit
* Judul utama
* Subtitle pendek
* Tahun angkatan
* CTA menuju gallery
* Hero image
* Optional decorative motion

Contoh konsep copy:

> "Beberapa tahun berlalu.  
> Foto-foto ini mengingatkan kita bahwa kita pernah berada di tempat yang sama."

Copy final dapat diubah pada tahap desain.

Hero harus memiliki visual hierarchy yang kuat.

\---

# 5\. Story / Introduction

Section pendek yang menjelaskan makna website.

Konten:

* Deskripsi singkat kehidupan mahasiswa.
* Perjalanan dari awal kuliah sampai akhir.
* Pernyataan bahwa website menjadi arsip kenangan.

Tidak perlu paragraf panjang.

Prioritaskan:

* Typography
* whitespace
* scroll animation
* storytelling

\---

# 6\. Gallery Section

Gallery merupakan salah satu bagian utama website.

Tujuan:

Menampilkan berbagai dokumentasi mahasiswa.

Kategori foto dapat berupa:

* Perkuliahan
* Organisasi
* Kegiatan kampus
* Acara prodi
* Praktikum
* Seminar
* PKKMB
* Wisuda
* Nongkrong
* Foto random
* Momen spontan

Gallery harus terasa seperti **memory wall**, bukan sekadar grid gambar biasa.

Dapat menggunakan:

* Masonry layout
* Asymmetric grid
* Horizontal gallery
* Hover interaction
* Image reveal
* Parallax
* Scroll animation

Image harus menggunakan:

```text
loading="lazy"
```

untuk gambar yang bukan bagian dari initial viewport.

\---

# 7\. Class of 2024

Section khusus untuk generasi/angkatan.

Menampilkan:

* Tahun angkatan
* Foto kelompok
* Short description
* Jumlah anggota jika datanya tersedia
* Highlight perjalanan angkatan

Contoh:

```text
CLASS OF
2024

One room.
Different stories.
One memory.
```

Visual section harus berbeda dari gallery agar memiliki identitas sendiri.

\---

# 8\. Suka

Section untuk kenangan menyenangkan.

Contoh konten:

* Foto kebersamaan
* Humor
* Kegiatan mahasiswa
* Perjalanan
* Nongkrong
* Event
* Momen keberhasilan

Gunakan pendekatan visual storytelling.

Tidak harus menggunakan banyak teks.

\---

# 9\. Duka

Section untuk sisi perjalanan yang lebih berat.

Contoh:

* Deadline
* Tugas
* Presentasi
* Revisi
* Kegagalan
* Perpisahan
* Masa-masa sulit

Section ini tidak dibuat terlalu dramatis.

Tujuan:

Menunjukkan bahwa pengalaman kuliah bukan hanya tentang foto bahagia.

Tone:

Reflektif.

\---

# 10\. Members

Section berisi anggota mahasiswa.

Setiap member dapat memiliki:

* Foto
* Nama
* Role / keterangan
* Optional quote

Contoh:

```text
Nama Mahasiswa
"Quote singkat"
```

Layout dapat menggunakan:

* Grid
* Horizontal cards
* Interactive profile
* Hover reveal

Jangan membuat card terlalu corporate.

Website adalah arsip kenangan, bukan dashboard perusahaan.

\---

# 11\. Closing Memory

Sebelum footer dapat dibuat section penutup.

Tujuannya memberikan emotional conclusion.

Contoh:

> "Pada akhirnya, yang kita bawa pulang bukan hanya nilai."

Kemudian:

> "Tetapi orang-orang, tempat-tempat, dan cerita yang pernah kita jalani."

Gunakan typography besar dengan minimal elemen.

\---

# 12\. Footer

Footer harus menjadi penutup website.

Isi minimal:

* Nama unit/prodi
* Tahun
* Credit creator
* Navigation
* Social/media link jika tersedia

Footer dapat menggunakan GSAP animation.

\---

# 13\. Motion

GSAP merupakan bagian penting dari visual experience.

Gunakan motion untuk:

* Hero entrance
* Text reveal
* Image reveal
* Scroll-triggered animation
* Gallery parallax
* Section transitions
* Footer transition
3d animation dan 3d transition

Gunakan:

```text
GSAP
ScrollTrigger
```

Prinsip:

Motion harus membantu storytelling.

Jangan membuat semua elemen bergerak hanya karena bisa.

\---

# 14\. Three.js

Three.js dipasang sebagai dependency cadangan.

Three.js hanya digunakan jika memberikan nilai visual yang jelas.

Contoh penggunaan yang diperbolehkan:

* Floating particles
* Interactive background
* 3D object
* Ambient visual
* Hero visual experiment

Jangan menggunakan Three.js untuk menggantikan elemen UI biasa.

Jika Three.js menghasilkan:

* loading berat
* performa buruk
* mobile experience buruk
* visual yang tidak relevan

maka jangan digunakan.

\---

# 15\. Responsive Design

Website wajib responsive.

Minimal:

* Desktop
* Tablet
* Mobile

Mobile bukan versi desktop yang diperkecil.

Pastikan:

* Typography tetap terbaca.
* Gallery tetap menarik.
* Motion tidak mengganggu.
* Navigation usable.
* Image crop tetap baik.
* Tidak ada horizontal overflow.

\---

# 16\. Accessibility

Minimal:

* Semantic HTML
* Alt text pada gambar
* Button memiliki accessible label
* Kontras teks cukup
* Navigasi keyboard tidak rusak
* Respect `prefers-reduced-motion`

Jika user mengaktifkan reduced motion, animasi berat harus dikurangi.

\---

# 17\. Performance

Prioritas:

1. Fast initial load
2. Optimized image loading
3. Lazy loading
4. Avoid unnecessary JavaScript
5. Avoid excessive animation
6. Avoid unnecessary Three.js rendering

Image merupakan aset terbesar dalam website sehingga optimasi image harus menjadi perhatian utama.

\---

# 18\. Content Architecture

Untuk tahap awal, konten dapat diletakkan dalam file lokal.

Contoh:

```text
src/
├── data/
│   ├── gallery.js
│   ├── members.js
│   └── memories.js
```

Jangan hardcode seluruh data langsung di JSX component.

Contoh:

```js
const members = \[
  {
    name: "Nama",
    role: "Mahasiswa",
    image: "/images/member-01.webp"
  }
]
```

\---

# 19\. Image Structure

Gunakan:

```text
public/
└── images/
    ├── hero/
    ├── gallery/
    ├── members/
    └── class-of-2024/
```

Prefer:

* WebP
* AVIF jika workflow mendukung

Hindari penggunaan gambar berukuran sangat besar tanpa optimasi.

\---

# 20\. Component Architecture

Komponen utama dapat berupa:

```text
App
├── Navbar
├── Hero
├── StorySection
├── Gallery
├── ClassOf2024
├── SukaSection
├── DukaSection
├── Members
├── ClosingMemory
└── Footer
```

Komponen motion dapat dipisahkan jika diperlukan.

Contoh:

```text
components/
├── layout/
├── sections/
├── gallery/
├── members/
└── motion/
```

\---

# 21\. Code Quality

Agent wajib:

* Menghindari duplicate code.
* Menggunakan reusable components.
* Menjaga struktur folder konsisten.
* Tidak membuat component raksasa.
* Tidak memasukkan semua logic ke `App.jsx`.
* Tidak menggunakan inline style berlebihan.
* Membersihkan unused imports.
* Menjaga console tetap bersih.

\---

# 22\. Definition of Done

Project dianggap selesai apabila:

* Semua section landing page tersedia.
* Responsive.
* Gallery berjalan.
* Data member dapat dikelola dari data lokal.
* GSAP animation bekerja.
* Tidak ada error console.
* Tidak ada broken image.
* Navigation anchor bekerja.
* Mobile layout tidak rusak.
* Build production berhasil.
* Three.js hanya digunakan jika memang diperlukan.
* Dokumentasi progres diperbarui pada `task.md`.

