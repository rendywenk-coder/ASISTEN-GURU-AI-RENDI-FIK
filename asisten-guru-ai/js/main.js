import { db, auth } from './firebase-config.js';
import { ref, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Deklarasikan lastType di scope global
let lastType = "";

// --- FUNGSI LOAD INPUT OTOMATIS ---
(function loadInputs() {
    const savedInputs = JSON.parse(localStorage.getItem('savedInputs')) || {};
    for (const key in savedInputs) {
        const element = document.getElementById(key);
        if (element) element.value = savedInputs[key];
    }
})();

document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('change', function() {
        const inputs = {};
        document.querySelectorAll('input, select').forEach(input => {
            if (input.id) inputs[input.id] = input.value;
        });
        localStorage.setItem('savedInputs', JSON.stringify(inputs));
    });
});
// ------------------------------------

// API Panggil AI
async function panggilAI(promptTeks) {
    const outputArea = document.getElementById("hasilOutput");
    outputArea.value = "⏳ Sedang menyusun dokumen lengkap... Mohon tunggu 10-30 detik...";
    
    // Tampilkan progress indicator
    if (window.showProgress) {
        window.showProgress();
    }
    
    try {
        const response = await fetch("https://asisten-guru-ai.rendirahadian92.workers.dev/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: promptTeks })
        });
        const data = await response.json();
        const hasilTeks = data.choices?.[0]?.message?.content || "Maaf, AI tidak merespons. Coba lagi.";
        outputArea.value = hasilTeks;
        outputArea.style.height = "auto";
        outputArea.style.height = (outputArea.scrollHeight + 20) + "px";
        
        // Update status output
        const statusElement = document.getElementById('statusOutput');
        if (statusElement) {
            statusElement.textContent = "Dokumen selesai dibuat";
            statusElement.style.color = "#28a745";
        }
    } catch (error) {
        outputArea.value = "❌ Error: " + error.message;
        const statusElement = document.getElementById('statusOutput');
        if (statusElement) {
            statusElement.textContent = "Error membuat dokumen";
            statusElement.style.color = "#dc3545";
        }
    }
}

