/**
 * Gallery data — single source of truth.
 * Pure gallery tanpa categories.
 *
 * Schema:
 *   id        — unique key
 *   src       — image path
 *   alt       — alt text (a11y)
 *   span      — "tall" | "wide" | "square" | "auto" (controls masonry layout)
 *   caption   — optional caption shown on hover
 */

export const gallery = [
  { 
    id: 'g01', 
    src: '/images/gallery/1.jpg', 
    alt: 'Kenangan mahasiswa 01', 
    span: 'wide', 
    caption: 'Momen bersama' 
  },
  { 
    id: 'g02', 
    src: '/images/gallery/2.jpg', 
    alt: 'Kenangan mahasiswa 02', 
    span: 'tall', 
    caption: 'Kenangan manis' 
  },
  { 
    id: 'g03', 
    src: '/images/gallery/3.jpg', 
    alt: 'Kenangan mahasiswa 03', 
    span: 'square', 
    caption: 'Saat bersamamu' 
  },
  { 
    id: 'g04', 
    src: '/images/gallery/4.jpg', 
    alt: 'Kenangan mahasiswa 04', 
    span: 'auto', 
    caption: 'Teman seperjuangan' 
  },
  { 
    id: 'g05', 
    src: '/images/gallery/5.jpg', 
    alt: 'Kenangan mahasiswa 05', 
    span: 'wide', 
    caption: 'Cerita kita' 
  },
  { 
    id: 'g06', 
    src: '/images/gallery/6.jpg', 
    alt: 'Kenangan mahasiswa 06', 
    span: 'tall', 
    caption: 'Jejak langkah' 
  },
  { 
    id: 'g07', 
    src: '/images/gallery/7.jpg', 
    alt: 'Kenangan mahasiswa 07', 
    span: 'square', 
    caption: 'Waktu berharga' 
  },
  { 
    id: 'g08', 
    src: '/images/gallery/8.jpg', 
    alt: 'Kenangan mahasiswa 08', 
    span: 'auto', 
    caption: 'Momen tak terlupakan' 
  },
  { 
    id: 'g09', 
    src: '/images/gallery/9.jpg', 
    alt: 'Kenangan mahasiswa 09', 
    span: 'wide', 
    caption: 'Akhir yang indah' 
  },
];
