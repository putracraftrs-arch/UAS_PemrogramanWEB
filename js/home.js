// ==========================================
// CAROUSEL
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.getElementById("carouselViewport");
  if (!viewport) return;

  const track = document.getElementById("carouselTrack");
  const dotsEl = document.getElementById("carouselDots");
  const btnPrev = document.getElementById("carouselPrev");
  const btnNext = document.getElementById("carouselNext");
  const cards = Array.from(track.querySelectorAll(".film-card-v2"));
  const total = cards.length;
  const GAP = 16;
  let currentIdx = 0;

  function getVisible() {
    const w = viewport.offsetWidth;
    if (w >= 820) return 5;
    if (w >= 620) return 4;
    if (w >= 420) return 3;
    return 2;
  }

  function getCardWidth() {
    const v = getVisible();
    return (viewport.offsetWidth - GAP * (v - 1)) / v;
  }

  function maxIndex() {
    return Math.max(0, total - getVisible());
  }

  function setWidths() {
    const w = getCardWidth();
    cards.forEach((c) => {
      c.style.width = w + "px";
      c.style.flexShrink = "0";
    });
  }

  function moveTo(idx) {
    currentIdx = Math.max(0, Math.min(idx, maxIndex()));
    const w = getCardWidth();
    track.style.transform = `translateX(-${currentIdx * (w + GAP)}px)`;
    if (btnPrev) btnPrev.disabled = currentIdx === 0;
    if (btnNext) btnNext.disabled = currentIdx >= maxIndex();
    updateDots();
  }

  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = "";
    const v = getVisible();
    const pages = Math.ceil(total / v);
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", "Halaman " + (i + 1));
      dot.addEventListener("click", () => {
        const vNow = getVisible();
        moveTo(Math.min(i * vNow, maxIndex()));
      });
      dotsEl.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsEl) return;
    const v = getVisible();
    const activePage = Math.round(currentIdx / v);
    dotsEl.querySelectorAll(".carousel-dot").forEach((d, i) => {
      d.classList.toggle("active", i === activePage);
    });
  }

  btnPrev?.addEventListener("click", () => moveTo(currentIdx - 1));
  btnNext?.addEventListener("click", () => moveTo(currentIdx + 1));

  let touchX = 0;
  track.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", (e) => {
    const dx = touchX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) moveTo(currentIdx + (dx > 0 ? 1 : -1));
  }, { passive: true });

  function init() {
    setWidths();
    buildDots();
    moveTo(0);
  }

  window.addEventListener("resize", () => {
    setWidths();
    buildDots();
    moveTo(Math.min(currentIdx, maxIndex()));
  });

  init();
});

// ==========================================
// MODAL HELPERS (sama persis dengan trending.js)
// ==========================================

const HOME_KEY_VOTES = "cinego_trend_votes";
const HOME_KEY_VOTED = "cinego_trend_voted";
const HOME_KEY_WL    = "cinego_wishlist";

let homeOpenFilmId = null;