// ==========================================
// 1. BUAT MODUL AJAR (FUNGSI DIPERBAIKI)
// ==========================================
window.buatModulAI = function() {
    const jenjang = document.getElementById("jenjang").value;
    const kurikulum = document.getElementById("kurikulum").value;
    const mapel = document.getElementById("mapel").value;
    const kelas = document.getElementById("kelas").value;
    const topik = document.getElementById("topik").value;
    const waktu = document.getElementById("waktu").value;
    const metode = document.getElementById("metode").value;
    const media = document.getElementById("media").value;

    if(!mapel || !topik) { 
        alert("Mohon lengkapi Mapel dan Topik!"); 
        return; 
    }

    lastType = "Modul Ajar";
    function generateModul() {
    // ---------------------------------------------------------
    // 1. BAGIAN PENGAMBILAN DATA (INI YANG WAJIB ADA)
    // ---------------------------------------------------------
    
    // Pastikan ID ini sama dengan ID di HTML Bapak
    let mapel = document.getElementById("mapel").value;
    let jenjang = document.getElementById("jenjang").value;
    let kelas = document.getElementById("kelas").value;
    let topik = document.getElementById("topik").value;
    let metode = document.getElementById("metode").value;
    let media = document.getElementById("media").value;
    let waktu = document.getElementById("waktu").value;
    
    // BAGIAN KRUSIAL: Ambil nilai kurikulum
    let kurikulum = document.getElementById("kurikulum").value;

    // Debugging: Cek di Console browser apakah nilainya berubah saat dipilih
    console.log("Kurikulum yang dipilih: ", kurikulum);

    // ---------------------------------------------------------
    // 2. BAGIAN LOGIKA PROMPT (STRUKTUR LENGKAP BAPAK)
    // ---------------------------------------------------------
    
    let prompt; // Variabel kosong untuk menampung hasil

    // Cek kondisi berdasarkan nilai yang diambil tadi
    if (kurikulum === "Kurikulum Deep Learning") {
        prompt = `
        Bertindaklah sebagai Ahli Kurikulum Deep Learning dan Pembelajaran Profesional.
        Buatkan **MODUL AJAR / RPP LENGKAP BERBASIS DEEP LEARNING** dengan spesifikasi berikut:
        
        - **Jenjang:** ${jenjang}
        - **Kelas:** ${kelas}
        - **Mata Pelajaran:** ${mapel}
        - **Topik/Materi:** ${topik}
        - **Kurikulum:** DEEP LEARNING (Pembelajaran Mendalam)
        - **Metode Pembelajaran:** ${metode} (Integrasikan dengan prinsip Deep Learning)
        - **Media Ajar:** ${media}
        - **Alokasi Waktu:** ${waktu} Menit
        
        **PRINSIP DEEP LEARNING YANG HARUS TERINTEGRASI:**
        1. **INTEGRASI KOGNITIF & AFEKTIF**: Hubungkan pengetahuan dengan nilai, sikap, dan keterampilan hidup
        2. **KONSTRUKSI MAKNA**: Fokus pada pemahaman mendalam, bukan hafalan
        3. **PEMBELAJARAN KONTEKSTUAL**: Hubungkan materi dengan kehidupan nyata, masalah aktual, dan realitas sosial
        4. **REFLEKSI KRITIS**: Sediakan ruang untuk refleksi, evaluasi diri, dan transformasi pemikiran
        5. **KOLABORASI MENDALAM**: Kerja sama yang bermakna untuk menyelesaikan masalah kompleks
        6. **TRANSFER PEMBELAJARAN**: Menerapkan konsep ke situasi baru dan berbeda
        7. **METAKOGNISI**: Siswa menyadari dan mengontrol proses berpikir mereka sendiri
        
        **STRUKTUR MODUL DEEP LEARNING:**
        1. **IDENTITAS MODUL**: Nama Penyusun (Kosongkan titik-titik), Sekolah, Tahun, Jenjang, Kelas, Alokasi Waktu.
        2. **VISI PEMBELAJARAN DEEP LEARNING**: Pernyataan filosofis tentang pembelajaran mendalam
        3. **PROFIL PEMBELAJAR DEEP LEARNING**: Karakteristik siswa yang dikembangkan
        4. **TUJUAN PEMBELAJARAN DEEP LEARNING**: 
           - Tujuan Kognitif Mendalam (Pemahaman Konseptual)
           - Tujuan Afektif (Nilai dan Sikap)
           - Tujuan Psikomotorik (Keterampilan Kompleks)
           - Tujuan Transformasional (Perubahan Pola Pikir)
        5. **ESSENTIAL QUESTIONS**: Pertanyaan-pertanyaan filosofis yang memicu pemikiran mendalam
        6. **PEMETAAN KONSEP MENDALAM**: Jaringan konsep yang saling terhubung
        7. **KEGIATAN PEMBELAJARAN BERBASIS DEEP LEARNING**:
           - **Fase 1: Engaging (Menggugah)**: Aktivitas yang membangkitkan rasa ingin tahu dan konflik kognitif
           - **Fase 2: Exploring (Menjelajah)**: Investigasi mendalam, analisis kritis, eksplorasi multidimensi
           - **Fase 3: Explaining (Menjelaskan)**: Konstruksi makna, elaborasi konsep, pembentukan pemahaman
           - **Fase 4: Elaborating (Mengembangkan)**: Aplikasi kompleks, sintesis ide, kreasi solusi
           - **Fase 5: Evaluating (Mengevaluasi)**: Refleksi mendalam, evaluasi proses, transformasi pemikiran
        8. **ASESMEN DEEP LEARNING**:
           - Asesmen Formatif (Observasi Proses Berpikir)
           - Asesmen Performa (Proyek Kompleks)
           - Asesmen Reflektif (Jurnal Pembelajaran)
           - Asesmen Autentik (Portofolio Pemahaman)
           - Rubrik Berpikir Mendalam (Depth of Knowledge Level 3-4)
        9. **DIFERENSIASI DEEP LEARNING**: Penyesuaian untuk berbagai tingkat kedalaman pemahaman
        10. **INTEGRASI NILAI & KARAKTER**: Penguatan karakter melalui pembelajaran mendalam
        11. **MEDIA & SUMBER BELAJAR DEEP LEARNING**: Sumber yang memicu pemikiran kritis dan kreatif
        12. **LAMPIRAN**: 
            - Lembar Kerja Berpikir Mendalam
            - Rubrik Penilaian Deep Learning
            - Bahan Refleksi Siswa
            - Daftar Pertanyaan Pemantik
        13. **RENCANA TINDAK LANJUT**: Untuk pembelajaran berkelanjutan dan transfer pengetahuan
        
        **PEDOMAN KHUSUS:**
        - Hindari pembelajaran superfisial (permukaan)
        - Fokus pada pemahaman konseptual, bukan prosedural
        - Gunakan pertanyaan tingkat tinggi (HOTS)
        - Integrasikan berbagai perspektif dan disiplin ilmu
        - Kaitkan dengan isu-isu kontemporer dan relevan
        - Berikan kesempatan untuk konstruksi pengetahuan aktif
        
        Format output rapi dengan penomoran yang jelas, bahasa Indonesia formal pendidikan yang baku.
        `;
    
    } else if (kurikulum === "Kurikulum Merdeka") {
        prompt = `
        Bertindaklah sebagai Ahli Kurikulum Merdeka Profesional.
        Buatkan **MODUL AJAR / RPP LENGKAP KURIKULUM MERDEKA** dengan spesifikasi berikut:
        
        - **Jenjang:** ${jenjang}
        - **Kelas:** ${kelas}
        - **Mata Pelajaran:** ${mapel}
        - **Topik/Materi:** ${topik}
        - **Kurikulum:** KURIKULUM MERDEKA
        - **Metode Pembelajaran:** ${metode}
        - **Media Ajar:** ${media}
        - **Alokasi Waktu:** ${waktu} Menit
        
        **STRUKTUR WAJIB KURIKULUM MERDEKA:**
        1. **IDENTITAS MODUL**: Nama Penyusun, Sekolah, Tahun, Jenjang, Kelas, Alokasi Waktu.
        2. **KOMPETENSI AWAL & PROFIL PELAJAR PANCASILA**: Tentukan dimensi Profil Pelajar Pancasila yang dikembangkan
        3. **SARANA & PRASARANA**.
        4. **CAPAIAN PEMBELAJARAN (CP)**: Rumuskan dengan jelas sesuai fase
        5. **TUJUAN PEMBELAJARAN**: Rumuskan dengan format yang jelas dan terukur
        6. **PEMAHAMAN BERMAKNA**: Kaitan materi dengan kehidupan nyata
        7. **PERTANYAAN PEMANTIK**: Pertanyaan yang memicu rasa ingin tahu
        8. **KEGIATAN PEMBELAJARAN**:
           - Pendahuluan (Termasuk persepsi & motivasi)
           - Kegiatan Inti (Berpusat pada siswa, diferensiasi pembelajaran)
           - Penutup (Refleksi & Tindak Lanjut)
        9. **ASESMEN**:
           - Asesmen Diagnostik
           - Asesmen Formatif
           - Asesmen Sumatif
           - Rubrik Penilaian sesuai Profil Pelajar Pancasila
        10. **PENGAYAAN DAN REMEDIAL**: Diferensiasi untuk berbagai kemampuan siswa
        11. **REFLEKSI GURU DAN SISWA**
        12. **LAMPIRAN LKPD (LEMBAR KERJA PESERTA DIDIK)**
        13. **BAHAN BACAAN GURU & SISWA**
        14. **DAFTAR PUSTAKA**
        
        **FOKUS KURIKULUM MERDEKA:**
        - Berpusat pada siswa
        - Pembelajaran berdiferensiasi
        - Penguatan Profil Pelajar Pancasila
        - Pembelajaran kontekstual
        - Fleksibilitas bagi guru
        
        Gunakan bahasa Indonesia formal pendidikan yang baku. Format output rapi dengan penomoran yang jelas.
        `;
    
    } else if (kurikulum === "Kurikulum 2013" || kurikulum === "Kurikulum 2013 Revisi") {
        prompt = `
        Bertindaklah sebagai Ahli Kurikulum 2013 (K13) Profesional.
        Buatkan **MODUL AJAR / RPP LENGKAP KURIKULUM 2013** dengan spesifikasi berikut:
        
        - **Jenjang:** ${jenjang}
        - **Kelas:** ${kelas}
        - **Mata Pelajaran:** ${mapel}
        - **Topik/Materi:** ${topik}
        - **Kurikulum:** ${kurikulum}
        - **Metode Pembelajaran:** ${metode}
        - **Media Ajar:** ${media}
        - **Alokasi Waktu:** ${waktu} Menit
        
        **STRUKTUR WAJIB KURIKULUM 2013:**
        1. **IDENTITAS MODUL**: Nama Penyusun, Sekolah, Tahun, Jenjang, Kelas, Alokasi Waktu.
        2. **KOMPETENSI INTI (KI)**: KI-1 (Spiritual), KI-2 (Sosial), KI-3 (Pengetahuan), KI-4 (Keterampilan)
        3. **KOMPETENSI DASAR (KD)**: KD dari KI-3 dan KI-4
        4. **INDIKATOR PENCAPAIAN KOMPETENSI**
        5. **TUJUAN PEMBELAJARAN**: Rumuskan dengan jelas
        6. **MATERI PEMBELAJARAN**: Fakta, konsep, prinsip, prosedur
        7. **METODE PEMBELAJARAN**: ${metode} dengan pendekatan saintifik (5M)
        8. **MEDIA, ALAT, DAN SUMBER PEMBELAJARAN**: ${media}
        9. **KEGIATAN PEMBELAJARAN**:
           - Pendahuluan (Mengamati, Menanya)
           - Kegiatan Inti (Mengumpulkan informasi, Mengasosiasi, Mengkomunikasikan)
           - Penutup (Refleksi & Tindak Lanjut)
        10. **PENILAIAN**:
            - Penilaian Sikap (Observasi, Penilaian Diri, Penilaian Teman Sejawat)
            - Penilaian Pengetahuan (Tes Tertulis, Tes Lisan, Penugasan)
            - Penilaian Keterampilan (Unjuk Kerja, Proyek, Portofolio)
        11. **REMEDIAL DAN PENGAYAAN**
        12. **LAMPIRAN**: LKPD, Instrumen Penilaian, Bahan Bacaan
        
        **KARAKTERISTIK K13:**
        - Pendekatan saintifik (5M)
        - Penilaian autentik
        - Integrasi PPK (Penguatan Pendidikan Karakter)
        - Literasi, 4C, dan HOTS
        
        Gunakan bahasa Indonesia formal pendidikan yang baku. Format output rapi dengan penomoran yang jelas.
        `;
    
    } else if (kurikulum === "Kurikulum KTSP") {
        prompt = `
        Bertindaklah sebagai Ahli Kurikulum KTSP 2006 Profesional.
        Buatkan **MODUL AJAR / RPP LENGKAP KTSP 2006** dengan spesifikasi berikut:
        
        - **Jenjang:** ${jenjang}
        - **Kelas:** ${kelas}
        - **Mata Pelajaran:** ${mapel}
        - **Topik/Materi:** ${topik}
        - **Kurikulum:** KTSP 2006
        - **Metode Pembelajaran:** ${metode}
        - **Media Ajar:** ${media}
        - **Alokasi Waktu:** ${waktu} Menit
        
        **STRUKTUR WAJIB KTSP 2006:**
        1. **IDENTITAS MODUL**: Nama Penyusun, Sekolah, Mata Pelajaran, Kelas/Semester, Standar Kompetensi, Kompetensi Dasar, Indikator, Alokasi Waktu.
        2. **STANDAR KOMPETENSI**
        3. **KOMPETENSI DASAR**
        4. **INDIKATOR PENCAPAIAN KOMPETENSI**
        5. **TUJUAN PEMBELAJARAN**
        6. **MATERI AJAR**
        7. **METODE PEMBELAJARAN**: ${metode}
        8. **LANGKAH-LANGKAH KEGIATAN**:
           - Kegiatan Awal
           - Kegiatan Inti (Eksplorasi, Elaborasi, Konfirmasi)
           - Kegiatan Akhir
        9. **SUMBER BELAJAR**
        10. **PENILAIAN HASIL BELAJAR**:
            - Teknik Penilaian
            - Bentuk Instrumen
            - Contoh Instrumen
        11. **LAMPIRAN**: 
            - Materi Pembelajaran
            - Lembar Kerja Siswa
            - Instrumen Penilaian
        
        **KARAKTERISTIK KTSP:**
        - Berbasis kompetensi
        - Berpusat pada peserta didik
        - Berorientasi pada hasil belajar
        - Kontekstual dan fleksibel
        
        Gunakan bahasa Indonesia formal pendidikan yang baku. Format output rapi dengan penomoran yang jelas.
        `;
    
    } else if (kurikulum === "Kurikulum Cambridge") {
        prompt = `
        Bertindaklah sebagai Ahli Kurikulum Cambridge Profesional.
        Buatkan **MODUL AJAR / LESSON PLAN LENGKAP KURIKULUM CAMBRIDGE** dengan spesifikasi berikut:
        
        - **Jenjang:** ${jenjang}
        - **Kelas:** ${kelas}
        - **Mata Pelajaran:** ${mapel}
        - **Topik/Materi:** ${topik}
        - **Kurikulum:** CAMBRIDGE CURRICULUM
        - **Metode Pembelajaran:** ${metode}
        - **Media Ajar:** ${media}
        - **Alokasi Waktu:** ${waktu} Menit
        
        **CAMBRIDGE CURRICULUM STRUCTURE:**
        1. **LESSON IDENTITY**: Teacher's Name, School, Year, Level, Class, Subject, Topic, Duration.
        2. **LEARNING OBJECTIVES**: Specific, measurable objectives
        3. **SUCCESS CRITERIA**: How students will demonstrate understanding
        4. **PRIOR LEARNING**: What students already know
        5. **KEY VOCABULARY**: Subject-specific terminology
        6. **RESOURCES AND MATERIALS**: ${media}
        7. **LESSON STRUCTURE**:
           - Starter/Engagement (5-10 minutes)
           - Main Activities (40-50 minutes)
           - Plenary/Consolidation (10-15 minutes)
        8. **DIFFERENTIATION**: Support and challenge for all learners
        9. **ASSESSMENT FOR LEARNING**: 
           - Formative assessment strategies
           - Questioning techniques
           - Peer and self-assessment
        10. **CROSS-CURRICULAR LINKS**
        11. **HOMEWORK/EXTENSION ACTIVITIES**
        12. **TEACHER REFLECTION**: Space for post-lesson notes
        
        **CAMBRIDGE APPROACH:**
        - Learner-centered
        - Inquiry-based learning
        - Development of critical thinking
        - International mindedness
        - Skills development alongside knowledge
        
        Use formal educational language. Format output neatly with clear numbering.
        `;
    
    } else if (kurikulum === "Kurikulum IB") {
        prompt = `
        Bertindaklah sebagai Ahli Kurikulum International Baccalaureate (IB) Profesional.
        Buatkan **MODUL AJAR / LESSON PLAN LENGKAP KURIKULUM IB** dengan spesifikasi berikut:
        
        - **Jenjang:** ${jenjang}
        - **Kelas:** ${kelas}
        - **Mata Pelajaran:** ${mapel}
        - **Topik/Materi:** ${topik}
        - **Kurikulum:** INTERNATIONAL BACCALAUREATE (IB)
        - **Metode Pembelajaran:** ${metode}
        - **Media Ajar:** ${media}
        - **Alokasi Waktu:** ${waktu} Menit
        
        **IB CURRICULUM STRUCTURE:**
        1. **UNIT PLANNER INFORMATION**: Teacher, Subject, Grade, Date, Time
        2. **INQUIRY QUESTIONS**: 
           - Factual questions
           - Conceptual questions
           - Debatable questions
        3. **IB LEARNER PROFILE ATTRIBUTES**: Which attributes are being developed
        4. **APPROACHES TO LEARNING (ATL) SKILLS**: Thinking, social, communication, self-management, research
        5. **GLOBAL CONTEXTS**: Identities and relationships, orientation in space and time, etc.
        6. **STATEMENT OF INQUIRY**
        7. **LEARNING OBJECTIVES AND SUCCESS CRITERIA**
        8. **ASSESSMENT TASKS**: Formative and summative
        9. **LEARNING EXPERIENCES**:
           - Tuning in
           - Finding out
           - Sorting out
           - Going further
           - Making conclusions
           - Taking action
        10. **DIFFERENTIATION**: Inclusion and learning diversity
        11. **RESOURCES**: ${media}
        12. **REFLECTION**: Teacher and student reflection
        
        **IB PHILOSOPHY:**
        - Inquiry-based learning
        - Concept-driven curriculum
        - International-mindedness
        - Holistic education
        - Action and service
        
        Use formal educational language. Format output neatly with clear numbering.
        `;
    
    } else {
        // PROMPT STANDAR UNTUK KURIKULUM LAINNYA
        prompt = `
        Bertindaklah sebagai Ahli Kurikulum ${kurikulum} Profesional.
        Buatkan **MODUL AJAR / RPP LENGKAP** dengan spesifikasi berikut:
        
        - **Jenjang:** ${jenjang}
        - **Kelas:** ${kelas}
        - **Mata Pelajaran:** ${mapel}
        - **Topik/Materi:** ${topik}
        - **Kurikulum:** ${kurikulum}
        - **Metode Pembelajaran:** ${metode}
        - **Media Ajar:** ${media}
        - **Alokasi Waktu:** ${waktu} Menit
        
        **STRUKTUR MODUL AJAR LENGKAP:**
        1. **IDENTITAS MODUL**: Nama Penyusun (Kosongkan titik-titik), Sekolah, Tahun, Jenjang, Kelas, Alokasi Waktu.
        2. **LANDASAN TEORI KURIKULUM ${kurikulum}**: Prinsip-prinsip dasar kurikulum ini
        3. **KOMPETENSI YANG DIKEMBANGKAN**: Pengetahuan, keterampilan, dan sikap
        4. **TUJUAN PEMBELAJARAN**: Rumuskan dengan jelas (ABCD Audience, Behavior, Condition, Degree).
        5. **MATERI PEMBELAJARAN**: Konsep inti dan pengembangannya
        6. **METODE & MODEL PEMBELAJARAN**: Jelaskan bagaimana ${metode} diterapkan dalam kurikulum ${kurikulum}.
        7. **MEDIA PEMBELAJARAN**: Jelaskan penggunaan ${media} secara detail.
        8. **KEGIATAN PEMBELAJARAN**:
           - Pendahuluan (Termasuk apersepsi, motivasi, dan penjelasan tujuan)
           - Kegiatan Inti (Pembelajaran aktif dengan sintaks model ${metode})
           - Penutup (Refleksi, simpulan, dan tindak lanjut)
        9. **PENILAIAN (ASESMEN) LENGKAP**:
           - Teknik Penilaian
           - Bentuk Instrumen
           - Contoh Instrumen
           - Rubrik Penilaian
        10. **SUMBER BELAJAR**: Referensi yang digunakan
        11. **LAMPIRAN**:
            - Lembar Kerja Peserta Didik (LKPD)
            - Bahan Bacaan
            - Instrumen Penilaian
        12. **DAFTAR PUSTAKA**
        
        **PENYESUAIAN DENGAN KURIKULUM ${kurikulum}:**
        - Jelaskan karakteristik khusus kurikulum ini
        - Integrasikan prinsip-prinsip utama kurikulum ${kurikulum}
        - Sesuaikan dengan filosofi dan tujuan kurikulum
        
        Gunakan bahasa Indonesia formal pendidikan yang baku. Format output rapi dengan penomoran yang jelas.
        `;
    }

    // Panggil fungsi AI setelah prompt terbentuk dengan benar
    panggilAI(prompt);
}
    
    // PROMPT KHUSUS UNTUK SETIAP KURIKULUM
    let prompt;
    
    if (kurikulum === "Kurikulum Deep Learning") {
        prompt = `
        Bertindaklah sebagai Ahli Kurikulum Deep Learning dan Pembelajaran Profesional.
        Buatkan **MODUL AJAR / RPP LENGKAP BERBASIS DEEP LEARNING** dengan spesifikasi berikut:
        
        - **Jenjang:** ${jenjang}
        - **Kelas:** ${kelas}
        - **Mata Pelajaran:** ${mapel}
        - **Topik/Materi:** ${topik}
        - **Kurikulum:** DEEP LEARNING (Pembelajaran Mendalam)
        - **Metode Pembelajaran:** ${metode} (Integrasikan dengan prinsip Deep Learning)
        - **Media Ajar:** ${media}
        - **Alokasi Waktu:** ${waktu} Menit
        
        **PRINSIP DEEP LEARNING YANG HARUS TERINTEGRASI:**
        1. **INTEGRASI KOGNITIF & AFEKTIF**: Hubungkan pengetahuan dengan nilai, sikap, dan keterampilan hidup
        2. **KONSTRUKSI MAKNA**: Fokus pada pemahaman mendalam, bukan hafalan
        3. **PEMBELAJARAN KONTEKSTUAL**: Hubungkan materi dengan kehidupan nyata, masalah aktual, dan realitas sosial
        4. **REFLEKSI KRITIS**: Sediakan ruang untuk refleksi, evaluasi diri, dan transformasi pemikiran
        5. **KOLABORASI MENDALAM**: Kerja sama yang bermakna untuk menyelesaikan masalah kompleks
        6. **TRANSFER PEMBELAJARAN**: Menerapkan konsep ke situasi baru dan berbeda
        7. **METAKOGNISI**: Siswa menyadari dan mengontrol proses berpikir mereka sendiri
        
        **STRUKTUR MODUL DEEP LEARNING:**
        1. **IDENTITAS MODUL**: Nama Penyusun (Kosongkan titik-titik), Sekolah, Tahun, Jenjang, Kelas, Alokasi Waktu.
        2. **VISI PEMBELAJARAN DEEP LEARNING**: Pernyataan filosofis tentang pembelajaran mendalam
        3. **PROFIL PEMBELAJAR DEEP LEARNING**: Karakteristik siswa yang dikembangkan
        4. **TUJUAN PEMBELAJARAN DEEP LEARNING**: 
           - Tujuan Kognitif Mendalam (Pemahaman Konseptual)
           - Tujuan Afektif (Nilai dan Sikap)
           - Tujuan Psikomotorik (Keterampilan Kompleks)
           - Tujuan Transformasional (Perubahan Pola Pikir)
        5. **ESSENTIAL QUESTIONS**: Pertanyaan-pertanyaan filosofis yang memicu pemikiran mendalam
        6. **PEMETAAN KONSEP MENDALAM**: Jaringan konsep yang saling terhubung
        7. **KEGIATAN PEMBELAJARAN BERBASIS DEEP LEARNING**:
           - **Fase 1: Engaging (Menggugah)**: Aktivitas yang membangkitkan rasa ingin tahu dan konflik kognitif
           - **Fase 2: Exploring (Menjelajah)**: Investigasi mendalam, analisis kritis, eksplorasi multidimensi
           - **Fase 3: Explaining (Menjelaskan)**: Konstruksi makna, elaborasi konsep, pembentukan pemahaman
           - **Fase 4: Elaborating (Mengembangkan)**: Aplikasi kompleks, sintesis ide, kreasi solusi
           - **Fase 5: Evaluating (Mengevaluasi)**: Refleksi mendalam, evaluasi proses, transformasi pemikiran
        8. **ASESMEN DEEP LEARNING**:
           - Asesmen Formatif (Observasi Proses Berpikir)
           - Asesmen Performa (Proyek Kompleks)
           - Asesmen Reflektif (Jurnal Pembelajaran)
           - Asesmen Autentik (Portofolio Pemahaman)
           - Rubrik Berpikir Mendalam (Depth of Knowledge Level 3-4)
        9. **DIFERENSIASI DEEP LEARNING**: Penyesuaian untuk berbagai tingkat kedalaman pemahaman
        10. **INTEGRASI NILAI & KARAKTER**: Penguatan karakter melalui pembelajaran mendalam
        11. **MEDIA & SUMBER BELAJAR DEEP LEARNING**: Sumber yang memicu pemikiran kritis dan kreatif
        12. **LAMPIRAN**: 
            - Lembar Kerja Berpikir Mendalam
            - Rubrik Penilaian Deep Learning
            - Bahan Refleksi Siswa
            - Daftar Pertanyaan Pemantik
        13. **RENCANA TINDAK LANJUT**: Untuk pembelajaran berkelanjutan dan transfer pengetahuan
        
        **PEDOMAN KHUSUS:**
        - Hindari pembelajaran superfisial (permukaan)
        - Fokus pada pemahaman konseptual, bukan prosedural
        - Gunakan pertanyaan tingkat tinggi (HOTS)
        - Integrasikan berbagai perspektif dan disiplin ilmu
        - Kaitkan dengan isu-isu kontemporer dan relevan
        - Berikan kesempatan untuk konstruksi pengetahuan aktif
        
        Format output rapi dengan penomoran yang jelas, bahasa Indonesia formal pendidikan yang baku.
        `;
    } else if (kurikulum === "Kurikulum Merdeka") {
        prompt = `
        Bertindaklah sebagai Ahli Kurikulum Merdeka Profesional.
        Buatkan **MODUL AJAR / RPP LENGKAP KURIKULUM MERDEKA** dengan spesifikasi berikut:
        
        - **Jenjang:** ${jenjang}
        - **Kelas:** ${kelas}
        - **Mata Pelajaran:** ${mapel}
        - **Topik/Materi:** ${topik}
        - **Kurikulum:** KURIKULUM MERDEKA
        - **Metode Pembelajaran:** ${metode}
        - **Media Ajar:** ${media}
        - **Alokasi Waktu:** ${waktu} Menit
        
        **STRUKTUR WAJIB KURIKULUM MERDEKA:**
        1. **IDENTITAS MODUL**: Nama Penyusun, Sekolah, Tahun, Jenjang, Kelas, Alokasi Waktu.
        2. **KOMPETENSI AWAL & PROFIL PELAJAR PANCASILA**: Tentukan dimensi Profil Pelajar Pancasila yang dikembangkan
        3. **SARANA & PRASARANA**.
        4. **CAPAIAN PEMBELAJARAN (CP)**: Rumuskan dengan jelas sesuai fase
        5. **TUJUAN PEMBELAJARAN**: Rumuskan dengan format yang jelas dan terukur
        6. **PEMAHAMAN BERMAKNA**: Kaitan materi dengan kehidupan nyata
        7. **PERTANYAAN PEMANTIK**: Pertanyaan yang memicu rasa ingin tahu
        8. **KEGIATAN PEMBELAJARAN**:
           - Pendahuluan (Termasuk persepsi & motivasi)
           - Kegiatan Inti (Berpusat pada siswa, diferensiasi pembelajaran)
           - Penutup (Refleksi & Tindak Lanjut)
        9. **ASESMEN**:
           - Asesmen Diagnostik
           - Asesmen Formatif
           - Asesmen Sumatif
           - Rubrik Penilaian sesuai Profil Pelajar Pancasila
        10. **PENGAYAAN DAN REMEDIAL**: Diferensiasi untuk berbagai kemampuan siswa
        11. **REFLEKSI GURU DAN SISWA**
        12. **LAMPIRAN LKPD (LEMBAR KERJA PESERTA DIDIK)**
        13. **BAHAN BACAAN GURU & SISWA**
        14. **DAFTAR PUSTAKA**
        
        **FOKUS KURIKULUM MERDEKA:**
        - Berpusat pada siswa
        - Pembelajaran berdiferensiasi
        - Penguatan Profil Pelajar Pancasila
        - Pembelajaran kontekstual
        - Fleksibilitas bagi guru
        
        Gunakan bahasa Indonesia formal pendidikan yang baku. Format output rapi dengan penomoran yang jelas.
        `;
    } else if (kurikulum === "Kurikulum 2013" || kurikulum === "Kurikulum 2013 Revisi") {
        prompt = `
        Bertindaklah sebagai Ahli Kurikulum 2013 (K13) Profesional.
        Buatkan **MODUL AJAR / RPP LENGKAP KURIKULUM 2013** dengan spesifikasi berikut:
        
        - **Jenjang:** ${jenjang}
        - **Kelas:** ${kelas}
        - **Mata Pelajaran:** ${mapel}
        - **Topik/Materi:** ${topik}
        - **Kurikulum:** ${kurikulum}
        - **Metode Pembelajaran:** ${metode}
        - **Media Ajar:** ${media}
        - **Alokasi Waktu:** ${waktu} Menit
        
        **STRUKTUR WAJIB KURIKULUM 2013:**
        1. **IDENTITAS MODUL**: Nama Penyusun, Sekolah, Tahun, Jenjang, Kelas, Alokasi Waktu.
        2. **KOMPETENSI INTI (KI)**: KI-1 (Spiritual), KI-2 (Sosial), KI-3 (Pengetahuan), KI-4 (Keterampilan)
        3. **KOMPETENSI DASAR (KD)**: KD dari KI-3 dan KI-4
        4. **INDIKATOR PENCAPAIAN KOMPETENSI**
        5. **TUJUAN PEMBELAJARAN**: Rumuskan dengan jelas
        6. **MATERI PEMBELAJARAN**: Fakta, konsep, prinsip, prosedur
        7. **METODE PEMBELAJARAN**: ${metode} dengan pendekatan saintifik (5M)
        8. **MEDIA, ALAT, DAN SUMBER PEMBELAJARAN**: ${media}
        9. **KEGIATAN PEMBELAJARAN**:
           - Pendahuluan (Mengamati, Menanya)
           - Kegiatan Inti (Mengumpulkan informasi, Mengasosiasi, Mengkomunikasikan)
           - Penutup (Refleksi & Tindak Lanjut)
        10. **PENILAIAN**:
            - Penilaian Sikap (Observasi, Penilaian Diri, Penilaian Teman Sejawat)
            - Penilaian Pengetahuan (Tes Tertulis, Tes Lisan, Penugasan)
            - Penilaian Keterampilan (Unjuk Kerja, Proyek, Portofolio)
        11. **REMEDIAL DAN PENGAYAAN**
        12. **LAMPIRAN**: LKPD, Instrumen Penilaian, Bahan Bacaan
        
        **KARAKTERISTIK K13:**
        - Pendekatan saintifik (5M)
        - Penilaian autentik
        - Integrasi PPK (Penguatan Pendidikan Karakter)
        - Literasi, 4C, dan HOTS
        
        Gunakan bahasa Indonesia formal pendidikan yang baku. Format output rapi dengan penomoran yang jelas.
        `;
    } else if (kurikulum === "Kurikulum KTSP") {
        prompt = `
        Bertindaklah sebagai Ahli Kurikulum KTSP 2006 Profesional.
        Buatkan **MODUL AJAR / RPP LENGKAP KTSP 2006** dengan spesifikasi berikut:
        
        - **Jenjang:** ${jenjang}
        - **Kelas:** ${kelas}
        - **Mata Pelajaran:** ${mapel}
        - **Topik/Materi:** ${topik}
        - **Kurikulum:** KTSP 2006
        - **Metode Pembelajaran:** ${metode}
        - **Media Ajar:** ${media}
        - **Alokasi Waktu:** ${waktu} Menit
        
        **STRUKTUR WAJIB KTSP 2006:**
        1. **IDENTITAS MODUL**: Nama Penyusun, Sekolah, Mata Pelajaran, Kelas/Semester, Standar Kompetensi, Kompetensi Dasar, Indikator, Alokasi Waktu.
        2. **STANDAR KOMPETENSI**
        3. **KOMPETENSI DASAR**
        4. **INDIKATOR PENCAPAIAN KOMPETENSI**
        5. **TUJUAN PEMBELAJARAN**
        6. **MATERI AJAR**
        7. **METODE PEMBELAJARAN**: ${metode}
        8. **LANGKAH-LANGKAH KEGIATAN**:
           - Kegiatan Awal
           - Kegiatan Inti (Eksplorasi, Elaborasi, Konfirmasi)
           - Kegiatan Akhir
        9. **SUMBER BELAJAR**
        10. **PENILAIAN HASIL BELAJAR**:
            - Teknik Penilaian
            - Bentuk Instrumen
            - Contoh Instrumen
        11. **LAMPIRAN**: 
            - Materi Pembelajaran
            - Lembar Kerja Siswa
            - Instrumen Penilaian
        
        **KARAKTERISTIK KTSP:**
        - Berbasis kompetensi
        - Berpusat pada peserta didik
        - Berorientasi pada hasil belajar
        - Kontekstual dan fleksibel
        
        Gunakan bahasa Indonesia formal pendidikan yang baku. Format output rapi dengan penomoran yang jelas.
        `;
    } else if (kurikulum === "Kurikulum Cambridge") {
        prompt = `
        Bertindaklah sebagai Ahli Kurikulum Cambridge Profesional.
        Buatkan **MODUL AJAR / LESSON PLAN LENGKAP KURIKULUM CAMBRIDGE** dengan spesifikasi berikut:
        
        - **Jenjang:** ${jenjang}
        - **Kelas:** ${kelas}
        - **Mata Pelajaran:** ${mapel}
        - **Topik/Materi:** ${topik}
        - **Kurikulum:** CAMBRIDGE CURRICULUM
        - **Metode Pembelajaran:** ${metode}
        - **Media Ajar:** ${media}
        - **Alokasi Waktu:** ${waktu} Menit
        
        **CAMBRIDGE CURRICULUM STRUCTURE:**
        1. **LESSON IDENTITY**: Teacher's Name, School, Year, Level, Class, Subject, Topic, Duration.
        2. **LEARNING OBJECTIVES**: Specific, measurable objectives
        3. **SUCCESS CRITERIA**: How students will demonstrate understanding
        4. **PRIOR LEARNING**: What students already know
        5. **KEY VOCABULARY**: Subject-specific terminology
        6. **RESOURCES AND MATERIALS**: ${media}
        7. **LESSON STRUCTURE**:
           - Starter/Engagement (5-10 minutes)
           - Main Activities (40-50 minutes)
           - Plenary/Consolidation (10-15 minutes)
        8. **DIFFERENTIATION**: Support and challenge for all learners
        9. **ASSESSMENT FOR LEARNING**: 
           - Formative assessment strategies
           - Questioning techniques
           - Peer and self-assessment
        10. **CROSS-CURRICULAR LINKS**
        11. **HOMEWORK/EXTENSION ACTIVITIES**
        12. **TEACHER REFLECTION**: Space for post-lesson notes
        
        **CAMBRIDGE APPROACH:**
        - Learner-centered
        - Inquiry-based learning
        - Development of critical thinking
        - International mindedness
        - Skills development alongside knowledge
        
        Use formal educational language. Format output neatly with clear numbering.
        `;
    } else if (kurikulum === "Kurikulum IB") {
        prompt = `
        Bertindaklah sebagai Ahli Kurikulum International Baccalaureate (IB) Profesional.
        Buatkan **MODUL AJAR / LESSON PLAN LENGKAP KURIKULUM IB** dengan spesifikasi berikut:
        
        - **Jenjang:** ${jenjang}
        - **Kelas:** ${kelas}
        - **Mata Pelajaran:** ${mapel}
        - **Topik/Materi:** ${topik}
        - **Kurikulum:** INTERNATIONAL BACCALAUREATE (IB)
        - **Metode Pembelajaran:** ${metode}
        - **Media Ajar:** ${media}
        - **Alokasi Waktu:** ${waktu} Menit
        
        **IB CURRICULUM STRUCTURE:**
        1. **UNIT PLANNER INFORMATION**: Teacher, Subject, Grade, Date, Time
        2. **INQUIRY QUESTIONS**: 
           - Factual questions
           - Conceptual questions
           - Debatable questions
        3. **IB LEARNER PROFILE ATTRIBUTES**: Which attributes are being developed
        4. **APPROACHES TO LEARNING (ATL) SKILLS**: Thinking, social, communication, self-management, research
        5. **GLOBAL CONTEXTS**: Identities and relationships, orientation in space and time, etc.
        6. **STATEMENT OF INQUIRY**
        7. **LEARNING OBJECTIVES AND SUCCESS CRITERIA**
        8. **ASSESSMENT TASKS**: Formative and summative
        9. **LEARNING EXPERIENCES**:
           - Tuning in
           - Finding out
           - Sorting out
           - Going further
           - Making conclusions
           - Taking action
        10. **DIFFERENTIATION**: Inclusion and learning diversity
        11. **RESOURCES**: ${media}
        12. **REFLECTION**: Teacher and student reflection
        
        **IB PHILOSOPHY:**
        - Inquiry-based learning
        - Concept-driven curriculum
        - International-mindedness
        - Holistic education
        - Action and service
        
        Use formal educational language. Format output neatly with clear numbering.
        `;
    } else {
        // PROMPT STANDAR UNTUK KURIKULUM LAINNYA (Khusus, Prototipe, dll)
        prompt = `
        Bertindaklah sebagai Ahli Kurikulum ${kurikulum} Profesional.
        Buatkan **MODUL AJAR / RPP LENGKAP** dengan spesifikasi berikut:
        
        - **Jenjang:** ${jenjang}
        - **Kelas:** ${kelas}
        - **Mata Pelajaran:** ${mapel}
        - **Topik/Materi:** ${topik}
        - **Kurikulum:** ${kurikulum}
        - **Metode Pembelajaran:** ${metode}
        - **Media Ajar:** ${media}
        - **Alokasi Waktu:** ${waktu} Menit
        
        **STRUKTUR MODUL AJAR LENGKAP:**
        1. **IDENTITAS MODUL**: Nama Penyusun (Kosongkan titik-titik), Sekolah, Tahun, Jenjang, Kelas, Alokasi Waktu.
        2. **LANDASAN TEORI KURIKULUM ${kurikulum}**: Prinsip-prinsip dasar kurikulum ini
        3. **KOMPETENSI YANG DIKEMBANGKAN**: Pengetahuan, keterampilan, dan sikap
        4. **TUJUAN PEMBELAJARAN**: Rumuskan dengan jelas (ABCD Audience, Behavior, Condition, Degree).
        5. **MATERI PEMBELAJARAN**: Konsep inti dan pengembangannya
        6. **METODE & MODEL PEMBELAJARAN**: Jelaskan bagaimana ${metode} diterapkan dalam kurikulum ${kurikulum}.
        7. **MEDIA PEMBELAJARAN**: Jelaskan penggunaan ${media} secara detail.
        8. **KEGIATAN PEMBELAJARAN**:
           - Pendahuluan (Termasuk apersepsi, motivasi, dan penjelasan tujuan)
           - Kegiatan Inti (Pembelajaran aktif dengan sintaks model ${metode})
           - Penutup (Refleksi, simpulan, dan tindak lanjut)
        9. **PENILAIAN (ASESMEN) LENGKAP**:
           - Teknik Penilaian
           - Bentuk Instrumen
           - Contoh Instrumen
           - Rubrik Penilaian
        10. **SUMBER BELAJAR**: Referensi yang digunakan
        11. **LAMPIRAN**:
            - Lembar Kerja Peserta Didik (LKPD)
            - Bahan Bacaan
            - Instrumen Penilaian
        12. **DAFTAR PUSTAKA**
        
        **PENYESUAIAN DENGAN KURIKULUM ${kurikulum}:**
        - Jelaskan karakteristik khusus kurikulum ini
        - Integrasikan prinsip-prinsip utama kurikulum ${kurikulum}
        - Sesuaikan dengan filosofi dan tujuan kurikulum
        
        Gunakan bahasa Indonesia formal pendidikan yang baku. Format output rapi dengan penomoran yang jelas.
        `;
    }

    panggilAI(prompt);
}

