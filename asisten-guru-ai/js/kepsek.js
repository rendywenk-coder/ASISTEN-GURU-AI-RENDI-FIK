import { db } from './firebase-config.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const listModul = document.getElementById("rekapSemuaModul");
const listSoal = document.getElementById("rekapSemuaSoal");

const dbRef = ref(db, 'bank_data_sekolah');

// Listener Realtime: Jalan setiap ada data baru masuk/berubah
onValue(dbRef, (snapshot) => {
    listModul.innerHTML = "";
    listSoal.innerHTML = "";
    
    const data = snapshot.val();
    
    if (!data) {
        listModul.innerHTML = "<p>Belum ada data masuk.</p>";
        return;
    }

    // Convert object ke array dan balik urutannya (terbaru di atas)
    const dataArray = Object.values(data).reverse();

    dataArray.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div style="margin-bottom:5px;">
                <strong>${item.mapel}</strong> (${item.kelas}) <br> 
                <span style="color:#007bff">${item.topik}</span>
            </div>
            <div style="font-size: 11px; color: #666; margin-bottom: 8px;">
                Oleh: ${item.email_guru} <br>
                🕒 ${item.tanggal}
            </div>
            <button onclick="lihatDetail('${encodeURIComponent(item.isi)}')" style="padding:5px; font-size:12px;">Lihat Isi</button>
        `;

        if (item.tipe === "Modul") {
            listModul.appendChild(li);
        } else {
            listSoal.appendChild(li);
        }
    });
});

// Fungsi helper untuk alert isi (karena onclick di HTML string sulit baca kutip)
window.lihatDetail = function(isiEncoded) {
    const isi = decodeURIComponent(isiEncoded);
    // Tampilkan di modal atau alert simpel
    // Agar rapi kita pakai console atau window baru, tapi alert cukup untuk tes
    alert(isi.substring(0, 500) + "...\n(Lanjutan dipotong agar muat)");
}
// ==========================================
// FUNGSI TAMBAHAN UNTUK STATISTIK
// ==========================================

// Fungsi untuk update statistik
function updateStatistics(dataArray) {
    const totalModul = dataArray.filter(item => item.tipe === "Modul Ajar").length;
    const totalSoal = dataArray.filter(item => item.tipe === "Bank Soal").length;
    
    // Hitung guru unik
    const uniqueGurus = [...new Set(dataArray.map(item => item.email_guru))];
    
    // Hitung mapel unik
    const uniqueMapels = [...new Set(dataArray.map(item => item.mapel))];
    
    // Update DOM
    document.getElementById('totalModul').textContent = totalModul;
    document.getElementById('totalSoal').textContent = totalSoal;
    document.getElementById('totalGuru').textContent = uniqueGurus.length;
    document.getElementById('totalMapel').textContent = uniqueMapels.length;
    
    document.getElementById('countModul').textContent = totalModul;
    document.getElementById('countSoal').textContent = totalSoal;
    
    // Update trend
    document.getElementById('trendModul').textContent = 
        totalModul > 0 ? `+${totalModul} bulan ini` : 'Belum ada data';
    document.getElementById('trendSoal').textContent = 
        totalSoal > 0 ? `+${totalSoal} bulan ini` : 'Belum ada data';
    
    // Update admin info
    const user = auth.currentUser;
    if (user) {
        document.getElementById('adminInfo').innerText = `Login sebagai: ${user.email}`;
    }
}

// Modifikasi listener onValue untuk include statistics
onValue(dbRef, (snapshot) => {
    // ... kode yang sudah ada ...
    
    // Panggil update statistics
    updateStatistics(dataArray || []);
});