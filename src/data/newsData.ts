import { MediaArticle, ArticleComment } from '../types';

export const INITIAL_ARTICLES: MediaArticle[] = [
  {
    id: 'art-1',
    title: 'Transformasi Koridor Logistik Kereta Api dan Dampak Ekonomi Antar-Kota',
    slug: 'transformasi-koridor-logistik-kereta-api',
    subtitle: 'Peningkatan kapasitas jalur ganda dan elektrifikasi memangkas biaya distribusi bahan pokok hingga 22 persen.',
    summary: 'Proyek revitalisasi jaringan rel antarmoda di Pulau Jawa mulai menunjukkan dampak nyata pada efisiensi rantai pasok pangan dan manufaktur antar-provinsi.',
    content: [
      'Pemerintah bersama konsorsium perkeretaapian nasional resmi mengoperasikan koridor angkutan kargo terintegrasi yang menghubungkan pelabuhan-pelabuhan utama dengan sentra industri hinterland. Kebijakan ini diharapkan secara bertahap mengurangi beban tonase jalan raya nasional yang selama ini memicu kemacetan dan biaya pemeliharaan tinggi.',
      'Menurut laporan resmi Kementerian Perhubungan, perpindahan 30 persen armada angkutan logistik dari truk kontainer ke moda kereta api berhasil menekan emisi karbon logistik darat secara signifikan sekaligus memangkas waktu tempuh pengiriman barang dari pelabuhan ke kawasan industri hingga 14 jam.',
      '"Kami melihat efisiensi tidak hanya pada penghematan bahan bakar, melainkan ketepatan waktu pengiriman yang jauh lebih konsisten. Hal ini memberikan kepastian pasokan bagi pabrik dan pasar tradisional," ungkap Kepala Pusat Studi Logistik Transportasi dalam taklimat media.',
      'Fase berikutnya dari program ini akan mencakup integrasi sistem pelacakan kontainer berbasis IoT di stasiun-stasiun barang strategis serta penyediaan fasilitas pendingin (cold chain) untuk produk hortikultura dan perikanan segar.',
      'Para pelaku usaha menyambut positif integrasi ini, sembari merekomendasikan penyesuaian tarif terminal handling di pelabuhan agar daya saing komoditas lokal tetap unggul di pasar domestik maupun regional.'
    ],
    category: 'Nasional',
    author: {
      name: 'Raden Bagus Prakoso',
      role: 'Redaktur Pelaksana Infrastruktur',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80'
    },
    publishedAt: '15 Menit yang lalu',
    readTimeMinutes: 5,
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Rangkaian kereta kargo melintasi jembatan penghubung logistik terpadu di jalur lintas utara.',
    isHeadline: true,
    isBreaking: true,
    isEditorsPick: true,
    viewsCount: 14820,
    likesCount: 842,
    audioLength: '4:15',
    keyPoints: [
      'Pemangkasan biaya distribusi bahan pokok dan logistik antarkota hingga 22 persen.',
      'Perpindahan muatan ke kereta api mengurangi emisi karbon darat dan keausan jalan raya.',
      'Rencana tahap dua mencakup fasilitas pendingin rel untuk distribusi hasil tani dan laut.'
    ],
    tags: ['Infrastruktur', 'Kereta Api', 'Logistik', 'Ekonomi Nasional']
  },
  {
    id: 'art-2',
    title: 'Peneliti Lokal Rancang Model Bahasa Terbuka untuk Konservasi 700+ Bahasa Daerah',
    slug: 'peneliti-lokal-model-bahasa-daerah',
    subtitle: 'Kolaborasi perguruan tinggi dan komunitas digital hasilkan korpus linguistik digital terlengkap di Asia Tenggara.',
    summary: 'Sebuah inisiatif riset independen menggabungkan kecerdasan buatan dengan rekaman tutur lisan tetua adat untuk mencegah kepunahan bahasa daerah.',
    content: [
      'Indonesia memiliki kekayaan lebih dari 718 bahasa daerah, namun puluhan di antaranya kini terancam punah karena berkurangnya penutur muda di era digitalisasi. Menanggapi tantangan ini, koalisi peneliti komputasi bahasa bersama pegiat budaya meluncurkan sistem linguistik terbuka.',
      'Proyek ini mendokumentasikan fonetik, tata bahasa, dan sastra lisan dari berbagai pelosok kepulauan, mulai dari rumpun Austronesia hingga Papua. Data tersebut kemudian diolah menjadi model representasi bahasa alami yang dapat digunakan pengembang aplikasi edukasi.',
      '"Tujuan utama kami bukan sekadar teknologi canggih, melainkan memastikan generasi masa depan tetap dapat berdialog, bernyanyi, dan menjaga kebijaksanaan lokal dalam bahasa ibu mereka," jelas salah satu pemimpin tim riset.',
      'Aplikasi percontohan telah diuji coba di 40 sekolah dasar kepulauan dengan modul kamus suara interaktif dan dongeng interaktif berbasis suara penutur asli.'
    ],
    category: 'Teknologi',
    author: {
      name: 'Anisa Dian Lestari',
      role: 'Jurnalis Teknologi & Sains',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80'
    },
    publishedAt: '42 Menit yang lalu',
    readTimeMinutes: 4,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Sesi dokumentasi fonetik bahasa tutur bersama penutur asli di laboratorium linguistik.',
    isHeadline: false,
    isBreaking: false,
    isEditorsPick: true,
    viewsCount: 9410,
    likesCount: 654,
    audioLength: '3:30',
    keyPoints: [
      'Lebih dari 700 bahasa daerah mulai dipetakan ke korpus digital terbuka.',
      'Menggabungkan rekaman lisan otentik dengan model pemrosesan bahasa alami.',
      'Uji coba percontohan sudah berjalan di puluhan institusi pendidikan dasar.'
    ],
    tags: ['Teknologi AI', 'Budaya', 'Edukasi', 'Riset']
  },
  {
    id: 'art-3',
    title: 'Ketahanan Pangan Nabati dan Rekor Ekspor Kopi Berkelanjutan Petani Hutan',
    slug: 'ketahanan-pangan-dan-kopi-berkelanjutan',
    subtitle: 'Sertifikasi agroforestri mengangkat nilai jual biji kopi spesialti di pasar Eropa dan Asia Timur.',
    summary: 'Kelompok tani di perbukitan Sumatra dan Flores berhasil membuktikan bahwa pelestarian kanopi hutan lindung berbanding lurus dengan kualitas aroma kopi dunia.',
    content: [
      'Pola budidaya agroforestri yang mengintegrasikan tanaman kopi di bawah naungan pohon rindang hutan lindung terbukti melipatgandakan penghasilan petani kecil. Pendekatan ini tidak merusak tegakan hutan, melainkan memperkaya humus tanah secara alami.',
      'Berdasarkan data asosiasi eksportir, permintaan kopi dengan sertifikasi bebas deforestasi tumbuh pesat hingga 40% tahun ini. Konsumen global bersedia membayar harga premium untuk komoditas yang jelas asal-usul ketertelusurannya (traceability).',
      '"Dahulu petani dianggap ancaman bagi kawasan hutan. Sekarang, petani adalah penjaga paling setia karena kesejahteraan mereka bertumpu pada keasrian ekosistem," tutur koordinator serikat petani binaan.'
    ],
    category: 'Ekonomi',
    author: {
      name: 'Dimas Wicaksono',
      role: 'Spesialis Ekonomi & Agribisnis',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80'
    },
    publishedAt: '1 Jam yang lalu',
    readTimeMinutes: 3,
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Petani memilah biji kopi merah hasil panen sistem tumpang sari di bawah naungan hutan kanopi.',
    isHeadline: false,
    isBreaking: false,
    isEditorsPick: false,
    viewsCount: 6120,
    likesCount: 390,
    audioLength: '2:50',
    keyPoints: [
      'Sistem agroforestri terbukti meningkatkan kualitas cita rasa kopi spesialti.',
      'Permintaan kopi bersertifikasi ramah lingkungan meningkat signifikan di mancanegara.',
      'Kesejahteraan petani lokal naik seiring kemitraan langsung dengan pemanggang artisan.'
    ],
    tags: ['Pertanian', 'Ekonomi Hijau', 'Kopi Nusantara', 'Ekspor']
  },
  {
    id: 'art-4',
    title: 'Generasi Baru Tenun Sumba: Mengawinkan Indigo Alami dengan Mode Ramah Lingkungan',
    slug: 'generasi-baru-tenun-sumba-indigo-alami',
    subtitle: 'Para penenun muda mendokumentasikan resep warna daun tarum dan akar mengkudu secara digital.',
    summary: 'Pewarnaan kain tradisional berbasis tanaman liar kini menjadi primadona panggung mode global berkat keaslian proses dan nol limbah kimia.',
    content: [
      'Di desa-desa Sumba Timur, aroma fermentasi daun indigo meruap di antara derit alat tenun kayu tradisional. Para perajin muda kini mengadopsi kembali formula leluhur yang sempat tersisih oleh pewarna sintetis pada dekade lalu.',
      'Keunggulan pewarna alami tidak hanya pada keamanan lingkungan dan kulit pemakai, melainkan karakter warna yang semakin hidup seiring bertambahnya usia kain. Setiap lembar kain membutuhkan waktu pengerjaan 3 hingga 8 bulan.',
      'Kini, kain-kain tersebut tampil di pekan mode Milan dan Tokyo dengan narasi keberlanjutan yang kuat, dipesan oleh rumah mode internasional dengan prinsip perdagangan berkeadilan (fair trade).'
    ],
    category: 'Gaya Hidup',
    author: {
      name: 'Maya Citra Anggraini',
      role: 'Editor Seni & Gaya Hidup',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80'
    },
    publishedAt: '2 Jam yang lalu',
    readTimeMinutes: 4,
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Penenun sedang menyusun benang lungsi bermotif flora fauna khas padang sabana Sumba.',
    isHeadline: false,
    isBreaking: false,
    isEditorsPick: true,
    viewsCount: 7890,
    likesCount: 512,
    audioLength: '3:10',
    keyPoints: [
      'Pewarna alami dari akar dan dedaunan menggantikan bahan kimia sintetis secara menyeluruh.',
      'Karya tenun lokal mendapat apresiasi panggung internasional dengan skema perdagangan adil.',
      'Dokumentasi resep tradisi kini disimpan dalam format arsip video dan ensiklopedia terbuka.'
    ],
    tags: ['Mode Berkelanjutan', 'Tenun Ikat', 'Seni Tradisi', 'Gaya Hidup']
  },
  {
    id: 'art-5',
    title: 'Regenerasi Atlet Muda dan Lonjakan Prestasi Bulutangkis di Turnamen Super Series',
    slug: 'regenerasi-atlet-muda-bulutangkis',
    subtitle: 'Penerapan ilmu olahraga (sports science) dan analisa data video percepat kematangan mental atlet junior.',
    summary: 'Pasangan ganda campuran remaja binaan pelatnas mencatat kejutan dengan menembus babak final turnamen dunia setelah menumbangkan unggulan.',
    content: [
      'Transformasi pembinaan olahraga di tanah air mulai memetik buah manis. Dengan mengintegrasikan biomekanika gerak, analisa nutrisi presisi, dan psikologi tanding, atlet-atlet belia mampu bersaing dengan pemain papan atas dunia.',
      'Dalam pertandingan perempat final yang mendebarkan selama 78 menit, stamina dan ketenangan pemain muda menjadi penentu kemenangan dramatis atas pasangan peringkat tiga dunia.',
      '"Fasilitas pemulihan cryotherapy dan evaluasi taktik berbasis video membuat kami belajar lebih cepat dari kesalahan sebelumnya," kata sang atlet dalam sesi jumpa pers usai laga.'
    ],
    category: 'Olahraga',
    author: {
      name: 'Fauzi Hidayat',
      role: 'Wartawan Olahraga Utama',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80'
    },
    publishedAt: '3 Jam yang lalu',
    readTimeMinutes: 3,
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Aksi smash tajam pemain muda saat berlatih intensif di pusat latihan nasional.',
    isHeadline: false,
    isBreaking: true,
    isEditorsPick: false,
    viewsCount: 11200,
    likesCount: 920,
    audioLength: '2:40',
    keyPoints: [
      'Sports science dan analisa video menjadi pilar utama peningkatan performa atlet muda.',
      'Dua pasangan ganda junior berhasil mengamankan tiket menuju kejuaraan bergengsi.',
      'Fasilitas pemulihan modern mempercepat adaptasi fisik menghadapi jadwal turnamen padat.'
    ],
    tags: ['Bulutangkis', 'Olahraga', 'Sports Science', 'Prestasi']
  },
  {
    id: 'art-6',
    title: 'Opini: Membangun Etika Ruang Digital dan Menjaga Kewarasan Warga Net',
    slug: 'opini-etika-ruang-digital-kewarasan-publik',
    subtitle: 'Algoritma keterlibatan tinggi (engagement bait) tidak boleh mengorbankan kohesi sosial dan kesehatan mental generasi muda.',
    summary: 'Sebuah refleksi mendalam mengenai tanggung jawab platform media sosial dan perlunya literasi kritis di tengah banjir disinformasi hiper-personal.',
    content: [
      'Ketika setiap detik perhatian manusia dikomodifikasi oleh mesin pemberi rekomendasi, ruang publik kita kerap dipenuhi polarisasi yang dipicu secara artifisial. Kita cenderung disuguhi konten yang memantik amarah ketimbang yang mengajak berpikir jernih.',
      'Demokrasi digital yang sehat membutuhkan warga yang memiliki ketahanan informasi: kemampuan untuk menunda reaksi, memverifikasi sumber, dan menimbang konteks sebelum menekan tombol sebarkan.',
      'Sudah saatnya kurikulum sekolah dan inisiatif komunitas memprioritaskan "kebersihan informasi" (information hygiene). Kebebasan berekspresi harus berjalan beriringan dengan etika kemanusiaan agar ruang maya tetap menjadi tempat tumbuhnya ide-ide peradaban.'
    ],
    category: 'Opini',
    author: {
      name: 'Prof. Dr. Hendra Sujatmo',
      role: 'Pemerhati Media & Komunikasi Publik',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80'
    },
    publishedAt: '4 Jam yang lalu',
    readTimeMinutes: 4,
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Ruang kerja digital dengan buku catatan dan konektivitas maya yang menuntut refleksi bijak.',
    isHeadline: false,
    isBreaking: false,
    isEditorsPick: true,
    viewsCount: 5430,
    likesCount: 710,
    audioLength: '3:40',
    keyPoints: [
      'Pentingnya literasi kritis menghadapi algoritma yang memprioritaskan sensasi.',
      'Information hygiene perlu diajarkan sebagai keterampilan dasar abad 21.',
      'Media arus utama bertanggung jawab menjadi jangkar fakta yang menenangkan.'
    ],
    tags: ['Opini Publik', 'Etika Digital', 'Literasi Media', 'Komunikasi']
  },
  {
    id: 'art-7',
    title: 'Inovasi Panas Bumi Cincin Api: Pembangkit Geotermal Biner Tekan Risiko Emisi Nol',
    slug: 'inovasi-panas-bumi-cincin-api',
    subtitle: 'Teknologi siklus biner memanfaatkan fluida bertemperatur sedang tanpa melepaskan uap asam ke atmosfer.',
    summary: 'Pusat penelitian energi terbarukan meresmikan pilot project PLTP biner yang memanfaatkan sisa panas bumi untuk pasokan listrik pedesaan mandiri.',
    content: [
      'Potensi panas bumi kepulauan kita termasuk salah satu yang terbesar di dunia. Namun, tantangan eksplorasi konvensional sering kali terkendala suhu fluida yang fluktuatif serta biaya pengeboran yang tinggi.',
      'Melalui teknologi siklus biner (binary cycle), air panas bumi bersuhu sedang dilewatkan melalui penukar panas untuk menguapkan cairan sekunder bertitik didih rendah. Uap inilah yang kemudian memutar turbin pembangkit dalam sistem tertutup rapat.',
      'Sistem tertutup ini menjamin tidak adanya pelepasan gas hidrogen sulfida ke udara sekitar, menjadikannya ramah bagi ekosistem perkebunan dan permukiman warga terdekat.'
    ],
    category: 'Lingkungan',
    author: {
      name: 'dr. Satria Nugroho, M.Sc',
      role: 'Peneliti Transisi Energi',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80'
    },
    publishedAt: '5 Jam yang lalu',
    readTimeMinutes: 5,
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Pemandangan lanskap turbin ramah lingkungan di lereng perbukitan vulkanik hijau.',
    isHeadline: false,
    isBreaking: false,
    isEditorsPick: false,
    viewsCount: 4320,
    likesCount: 310,
    audioLength: '4:00',
    keyPoints: [
      'Teknologi siklus biner memungkinkan pemanfaatan panas bumi bersuhu sedang.',
      'Sirkuit tertutup mencegah emisi uap gas berbahaya ke atmosfer lingkungan.',
      'Daya listrik bersih disalurkan langsung ke jaringan mikro desa agrowisata.'
    ],
    tags: ['Energi Terbarukan', 'Geotermal', 'Lingkungan Hidup', 'Sains']
  }
];