// ==========================================
// 2. BUAT RANGKUMAN DETAIL (FUNGSI BARU)
// ==========================================
window.buatRangkumanDetailAI = function() {
    const jenjang = document.getElementById("jenjang").value;
    const mapel = document.getElementById("mapel").value;
    const kelas = document.getElementById("kelas").value;
    const topik = document.getElementById("topik").value;
    const jenisRangkuman = document.getElementById("jenisRangkuman").value;
    const targetRangkuman = document.getElementById("targetRangkuman").value;
    const media = document.getElementById("media").value;
    
    // Ambil komponen yang dipilih
    const komponen = [];
    if(document.getElementById('kompDefinisi').checked) komponen.push("Definisi");
    if(document.getElementById('kompKonsep').checked) komponen.push("Konsep Utama");
    if(document.getElementById('kompContoh').checked) komponen.push("Contoh Soal");
    if(document.getElementById('kompAplikasi').checked) komponen.push("Aplikasi Sehari-hari");
    if(document.getElementById('kompRumus').checked) komponen.push("Rumus/Formula");
    if(document.getElementById('kompGambar').checked) komponen.push("Gambar/Diagram");
    if(document.getElementById('kompLatihan').checked) komponen.push("Soal Latihan");
    if(document.getElementById('kompKunci').checked) komponen.push("Kunci Jawaban");

    if(!mapel || !topik) { alert("Isi Mapel dan Topik dulu!"); return; }

    lastType = "Rangkuman Materi Detail";
    
    const prompt = `
    Buatkan **${jenisRangkuman.toUpperCase()} MATERI PEMBELAJARAN** yang disesuaikan untuk ${targetRangkuman}.
    
    **SPESIFIKASI:**
    - Jenjang: ${jenjang}
    - Kelas: ${kelas}
    - Mata Pelajaran: ${mapel}
    - Topik: ${topik}
    - Jenis Rangkuman: ${jenisRangkuman}
    - Target Pengguna: ${targetRangkuman}
    - Media yang Disarankan: ${media}
    
    **KOMPONEN YANG HARUS ADA:**
    ${komponen.map(k => `✓ ${k}`).join('\n')}
    
    **STRUKTUR RANGKUMAN:**
    1. **JUDUL MATERI** yang menarik
    2. **TUJUAN PEMBELAJARAN** yang jelas
    3. **PETA KONSEP** (jika memungkinkan)
    4. **PENJELASAN MATERI** dengan bahasa yang sesuai ${targetRangkuman}
    5. **CONTOH APLIKASI** dalam kehidupan sehari-hari
    6. **LATIHAN SOAL** dengan tingkat kesulitan bertahap
    7. **RANGKUMAN AKHIR** poin-poin penting
    8. **GLOSARIUM** istilah penting (jika diperlukan)
    
    **KARAKTERISTIK KHUSUS:**
    - Gunakan bahasa yang ${targetRangkuman === 'Siswa' ? 'sederhana dan mudah dipahami siswa' : targetRangkuman === 'Guru' ? 'profesional dan mendalam' : 'komunikatif untuk semua kalangan'}
    - Sertakan analogi yang relevan
    - Berikan tips belajar yang efektif
    - Integrasikan nilai-nilai karakter yang relevan
    
    Format output harus sesuai dengan jenis rangkuman: ${jenisRangkuman}.
    Jika ${jenisRangkuman === 'Peta Konsep'}, buat dalam format teks yang bisa diubah menjadi diagram.
    Jika ${jenisRangkuman === 'Infografis'}, buat deskripsi visual yang jelas.
    `;
    
    panggilAI(prompt);
}

