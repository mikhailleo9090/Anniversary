# 💗 Happy 1st Anniversary — Mikhail & Arini
**Website Anniversary 22 Mei 2026**

---

## 📁 Struktur Folder

```
anniversary/
├── index.html          ← File utama website
├── style.css           ← Semua styling
├── script.js           ← Animasi, counter, musik, modal
├── README.md           ← Panduan ini
└── assets/
    ├── images/
    │   ├── photo1.jpg  ← Ganti dengan foto kamu
    │   ├── photo2.jpg
    │   ├── photo3.jpg
    │   ├── photo4.jpg
    │   ├── photo5.jpg
    │   └── photo6.jpg
    └── music/
        └── our-song.mp3  ← File musik (sudah ada: EVERYTHING.mp3)
```

---

## 🖼️ Cara Mengganti Foto

1. Siapkan foto-foto kamu (format: `.jpg`, `.jpeg`, `.png`, `.webp`)
2. Rename file-nya menjadi: `photo1.jpg`, `photo2.jpg`, dst.
3. Masukkan ke folder `assets/images/`
4. Selesai! Foto akan otomatis muncul di galeri.

**Mengganti caption foto:**
Buka `index.html`, cari bagian `<p class="polaroid-caption">`, lalu edit teksnya.

**Menambah lebih dari 6 foto:**
Copy-paste blok `<div class="polaroid">` di dalam `index.html` dan ganti nomornya.

---

## 🎵 Cara Mengganti/Menambah Musik

File musik kamu (`EVERYTHING.mp3`) sudah disimpan sebagai `assets/music/our-song.mp3`.

Jika ingin ganti file musik:
1. Rename file musik kamu menjadi `our-song.mp3`
2. Taruh di folder `assets/music/`
3. Atau ganti path di `index.html` baris ini:
   ```html
   <source src="assets/music/our-song.mp3" type="audio/mpeg" />
   ```

---

## 📅 Cara Mengubah Tanggal Mulai Hubungan (Counter)

Buka `script.js`, cari baris ini:
```javascript
const START_DATE = new Date(2025, 4, 22);
```
Ganti dengan tanggal awal hubungan kamu (ingat: bulan dimulai dari 0, jadi Januari=0, Mei=4, Desember=11).

---

## 📝 Cara Mengubah Isi Timeline

Buka `index.html`, cari section dengan `id="timeline"`.
Ganti teks di dalam `<div class="timeline-card">` sesuai momen nyata kalian.

---

## 🚀 Deploy ke GitHub Pages

### Langkah 1 — Buat Repository Baru
1. Buka [github.com](https://github.com) dan login
2. Klik tombol **"New"** (buat repository baru)
3. Beri nama, misal: `anniversary-mikhail-arini`
4. Set ke **Public**
5. Klik **"Create repository"**

### Langkah 2 — Upload Files
**Cara mudah (drag & drop):**
1. Buka repository yang baru dibuat
2. Klik **"uploading an existing file"**
3. Drag semua file dan folder (`index.html`, `style.css`, `script.js`, `assets/`) ke sana
4. Klik **"Commit changes"**

**Atau via Git:**
```bash
git init
git add .
git commit -m "Anniversary website Mikhail & Arini"
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git push -u origin main
```

### Langkah 3 — Aktifkan GitHub Pages
1. Di repository, klik tab **Settings**
2. Scroll ke bawah, cari **Pages** di sidebar kiri
3. Di bawah "Source", pilih **Deploy from a branch**
4. Pilih branch **main**, folder **/ (root)**
5. Klik **Save**

### Langkah 4 — Cek Link
Setelah beberapa menit, website kamu live di:
```
https://USERNAME.github.io/REPO-NAME/
```
Ganti `USERNAME` dengan username GitHub kamu dan `REPO-NAME` dengan nama repository.

---

## 💡 Tips

- Pastikan semua nama file **huruf kecil** (lowercase) agar tidak ada masalah di server Linux.
- Jika foto tidak muncul, cek nama file di folder `assets/images/` sudah sesuai.
- Website 100% static — tidak perlu backend, database, atau hosting berbayar.
- Sudah mobile-friendly dan responsif untuk HP dan laptop.

---

*Made with 💕 for Arini · 22 Mei 2026*