function homeGetVoteCounts() {
  return JSON.parse(localStorage.getItem(HOME_KEY_VOTES) || "{}");
}
function homeGetVotedList() {
  return JSON.parse(localStorage.getItem(HOME_KEY_VOTED) || "[]");
}
function homeHasVoted(id) {
  return homeGetVotedList().includes(id);
}
function homeCastVote(id) {
  if (homeHasVoted(id)) return false;
  const counts = homeGetVoteCounts();
  counts[id] = (counts[id] || 0) + 1;
  localStorage.setItem(HOME_KEY_VOTES, JSON.stringify(counts));
  const voted = homeGetVotedList();
  voted.push(id);
  localStorage.setItem(HOME_KEY_VOTED, JSON.stringify(voted));
  return true;
}
function homeTotalVotes(film) {
  return film.baseVotes + (homeGetVoteCounts()[film.id] || 0);
}
function homeGetWishlist() {
  if (typeof AUTH === "undefined") return [];
  const session = AUTH.getSession();
  if (!session) return [];
  return (JSON.parse(localStorage.getItem(HOME_KEY_WL) || "{}")[session.email] || []);
}
function homeInWishlist(id) {
  return homeGetWishlist().includes(id);
}
function homeToggleWishlist(id) {
  if (typeof AUTH === "undefined") {
    homeShowToast("🔒 Login terlebih dahulu untuk menggunakan fitur Wishlist.");
    return;
  }
  const session = AUTH.getSession();
  if (!session) {
    homeShowToast("🔒 Login terlebih dahulu untuk menggunakan fitur Wishlist.");
    return;
  }
  const email = session.email;
  const all = JSON.parse(localStorage.getItem(HOME_KEY_WL) || "{}");
  const wl = all[email] || [];
  if (wl.includes(id)) {
    all[email] = wl.filter((x) => x !== id);
    homeShowToast("💔 Dihapus dari wishlist.");
  } else {
    all[email] = [...wl, id];
    homeShowToast("❤️ Ditambahkan ke wishlist!");
  }
  localStorage.setItem(HOME_KEY_WL, JSON.stringify(all));
  // Refresh tampilan modal jika sedang terbuka
  if (homeOpenFilmId === id) homePopulateModal(id);
}
function homeShowToast(msg, ms = 2300) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), ms);
}
function homeFmtVotes(n) {
  return n >= 1000
    ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k"
    : n.toLocaleString("id-ID");
}
function homeFmtDur(min) {
  const h = Math.floor(min / 60), m = min % 60;
  return h ? `${h}j ${m}m` : `${m} menit`;
}
function homeEsc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ==========================================
// POPULATE MODAL — identik logikanya dengan trending.js
// ==========================================

function homePopulateModal(id) {
  const films = (typeof FILMS_TR !== "undefined") ? FILMS_TR : [];
  const f = films.find((x) => x.id === id);
  if (!f) return;

  const votes = homeTotalVotes(f);
  const voted = homeHasVoted(id);
  const wled  = homeInWishlist(id);
  const encImg = encodeURIComponent(f.film.slice(0, 14));

  // Poster
  const mPoster = document.getElementById("mPoster");
  mPoster.src = f.poster;
  mPoster.alt = f.film;
  mPoster.onerror = function () {
    this.src = `https://placehold.co/100x142/120a02/fb923c?text=${encImg}`;
  };

  // Judul & Rating
  document.getElementById("mTitle").textContent = f.film;
  document.getElementById("mRating").innerHTML = f.comingSoon
    ? `<span class="modal-rating-tbd">Belum Ada Rating</span>`
    : `⭐ ${f.rating} <small>/ 10</small>`;

  // Pills: genre · tahun · durasi
  document.getElementById("mPills").innerHTML =
    `<span class="mpill mpill-genre">${homeEsc(f.genre)}</span>` +
    `<span class="mpill mpill-year">📅 ${f.tahun}</span>` +
    `<span class="mpill mpill-dur">⏱ ${homeFmtDur(f.durasi)}</span>`;

  // Sinopsis
  document.getElementById("mSinopsis").textContent = f.sinopsis;

  // Info grid: sutradara · durasi · pemain
  document.getElementById("mInfoGrid").innerHTML = `
    <div class="modal-info-item"><div class="mi-lbl">Sutradara</div><div class="mi-val">${homeEsc(f.sutradara)}</div></div>
    <div class="modal-info-item"><div class="mi-lbl">Durasi</div><div class="mi-val">${f.durasi} menit</div></div>
    <div class="modal-info-item" style="grid-column:1/-1"><div class="mi-lbl">Pemain</div><div class="mi-val">${homeEsc(f.pemain)}</div></div>
  `;

  // Vote bar
  document.getElementById("mVoteNum").textContent = f.comingSoon ? "-" : homeFmtVotes(votes);
  document.getElementById("mVoteSub").textContent = f.comingSoon
    ? "Film belum dirilis"
    : "vote pengguna minggu ini";

  // Tombol Vote
  const btnVote = document.getElementById("btnModalVote");
  if (f.comingSoon) {
    btnVote.style.display = "none";
  } else {
    btnVote.style.display = "";
    btnVote.textContent = voted ? "✓ Sudah Divote" : "🔥 Vote Film Ini";
    btnVote.className   = "btn-modal-vote" + (voted ? " mv-voted" : "");
    btnVote.onclick     = () => {
      if (homeCastVote(id)) {
        homeShowToast("🔥 Vote berhasil! Terima kasih sudah memilih.");
        homePopulateModal(id);
      }
    };
  }

  // Tombol Wishlist
  const btnWl = document.getElementById("btnModalWl");
  btnWl.innerHTML   = wled ? "❤️ Ada di Wishlist" : "🤍 Simpan ke Wishlist";
  btnWl.className   = "btn-modal-wl" + (wled ? " mwl-on" : "");
  btnWl.onclick     = () => homeToggleWishlist(id);

  // Tombol Pesan Tiket
  document.getElementById("btnModalBook").href = `Booking.html?film=${f.bookingKey}`;
}