// ==========================================
// 3. BUAT SOAL DETAIL (FUNGSI BARU)
// ==========================================
window.buatSoalAI = function() {
    const jenjang = document.getElementById("jenjang").value;
    const mapel = document.getElementById("mapel").value;
    const kelas = document.getElementById("kelas").value;
    const topik = document.getElementById("topik").value;
    const tingkatKesulitan = document.getElementById("tingkatKesulitan").value;
    const jenisPenilaian = document.getElementById("jenisPenilaian").value;
    const jmlPG = document.getElementById("jmlPG").value;
    const jmlIsian = document.getElementById("jmlIsian").value;
    const jmlEssay = document.getElementById("jmlEssay").value;
    
    // Ambil spesifikasi soal
    const spesifikasi = [];
    if(document.getElementById('soalKontekstual').checked) spesifikasi.push("Kontekstual");
    if(document.getElementById('soalLiterasi').checked) spesifikasi.push("Literasi");
    if(document.getElementById('soalNumerasi').checked) spesifikasi.push("Numerasi");
    if(document.getElementById('soalKarakter').checked) spesifikasi.push("Penguatan Karakter");
    if(document.getElementById('soalKritis').checked) spesifikasi.push("Berpikir Kritis");
    if(document.getElementById('soalKreatif').checked) spesifikasi.push("Berpikir Kreatif");

    if(!mapel) { alert("Isi Mapel!"); return; }

    lastType = "Bank Soal Detail";
    
    const totalSoal = parseInt(jmlPG) + parseInt(jmlIsian) + parseInt(jmlEssay);
    
    const prompt = `
    Buatkan **INSTRUMEN PENILAIAN ${jenisPenilaian.toUpperCase()}** untuk jenjang ${jenjang}.
    
    **SPESIFIKASI DETAIL:**
    - Mata Pelajaran: ${mapel}
    - Kelas: ${kelas}
    - Topik: ${topik}
    - Tingkat Kesulitan: ${tingkatKesulitan}
    - Jenis Penilaian: ${jenisPenilaian}
    - Total Soal: ${totalSoal} butir
    - Spesifikasi: ${spesifikasi.join(', ') || 'Tidak ada spesifikasi khusus'}
    
    **KOMPOSISI SOAL:**
    - ${jmlPG} Soal Pilihan Ganda (PG)
    - ${jmlIsian} Soal Isian Singkat
    - ${jmlEssay} Soal Uraian/Essay
    
    **STRUKTUR DOKUMEN:**
    1. **HALAMAN JUDUL**: Nama sekolah, mata pelajaran, kelas, topik, jenis penilaian
    2. **PETUNJUK PENGERJAAN**: Untuk siswa
    3. **SOAL PILIHAN GANDA**:
       - Setiap soal memiliki 4-5 opsi jawaban (A, B, C, D, E)
       - Tingkat kesulitan: ${tingkatKesulitan}
       - Sertakan stimulus/konteks jika diperlukan
       - Soal harus ${spesifikasi.includes('Kontekstual') ? 'berkonteks kehidupan nyata' : 'relevan dengan materi'}
    4. **SOAL ISIAN SINGKAT**:
       - Pertanyaan langsung dan jelas
       - Kosakata sesuai jenjang ${jenjang}
    5. **SOAL URAIAN/ESSAY**:
       - Mengukur kemampuan analisis, evaluasi, dan kreasi
       - Sertakan rubrik penilaian untuk setiap soal
    6. **KUNCI JAWABAN**:
       - Kunci PG lengkap dengan pembahasan singkat
       - Kunci isian singkat
       - Pedoman penskoran essay dengan detail
    7. **KISI-KISI SOAL** dalam format tabel meliputi:
       - Nomor soal
       - Kompetensi yang diukur
       - Indikator soal
       - Level kognitif (C1-C6)
       - Bentuk soal
       - Nomor soal
    
    **KARAKTERISTIK KHUSUS TINGKAT KESULITAN ${tingkatKesulitan.toUpperCase()}:**
    ${tingkatKesulitan === 'Mudah' ? '- Fokus pada pengetahuan dan pemahaman dasar\n- Bahasa sederhana\n- Konteks familiar' : 
      tingkatKesulitan === 'Sedang' ? '- Mengukur penerapan konsep\n- Soal bervariasi\n- Konteks terbatas' :
      tingkatKesulitan === 'Sulit' ? '- Mengukur analisis dan evaluasi\n- Soal kompleks\n- Konteks baru' :
      '- Mengukur kemampuan kreasi/HOTS\n- Soal terbuka\n- Konteks multidimensi'}
    
    Pastikan soal sesuai dengan level kognitif siswa ${jenjang} dan kurikulum yang berlaku.
    `;
    
    panggilAI(prompt);
}

