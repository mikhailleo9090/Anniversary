/* =====================================================
   ANNIVERSARY WEBSITE — script.js
   Mikhail Andrew Leo & Arini Indah Sari
   22 Mei 2026
   ===================================================== */

// ===================================================
// 1. PIXEL STICKER BACKGROUND — FASTER + SMOOTHER
//    Efek stiker pixel hati, bintang, bunga, dan sparkle
//    berwarna pink yang jatuh dari atas ke bawah.
// ===================================================

const canvas = document.getElementById('pixelCanvas');
const ctx    = canvas.getContext('2d');

let particles = [];
let deviceScale = 1;
let lastFrameTime = performance.now();

function resizeCanvas() {
  deviceScale = Math.min(window.devicePixelRatio || 1, 2);

  const width  = window.innerWidth;
  const height = window.innerHeight;

  canvas.style.width  = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width  = Math.floor(width * deviceScale);
  canvas.height = Math.floor(height * deviceScale);

  // Membuat gambar lebih tajam dan halus di layar high-DPI.
  ctx.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Bentuk partikel dibuat seperti stiker pixel romantis.
const PARTICLE_TYPES = [
  { char: '♥', color: '#ff4f9a', size: 18 },
  { char: '♥', color: '#ff78b6', size: 14 },
  { char: '♥', color: '#ffadd2', size: 22 },
  { char: '♡', color: '#ffc4dd', size: 18 },
  { char: '★', color: '#ff8fc7', size: 14 },
  { char: '✦', color: '#ffb6d9', size: 13 },
  { char: '✧', color: '#ffd6ea', size: 12 },
  { char: '✿', color: '#ff9ccd', size: 16 },
  { char: '❀', color: '#ff78b6', size: 17 },
  { char: '❋', color: '#ffc4dd', size: 14 }
];

function createParticle() {
  const type = PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)];
  const startX = Math.random() * window.innerWidth;

  return {
    baseX: startX,
    x: startX,
    y: -50 - Math.random() * 140,
    char: type.char,
    color: type.color,
    size: type.size + Math.random() * 7,

    // Lebih cepat dari versi sebelumnya, tapi tetap lembut.
    fallSpeed: 95 + Math.random() * 95,       // pixel per detik
    driftSpeed: (Math.random() - 0.5) * 22,   // gerak kiri-kanan halus
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 1.15 + Math.random() * 1.15,
    wobbleAmount: 7 + Math.random() * 14,

    opacity: 0.62 + Math.random() * 0.34,
    rotation: Math.random() * Math.PI * 2,
    rotateSpeed: (Math.random() - 0.5) * 0.55
  };
}

// Mulai dengan partikel yang tersebar agar background langsung hidup saat website dibuka.
function initParticles() {
  particles = [];

  for (let i = 0; i < 80; i++) {
    const p = createParticle();
    p.y = Math.random() * window.innerHeight;
    p.baseX = Math.random() * window.innerWidth;
    p.x = p.baseX;
    particles.push(p);
  }
}