// ==========================================
// BUKA MODAL — dipanggil dari Home.html
// Cari film di FILMS_TR berdasarkan judul;
// jika ketemu, tampilkan data lengkap seperti di halaman Trending.
// ==========================================

function openMovieModal(judul, genre, durasi, poster, sinopsis) {
  const modal = document.getElementById("filmModalOverlay");
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Cari film di data bersama berdasarkan judul
  const films = (typeof FILMS_TR !== "undefined") ? FILMS_TR : [];
  const f = films.find((x) => x.film === judul);

  if (f) {
    // ✅ Data lengkap ditemukan → tampilkan seperti halaman Trending
    homeOpenFilmId = f.id;
    homePopulateModal(f.id);
  } else {
    // ⚠️ Fallback: film tidak ada di FILMS_TR, pakai data minimal dari parameter
    homeOpenFilmId = null;

    const mPoster = document.getElementById("mPoster");
    mPoster.src = poster;
    mPoster.alt = judul;

    document.getElementById("mTitle").textContent = judul;
    document.getElementById("mRating").innerHTML = "";
    document.getElementById("mPills").innerHTML =
      `<span class="mpill mpill-genre">${genre}</span>` +
      `<span class="mpill mpill-dur">⏱ ${durasi}</span>`;
    document.getElementById("mSinopsis").textContent = sinopsis;
    document.getElementById("mInfoGrid").innerHTML = `
      <div class="modal-info-item"><div class="mi-lbl">Genre</div><div class="mi-val">${genre}</div></div>
      <div class="modal-info-item"><div class="mi-lbl">Durasi</div><div class="mi-val">${durasi}</div></div>
    `;
    document.getElementById("mVoteNum").textContent = "-";
    document.getElementById("mVoteSub").textContent = "Data tidak tersedia";
    document.getElementById("btnModalVote").style.display = "none";
    document.getElementById("btnModalWl").innerHTML = "🤍 Simpan ke Wishlist";
    document.getElementById("btnModalWl").className  = "btn-modal-wl";
    document.getElementById("btnModalBook").href =
      "Booking.html?film=" + encodeURIComponent(judul);
  }
}

// ==========================================
// TUTUP MODAL
// ==========================================

function closeMovieModal() {
  const modal = document.getElementById("filmModalOverlay");
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  homeOpenFilmId = null;
}

document.addEventListener("DOMContentLoaded", function () {
  const btnClose = document.getElementById("btnModalClose");
  if (btnClose) btnClose.addEventListener("click", closeMovieModal);

  const overlay = document.getElementById("filmModalOverlay");
  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeMovieModal();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMovieModal();
  });
});