// ==========================================
// 4. BUAT MEDIA AJAR (FUNGSI BARU)
// ==========================================
window.buatMediaAjarAI = function() {
    const jenjang = document.getElementById("jenjang").value;
    const mapel = document.getElementById("mapel").value;
    const kelas = document.getElementById("kelas").value;
    const topik = document.getElementById("topik").value;
    const media = document.getElementById("media").value;
    const metode = document.getElementById("metode").value;

    if(!mapel || !topik) { alert("Isi Mapel dan Topik dulu!"); return; }

    lastType = "Desain Media Ajar";
    
    const prompt = `
    Buatkan **DESAIN DAN PANDUAN MEDIA AJAR** untuk pembelajaran ${mapel}.
    
    **SPESIFIKASI:**
    - Jenjang: ${jenjang}
    - Kelas: ${kelas}
    - Mata Pelajaran: ${mapel}
    - Topik: ${topik}
    - Jenis Media: ${media}
    - Metode Pembelajaran: ${metode}
    
    **HASIL YANG DIHARAPKAN:**
    1. **ANALISIS KEBUTUHAN MEDIA**
       - Alasan pemilihan media ${media}
       - Kesesuaian dengan karakteristik siswa ${jenjang}
       - Kesesuaian dengan materi ${topik}
    
    2. **DESAIN MEDIA AJAR**
       - Nama/Judul media yang menarik
       - Tujuan pembelajaran spesifik
       - Komponen media (visual, audio, interaktif, dll)
       - Sketsa/desain tampilan
       - Warna, font, dan layout yang sesuai
    
    3. **SPESIFIKASI TEKNIS**
       - Bahan dan alat yang dibutuhkan
       - Software/aplikasi yang digunakan
       - Spesifikasi teknis (jika digital)
       - Ukuran dan format media
    
    4. **PROSEDUR PEMBUATAN** (step-by-step)
       - Persiapan bahan
       - Tahap produksi
       - Tahap penyelesaian
       - Waktu yang dibutuhkan
    
    5. **CARA PENGGUNAAN DALAM PEMBELAJARAN**
       - Langkah-langkah penggunaan dengan metode ${metode}
       - Integrasi dengan RPP/modul ajar
       - Alokasi waktu dalam pembelajaran
       - Strategi penyampaian
    
    6. **INDIKATOR KEBERHASILAN**
       - Kriteria penilaian media
       - Aspek yang diukur
       - Rubrik penilaian
    
    7. **ALTERNATIF DAN VARIASI**
       - Alternatif media jika ${media} tidak tersedia
       - Variasi penggunaan untuk siswa berkebutuhan khusus
       - Modifikasi untuk pembelajaran daring/luring
    
    8. **LAMPIRAN**
       - Contoh tampilan/skrip
       - Referensi pengembangan
       - Daftar periksa (checklist)
    
    **PETUNJUK KHUSUS:**
    - Sertakan contoh konkret yang bisa langsung diterapkan
    - Berikan estimasi biaya (jika diperlukan)
    - Cantumkan sumber belajar/referensi
    - Sesuaikan dengan kondisi sekolah di Indonesia
    `;
    
    panggilAI(prompt);
}

