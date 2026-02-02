# 🎓 Asisten Guru AI

**Aplikasi Cerdas Pembuat Administrasi Pembelajaran Otomatis** *Dikembangkan khusus untuk UPTD SDN Rawabuntu 03*

![Status](https://img.shields.io/badge/Status-Active-success)
![Version](https://img.shields.io/badge/Version-1.0-blue)
![Developer](https://img.shields.io/badge/Developer-Rendi%20Rahadian%2C%20S.Pd-orange)

## 📖 Tentang Aplikasi

**Asisten Guru AI** adalah aplikasi berbasis web yang memanfaatkan kecerdasan buatan (Artificial Intelligence) untuk membantu guru dalam menyusun perangkat ajar secara instan, efisien, dan terstruktur. Aplikasi ini dirancang untuk meringankan beban administrasi guru sehingga dapat lebih fokus pada proses pembelajaran di kelas.

Aplikasi ini memiliki sistem **Multi-Role** (Guru & Kepala Sekolah) dan penyimpanan data lokal yang aman.

---

## ✨ Fitur Unggulan

### 👨‍🏫 Fitur Guru
1.  **Generator Modul Ajar Otomatis**: Membuat RPP/Modul Ajar lengkap dengan tujuan, langkah-langkah, dan asesmen hanya dengan memasukkan topik.
2.  **Pembuatan ATP & LKPD**: Menyusun Alur Tujuan Pembelajaran dan Lembar Kerja Peserta Didik dalam hitungan detik.
3.  **Bank Soal AI**: Membuat soal Pilihan Ganda, Isian, dan Essay beserta kunci jawabannya secara otomatis.
4.  **Ekspor Dokumen**: Hasil generasi AI dapat langsung diunduh dalam format **Microsoft Word** (.doc) atau **PDF**.
5.  **Penyimpanan Lokal**: Data tersimpan otomatis di browser pengguna (LocalStorage).

### 👨‍💼 Fitur Kepala Sekolah
1.  **Monitoring Aktivitas**: Memantau guru yang telah membuat perangkat ajar.
2.  **Rekap Data**: Melihat rekapitulasi Modul Ajar dan Bank Soal yang telah dibuat oleh guru di sekolah.

---

## 🛠️ Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan teknologi web modern yang ringan dan cepat:

* **Frontend**: HTML5, CSS3 (Modern Glassmorphism UI).
* **Logic**: Vanilla JavaScript (ES6+).
* **Database**: LocalStorage (Client-side storage).
* **AI Integration**: Fetch API ke Cloudflare Worker (Menggunakan LLM Engine).
* **Library Pendukung**: 
    * `jspdf` (untuk cetak PDF).
    * `Google Fonts` (Typography).

---

## 🚀 Cara Menggunakan

1.  Buka Link Aplikasi: **[https://rendywenk-coder.github.io/ASISTEN-GURU-AI-RENDI-RAHADIAN/]**
2.  Semoga aplikasi ini bermanfaat besar untuk sekolah Bapak! Ada lagi yang bisa saya bantu?
    * Masukkan **Nama Lengkap & Gelar**.
    * Pastikan asal sekolah adalah **UPTD SDN Rawabuntu 03**.
    * Pilih peran: **Guru** atau **Kepala Sekolah**.
3.  **Dashboard Guru**:
    * Isi konfigurasi (Jenjang, Kelas, Mapel, Topik).
    * Klik tombol fitur yang diinginkan (misal: "Buat Modul Ajar").
    * Tunggu AI memproses, lalu edit atau simpan hasilnya.
4.  **Simpan/Download**:
    * Klik **Simpan** untuk memasukkan ke Bank Data Sekolah.
    * Klik **Download Word/PDF** untuk mencetak dokumen.

---

## 📂 Struktur Folder Proyek

```text
asisten-guru-ai/
│
├── 📂 assets/          # Menyimpan aset gambar (logo, icon)
├── 📂 css/             # File gaya (main.css)
├── 📂 js/              # Logika aplikasi (auth.js, main.js, ai.js, kepsek.js)
├── 📄 index.html       # Halaman Login Utama
├── 📄 dashboard.html   # Halaman Kerja Guru
├── 📄 kepsek.html      # Halaman Monitoring Kepala Sekolah
├── 📄 fitur-ai.html    # Halaman Chat Bebas dengan AI
└── 📄 README.md        # Dokumentasi Proyek