export const INITIAL_COMMENTS: ArticleComment[] = [
  {
    id: 'c-1',
    articleId: 'art-1',
    authorName: 'Suryo Wibowo',
    commentText: 'Langkah tepat sekali. Muatan truk yang kelebihan muatan (ODOL) selama ini sangat merusak aspal Pantura dan membahayakan pengendara lain. Kereta logistik adalah solusi jangka panjang terbaik.',
    timestamp: '20 Menit yang lalu',
    likes: 24,
    userLiked: false
  },
  {
    id: 'c-2',
    articleId: 'art-1',
    authorName: 'Dewi Kartika',
    commentText: 'Semoga segera diperluas ke lintas selatan Jawa dan jalur Sumatera. Efisiensi logistik akan menekan harga sembako di pasar.',
    timestamp: '15 Menit yang lalu',
    likes: 12,
    userLiked: true
  },
  {
    id: 'c-3',
    articleId: 'art-2',
    authorName: 'Bima Sakti Pratama',
    commentText: 'Inisiatif luar biasa! Bahasa daerah adalah kekayaan identitas tak ternilai. Memadukan AI dengan penutur adat membuktikan teknologi bisa melestarikan kearifan lokal.',
    timestamp: '30 Menit yang lalu',
    likes: 45,
    userLiked: false
  }
];

export const BREAKING_NEWS_ITEMS = [
  'Jalur ganda angkutan barang lintas Jawa resmi beroperasi penuh hari ini',
  'Tim peneliti umumkan model AI untuk 700+ bahasa daerah dengan akurasi fonetik 94%',
  'Ekspor komoditas kopi binaan agroforestri tembus rekor nilai transaksi tertinggi',
  'Ganda putra muda amankan tiket babak final turnamen bulutangkis internasional',
  'Prakiraan cuaca: Sebagian besar wilayah kota besar berawan hingga hujan ringan sore nanti'
];
