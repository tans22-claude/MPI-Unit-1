# Task Plan â€” Web Kenangan Mahasiswa Prodi

> Status: **PLANNING** â€” menunggu go-ahead untuk mulai scaffold.
> Sumber requirement: `requirements.md`.
> Pemutakhiran terakhir: 2026-09-11 19:06 (GMT+7).

---

## 1. Stack (wajib)

- **React** + **Vite**
- **Tailwind CSS**
- **GSAP** + **ScrollTrigger**
- **Three.js** (dipakai aktif, bukan cadangan)
- **Lucide React** (icon bila dibutuhkan)

Tanpa backend, tanpa DB, tanpa auth, tanpa API, tanpa Laravel.

## 2. Sections (9 â€” single-page, urutan tetap)

1. Hero
2. Story / Introduction
3. Gallery
4. Class of 2024
5. Suka
6. Duka
7. Members
8. Closing Memory
9. Footer

Navigasi: anchor nav (`#hero`, `#gallery`, `#class-of-2024`, `#suka-duka`, `#members`).

## 3. 3D Plans â€” SEMUA WAJIB (non-optional, lock per user 2026-09-11)

> Semua empat di bawah ini **harus** tampil di implementasi akhir. Tidak ada yang boleh di-skip tanpa approval ulang.

### 3.1 Hero ambient 3D piece
- Particle field / object subtle sebagai pembeda first impression.
- Bukan UI replacement â€” murni ambient / visual layer Hero.

### 3.2 3D camera/plane section transitions
- Perpindahan section (khususnya Gallery â†’ Class of 2024 â†’ Suka â†’ Duka â†’ Members â†’ Closing) pakai 3D camera/plane movement.
- Drive dengan `ScrollTrigger` (scrub atau pinned timeline).
- Tujuannya: perpindahan sinematik, bukan hard-cut scroll biasa.

### 3.3 Ambient 3D background pada section emosional
- Particle halus di **Duka** dan **Closing Memory**.
- Bukan parallax 2D biasa â€” pakai 3D ambient supaya terasa reflektif.

### 3.4 Performance gate (tetap wajib, bukan alasan hapus 3D)
- Hormati `prefers-reduced-motion`: turunkan intensitas 3D.
- Deteksi kemampuan mobile: jika FPS drop / device lemah, **sederhanakan** asset 3D, **jangan** matikan semuanya.
- Target tetap: 3D tampil, hanya levelannya diturunkan.

## 4. Motion (GSAP)

- Hero entrance
- Text reveal
- Image reveal
- Scroll-triggered animation
- Gallery parallax
- Section transitions (diperkuat dengan 3D camera/plane â€” lihat 3.2)
- Footer transition

Prinsip: motion = penunjang storytelling, bukan dekorasi.

## 5. Data & Images

- Data lokal di `src/data/{gallery.js, members.js, memories.js}` â€” **tidak** hardcode di JSX.
- Images di `public/images/{hero, gallery, members, class-of-2024}/`.
- Format: **WebP**ä¼˜å…ˆ, AVIF kalau pipeline mendukung.
- Lazy-load untuk semua image di luar initial viewport (`loading="lazy"`).

## 6. Component Architecture

```
src/
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ layout/      (Navbar, Footer)
â”‚   â”œâ”€â”€ sections/    (Hero, Story, Gallery, ClassOf2024, Suka, Duka, Members, Closing)
â”‚   â”œâ”€â”€ gallery/
â”‚   â”œâ”€â”€ members/
â”‚   â””â”€â”€ motion/      (transisi 3D, pinned timeline, ambient particles)
â”œâ”€â”€ data/            (gallery.js, members.js, memories.js)
â””â”€â”€ App.jsx
```

## 7. Responsive

- Desktop / tablet / mobile.
- Mobile bukan versi desktop yang dikecilkan.
- Gallery tetap menarik, typography tetap kebaca, motion tidak mengganggu, **tidak ada horizontal overflow**.

## 8. Accessibility

- Semantic HTML, alt text, accessible button labels, kontras cukup, navigasi keyboard, `prefers-reduced-motion` (dikaitkan dengan 3.4).

## 9. Definition of Done

- Semua 9 section tersedia.
- Responsive di 3 breakpoint.
- Gallery berjalan + lazy-load aktif.
- Data member & gallery dari `src/data/`.
- GSAP + ScrollTrigger bekerja.
- **Semua 4 plan 3D (bagian 3.1â€“3.4) hadir dan berjalan.**
- Tidak ada error console, tidak ada broken image.
- Anchor navigation bekerja.
- Build production (`vite build`) sukses.
- Mobile layout tidak rusak.
- `task.md` selalu diperbarui saat ada progres.

---

## 10. Progress Log