function updateParticles(deltaTime) {
  // Tambah partikel baru secara bertahap agar hujannya terasa hidup.
  if (Math.random() < 0.16 && particles.length < 145) {
    particles.push(createParticle());
  }

  particles.forEach(p => {
    p.y        += p.fallSpeed * deltaTime;
    p.baseX    += p.driftSpeed * deltaTime;
    p.wobble   += p.wobbleSpeed * deltaTime;
    p.rotation += p.rotateSpeed * deltaTime;

    // Gerakan horizontal dibuat sinus supaya lebih smooth, bukan patah-patah.
    p.x = p.baseX + Math.sin(p.wobble) * p.wobbleAmount;

    // Partikel yang keluar bawah layar akan muncul lagi dari atas.
    if (p.y > window.innerHeight + 70) {
      p.y = -70 - Math.random() * 100;
      p.baseX = Math.random() * window.innerWidth;
      p.x = p.baseX;
    }

    // Biar partikel tidak hilang terlalu jauh ke kiri/kanan.
    if (p.baseX < -80) p.baseX = window.innerWidth + 40;
    if (p.baseX > window.innerWidth + 80) p.baseX = -40;
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);

    // Efek napas kecil agar stiker terasa lebih hidup dan smooth.
    const softPulse = 1 + Math.sin(p.wobble * 1.35) * 0.025;
    ctx.scale(softPulse, softPulse);

    // Font monospace + outline putih membuatnya terasa seperti stiker/pixel lucu.
    ctx.font = `bold ${p.size}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Outline putih lembut seperti stiker.
    ctx.lineWidth = Math.max(2.5, p.size * 0.18);
    ctx.strokeStyle = 'rgba(255, 244, 250, 0.90)';
    ctx.strokeText(p.char, 0, 0);

    // Glow pink agar cocok dengan background hitam-pink.
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 16;

    // Isi utama partikel.
    ctx.fillStyle = p.color;
    ctx.fillText(p.char, 0, 0);

    ctx.restore();
  });
}

function animateCanvas(currentTime = performance.now()) {
  // Delta time membuat animasi lebih stabil/smooth di berbagai device.
  const deltaTime = Math.min((currentTime - lastFrameTime) / 1000, 0.033);
  lastFrameTime = currentTime;

  updateParticles(deltaTime);
  drawParticles();
  requestAnimationFrame(animateCanvas);
}

initParticles();
requestAnimationFrame(animateCanvas);


// ===================================================
// 2. MUSIC PLAYER
//    Toggle play/pause musik background
// ===================================================

const bgMusic   = document.getElementById('bgMusic');
const musicBtn  = document.getElementById('musicBtn');
const musicLabel = document.getElementById('musicLabel');
let   isPlaying = false;

function toggleMusic() {
  if (isPlaying) {
    bgMusic.pause();
    musicLabel.textContent = 'Putar Lagu Kita';
    musicBtn.style.background = 'linear-gradient(135deg, #e8829a, #e8c8f0)';
  } else {
    bgMusic.play().catch(() => {
      console.log('Autoplay blocked — user interaction required.');
    });
    musicLabel.textContent = 'Pause Musik';
    musicBtn.style.background = 'linear-gradient(135deg, #c060a0, #8060c0)';
  }
  isPlaying = !isPlaying;
}

// Mobile: sembunyikan label, tampilkan ikon saja
function checkMobileMusic() {
  const label = document.getElementById('musicLabel');
  if (window.innerWidth <= 768) {
    label.style.display = 'none';
  } else {
    label.style.display = 'inline';
  }
}
window.addEventListener('resize', checkMobileMusic);
checkMobileMusic();


// ===================================================
// 3. ANNIVERSARY COUNTER
//    Menghitung waktu sejak/ke tanggal anniversary
// ===================================================

// Ganti START_DATE dengan tanggal awal hubungan kamu
// Format: tahun, bulan-1 (0=Jan, 4=Mei), tanggal
const START_DATE = new Date(2025, 4, 22); // 22 Mei 2025 — ganti jika perlu
const ANNIVERSARY_DATE = new Date(2026, 4, 22); // 22 Mei 2026

function updateCounter() {
  const now  = new Date();
  const diff = now - START_DATE; // milidetik

  if (diff < 0) {
    // Belum dimulai — hitung mundur ke tanggal mulai
    const remaining = START_DATE - now;
    showCountdown(remaining, 'Menuju hari istimewa kita...');
    return;
  }

  // Sudah berjalan — hitung durasi
  const totalSec  = Math.floor(diff / 1000);
  const seconds   = totalSec % 60;
  const minutes   = Math.floor(totalSec / 60) % 60;
  const hours     = Math.floor(totalSec / 3600) % 24;
  const days      = Math.floor(totalSec / 86400);

  document.getElementById('countDays').textContent    = String(days).padStart(2, '0');
  document.getElementById('countHours').textContent   = String(hours).padStart(2, '0');
  document.getElementById('countMinutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('countSeconds').textContent = String(seconds).padStart(2, '0');

  // Pesan berdasarkan tanggal
  const msg = document.getElementById('counterMsg');
  if (now >= ANNIVERSARY_DATE) {
    msg.textContent = '✨ Kita sudah melewati hari anniversary pertama kita — dan semoga ini baru awal dari banyak tahun indah berikutnya. ✨';
  } else {
    msg.textContent = '💕 Setiap detiknya berharga bersamamu, Arini.';
  }
}

updateCounter();
setInterval(updateCounter, 1000);


// ===================================================
// 4. SURPRISE MODAL
//    Pop-up kejutan dengan efek hati pixel
// ===================================================

function openSurprise() {
  const modal = document.getElementById('surpriseModal');
  modal.classList.add('active');
  spawnModalHearts();
}

function closeSurprise() {
  const modal = document.getElementById('surpriseModal');
  modal.classList.remove('active');
  // Bersihkan hati animasi
  document.getElementById('modalHearts').innerHTML = '';
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('surpriseModal')) {
    closeSurprise();
  }
}

// Tutup modal dengan tombol Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSurprise();
});

// Efek hati pixel melayang di dalam modal
function spawnModalHearts() {
  const container = document.getElementById('modalHearts');
  container.innerHTML = '';

  const heartChars = ['💗', '💕', '✨', '🌸', '💖', '⭐'];
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement('span');
    heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    heart.style.cssText = `
      position: absolute;
      font-size: ${10 + Math.random() * 16}px;
      left: ${Math.random() * 100}%;
      top: ${100 + Math.random() * 20}%;
      opacity: 0;
      pointer-events: none;
      animation: modalHeartFloat ${1.5 + Math.random() * 2}s ease-out ${Math.random() * 0.8}s forwards;
    `;
    container.appendChild(heart);
  }
}

// Inject keyframes untuk animasi hati modal
(function injectModalKeyframes() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes modalHeartFloat {
      0%   { transform: translateY(0) scale(0.5); opacity: 0; }
      30%  { opacity: 1; }
      100% { transform: translateY(-260px) scale(1.2); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();


// ===================================================
// 5. SCROLL REVEAL
//    Elemen muncul dengan animasi saat di-scroll
// ===================================================

function initScrollReveal() {
  // Tambahkan class scroll-reveal ke semua section cards
  const targets = document.querySelectorAll(
    '.counter-card, .timeline-card, .polaroid, .reason-card, .letter-envelope, .ldr-content'
  );

  targets.forEach(el => {
    el.classList.add('scroll-reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Delay bertahap untuk kelompok elemen
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, 80 * (i % 6));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
}

// Jalankan setelah DOM siap
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
});
