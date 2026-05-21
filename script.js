/* =====================================================
   ANNIVERSARY WEBSITE — script.js
   Mikhail Andrew Leo & Arini Indah Sari
   22 Mei 2026
   ===================================================== */

// ===================================================
// 1. PIXEL CANVAS ANIMATION
//    Membuat partikel hati, bintang, dan sparkle pixel
//    yang jatuh dari atas ke bawah
// ===================================================

const canvas = document.getElementById('pixelCanvas');
const ctx    = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Tipe partikel pixel
const PARTICLE_TYPES = [
  { char: '♥', color: '#f4a7b9', size: 14 },
  { char: '♥', color: '#e8829a', size: 10 },
  { char: '♥', color: '#ffc8d8', size: 18 },
  { char: '★', color: '#f0c070', size: 12 },
  { char: '✦', color: '#e8c8f0', size: 10 },
  { char: '✿', color: '#fadadd', size: 13 },
  { char: '✧', color: '#f4a7b9', size: 9  },
  { char: '❋', color: '#e8c8f0', size: 11 },
];

function createParticle() {
  const type   = PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)];
  const x      = Math.random() * canvas.width;
  const speed  = 0.4 + Math.random() * 0.8;
  const drift  = (Math.random() - 0.5) * 0.4;
  const wobble = Math.random() * Math.PI * 2;

  return {
    x, y: -30,
    char:    type.char,
    color:   type.color,
    size:    type.size + Math.random() * 4,
    speed,
    drift,
    wobble,
    wobbleSpeed: 0.02 + Math.random() * 0.03,
    opacity:     0.3 + Math.random() * 0.5,
    rotation:    Math.random() * Math.PI * 2,
    rotateSpeed: (Math.random() - 0.5) * 0.02,
  };
}

// Mulai dengan beberapa partikel tersebar
function initParticles() {
  for (let i = 0; i < 40; i++) {
    const p = createParticle();
    p.y = Math.random() * canvas.height;
    particles.push(p);
  }
}

function updateParticles() {
  // Tambah partikel baru secara berkala
  if (Math.random() < 0.06 && particles.length < 80) {
    particles.push(createParticle());
  }

  particles.forEach(p => {
    p.y        += p.speed;
    p.wobble   += p.wobbleSpeed;
    p.x        += p.drift + Math.sin(p.wobble) * 0.5;
    p.rotation += p.rotateSpeed;
  });

  // Hapus partikel yang sudah keluar layar
  particles = particles.filter(p => p.y < canvas.height + 40);
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.font         = `${p.size}px serif`;
    ctx.fillStyle    = p.color;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.char, 0, 0);
    ctx.restore();
  });
}

function animateCanvas() {
  updateParticles();
  drawParticles();
  requestAnimationFrame(animateCanvas);
}

initParticles();
animateCanvas();


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