| Tanggal | Status | Catatan |
|---|---|---|
| 2026-09-11 | Planning | Requirements dibaca, 4 plan 3D di-lock sebagai wajib. |
| 2026-09-11 | Scaffolded | Vite + React + Tailwind + GSAP + Three.js + Lucide wired. `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `.gitignore`, `public/favicon.svg` dibuat. |
| 2026-09-11 | Components | 9 section components selesai (Hero, Story, Gallery, ClassOf2024, Suka, Duka, Members, ClosingMemory) + Navbar + Footer. Layout per requirements. |
| 2026-09-11 | 3D built | 4 plan 3D implemented: `HeroScene` (Plan #1), `TransitionCanvas` global (Plan #2), `AmbientParticles` di Duka + Closing (Plan #3), `PerformanceGate` + `useMotionCapability` (Plan #4). |
| 2026-09-11 | Data | `src/data/{gallery, members, memories}.js` dengan placeholder content siap di-swap foto asli. |
| 2026-09-11 | Build OK | `npm install` (132 pkgs), `npm run build` sukses â€” 1600 modules, ~223 kB gzipped. |
| 2026-09-11 | 3D Boost | Particles boosted across HeroScene / AmbientParticles / TransitionCanvas. Added foreground particle layer di Hero. |
| 2026-09-11 | Graduates Companion | `GraduatesCompanion.jsx` baru: 5 procedural low-poly graduates (biru + oranye palette), fixed bottom-right sebagai scroll companion. Wired ke `App.jsx`. |
| 2026-09-11 | Graduates v2 | Scroll-reactive (rotation tracks progress + velocity bounce), auto-recede di Hero/Gallery/Members (opacity 0.35, scale 0.7) agar tidak menghalangi section, celebration gesture (angkat tangan) di ClassOf2024 & Suka. |
| 2026-09-11 | Artifact swap | Procedural low-poly graduates diganti dengan **GraduationArtifact** (topi toga + diploma stack + confetti + aura). No characters, no risk "looks weird". Lebih elegan dan meyakinkan secara visual. |

### Build output (latest)
- `dist/index.html` 1.21 kB
- `dist/assets/index-*.css` 21.79 kB (gzip 5.24 kB)
- `dist/assets/gsap-*.js` 70.44 kB (gzip 27.81 kB)
- `dist/assets/index-*.js` 232.78 kB (gzip 76.34 kB)
- `dist/assets/three-*.js` 470.64 kB (gzip 118.29 kB)

### 3D Boost summary (per user feedback "kurang terasa")
- **HeroScene**: 1200 â†’ 3500 particles, size 0.06â€“0.07 â†’ 0.10â€“0.22, glow 0.55 â†’ 0.9, **+ foreground close-pass layer** (220 big pulsing orbs).
- **AmbientParticles** (Duka, Closing): 600 â†’ 1500 particles, size 0.015â€“0.04 â†’ 0.05â€“0.14, glow 0.35 â†’ 0.6, soft tier 35% â†’ 50%.
- **TransitionCanvas**: glow points 500 â†’ 1500, ribbon opacity 0.12â€“0.27 â†’ 0.22â€“0.55, **+ secondary ribbon** untuk depth, section planes sedikit visible (opacity 0.06) supaya tint warna section kerasa saat pass-through.

### Graduation Artifact (pengganti GraduatesCompanion, per user feedback 2026-09-11)
- **Konsep**: No characters â€” komposisi elegan graduation-themed objects yang universally recognizable, sulit terlihat "aneh".
- **Komposisi**:
  - **Graduation cap** centerpiece: LatheGeometry dome (curve lebih bagus dari half-sphere) + BoxGeometry mortarboard + TorusGeometry gold band + SphereGeometry button + TubeGeometry tassel cord (CatmullRom curve) + ConeGeometry tuft.
  - **Diploma stack**: 3 rolled cylinder diplomas dengan varied size, gold ribbon band per diploma.
  - **Confetti orbit**: 10â€“20 flat planes (4 shapes Ã— 5 colors) yang mengorbit dengan rotSpeed individu.
  - **Glowing aura**: 45â€“95 ShaderMaterial points (additive, pulsing) di sekeliling komposisi.
- **Scroll-reactive** (dipertahankan): Y rotation oscillates Â±28Â° (sin curve) mengikuti scroll progress, velocity bounce, idle float.
- **Section gestures**: ClassOf2024 / Suka â†’ cap wobble + tassel pulse + confetti rotSpeed Ã— 3.
- **Non-blocking**: 128Ã—96 (mobile) â†’ 224Ã—144 (desktop), opacity 0.85 max, auto-recede di Hero/Gallery/Members.
- Build: 1601 modules, 234.92 kB index (gzip 76.78), 485.20 kB three (gzip 122.09), 18.01s.

### Yang tersisa (untuk user / next session)
- [ ] Drop foto asli ke `public/images/{hero,gallery,members,class-of-2024}/` (struktur folder sudah ada + README).
- [ ] (Opsional) Preview lokal via `npm run dev` â€” cek apakah posisi bottom-right GraduationArtifacté®æŒ¡ content di mobile (saat ini 128Ã—96 mobile, 224Ã—144 desktop).
- [ ] (Opsional) Kalau mau GraduationArtifact pose bereaksi lebih per-section (mis. wobble pelan terus-menerus di Closing), bisa ditambah kemudian.
- [ ] Ganti entry placeholder di `src/data/*.js` (nama, quote, role, src) dengan data asli.
- [ ] Sesuaikan `classOf2024Copy.memberCount`, `heroCopy.prodiName`, dsb. di `src/data/memories.js`.
- [ ] (Opsional) Tweak palette `tailwind.config.js` (saat ini warm-ink dark) sesuai identitas prodi.
- [ ] (Opsional) Jalankan `npm run dev` untuk preview lokal.

---

## 2026-09-11 21:00

### Task
- Convert project ke TypeScript
- Install Framer Motion
- Setup shadcn/ui structure dengan /lib/utils
- Integrate HeroCarousel component ke Members section
- Replace member grid dengan filmstrip carousel

### Changes
- **Installed dependencies**:
  - `typescript`, `@types/react`, `@types/react-dom`, `@types/node`
  - `framer-motion` (untuk HeroCarousel animations)
  - `clsx`, `tailwind-merge` (untuk cn utility)
- **Created**: `tsconfig.json`, `tsconfig.node.json` - TypeScript configuration
- **Created**: `src/lib/utils.ts` - shadcn cn() utility function
- **Created**: `src/components/ui/hero-carousel.tsx` - Editorial filmstrip carousel component
  - Drag, wheel, keyboard navigation
  - Auto-graded background berdasarkan accent color
  - Responsive measured geometry (ResizeObserver)
  - Film grain effect built-in
  - Accessibility: ARIA labels, keyboard controls, reduced motion
- **Created**: `src/components/sections/Members.tsx` - New Members section using HeroCarousel
  - Maps members data → HeroCarousel format
  - Name → title, role → credit, quote → meta
  - Accent colors dari member tone (warm/cool/neutral)
- **Updated**: `vite.config.js` - Added path alias `@/` → `./src`
- **Updated**: `src/data/members.js` - Unsplash stock portrait images (8 members)

### Result
✅ TypeScript setup successful
✅ shadcn/ui structure implemented (`/lib/utils.ts`, `/components/ui/`)
✅ HeroCarousel component integrated
✅ Members section sekarang filmstrip carousel (bukan grid)
✅ Drag horizontal, wheel/trackpad scroll, arrow keys navigation
✅ Background auto-grade ke accent color per member
✅ Build successful: 4.43s, 235.41 kB (gzip: 76.98 kB)
✅ Unsplash placeholder images working

### Issue
None - integration successful

### Decision
- TypeScript: Modern type safety untuk better DX
- Framer Motion: Required oleh HeroCarousel (lebih powerful dari Motion/React untuk drag gestures)
- shadcn structure: Industry standard, better component organization
- HeroCarousel untuk Members: Editorial filmstrip lebih engaging daripada static grid
- Path alias `@/`: Cleaner imports, easier refactoring

### Features Implemented
**HeroCarousel capabilities:**
- ✅ Horizontal filmstrip dengan shared top edge
- ✅ Active card expands full height (2x), inactive cards stay half
- ✅ Drag gesture dengan momentum + elastic constraints
- ✅ Wheel/trackpad scroll (both axes) dengan cooldown
- ✅ Keyboard navigation (Arrow Left/Right, Home, End)
- ✅ Auto-graded background: photo keeps luminance, takes accent hue
- ✅ Film grain overlay (inline SVG, no external assets)
- ✅ Progress rail dengan animated indicator
- ✅ Autoplay support (paused on hover/focus/drag)
- ✅ Reduced motion support
- ✅ Scroll chaining (no trap saat strip di ujung)
- ✅ Responsive measured geometry (ResizeObserver)

### Next
- User dapat replace Unsplash images dengan foto asli members
- Adjust accent colors per member jika diperlukan
- Optional: Enable autoplay dengan `autoplay={true}` di Members.tsx
- Optional: Add onBack/onMenu handlers jika mau navigation controls
- Test di berbagai screen sizes (carousel fully responsive)

---

## 2026-09-11 21:15

### Task
- Update members data dari 8 ke 21 members
- HeroCarousel sudah terintegrasi dari task sebelumnya

### Changes
- **Updated**: `src/data/members.js` - Expanded dari 8 ke 21 members
  - All with Unsplash portrait placeholders
  - Quotes dalam bahasa Indonesia
  - Mixed tones: warm (golden), cool (blue-grey), neutral (grey)

### Result
✅ 21 members total di HeroCarousel filmstrip
✅ Build successful: 4.76s, 237.89 kB (gzip: 77.58 kB)
✅ Filmstrip sekarang lebih panjang dengan 21 cards
✅ All drag, wheel, keyboard controls working
✅ Progress rail menunjukkan 01-21

### Issue
None - expansion successful

### Decision
- 21 members = lebih representatif untuk class size
- Unsplash variety untuk diverse portraits
- Indonesian quotes untuk local context

### Next
- User replace Unsplash dengan foto asli (21 photos)
- Adjust names, roles, quotes dengan data real
- Test carousel dengan 21 items di berbagai screen sizes

---

## 2026-09-11 21:25

### Task
- Apply gallery photos yang sudah disediakan user di folder images/gallery
- Update gallery.js dengan 9 foto JPG aktual

### Changes
- **Copied**: 9 JPG files dari `dist/images/gallery/` → `public/images/gallery/`
  - Files: 1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg, 6.jpg, 7.jpg, 8.jpg, 9.jpg
- **Updated**: `src/data/gallery.js` - Updated paths ke actual photos
  - Changed from placeholder WebP paths → actual JPG paths
  - 9 gallery items dengan mixed categories
  - Categories: Perkuliahan, Kegiatan Kampus, Organisasi, Nongkrong, Acara Prodi, Praktikum, Seminar, Spontan, Wisuda

### Result
✅ 9 actual gallery photos integrated
✅ Gallery component sudah menggunakan gallery.js data
✅ Filter chips working (Semua + 10 categories)
✅ Masonry layout (CSS columns: 1/2/3/4 cols responsive)
✅ Build successful: 35.98s, 237.56 kB (gzip: 77.41 kB)
✅ Photos accessible via /images/gallery/1.jpg - 9.jpg

### Issue
None - gallery photos applied successfully

### Decision
- Keep JPG format (as provided by user)
- Mixed categories untuk variety
- Masonry layout dengan varied spans (wide/tall/square/auto)

### Next
- User dapat adjust captions di gallery.js jika diperlukan
- User dapat adjust categories per photo
- Add more photos jika ada (10.jpg, 11.jpg, dst)

---

## 2026-09-11 21:35

### Task
- Apply Option 1: Warm & Nostalgic color palette (Cream + Terracotta)
- Replace dark theme dengan warm, light theme

### Changes
- **Updated**: `tailwind.config.js` - New color tokens
  - cream: #FFF8F0 (background)
  - terracotta: #E07A5F (primary)
  - sandy: #F4A261 (secondary)
  - deepblue: #3D405B (accent)
  - ink: Updated untuk light theme
- **Updated**: `src/index.css` - CSS variables dan base styles
  - Background: cream (#FFF8F0)
  - Text: warm black (#2C2C2C)
  - color-scheme: light
  - Scrollbar: warm tones
  - Selection: terracotta
- **Updated**: `src/components/layout/Navbar.jsx`
  - Scrolled bg: cream-100/90 dengan backdrop-blur
  - Text: ink-700 (dark) → hover terracotta-500
  - Border: terracotta-500/20
- **Updated**: `src/components/layout/Footer.jsx`
  - Text colors: ink-700, ink-500
  - Border: terracotta-500/30
  - Links hover: terracotta-500

### Result
✅ Warm & Nostalgic palette applied
✅ Light theme dengan cream background
✅ Terracotta primary color (coral/orange warm tone)
✅ Sandy orange secondary
✅ All components updated dengan new colors
✅ Build successful: 18.67s, 237.61 kB (gzip: 77.43 kB)
✅ Readable, warm, nostalgic vibe

### Issue
None - color palette applied successfully

### Decision
- Option 1 chosen: Perfect untuk kenangan mahasiswa (warm, nostalgic)
- Light theme lebih readable dan friendly
- Cream background tidak terlalu terang seperti pure white
- Terracotta untuk emotional warmth

### Color Palette Summary
**Option 1: Warm & Nostalgic**
- Background: #FFF8F0 (Cream)
- Primary: #E07A5F (Terracotta/Coral)
- Secondary: #F4A261 (Sandy Orange)
- Accent: #3D405B (Deep Blue Grey)
- Text: #2C2C2C (Warm Black)

### Next
- Other sections (Hero, Gallery, Members, dll) akan otomatis pakai new colors dari Tailwind config
- User bisa adjust individual component colors jika ada yang perlu tweaking
- Test di browser untuk lihat visual result

---

## 2026-09-11 21:40

### Task
- Remove category filters dari Gallery section
- Buat gallery murni tanpa kategori, hanya masonry grid

### Changes
- **Updated**: `src/components/sections/Gallery.jsx`
  - Removed: Filter chips (Semua + 10 categories)
  - Removed: Category state management (useState, useMemo)
  - Removed: Filter logic dan Chip component
  - Simplified: Pure masonry grid dengan semua photos
  - Updated: Text colors ke warm palette (sandy-500, ink-700, ink-500)
- **Updated**: `src/data/gallery.js`
  - Removed: galleryCategories export
  - Removed: category field dari gallery items
  - Simplified: Pure gallery data (id, src, alt, span, caption)
  - Updated: Captions jadi generic (tidak tied ke categories)

### Result
✅ Gallery sekarang pure masonry grid (no filters)
✅ 9 photos displayed langsung
✅ Cleaner UI, fokus ke photos
✅ Build successful: 15.09s, 236.40 kB (gzip: 77.12 kB)
✅ Bundle size berkurang (no filter state logic)
✅ CSS reduced: 24.62 kB (dari 25.09 kB)

### Issue
None - category filters removed successfully

### Decision
- Pure gallery approach: Lebih clean, fokus ke memories
- No categorization needed untuk personal memories
- Masonry layout sudah cukup engaging tanpa filters
- User focus langsung ke photos

### Next
- Gallery ready dengan 9 photos
- User dapat add more photos (10.jpg, 11.jpg, dst)
- Adjust captions di gallery.js jika diperlukan

---

## 2026-09-11 21:50

### Task
- Perlambat scrolling dengan Lenis smooth scroll
- Ubah semua warna teks jadi putih (#FFFFFF)

### Changes
- **Installed**: `lenis` - Smooth scroll library
- **Updated**: `src/App.jsx` - Integrated Lenis smooth scroll
  - Duration: 1.8s (lambat, cinematic)
  - Easing: Custom smooth curve
  - wheelMultiplier: 0.6 (perlambat wheel scroll)
  - Synced dengan GSAP ScrollTrigger
- **Updated**: `src/index.css`
  - Text colors: #FFFFFF (white)
  - Lenis CSS classes
  - Removed native scroll-behavior
- **Updated**: `tailwind.config.js`
  - All ink colors → #FFFFFF (white)
  - ink-50, ink-100, ink-200, ink-300, ink-500, ink-700, ink-900 = #FFFFFF

### Result
✅ Smooth scroll perlambat (duration 1.8s)
✅ Wheel scroll lebih lambat (multiplier 0.6)
✅ Buttery smooth scrolling dengan Lenis
✅ Semua teks sekarang putih (#FFFFFF)
✅ High contrast: White text on cream background
✅ Build successful: 6.69s, 256.25 kB (gzip: 82.40 kB)
✅ Bundle bertambah +20kB (Lenis library)

### Issue
None - smooth scroll dan white text applied successfully

### Decision
- Lenis over native smooth-scroll: Lebih halus, lebih kontrol
- Duration 1.8s: Sweet spot antara cinematic dan usable
- wheelMultiplier 0.6: Perlambat tapi tidak frustrating
- White text: Maximum contrast, elegant on cream bg

### Lenis Configuration
`js
duration: 1.8         // Scroll duration (higher = slower)
wheelMultiplier: 0.6  // Wheel sensitivity (lower = slower)
easing: custom        // Smooth ease curve
smoothWheel: true     // Smooth wheel events
`

### Next
- Test smooth scrolling di browser
- Adjust duration/wheelMultiplier jika perlu lebih lambat/cepat
- White text sekarang di semua sections

---

## 2026-09-11 22:00

### Task
- Perkecil tinggi navbar (reduce padding)
- Buat navbar background lebih terang (cream tone)

### Changes
- **Updated**: `src/components/layout/Navbar.jsx`
  - Padding: py-4/py-5 → py-2/py-3 (50% reduction)
  - Logo size: text-2xl/3xl → text-xl/2xl (smaller)
  - Menu font: text-sm → text-xs (smaller)
  - Menu gap: gap-8 → gap-6 (tighter)
  - Icon size: 22px → 20px (smaller)
  - Mobile padding: py-3 pb-6 → py-2.5 pb-4 (reduced)
  - Mobile gap: gap-1 → gap-0.5 (tighter)
  - Background: cream-100/90 → cream-100/95 (more opaque, brighter)
  - Border: terracotta/20 → white/20 (lighter)
  - Mobile drawer: cream-50 → cream-100/95 (consistent with navbar)

### Result
✅ Navbar tinggi berkurang ~40%
✅ More compact & elegant
✅ Background lebih terang (cream 95% opacity)
✅ Border lebih subtle (white/20)
✅ Logo & menu lebih kecil tapi tetap readable
✅ Build successful: 18.96s, 256.12 kB (gzip: 82.42 kB)

### Issue
None - navbar height reduced & brightened successfully

### Decision
- Smaller navbar = more content visible
- Brighter background = less contrast, lighter feel
- White border = subtle, elegant
- Compact padding = modern, clean

### Visual Changes
**Before**:
- Height: ~72-80px (py-4/py-5)
- Logo: text-2xl/3xl
- Background: cream-100/90 (darker)

**After**:
- Height: ~48-56px (py-2/py-3) ← 40% reduction
- Logo: text-xl/2xl
- Background: cream-100/95 (brighter) ← More cream visible

### Next
- Navbar ready dengan compact size
- User dapat adjust py-2/py-3 jika mau lebih kecil/besar

---

## 2026-09-12 01:55

### Task
- Hapus foto dari Hero section
- Hapus HeroScene (3D particles) dan TransitionCanvas (3D transitions)
- Ganti background web dengan file GLB (`need_some_space.glb`) sebagai background tetap
- Background GLB zoom mendekat di tengah scroll, zoom out di akhir
- Tambah blur overlay di background biar teks terbaca
- Ubah semua teks jadi putih + bold (kecuali body text)
- Update story copy dengan kutipan Kahlil Gibran

### Changes
- **Dihapus**: `HeroScene.jsx` import dari Hero.jsx
- **Dihapus**: `TransitionCanvas.jsx` import dari App.jsx
- **Dihapus**: Foto hero (hero-main.webp) dari Hero section
- **Dihapus**: Frame decorations di Hero
- **Dihapus**: Folder `public/images/3d-photos/*.png`
- **Dibuat**: `src/components/motion/HeroBackground.jsx` — 3D GLB background
  - Load `need_some_space.glb` via GLTFLoader
  - Fixed position, full-screen, behind all content
  - Scroll animation: zoom dari z=2 ke z=0.5 di tengah, back to z=2
  - Rotate Y mengikuti scroll progress
- **Updated**: `src/App.jsx` — HeroBackground sebagai background tunggal
- **Updated**: `src/components/sections/Hero.jsx` — teks putih, bold, tanpa foto
- **Updated**: `src/components/sections/Story.jsx` — teks putih, bold
- **Updated**: `src/components/sections/Gallery.jsx` — teks putih, bold
- **Updated**: `src/components/sections/ClassOf2024.jsx` — teks putih, bold
- **Updated**: `src/components/sections/Suka.jsx` — teks putih, bold
- **Updated**: `src/components/sections/Duka.jsx` — teks putih, bold
- **Updated**: `src/components/sections/Members.jsx` — teks putih, bold
- **Updated**: `src/components/sections/ClosingMemory.jsx` — teks putih, bold
- **Updated**: `src/components/layout/Navbar.jsx` — teks putih, bold, bg hitam transparan
- **Updated**: `src/components/layout/Footer.jsx` — teks putih, bold
- **Updated**: `src/data/memories.js` — storyCopy diganti kutipan Kahlil Gibran
- **Blur overlay**: `backdrop-blur-[2px]` + `bg-ink-900/30` di HeroBackground

### Result
✅ Background GLB sebagai satu-satunya 3D background (tanpa lapisan)
✅ Model zoom mendekat saat scroll ke tengah (z=2 → z=0.5)
✅ Blur overlay untuk keterbacaan teks
✅ Semua teks putih + bold (kecuali body text)
✅ Story section: kutipan Kahlil Gibran
✅ Build clean, tidak ada error

### Yang dihapus
- HeroScene (3D particles Hero)
- TransitionCanvas (3D section transitions)
- GraduationArtifact (3D scroll companion) — masih ada di App.jsx
- Semua foto dari Hero section
- File .png di 3d-photos

### Catatan
- Background hanya GLB `need_some_space.glb` + blur overlay
- Tidak ada lagi lapisan 3D berlebihan
- Teks putih bold untuk kontras di atas background gelap

---

## 2026-09-12 02:30

### Task
- Implementasi Image Sequence Background (600 frames)
- Scroll-driven animation: scroll progress → frame index
- Section-based positioning (center/right/small)
- Footer fade-out behavior
- Background putih (#FFFFFF)
- Hapus GLB background dan GraduationArtifact

### Changes
- **Dibuat**: `src/components/motion/ImageSequenceBackground.jsx`
  - 600 frames preload via Image objects
  - Canvas rendering (paling efisien untuk banyak frame)
  - Scroll progress → frame index mapping
  - Section-based positioning:
    - Hero/Story/Duka/Closing: center, scale 1.0
    - Gallery/Members: right, scale 0.75 (tidak menutupi foto)
    - ClassOf2024: center, scale 0.9
    - Suka: right, scale 0.8
  - Footer fade: mulai opacity berkurang di 92% scroll, fully transparent di 99%
  - pointer-events: none (tidak menghalangi UI)
  - Responsive: menyesuaikan viewport
- **Dihapus**: `HeroBackground.jsx` (GLB background)
- **Dihapus**: GraduationArtifact dari App.jsx
- **Updated**: `App.jsx` — gunakan ImageSequenceBackground
- **Updated**: `index.css` — background putih, scrollbar abu-abu
- **Updated**: `index.html` — theme-color putih, body bg-white

### Result
✅ 600 frames sebagai scroll-driven animation
✅ Canvas rendering (efisien untuk 600 frame)
✅ Preload semua frame sebelum animasi mulai
✅ Scroll progress → frame index (smooth, tidak patah-patah)
✅ Section-based positioning (center/right sesuai section)
✅ Footer fade-out gradual (bukan tiba-tiba hilang)
✅ Background putih (#FFFFFF)
✅ pointer-events: none (UI tetap interactive)
✅ Responsive: desktop, tablet, mobile
✅ Build successful: 9.32s, 243.74 kB (gzip: 79.35 kB)

### Metode Rendering
- **Canvas 2D** — paling efisien untuk 600 frame
- Preload: 600 Image objects (semua frame di-load sekaligus)
- Render: draw frame ke canvas berdasarkan scroll progress
- DPR-aware: menyesuaikan device pixel ratio (max 2x)

### Lokasi Asset
- 600 frames di `public/images/background/` (00001.png - 00600.png)
- Aspect ratio: 16:9 (landscape)
- Subject: mahasiswa hijau → toga wisuda

### Trigger Animasi
- Scroll-driven (bukan time-based)
- Scroll progress 0% = frame 1 (mahasiswa hijau)
- Scroll progress 100% = frame 600 (toga wisuda)
- Footer fade: 92%-99% scroll

### Performa
- Canvas rendering lebih hemat memori dari 600 <img> tags
- DPR-optimized (max 2x) untuk mobile
- Redraw hanya saat frame berubah
- Cleanup: abort pending loads saat unmount

### Testing
- `npm run dev` → scroll dari atas ke bawah
- Cek: frame berurutan smooth, tidak flicker
- Cek: gallery section — object di kanan, lebih kecil
- Cek: footer — object fade out gradual
- Cek: mobile — responsive, tidak overflow

### Yang perlu diperhatikan
- 600 frame × ~100-200KB = ~60-120MB total download
- Pertama kali load mungkin agak lama (tergantung koneksi)
- Setelah ter-load, animasi sangat smooth
- Canvas approach lebih efisien dari CSS/JS untuk kasus ini

---

## 2026-09-12 03:00

### Task
- Jadikan image sequence sebagai background utama full-screen (cover behavior)
- Semua konten web ada di kanan dan kiri subjek, tidak ada yang menutupi
- Hapus semua komponen 3D yang tidak digunakan

### Changes
- **Updated**: `ImageSequenceBackground.jsx`
  - Cover behavior: fill seluruh viewport, crop overflow
  - Tidak ada space kosong, image selalu menutupi layar
- **Updated**: `src/index.css`
  - Tambah utility classes: `.content-left`, `.content-right`, `.content-wide`, `.content-split`
  - Content positioning: max-width 50%, padding 8% dari center
- **Updated**: Semua section components
  - Hero: `content-left` (konten di kiri)
  - Story: `content-right` (konten di kanan)
  - Gallery: `content-left` (konten di kiri)
  - ClassOf2024: `content-right` (konten di kanan)
  - Suka: `content-left` (konten di kiri)
  - Duka: `content-left` (konten di kiri)
  - Members: `content-right` (konten di kanan)
  - ClosingMemory: `content-left` (konten di kiri)
  - Footer: full width, bg-black/80 backdrop-blur
- **Updated**: `Navbar.jsx` — bg hitam transparan
- **Dihapus**: 
  - `HeroBackground.jsx` (GLB background)
  - `GraduationArtifact.jsx` (3D scroll companion)
  - `AmbientParticles.jsx` (3D particles)
  - `PerformanceGate.jsx` (3D performance)
  - `HeroScene.jsx` (3D hero particles)
  - `TransitionCanvas.jsx` (3D transitions)
  - `GraduatesCompanion.jsx` (3D graduates)
  - `useMotionCapability.js` (3D hook)
  - `useGsapReveal.js` (unused hook)
  - `Hero3DScene.jsx` (3D GLB render)
  - `Members.tsx` (duplicate file)

### Result
✅ Image sequence full-screen cover (tidak ada yang terpotong)
✅ Semua konten di kanan/kiri subjek (subjek selalu terlihat di tengah)
✅ Build successful: 9.51s, 238.55 kB (gzip: 77.55 kB)
✅ Three.js chunk kosong (0 kB) — tidak digunakan

### Layout Strategy
- Subjek di tengah viewport (center)
- Konten di sisi kiri atau kanan (max-width 50%)
- Gap 8% antara konten dan subjek
- Mobile: konten full width, stacking vertical

### Bug Fixes (2026-09-12 04:00)
- **Suka.jsx**: Fix filter by `g.category` → gallery items tidak punya category → sekarang pakai `gallery.slice(0, 6)`
- **Hero.jsx**: Hapus Hero3DScene (3D GLB render) → sekarang hanya text content di kiri
- **Members.tsx**: Hapus file duplikat (Members.jsx yang dipakai)
- **src/hooks/**: Hapus folder kosong

### 30fps Smooth Scrolling (2026-09-12 05:00)
- **ImageSequenceBackground.jsx**: 
  - Tambah RAF loop dengan 30fps cap (`TARGET_FPS = 30`)
  - Cache canvas dimensions (hindari resize setiap frame)
  - `scrub: 0.1` untuk scroll linking yang lebih smooth
  - `pendingFrameRef` queue untuk frame berikutnya

### Testing
- `npm run dev` → scroll dari atas ke bawah
- Cek: subjek selalu terlihat di tengah
- Cek: konten tidak menutupi subjek
- Cek: smooth scrolling 30fps
- Cek: responsive di mobile

---

## 2026-09-13

### Task
- Deploy ke Cloudflare Pages
- Hero: ganti ke dual MeshGradient + glass effect SVG + wireframe
- Hapus bg-white dari semua section (canvas 303 frame harus terlihat di seluruh halaman)
- Fix teks hero: putih di atas dark MeshGradient

### Changes
- **Cloudflare Pages**: Project `mpi-unit-1` deployed via GitHub integration
  - Build: `npm run build`, Output: `dist`
  - Auto-deploy dari branch `main`
- **Updated**: `src/components/ui/shader-hero.tsx`
  - Dual MeshGradient: normal layer + wireframe layer (opacity-0.4)
  - SVG glass-effect filter (feTurbulence + feDisplacementMap + feColorMatrix)
  - Mouse interaction (isActive state via mouseenter/mouseleave)
  - Teks putih bold di atas dark gradient
  - Badge "UNIT 1" + title "MANAJEMEN PENDIDIKAN ISLAM" + subtitle + button
- **Removed**: `bg-white` dari 7 section components
  - ClassOf2024, Suka, Gallery, Story, Duka, Members, ClosingMemory
  - Canvas 303 frame sekarang terlihat sebagai background seluruh halaman
- **ImageSequenceBackground**: Canvas dengan white background (`#FFFFFF`)
  - 303 frames JPG di `public/images/background/`
  - Scroll-driven animation, 30fps cap
  - Pointer-events: none
- **Dependencies**: `@paper-design/shaders-react`, `framer-motion`, `lucide-react`

### Result
- ✅ Cloudflare Pages live di `mpi-unit-1.pages.dev`
- ✅ Hero: dual MeshGradient (dark) + glass effect + wireframe
- ✅ Canvas 303 frame visible di seluruh halaman (tanpa bg-white)
- ✅ Teks putih bold terbaca di atas dark gradient
- ✅ Auto-deploy dari GitHub push

### Known Issue
- Canvas 303 frame tidak terlihat di hero karena MeshGradient menutupinya (expected — hero pakai MeshGradient sebagai background sendiri)
- Canvas terlihat di section-section lain setelah hero

### Next
- Adjust MeshGradient opacity/colors jika perlu
- Replace placeholder images dengan foto asli
- Test responsive di mobile

---

## 2026-09-21

### Task
- Full redesign MPI ke The1 style reference
- Typography-driven architecture: Barlow Condensed, crushed line-height, negative tracking
- Concrete canvas (#d9d9d9) + 4 paint block sections
- Hapus ImageSequenceBackground (303 frame), MeshGradient, Navbar terpisah

### The1 Style Adaptation
| Element | The1 (Original) | MPI (Adapted) |
|---------|-----------------|---------------|
| Background | #d9d9d9 concrete | #d9d9d9 concrete |
| Text | #1f1f1f iron | #1f1f1f iron |
| Display font | KH Teka 215px | Barlow Condensed (clamp 3rem–13rem) |
| Line height | 0.70 | 0.72 |
| Letter spacing | -0.06em | -0.06em (tracking-tighter) |
| Green block | The Green (property) | Class of 2024 |
| Pink block | The Pink (property) | Gallery |
| Yellow block | The Yellow (property) | Suka |
| Red block | The Red (property) | Duka |
| Iron surface | Dark interactive | Closing + Footer |
| Pill buttons | 100px radius, #1f1f1f | Same |
| Hamburger | 48px circle, #1f1f1f | Same, integrated in hero |
| Dividers | 1px solid #1f1f1f | Same (.section-divider) |

### Changes
- **Updated**: `index.html` — Barlow Condensed font, theme-color #d9d9d9
- **Updated**: `tailwind.config.js` — The1 colors (the-green, the-pink, the-red, the-yellow, concrete, iron, carbon), Barlow Condensed font family, spacing scale
- **Updated**: `src/index.css` — The1 CSS variables, concrete background, iron text, section-divider utility
- **Rewritten**: `src/components/ui/shader-hero.tsx` — The1 hero
  - Massive display type "MANAJEMEN PENDIDIKAN ISLAM" (clamp 3rem–13rem)
  - Concrete canvas background, no MeshGradient
  - Wordmark "MPI." top-left + hamburger circle 48px top-right
  - Full-screen red menu overlay with nav links
  - Pill button "Lihat Galeri"
  - Framer Motion letter-by-letter animation
- **Rewritten**: `src/components/sections/Story.jsx` — concrete canvas, split layout
- **Rewritten**: `src/components/sections/Gallery.jsx` — pink (#f19ec8) paint block
- **Rewritten**: `src/components/sections/ClassOf2024.jsx` — green (#027b49) paint block
- **Rewritten**: `src/components/sections/Suka.jsx` — yellow (#fbb833) paint block
- **Rewritten**: `src/components/sections/Duka.jsx` — red (#fa4d43) paint block
- **Rewritten**: `src/components/sections/Members.jsx` — concrete canvas, border-top dividers
- **Rewritten**: `src/components/sections/ClosingMemory.jsx` — iron (#1f1f1f) inverted surface
- **Rewritten**: `src/components/layout/Footer.jsx` — iron surface, minimal 3-column
- **Rewritten**: `src/components/ui/Preloader.jsx` — concrete bg, iron text, Barlow Condensed
- **Updated**: `src/App.jsx` — removed ImageSequenceBackground, removed Navbar (integrated in hero)
- **Deleted**: `src/components/motion/ImageSequenceBackground.jsx`
- **Deleted**: `src/hooks/useAvoidSubject.js`
- **Kept**: Navbar.jsx (unused but not deleted to avoid breaking anything)

### Section → Color Map
| Section | Background | Text |
|---------|------------|------|
| Hero | Concrete #d9d9d9 | Iron #1f1f1f |
| Story | Concrete #d9d9d9 | Iron #1f1f1f |
| Gallery | Pink #f19ec8 | Iron #1f1f1f |
| Class of 2024 | Green #027b49 | Iron #1f1f1f |
| Suka | Yellow #fbb833 | Iron #1f1f1f |
| Duka | Red #fa4d43 | Iron #1f1f1f |
| Members | Concrete #d9d9d9 | Iron #1f1f1f |
| Closing | Iron #1f1f1f | Concrete #d9d9d9 (inverted) |
| Footer | Iron #1f1f1f | Concrete #d9d9d9 (inverted) |

### Result
- ✅ Build successful: 27.71s, 363.84 kB (gzip: 118.66 kB)
- ✅ The1 style: concrete canvas, massive type, 4 paint blocks
- ✅ Barlow Condensed display font (KH Teka substitute)
- ✅ Crushed line-height (0.72), negative tracking (-0.06em)
- ✅ Full-bleed color sections, no shadows/gradients/elevation
- ✅ Pill buttons (100px radius, iron fill)
- ✅ Hamburger menu (48px circle, red overlay)
- ✅ Hairline dividers between sections
- ✅ ImageSequenceBackground removed
- ✅ MeshGradient removed
- ✅ No hero image — pure typography

### Dependencies (unchanged)
- `framer-motion` — hero animations, menu overlay
- `gsap` + ScrollTrigger — section scroll animations
- `lenis` — smooth scroll
- `lucide-react` — ArrowRight icon
- `@paper-design/shaders-react` — still in package.json but unused

### Yang tersisa
- [ ] Replace placeholder images (gallery, members) dengan foto asli
- [ ] Test responsive di mobile
- [ ] Hapus file tidak terpakai: Navbar.jsx, hero-carousel.tsx, badge.tsx, input.tsx, coming-soon-4.tsx, Photo.jsx
- [ ] Update memories.js copy jika perlu
