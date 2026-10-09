export const CONTENT_SCHEMA = [
  {
    pageId: "home",
    pageName: "Homepage",
    sections: [
      {
        id: "seo",
        title: "SEO Metadata",
        fields: [
          { key: "meta_title", label: "Meta Title", type: "text", default: "MU-LA Collagen 5000mg - Premium Sugar Free" },
          { key: "meta_description", label: "Meta Description", type: "textarea", default: "Dapatkan kulit cerah dan sehat dengan MU-LA Collagen 5000mg. Bebas gula dengan rasa Orange Honey yang nikmat." },
        ]
      },
      {
        id: "hero",
        title: "Hero Section",
        fields: [
          { key: "image", label: "Gambar Banner", type: "text", default: "/banner-hero.jpg" },
          { key: "title", label: "Headline Utama", type: "text", default: 'Daily Collagen, Dibuat untuk Dinikmati <span class="highlight">Setiap Hari.</span>' },
          { key: "subtitle", label: "Deskripsi (Sub-headline)", type: "textarea", default: "MU-LA Collagen 5000 mg dengan rasa Orange Honey yang menyegarkan dan bebas gula." },
          { key: "running_text", label: "Running Text (Bawah Hero)", type: "text", default: "Experience Premium Beauty, and Wellness Solutions with MU.LA" },
        ]
      },
      {
        id: "product_showcase",
        title: "Product Showcase",
        fields: [
          { key: "title", label: "Judul Section", type: "text", default: "Satu Solusi untuk Kulit Cerah & Sehat" },
          { key: "name", label: "Nama Produk", type: "text", default: "MU-LA Collagen Drink" },
          { key: "price", label: "Harga", type: "text", default: "Rp 99.000 / Box" },
          { key: "desc", label: "Deskripsi Singkat", type: "textarea", default: "Minuman kolagen premium yang diformulasikan khusus untuk wanita aktif. Mengandung 5000mg Marine Collagen Peptide yang mudah diserap tubuh." },
        ]
      },
      {
        id: "why",
        title: "Mengapa MU-LA (Why Us)",
        fields: [
          { key: "title", label: "Judul Section", type: "text", default: "Mengapa Memilih MU-LA?" },
          { key: "reason1_title", label: "Alasan 1 (Judul)", type: "text", default: "5000mg Collagen" },
          { key: "reason1_desc", label: "Alasan 1 (Deskripsi)", type: "textarea", default: "Dosis optimal harian untuk hasil yang nyata pada kulit, rambut, dan kuku." },
          { key: "reason2_title", label: "Alasan 2 (Judul)", type: "text", default: "0% Sugar" },
          { key: "reason2_desc", label: "Alasan 2 (Deskripsi)", type: "textarea", default: "Manis alami dari ekstrak daun Stevia. Nol kalori gula, aman untuk diet." },
          { key: "reason3_title", label: "Alasan 3 (Judul)", type: "text", default: "Orange Honey" },
          { key: "reason3_desc", label: "Alasan 3 (Deskripsi)", type: "textarea", default: "Bebas rasa amis! Kesegaran jeruk berpadu dengan kelembutan madu." },
          { key: "reason4_title", label: "Alasan 4 (Judul)", type: "text", default: "Harga Terjangkau" },
          { key: "reason4_desc", label: "Alasan 4 (Deskripsi)", type: "textarea", default: "Kualitas premium tidak harus mahal. Didesain untuk konsumsi harian." },
        ]
      },
      {
        id: "ingredients",
        title: "Ingredients (Bahan Baku)",
        fields: [
          { key: "title", label: "Judul Section", type: "text", default: "Bahan baku premium yang terukur. Tanpa bahan pengisi (filler)." },
          { key: "subtitle", label: "Deskripsi", type: "textarea", default: "Kami transparan dengan apa yang masuk ke tubuh Anda." },
        ]
      }
    ]
  },
  {
    pageId: "tentang",
    pageName: "Tentang Kami",
    sections: [
      {
        id: "seo",
        title: "SEO Metadata",
        fields: [
          { key: "meta_title", label: "Meta Title", type: "text", default: "Tentang Kami | MU-LA Collagen" },
          { key: "meta_description", label: "Meta Description", type: "textarea", default: "Pelajari lebih lanjut tentang misi MU-LA dalam menghadirkan minuman kolagen premium yang terjangkau untuk wanita Indonesia." },
        ]
      },
      {
        id: "hero",
        title: "Hero Section",
        fields: [
          { key: "title", label: "Judul Utama", type: "text", default: "Tentang MU-LA" },
          { key: "subtitle", label: "Deskripsi", type: "textarea", default: "Lebih dari sekadar minuman kolagen. Kami hadir untuk merevolusi rutinitas perawatan diri harian wanita Indonesia menjadi lebih sehat, transparan, dan nikmat." },
        ]
      },
      {
        id: "story",
        title: "Cerita Kami (Our Story)",
        fields: [
          { key: "title", label: "Judul Cerita", type: "text", default: "Berawal dari Kebutuhan Nyata" },
          { key: "para1", label: "Paragraf 1", type: "textarea", default: "Banyak wanita menyadari pentingnya asupan kolagen untuk menjaga elastisitas kulit dan kesehatan tubuh seiring bertambahnya usia. Namun, menemukan minuman kolagen yang benar-benar berkualitas tidaklah mudah." },
          { key: "para2", label: "Paragraf 2", type: "textarea", default: "Sebagian besar produk di pasaran memiliki kandungan gula yang sangat tinggi, rasanya amis, atau harganya tidak terjangkau untuk konsumsi harian. Berangkat dari masalah inilah MU-LA lahir." },
          { key: "para3", label: "Paragraf 3", type: "textarea", default: "Kami berkomitmen memformulasikan minuman kolagen yang jujur: 5000mg kolagen murni, bebas gula pasir (Sugar Free) menggunakan pemanis alami Stevia, serta rasa Orange Honey yang sangat menyegarkan." },
        ]
      }
    ]
  },
  {
    pageId: "kontak",
    pageName: "Kontak Kami",
    sections: [
      {
        id: "seo",
        title: "SEO Metadata",
        fields: [
          { key: "meta_title", label: "Meta Title", type: "text", default: "Hubungi Kami | MU-LA Collagen" },
          { key: "meta_description", label: "Meta Description", type: "textarea", default: "Punya pertanyaan seputar produk atau kemitraan MU-LA? Hubungi tim kami sekarang." },
        ]
      },
      {
        id: "hero",
        title: "Hero Section",
        fields: [
          { key: "title", label: "Judul Utama", type: "text", default: "Hubungi Kami" },
          { key: "subtitle", label: "Deskripsi", type: "textarea", default: "Punya pertanyaan seputar produk, kemitraan, atau ingin memberikan kritik dan saran? Tim MU-LA siap membantu Anda." },
        ]
      },
      {
        id: "info",
        title: "Informasi Detail",
        fields: [
          { key: "address", label: "Alamat Kantor", type: "textarea", default: "Gedung Perkantoran Sudirman, Lt. 8\nJl. Jend. Sudirman No.Kav 10-11, Jakarta Pusat\nDKI Jakarta 10220" },
          { key: "email", label: "Email Resmi", type: "text", default: "hello@mu-la.id" },
          { key: "phone", label: "Nomor WhatsApp", type: "text", default: "+62 896-3751-4407" },
          { key: "hours", label: "Jam Operasional", type: "textarea", default: "Senin - Jumat: 09.00 - 17.00 WIB\nSabtu: 09.00 - 13.00 WIB\nMinggu & Hari Libur Nasional: Tutup" },
          { key: "maps_url", label: "URL Embed Google Maps", type: "textarea", default: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24072847065!2d106.74100695026919!3d-6.229746535564024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x100c5e82dd4b820!2sJakarta%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" },
        ]
      }
    ]
  },
  {
    pageId: "global",
    pageName: "Pengaturan Global (Semua Halaman)",
    sections: [
      {
        id: "branding",
        title: "Branding Utama",
        fields: [
          { key: "logo", label: "Logo URL / Path", type: "text", default: "/logo.jpg" },
        ]
      },
      {
        id: "footer",
        title: "Footer & Copyright",
        fields: [
          { key: "about", label: "Deskripsi Singkat Footer", type: "textarea", default: "Daily Collagen Drink dengan 5000mg kolagen, bebas gula, dan rasa Orange Honey yang menyegarkan. Dirancang untuk menemani rutinitas perawatan diri Anda setiap hari." },
          { key: "copyright", label: "Teks Hak Cipta", type: "text", default: "© 2026 MU-LA Indonesia. All rights reserved." },
          { key: "disclaimer", label: "Disclaimer", type: "textarea", default: "Informasi di website ini bersifat edukatif dan bukan pengganti saran medis profesional. Hasil dapat bervariasi pada setiap individu." },
        ]
      },
      {
        id: "social",
        title: "Sosial Media (Icon Footer)",
        fields: [
          { key: "whatsapp", label: "Link WhatsApp", type: "text", default: "https://wa.me/6289637514407" },
          { key: "instagram", label: "Link Instagram", type: "text", default: "https://instagram.com/mula.collagen" },
          { key: "facebook", label: "Link Facebook", type: "text", default: "https://facebook.com/mula.collagen" },
          { key: "tiktok", label: "Link TikTok", type: "text", default: "https://tiktok.com/@mula.collagen" },
        ]
      },
      {
        id: "mobile_nav",
        title: "Navigasi Bawah Mobile (App-Like Bottom Bar)",
        fields: [
          { key: "whatsapp_number", label: "Nomor WhatsApp Admin (contoh: 6289637514407)", type: "text", default: "6289637514407" },
          { key: "whatsapp_message", label: "Template Pesan WhatsApp Pengunjung (Umum / Beranda)", type: "textarea", default: "Halo Admin MU-LA, saya pengunjung dari website dan ingin menanyakan informasi seputar produk MU-LA Collagen." },
          { key: "whatsapp_reseller_message", label: "Template Pesan WhatsApp Khusus (Halaman Reseller)", type: "textarea", default: "Halo Admin MU-LA, saya sedang di halaman Reseller dan berminat untuk bergabung menjadi mitra/reseller MU-LA. Boleh minta info syarat & paketnya?" },
          { key: "home_label", label: "Label Menu 1 (Home)", type: "text", default: "Home" },
          { key: "home_url", label: "Link Menu 1", type: "text", default: "/" },
          { key: "tentang_label", label: "Label Menu 2 (Tentang)", type: "text", default: "Tentang" },
          { key: "tentang_url", label: "Link Menu 2", type: "text", default: "/tentang" },
          { key: "reseller_label", label: "Label Menu 3 (Reseller)", type: "text", default: "Reseller" },
          { key: "reseller_url", label: "Link Menu 3", type: "text", default: "/reseller" },
          { key: "whatsapp_label", label: "Label Menu 4 (WhatsApp)", type: "text", default: "WhatsApp" },
        ]
      }
    ]
  }
];
