import { Project, Service } from './types';

export const COLORS = {
  primary: '#fa5c5c',
  secondary: '#fd8a6b',
  accent: '#fbef76',
  text: '#111111',
  bg: '#ffffff',
};

export const CONTACT_INFO = {
  email: 'tarmizilsm83@gmail.com',
  phone: '+6289644374314',
  whatsappUrl: 'https://wa.me/6289644374314',
};

export const SERVICES: Service[] = [
  {
    title: 'UI/UX Design',
    description: 'Research → wireframe → prototype → handoff. Fokus: usability, accessibility, dan efisiensi development.',
    outcomes: ['Interactive Prototypes', 'Design Systems', 'User Journey Maps'],
    icon: 'layout',
  },
  {
    title: 'Visual & Brand Design',
    description: 'Identitas visual, art direction, aset marketing.',
    outcomes: ['Brand Identity', 'Marketing Assets', 'Social Media Visuals'],
    icon: 'palette',
  },
  {
    title: 'Game Design & Prototyping',
    description: 'Gameplay loop, UX in-game, prototype Unity 2D.',
    outcomes: ['2D Unity Prototypes', 'Game Mechanics Design', 'In-Game UI'],
    icon: 'gamepad',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'zeocaf',
    title: 'Zeocaf — Movie Rating App',
    category: 'UI/UX Design',
    role: 'UI/UX Designer',
    tools: ['Figma', 'Photoshop'],
    shortDescription: 'Desain antarmuka dan prototipe untuk aplikasi rating film Indonesia; fokus discovery dan usability.',
    thumbnail: 'https://picsum.photos/seed/zeocaf/800/600',
    fullDescription: 'Zeocaf adalah aplikasi mobile yang didedikasikan untuk pecinta film Indonesia. Proyek ini bertujuan untuk memberikan platform yang mudah digunakan bagi pengguna untuk menemukan, menilai, dan mengulas film lokal.',
    background: 'Industri film Indonesia sedang berkembang pesat, namun platform rating film yang spesifik menonjolkan karya lokal masih minim. Pengguna sering kesulitan menemukan film Indonesia berkualitas di platform global.',
    problem: 'Pengguna merasa platform rating global terlalu umum dan kurang memberikan spotlight pada film indie atau film lokal Indonesia. Navigasi seringkali rumit untuk pengguna baru.',
    process: [
      'User Research: Wawancara dengan 5 penggemar film lokal.',
      'Wireframing: Membuat sketsa low-fidelity untuk alur discovery.',
      'Prototyping: High-fidelity design di Figma.',
      'Usability Testing: Menguji kemudahan pencarian film.'
    ],
    solution: 'Menciptakan antarmuka yang bersih dengan fokus pada poster film visual. Fitur "Local Spotlight" ditambahkan di halaman utama. Sistem rating dibuat sederhana dengan skala 1-10.',
    results: 'Meningkatkan engagement pada prototype sebesar 40% dibandingkan desain awal. Feedback positif pada kemudahan navigasi.',
    artifactLink: 'https://figma.com'
  },
  {
    id: 'sitagor',
    title: 'SITAGOR — Gov App',
    category: 'UI/UX Design',
    role: 'UI/UX Designer (Intern)',
    tools: ['Figma', 'Whimsical'],
    shortDescription: 'Mendesain dashboard dan alur data untuk manajemen tiga bidang pemerintahan.',
    thumbnail: 'https://picsum.photos/seed/sitagor/800/600',
    fullDescription: 'SITAGOR adalah aplikasi manajemen internal untuk instansi pemerintahan yang menangani data dari tiga bidang berbeda. Fokus utama adalah efisiensi input data dan keterbacaan laporan.',
    background: 'Proses manual menggunakan Excel sering menyebabkan duplikasi data dan keterlambatan pelaporan.',
    problem: 'Pegawai kesulitan memantau status dokumen antar bidang. UI sistem lama sangat kaku dan tidak responsif.',
    process: [
      'Analisis sistem lama.',
      'Redesign struktur informasi dashboard.',
      'Pembuatan komponen tabel data yang aksesibel.'
    ],
    solution: 'Dashboard terpusat dengan widget status real-time. Tabel data dilengkapi fitur filter dan sort yang canggih namun mudah digunakan.',
    results: 'Mempercepat waktu pencarian data hingga 50% berdasarkan simulasi task.',
  },
  {
    id: 'detective-card',
    title: 'Detective Card — Unity 2D',
    category: 'Game Dev',
    role: 'Game Designer & Developer',
    tools: ['Unity', 'C#', 'Photoshop'],
    shortDescription: 'Prototype core loop, UI in-game, dan sistem monetisasi awal untuk game kart detective.',
    thumbnail: 'https://picsum.photos/seed/unity/800/600',
    fullDescription: 'Sebuah game puzzle berbasis kartu di mana pemain berperan sebagai detektif yang memecahkan kasus dengan mencocokkan bukti.',
    background: 'Eksplorasi mekanik game mobile yang adiktif namun tetap mengasah otak.',
    problem: 'Menyeimbangkan tingkat kesulitan puzzle agar tidak terlalu mudah tapi juga tidak frustrasi.',
    process: [
      'Paper prototyping mekanik kartu.',
      'Implementasi core loop di Unity 2D.',
      'Polishing UI dan visual feedback.'
    ],
    solution: 'Sistem hint progresif dan UI yang memberikan feedback visual jelas saat bukti cocok.',
    results: 'Prototipe dimainkan oleh 20 tester dengan retensi hari pertama yang menjanjikan.',
  },
  {
    id: 'branding-project',
    title: 'Local Coffee Brand',
    category: 'Brand Design',
    role: 'Graphic Designer',
    tools: ['Illustrator', 'Photoshop'],
    shortDescription: 'Identitas visual lengkap untuk kedai kopi lokal di Lhokseumawe.',
    thumbnail: 'https://picsum.photos/seed/coffee/800/600',
    fullDescription: 'Pembuatan logo, palet warna, dan aset media sosial untuk meningkatkan brand awareness kedai kopi baru.',
  },
];