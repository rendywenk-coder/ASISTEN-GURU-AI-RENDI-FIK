// ai.js - Versi Lengkap dan Terintegrasi
async function panggilAIChat(promptTeks) {
    const output = document.getElementById("output");
    const loading = document.getElementById("loading");
    const btnAI = document.getElementById("btnAI");
    
    if (!promptTeks.trim()) {
        alert("Silakan ketik perintah untuk AI!");
        return null;
    }
    
    // Show loading
    if (loading) loading.style.display = 'block';
    if (btnAI) {
        btnAI.innerHTML = '<span class="icon">⏳</span> Memproses...';
        btnAI.disabled = true;
    }
    
    // Set output awal
    if (output) {
        output.innerHTML = "⏳ AI sedang memproses permintaan Anda...";
    }
    
    try {
        console.log("Mengirim permintaan ke AI...");
        
        // Gunakan endpoint yang sama dengan dashboard
        const response = await fetch("https://asisten-guru-ai.rendirahadian92.workers.dev/", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                prompt: promptTeks,
                system_prompt: "Anda adalah Asisten Guru AI yang ahli dalam pendidikan. Berikan jawaban yang relevan, mendalam, dan sesuai dengan konteks pendidikan Indonesia."
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Response dari AI:", data);
        
        let hasilTeks = "Maaf, AI tidak merespons dengan benar. Coba lagi.";
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            hasilTeks = data.choices[0].message.content;
        } else if (data.response) {
            hasilTeks = data.response;
        } else if (data.error) {
            hasilTeks = `Error: ${data.error}`;
        }
        
        // Format output dengan rapi
        const formattedText = formatOutput(hasilTeks);
        
        if (output) {
            output.innerHTML = formattedText;
            // Scroll ke output
            output.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        return formattedText;
        
    } catch (error) {
        console.error("Error memanggil AI:", error);
        
        const errorMessage = `❌ Terjadi kesalahan saat memproses permintaan AI:<br><br>
<strong>Detail Error:</strong> ${error.message}<br><br>
<strong>Solusi:</strong><br>
1. Periksa koneksi internet Anda<br>
2. Coba lagi beberapa saat<br>
3. Gunakan perintah yang lebih spesifik<br>
4. Hubungi administrator jika masalah berlanjut`;

        if (output) {
            output.innerHTML = errorMessage;
        }
        
        return errorMessage;
    } finally {
        // Hide loading
        if (loading) loading.style.display = 'none';
        if (btnAI) {
            btnAI.innerHTML = '<span class="icon">✨</span> Proses dengan AI';
            btnAI.disabled = false;
        }
    }
}

// Fungsi untuk format output
function formatOutput(text) {
    // Tambahkan emoji berdasarkan konteks
    let formatted = text;
    
    // Deteksi tipe konten
    if (text.toLowerCase().includes('rpp') || text.toLowerCase().includes('modul')) {
        formatted = "📚 <strong>HASIL RPP/MODUL AJAR</strong>\n\n" + text;
    } else if (text.toLowerCase().includes('soal') || text.toLowerCase().includes('kisi')) {
        formatted = "📝 <strong>HASIL SOAL & EVALUASI</strong>\n\n" + text;
    } else if (text.toLowerCase().includes('rangku') || text.toLowerCase().includes('materi')) {
        formatted = "📖 <strong>HASIL RANGKUMAN MATERI</strong>\n\n" + text;
    } else {
        formatted = "👨‍🏫 <strong>HASIL KONSULTASI AI</strong>\n\n" + text;
    }
    
    // Format heading
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Format list
    formatted = formatted.replace(/^\d+\.\s+(.*$)/gm, '<br>• $1');
    formatted = formatted.replace(/^-\s+(.*$)/gm, '<br>• $1');
    
    // Format new lines
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Tambahkan footer
    formatted += `<br><br><hr style="border: 1px solid #e2e8f0; margin: 20px 0;">
    <div style="font-size: 0.9em; color: #64748b;">
    <strong>💡 Tips:</strong> Anda bisa menyalin teks di atas atau meminta AI untuk memperjelas bagian tertentu.
    </div>`;
    
    return formatted;
}

// Fungsi untuk menangani prompt dari contoh
function insertPrompt(element) {
    const promptInput = document.getElementById('promptInput');
    if (promptInput) {
        promptInput.value = element.textContent;
        promptInput.focus();
        
        // Auto-resize
        promptInput.style.height = 'auto';
        promptInput.style.height = (promptInput.scrollHeight) + 'px';
    }
}

// Fungsi untuk menyalin output
function copyOutput() {
    const output = document.getElementById('output');
    if (!output) return;
    
    // Ambil teks tanpa HTML tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = output.innerHTML;
    const cleanText = tempDiv.textContent || tempDiv.innerText || '';
    
    navigator.clipboard.writeText(cleanText)
        .then(() => {
            // Show feedback
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = '✅ Tersalin!';
            btn.style.background = '#10b981';
            btn.style.color = 'white';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 2000);
        })
        .catch(err => {
            console.error('Gagal menyalin: ', err);
            alert('Gagal menyalin teks ke clipboard');
        });
}

// Fungsi untuk menghapus output
function clearOutput() {
    if (confirm('Hapus semua output?')) {
        const output = document.getElementById('output');
        if (output) {
            output.innerHTML = 'Output telah dihapus. Mulai konsultasi baru di atas.<br><br>💡 <em>Klik contoh perintah di atas untuk memulai cepat.</em>';
        }
    }
}

// Fungsi utama untuk memproses AI (dipanggil dari button)
async function prosesAI() {
    const promptInput = document.getElementById('promptInput');
    if (!promptInput) return;
    
    const prompt = promptInput.value.trim();
    await panggilAIChat(prompt);
    
    // Clear input setelah selesai (opsional)
    // promptInput.value = '';
}

// Fungsi untuk auto-resize textarea
function initAutoResize() {
    const promptInput = document.getElementById('promptInput');
    if (promptInput) {
        promptInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
        
        // Juga tambahkan event untuk Enter key (tapi tetap submit form)
        promptInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                prosesAI();
            }
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initAutoResize();
    
    // Tambahkan event listener untuk contoh prompt
    document.querySelectorAll('.prompt-example').forEach(element => {
        element.addEventListener('click', function() {
            insertPrompt(this);
        });
    });
    
    // Buat fungsi global untuk dipanggil dari HTML
    window.prosesAI = prosesAI;
    window.insertPrompt = insertPrompt;
    window.copyOutput = copyOutput;
    window.clearOutput = clearOutput;
});

// Export fungsi untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        panggilAIChat,
        prosesAI,
        insertPrompt,
        copyOutput,
        clearOutput
    };
}