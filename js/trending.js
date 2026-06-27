document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("trendContainer")) return;
  // FILMS_TR dimuat dari js/films-data.js (global)

  const KEY_VOTES = "cinego_trend_votes";
  const KEY_VOTED = "cinego_trend_voted";
  const KEY_WL = "cinego_wishlist";

  let activeGenre = "Semua",
    activeSort = "votes",
    searchQuery = "",
    viewMode = "grid",
    openFilmId = null;

  function getVoteCounts() {
    return JSON.parse(localStorage.getItem(KEY_VOTES) || "{}");
  }
  function getVotedList() {
    return JSON.parse(localStorage.getItem(KEY_VOTED) || "[]");
  }
  function hasVoted(id) {
    return getVotedList().includes(id);
  }

  function castVote(id) {
    if (hasVoted(id)) return false;
    const counts = getVoteCounts();
    counts[id] = (counts[id] || 0) + 1;
    localStorage.setItem(KEY_VOTES, JSON.stringify(counts));
    const voted = getVotedList();
    voted.push(id);
    localStorage.setItem(KEY_VOTED, JSON.stringify(voted));
    return true;
  }

  function totalVotes(id) {
    const film = FILMS_TR.find((f) => f.id === id);
    if (!film) return 0;
    return film.baseVotes + (getVoteCounts()[id] || 0);
  }

  function getWishlist() {
    const session = AUTH.getSession();
    if (!session) return [];
    return (
      JSON.parse(localStorage.getItem(KEY_WL) || "{}")[session.email] || []
    );
  }
  function inWishlist(id) {
    return getWishlist().includes(id);
  }

  function toggleWishlist(id) {
    const session = AUTH.getSession();
    if (!session) {
      showToastTR("🔒 Login terlebih dahulu untuk menggunakan fitur Wishlist.");
      return;
    }
    const email = session.email;
    const all = JSON.parse(localStorage.getItem(KEY_WL) || "{}");
    const wl = all[email] || [];
    if (wl.includes(id)) {
      all[email] = wl.filter((x) => x !== id);
      showToastTR("💔 Dihapus dari wishlist.");
    } else {
      all[email] = [...wl, id];
      showToastTR("❤️ Ditambahkan ke wishlist!");
    }
    localStorage.setItem(KEY_WL, JSON.stringify(all));
    render();
    if (openFilmId === id) populateModal(id);
  }

  function showToastTR(msg, ms = 2300) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), ms);
  }

  function fmtVotes(n) {
    return n >= 1000
      ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k"
      : n.toLocaleString("id-ID");
  }
  function fmtDur(min) {
    const h = Math.floor(min / 60),
      m = min % 60;
    return h ? `${h}j ${m}m` : `${m} menit`;
  }
  function rankBadgeClass(r) {
    return r === 1
      ? "rank-1"
      : r === 2
        ? "rank-2"
        : r === 3
          ? "rank-3"
          : "rank-other";
  }
  function rankLabel(r) {
    return r === 1 ? "🥇 #1" : r === 2 ? "🥈 #2" : r === 3 ? "🥉 #3" : `#${r}`;
  }
  function listRankClass(r) {
    return r === 1
      ? "list-rank-1"
      : r === 2
        ? "list-rank-2"
        : r === 3
          ? "list-rank-3"
          : "list-rank-other";
  }
  function escHtmlTR(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildGenrePills() {
    const all = new Set();
    FILMS_TR.forEach((f) => f.tags.forEach((t) => all.add(t)));
    const tags = ["Semua", ...Array.from(all).sort()];
    const wrap = document.getElementById("genrePills");
    wrap.innerHTML = "";
    tags.forEach((tag) => {
      const btn = document.createElement("button");
      btn.className = "genre-pill" + (tag === activeGenre ? " active" : "");
      btn.textContent = tag;
      btn.addEventListener("click", () => {
        activeGenre = tag;
        wrap
          .querySelectorAll(".genre-pill")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        render();
      });
      wrap.appendChild(btn);
    });
  }

  function getFilteredSorted() {
    let list = [...FILMS_TR];
    if (activeGenre !== "Semua")
      list = list.filter((f) => f.tags.includes(activeGenre));
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (f) =>
          f.film.toLowerCase().includes(q) ||
          f.genre.toLowerCase().includes(q) ||
          f.sutradara.toLowerCase().includes(q) ||
          f.pemain.toLowerCase().includes(q),
      );
    }
    switch (activeSort) {
      case "votes":
        list.sort((a, b) => totalVotes(b.id) - totalVotes(a.id));
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "durasi_asc":
        list.sort((a, b) => a.durasi - b.durasi);
        break;
      case "durasi_desc":
        list.sort((a, b) => b.durasi - a.durasi);
        break;
      case "az":
        list.sort((a, b) => a.film.localeCompare(b.film));
        break;
    }
    return list;
  }

  function renderStats() {
    const grand = FILMS_TR.reduce((s, f) => s + totalVotes(f.id), 0);
    const top = [...FILMS_TR].sort(
      (a, b) => totalVotes(b.id) - totalVotes(a.id),
    )[0];
    const wlLen = getWishlist().length;
    document.getElementById("trendStats").innerHTML = `
      <div class="t-stat"><div class="t-stat-icon">🔥</div><div><div class="t-stat-val">${fmtVotes(grand)}</div><div class="t-stat-lbl">Total vote minggu ini</div></div></div>
      <div class="t-stat"><div class="t-stat-icon">🎬</div><div><div class="t-stat-val">${FILMS_TR.filter(f=>!f.comingSoon).length}</div><div class="t-stat-lbl">Film sedang tayang</div></div></div>
      <div class="t-stat"><div class="t-stat-icon">🔔</div><div><div class="t-stat-val">${FILMS_TR.filter(f=>f.comingSoon).length}</div><div class="t-stat-lbl">Segera hadir</div></div></div>
      <div class="t-stat"><div class="t-stat-icon">🏆</div><div><div class="t-stat-val" style="font-size:.88rem;line-height:1.3">${top.film.length > 20 ? top.film.slice(0, 20) + "…" : top.film}</div><div class="t-stat-lbl">Film terpopuler saat ini</div></div></div>
      <div class="t-stat"><div class="t-stat-icon">❤️</div><div><div class="t-stat-val">${wlLen}</div><div class="t-stat-lbl">Film di wishlist kamu</div></div></div>
    `;
  }

  function renderGrid(films) {
    const wrap = document.createElement("div");
    wrap.className = "trend-grid";
    films.forEach((f, idx) => {
      const rank = idx + 1,
        votes = totalVotes(f.id),
        voted = hasVoted(f.id),
        wled = inWishlist(f.id);
      const encImg = encodeURIComponent(f.film.slice(0, 14));
      const card = document.createElement("div");
      card.className = "trend-card";
      card.innerHTML = `
        <div class="rank-badge ${rankBadgeClass(rank)}">${f.comingSoon ? "🔔 Segera" : rankLabel(rank)}</div>
        <button class="wl-card-btn${wled ? " wled" : ""}" data-id="${f.id}" title="${wled ? "Hapus dari wishlist" : "Simpan ke wishlist"}">${wled ? "❤️" : "🤍"}</button>
        <div class="poster-wrap" data-id="${f.id}">
  <img src="${f.poster}" alt="${escHtmlTR(f.film)}" onerror="this.src='https://placehold.co/300x400/120a02/fb923c?text=${encImg}'"/>
  <div class="poster-overlay">
    <span class="btn-detail-overlay"  data-id="${f.id}">
      Lihat Detail →
    </span>
  </div>
</div>
        <div class="trend-card-body">
          <div class="trend-card-title">${escHtmlTR(f.film)}</div>
          <div class="trend-card-genre">${escHtmlTR(f.genre)}</div>
          <div class="trend-card-meta"><span class="rating-pill ${f.comingSoon ? "rating-tbd" : ""}">${f.comingSoon ? "Belum Rilis" : "⭐ " + f.rating}</span><span class="dur-pill">${fmtDur(f.durasi)}</span></div>
          <hr class="trend-divider"/>
${f.comingSoon
  ? `
    <div class="vote-row comingsoon-info">
      <span>🎬 Segera Hadir</span>
    </div>
  `
  : `
    <div class="vote-row">
      <div class="vote-count">
        🔥 ${fmtVotes(votes)} <span class="vlbl">votes</span>
      </div>
      <button class="btn-vote${voted ? " voted" : ""}"
              data-id="${f.id}"
              ${voted ? "disabled" : ""}>
        ${voted ? "✓ Voted" : "+ Vote"}
      </button>
    </div>
  `
}
          ${f.comingSoon ? `<a href="Booking.html?film=${f.bookingKey}" class="btn-card-book btn-card-presale">🎟️ Pre-Sale Tiket</a>` : `<a href="Booking.html?film=${f.bookingKey}" class="btn-card-book">Pesan Tiket</a>`}
        </div>
      `;
      wrap.appendChild(card);
    });
    return wrap;
  }

  function renderList(films) {
    const wrap = document.createElement("div");
    wrap.className = "trend-list";
    films.forEach((f, idx) => {
      const rank = idx + 1,
        votes = totalVotes(f.id),
        voted = hasVoted(f.id),
        wled = inWishlist(f.id);
      const encImg = encodeURIComponent(f.film.slice(0, 12));
      const item = document.createElement("div");
item.className = "trend-list-item";
item.dataset.id = f.id;
      item.innerHTML = `
  <div class="list-rank-num ${listRankClass(rank)}">${rankLabel(rank)}</div>

  <img class="list-poster"
       src="${f.poster}"
       alt="${escHtmlTR(f.film)}"
       onerror="this.src='https://placehold.co/70x100/120a02/fb923c?text=${encImg}'"/>

  <div class="list-info">
    <div class="list-title">${escHtmlTR(f.film)}</div>

    <div class="list-meta">
      <span>${f.comingSoon ? "🔔 Belum Rilis" : "⭐ " + f.rating}</span>
      <span>⏱ ${fmtDur(f.durasi)}</span>
      <span>${f.tahun}</span>
      <span style="color:#3a2010">${escHtmlTR(f.genre)}</span>
    </div>

    <p class="list-sinopsis">${escHtmlTR(f.sinopsis)}</p>
  </div>

  <div class="list-actions">

    ${!f.comingSoon ? `
      <div class="list-vote-num">
        🔥 ${fmtVotes(votes)} <span class="lbl">votes</span>
      </div>

      <div class="list-btn-row">
        <button class="btn-vote${voted ? " voted" : ""}"
                data-id="${f.id}"
                ${voted ? "disabled" : ""}>
          ${voted ? "✓" : "+ Vote"}
        </button>

        <button class="wl-card-btn${wled ? " wled" : ""}"
                data-id="${f.id}">
          ${wled ? "❤️" : "🤍"}
        </button>
      </div>
    ` : `
      <div class="comingsoon-info">
        🎬 Segera Hadir
      </div>

      <div class="list-btn-row">
        <button class="wl-card-btn${wled ? " wled" : ""}"
                data-id="${f.id}">
          ${wled ? "❤️" : "🤍"}
        </button>
      </div>
    `}

    <button class="btn-list-detail" data-id="${f.id}">
      Detail
    </button>

    ${
      f.comingSoon
        ? `<a href="Booking.html?film=${f.bookingKey}"
              class="btn-list-book btn-list-presale">
              🎟️ Pre-Sale
           </a>`
        : `<a href="Booking.html?film=${f.bookingKey}"
              class="btn-list-book">
              Pesan →
           </a>`
    }

  </div>
`;
      wrap.appendChild(item);
    });
    return wrap;
  }
  

  function renderEmpty() {
    const div = document.createElement("div");
    div.className = "trend-empty";
    div.innerHTML = `<div class="ei">🎬</div><h3>Tidak ada film ditemukan</h3><p>Coba ubah kata kunci pencarian atau filter genre.</p>`;
    return div;
  }

  function bindEvents(container) {
    container.querySelectorAll(".btn-vote:not([disabled])").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        if (castVote(id)) {
          showToastTR("🔥 Vote berhasil! Terima kasih sudah memilih.");
          render();
          if (openFilmId === id) populateModal(id);
        }
      });
    });
    container.querySelectorAll(".wl-card-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleWishlist(parseInt(btn.dataset.id));
      });
    });
    container
      .querySelectorAll(".btn-detail-overlay, .btn-list-detail")
      .forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          openModalTR(parseInt(btn.dataset.id));
        });
      });
    container
  .querySelectorAll(".trend-list-card")
  .forEach((card) => {
    card.addEventListener("click", () => {
      openModalTR(parseInt(card.dataset.id));
    });
  });
    container
  .querySelectorAll(".poster-wrap")
  .forEach((poster) => {
    poster.addEventListener("click", () => {
      openModalTR(parseInt(poster.dataset.id));
    });
  });
  container.querySelectorAll(".trend-list-item").forEach((item) => {
  item.addEventListener("click", (e) => {

    // Jangan buka modal kalau klik tombol tertentu
    if (
      e.target.closest(".btn-vote") ||
      e.target.closest(".wl-card-btn") ||
      e.target.closest(".btn-list-book") ||
      e.target.closest(".btn-list-detail")
    ) {
      return;
    }

    openModalTR(parseInt(item.dataset.id));
  });
});
  }

  function render() {
    const films = getFilteredSorted();
    document.getElementById("resultCount").textContent = `${films.length} film`;
    renderStats();
    const container = document.getElementById("trendContainer");
    container.innerHTML = "";
    if (films.length === 0) {
      container.appendChild(renderEmpty());
      return;
    }
    const view = viewMode === "grid" ? renderGrid(films) : renderList(films);
    container.appendChild(view);
    bindEvents(container);
  }

  function populateModal(id) {
    const f = FILMS_TR.find((f) => f.id === id);
    if (!f) return;
    const votes = totalVotes(id),
      voted = hasVoted(id),
      wled = inWishlist(id);
    const encImg = encodeURIComponent(f.film.slice(0, 14));
    const mPoster = document.getElementById("mPoster");
    const voteSub = document.getElementById("mVoteSub");

voteSub.textContent = f.comingSoon
  ? "Film belum dirilis"
  : "vote pengguna minggu ini";
    mPoster.src = f.poster;
    mPoster.alt = f.film;
    mPoster.onerror = function () {
      this.src = `https://placehold.co/100x142/120a02/fb923c?text=${encImg}`;
    };
    document.getElementById("mTitle").textContent = f.film;
    document.getElementById("mRating").innerHTML =
      f.comingSoon
        ? `<span class="modal-rating-tbd">Belum Ada Rating</span>`
        : `⭐ ${f.rating} <small>/ 10</small>`;
    document.getElementById("mSinopsis").textContent = f.sinopsis;
    document.getElementById("mVoteNum").textContent =
  f.comingSoon ? "-" : fmtVotes(votes);
    document.getElementById("mPills").innerHTML =
      `<span class="mpill mpill-genre">${escHtmlTR(f.genre)}</span><span class="mpill mpill-year">📅 ${f.tahun}</span><span class="mpill mpill-dur">⏱ ${fmtDur(f.durasi)}</span>`;
    document.getElementById("mInfoGrid").innerHTML = `
      <div class="modal-info-item"><div class="mi-lbl">Sutradara</div><div class="mi-val">${escHtmlTR(f.sutradara)}</div></div>
      <div class="modal-info-item"><div class="mi-lbl">Durasi</div><div class="mi-val">${f.durasi} menit</div></div>
      <div class="modal-info-item" style="grid-column:1/-1"><div class="mi-lbl">Pemain</div><div class="mi-val">${escHtmlTR(f.pemain)}</div></div>
    `;
    const btnVote = document.getElementById("btnModalVote");

if (f.comingSoon) {
  btnVote.style.display = "none";
} else {
  btnVote.style.display = "";

  btnVote.textContent =
    voted ? "✓ Sudah Divote" : "🔥 Vote Film Ini";

  btnVote.className =
    "btn-modal-vote" + (voted ? " mv-voted" : "");

  btnVote.onclick = () => {
    if (castVote(id)) {
      showToastTR("🔥 Vote berhasil!");
      populateModal(id);
      render();
    }
  };
}
    const btnWl = document.getElementById("btnModalWl");
    btnWl.innerHTML = wled ? "❤️ Ada di Wishlist" : "🤍 Simpan ke Wishlist";
    btnWl.className = "btn-modal-wl" + (wled ? " mwl-on" : "");
    btnWl.onclick = () => toggleWishlist(id);
    document.getElementById("btnModalBook").href =
      `Booking.html?film=${f.bookingKey}`;
  }

  function openModalTR(id) {
    openFilmId = id;
    populateModal(id);
    document.getElementById("filmModalOverlay").classList.add("show");
    document.body.style.overflow = "hidden";
  }
  function closeModalTR() {
    document.getElementById("filmModalOverlay").classList.remove("show");
    document.body.style.overflow = "";
    openFilmId = null;
  }

  document
    .getElementById("btnModalClose")
    .addEventListener("click", closeModalTR);
  document.getElementById("filmModalOverlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModalTR();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModalTR();
  });

  document.getElementById("btnViewGrid").addEventListener("click", () => {
    viewMode = "grid";
    document.getElementById("btnViewGrid").classList.add("active");
    document.getElementById("btnViewList").classList.remove("active");
    render();
  });
  document.getElementById("btnViewList").addEventListener("click", () => {
    viewMode = "list";
    document.getElementById("btnViewList").classList.add("active");
    document.getElementById("btnViewGrid").classList.remove("active");
    render();
  });
  document.getElementById("trendSearch").addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    render();
  });
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    activeSort = e.target.value;
    render();
  });

  buildGenrePills();
  render();
});
