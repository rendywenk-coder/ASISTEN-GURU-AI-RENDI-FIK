import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

// 1. CEK STATUS LOGIN (PROTEKSI HALAMAN)
onAuthStateChanged(auth, (user) => {
    const path = window.location.pathname;
    
    // Jika user SUDAH login tapi masih di halaman login (index.html)
    if (user && (path.includes("index.html") || path.endsWith("/"))) {
        // Cek email untuk menentukan arah (Logika sederhana)
        // Pastikan email kepsek mengandung kata 'kepsek' atau 'admin'
        if (user.email.includes("kepsek") || user.email.includes("admin")) {
            window.location.href = "kepsek.html";
        } else {
            window.location.href = "dashboard.html";
        }
    }

    // Jika user BELUM login tapi mencoba masuk dashboard/kepsek
    if (!user && (path.includes("dashboard.html") || path.includes("kepsek.html"))) {
        window.location.href = "index.html";
    }

    // Tampilkan email user jika di dashboard
    if (user) {
        const infoEl = document.getElementById('guruInfo');
        if (infoEl) infoEl.innerText = `Login sebagai: ${user.email}`;
    }
});

// 2. PROSES LOGIN
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = document.getElementById('btnLogin');

        try {
            btn.innerText = "Memverifikasi...";
            btn.disabled = true;
            errorMsg.innerText = "";

            await signInWithEmailAndPassword(auth, email, password);
            // Redirect ditangani oleh onAuthStateChanged di atas
            
        } catch (error) {
            console.error(error);
            errorMsg.innerText = "Login Gagal! Periksa Email/Password.";
            btn.innerText = "MASUK";
            btn.disabled = false;
        }
    });
}

// 3. FUNGSI LOGOUT (Global)
// Kita tempel ke window agar bisa dipanggil via onclick HTML
window.logoutFirebase = async () => {
    if (confirm("Yakin ingin keluar?")) {
        await signOut(auth);
        window.location.href = "index.html";
    }
};