// ==========================================
// 5. FUNGSI LAMA YANG TETAP ADA (untuk kompatibilitas)
// ==========================================
window.buatRangkumanAI = function() {
    // Fungsi ini tetap ada untuk kompatibilitas dengan kode lama
    const jenjang = document.getElementById("jenjang").value;
    const mapel = document.getElementById("mapel").value;
    const kelas = document.getElementById("kelas").value;
    const topik = document.getElementById("topik").value;

    if(!mapel || !topik) { alert("Isi Mapel dan Topik dulu!"); return; }

    lastType = "Rangkuman Materi";
    const prompt = `
    Buatkan **RANGKUMAN MATERI LENGKAP DAN MENDALAM** untuk bahan ajar.
    - Jenjang: ${jenjang}
    - Kelas: ${kelas}
    - Mapel: ${mapel}
    - Topik: ${topik}
    
    Materi harus mencakup definisi, konsep utama, contoh penerapan dalam kehidupan sehari-hari, dan poin-poin penting yang mudah dihafal siswa. Gaya bahasa edukatif dan mudah dipahami.
    `;
    panggilAI(prompt);
}

// ==========================================
// 6. EXPORT PDF (FUNGSI LAMA - TETAP)
// ==========================================
window.exportPDF = function() {
    const isi = document.getElementById("hasilOutput").value;
    if (!isi || isi.includes("⏳")) { alert("Output kosong!"); return; }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFont("times", "normal");
    doc.setFontSize(12);

    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth() - (margin * 2);
    const splitText = doc.splitTextToSize(isi, pageWidth);
    
    let y = 20;
    
    doc.setFontSize(14);
    doc.setFont("times", "bold");
    doc.text("DOKUMEN PEMBELAJARAN", 105, 15, null, "center");
    doc.setFontSize(12);
    doc.setFont("times", "normal");

    splitText.forEach(line => {
        if (y > 280) {
            doc.addPage();
            y = 20;
        }
        doc.text(line, margin, y);
        y += 6;
    });

    doc.save("Dokumen_Guru_Lengkap.pdf");
}

// ==========================================
// 7. SIMPAN KE FIREBASE (FUNGSI LAMA - TETAP)
// ==========================================
window.simpanKeBank = function() {
    const isi = document.getElementById("hasilOutput").value;
    if (!isi || isi.includes("⏳")) { alert("Belum ada konten!"); return; }

    const user = auth.currentUser;
    if (!user) { alert("Anda harus login!"); return; }

    const data = {
        tipe: lastType || "Dokumen",
        email_guru: user.email,
        jenjang: document.getElementById('jenjang').value,
        mapel: document.getElementById('mapel').value,
        kelas: document.getElementById('kelas').value,
        topik: document.getElementById('topik').value,
        kurikulum: document.getElementById('kurikulum').value,
        metode: document.getElementById('metode').value,
        media: document.getElementById('media').value,
        isi: isi,
        tanggal: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    };
    
    push(ref(db, 'bank_data_sekolah'), data)
        .then(() => {
            alert("✅ Tersimpan ke Database Sekolah! Kepala Sekolah bisa melihatnya sekarang.");
        })
        .catch((error) => {
            alert("❌ Gagal menyimpan: " + error.message);
        });
}

// ==========================================
// 8. EXPORT FUNGSI showProgress ke window scope
// ==========================================
window.showProgress = function() {
    const progress = document.getElementById('progressAI');
    if (progress) {
        progress.style.display = 'block';
        setTimeout(() => {
            progress.style.display = 'none';
        }, 30000); // Sembunyikan setelah 30 detik
    }
};