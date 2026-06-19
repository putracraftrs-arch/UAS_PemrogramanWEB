document.addEventListener('DOMContentLoaded', () => {

  /* ─── Film database ───────────────────────────────────────────────────── */
  const FILMS = [
    {
      id: 1,
      film    : 'Siksa Kubur',
      genre   : 'Horror / Drama',
      tags    : ['Horror', 'Drama'],
      durasi  : 117,
      rating  : 8.2,
      tahun   : 2024,
      sutradara: 'Joko Anwar',
      pemain  : 'Faradina Mufti, Reza Rahadian, Slamet Rahardjo',
      sinopsis: 'Sita adalah seorang wanita ateis yang keras kepala. Untuk membuktikan bahwa siksa kubur hanyalah isapan jempol belaka, ia memutuskan mengalaminya sendiri — dan apa yang ia temukan di sana mengubah segalanya.',
      poster  : 'Images/siksa-kubur.jpg',
      bookingKey: 'Siksa+Kubur',
      baseVotes : 1240,
    },
    {
      id: 2,
      film    : 'A Minecraft Movie',
      genre   : 'Adventure / Fantasy',
      tags    : ['Adventure', 'Fantasy', 'Family'],
      durasi  : 101,
      rating  : 7.8,
      tahun   : 2025,
      sutradara: 'Jared Hess',
      pemain  : 'Jack Black, Jason Momoa, Jennifer Coolidge',
      sinopsis: 'Empat orang tersedot ke dalam dunia balok bernama Overworld dan harus berjuang untuk bertahan hidup. Satu-satunya harapan mereka adalah seorang pahlawan tak terduga bernama Steve.',
      poster  : 'Images/a-minecraft-movie-movie-poster.jpg',
      bookingKey: 'A+Minecraft+Movie',
      baseVotes : 980,
    },
    {
      id: 3,
      film    : 'Agak Laen',
      genre   : 'Horror / Comedy',
      tags    : ['Horror', 'Comedy'],
      durasi  : 119,
      rating  : 8.5,
      tahun   : 2024,
      sutradara: 'Muhadkly Acho',
      pemain  : 'Bene Dion, Oki Rengga, Dimas Anggara, Indra Jegel',
      sinopsis: 'Empat sahabat pengelola rumah hantu ketiban sial saat dukun sewaan mereka tewas di dalam wahana. Sosok sang dukun pun mulai gentayangan, membuat terror nyata bagi mereka sendiri.',
      poster  : 'Images/agak-laen.jpg',
      bookingKey: 'Agak+Laen',
      baseVotes : 870,
    },
    {
      id: 4,
      film    : 'Avengers: Infinity War',
      genre   : 'Action / Sci-Fi',
      tags    : ['Action', 'Sci-Fi', 'Marvel'],
      durasi  : 149,
      rating  : 8.4,
      tahun   : 2018,
      sutradara: 'Anthony & Joe Russo',
      pemain  : 'Robert Downey Jr., Chris Evans, Chris Hemsworth, Scarlett Johansson',
      sinopsis: 'Thanos berusaha mengumpulkan enam Infinity Stones untuk memusnahkan setengah populasi alam semesta. Para Avengers bersatu dalam pertempuran paling epik untuk menghentikannya.',
      poster  : 'Images/infinity.jpg',
      bookingKey: 'Avengers%3A+Infinity+War',
      baseVotes : 760,
    },
    {
      id: 5,
      film    : 'Jumbo',
      genre   : 'Animation / Adventure',
      tags    : ['Animation', 'Family', 'Adventure'],
      durasi  : 102,
      rating  : 8.0,
      tahun   : 2025,
      sutradara: 'Ryan Andriandhy',
      pemain  : 'Angga Yunanda, Prilly Latuconsina',
      sinopsis: 'Si kecil Don bersahabat dengan sosok misterius bernama Jumbo. Petualangan ajaib mereka membawa pelajaran berharga tentang persahabatan, keberanian, dan makna keluarga yang sesungguhnya.',
      poster  : 'Images/jumbo-indonesian-movie-poster.jpg',
      bookingKey: 'Jumbo',
      baseVotes : 620,
    },
    {
      id: 6,
      film    : 'Ancika: 1995',
      genre   : 'Romance / Drama',
      tags    : ['Romance', 'Drama'],
      durasi  : 100,
      rating  : 7.9,
      tahun   : 2023,
      sutradara: 'Benni Setiawan',
      pemain  : 'Marthino Lio, Raisa Andriana',
      sinopsis: 'Kisah cinta Dilan dan Ancika di Bandung tahun 1995. Dilan harus membuktikan dirinya kepada gadis yang memiliki kepribadian kuat, mandiri, dan tidak mudah takluk oleh rayuan.',
      poster  : 'Images/ancika-1995.jpg',
      bookingKey: 'Ancika%3A+1995',
      baseVotes : 510,
    },
    {
      id: 7,
      film    : 'Mission: Impossible \u2013 The Final Reckoning',
      genre   : 'Action / Thriller',
      tags    : ['Action', 'Thriller'],
      durasi  : 169,
      rating  : 8.3,
      tahun   : 2025,
      sutradara: 'Christopher McQuarrie',
      pemain  : 'Tom Cruise, Hayley Atwell, Simon Pegg, Ving Rhames',
      sinopsis: 'Ethan Hunt menghadapi ancaman terbesar sepanjang kariernya — sebuah AI bernama The Entity yang mampu mengendalikan seluruh persenjataan nuklir global. Ini misi terakhir, dengan taruhan tertinggi.',
      poster  : 'Images/25MIFR.jpg',
      bookingKey: 'Mission%3A+Impossible+%E2%80%93+The+Final+Reckoning',
      baseVotes : 445,
    },
  ];

  /* ─── LocalStorage keys ─────────────────────────────────────────────── */
  const KEY_VOTES = 'cinego_trend_votes'; // { filmId: count }
  const KEY_VOTED = 'cinego_trend_voted'; // [filmId, ...]  — films voted on this device
  const KEY_WL    = 'cinego_wishlist';    // { email: [filmId, ...] }

  /* ─── State ─────────────────────────────────────────────────────────── */
  let activeGenre  = 'Semua';
  let activeSort   = 'votes';
  let searchQuery  = '';
  let viewMode     = 'grid';  // 'grid' | 'list'
  let openFilmId   = null;    // which film is open in the modal

  /* ─── Vote helpers ──────────────────────────────────────────────────── */
  function getVoteCounts() {
    return JSON.parse(localStorage.getItem(KEY_VOTES) || '{}');
  }

  function getVotedList() {
    return JSON.parse(localStorage.getItem(KEY_VOTED) || '[]');
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
    const film = FILMS.find(f => f.id === id);
    if (!film) return 0;
    const counts = getVoteCounts();
    return film.baseVotes + (counts[id] || 0);
  }

  /* ─── Wishlist helpers ──────────────────────────────────────────────── */
  function getWishlist() {
    const session = AUTH.getSession();
    if (!session) return [];
    const all = JSON.parse(localStorage.getItem(KEY_WL) || '{}');
    return all[session.email] || [];
  }

  function inWishlist(id) {
    return getWishlist().includes(id);
  }

  function toggleWishlist(id) {
    const session = AUTH.getSession();
    if (!session) {
      showToast('🔒 Login terlebih dahulu untuk menggunakan fitur Wishlist.');
      return;
    }
    const email = session.email;
    const all   = JSON.parse(localStorage.getItem(KEY_WL) || '{}');
    const wl    = all[email] || [];
    if (wl.includes(id)) {
      all[email] = wl.filter(x => x !== id);
      showToast('💔 Dihapus dari wishlist.');
    } else {
      all[email] = [...wl, id];
      showToast('❤️ Ditambahkan ke wishlist!');
    }
    localStorage.setItem(KEY_WL, JSON.stringify(all));
    render();
    if (openFilmId === id) populateModal(id);
  }

  /* ─── Misc helpers ──────────────────────────────────────────────────── */
  function showToast(msg, ms = 2300) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), ms);
  }

  function fmtVotes(n) {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return n.toLocaleString('id-ID');
  }

  function fmtDur(min) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h ? `${h}j ${m}m` : `${m} menit`;
  }

  function rankBadgeClass(rank) {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    return 'rank-other';
  }

  function rankLabel(rank) {
    if (rank === 1) return '🥇 #1';
    if (rank === 2) return '🥈 #2';
    if (rank === 3) return '🥉 #3';
    return `#${rank}`;
  }

  function listRankClass(rank) {
    if (rank === 1) return 'list-rank-1';
    if (rank === 2) return 'list-rank-2';
    if (rank === 3) return 'list-rank-3';
    return 'list-rank-other';
  }

  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ─── Genre pills ───────────────────────────────────────────────────── */
  function buildGenrePills() {
    const all  = new Set();
    FILMS.forEach(f => f.tags.forEach(t => all.add(t)));
    const tags = ['Semua', ...Array.from(all).sort()];
    const wrap = document.getElementById('genrePills');
    wrap.innerHTML = '';

    tags.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'genre-pill' + (tag === activeGenre ? ' active' : '');
      btn.textContent = tag;
      btn.addEventListener('click', () => {
        activeGenre = tag;
        wrap.querySelectorAll('.genre-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        render();
      });
      wrap.appendChild(btn);
    });
  }

  /* ─── Filtering & sorting ───────────────────────────────────────────── */
  function getFilteredSorted() {
    let list = [...FILMS];

    // Genre
    if (activeGenre !== 'Semua') {
      list = list.filter(f => f.tags.includes(activeGenre));
    }

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(f =>
        f.film.toLowerCase().includes(q)       ||
        f.genre.toLowerCase().includes(q)      ||
        f.sutradara.toLowerCase().includes(q)  ||
        f.pemain.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (activeSort) {
      case 'votes':       list.sort((a, b) => totalVotes(b.id) - totalVotes(a.id));   break;
      case 'rating':      list.sort((a, b) => b.rating - a.rating);                   break;
      case 'durasi_asc':  list.sort((a, b) => a.durasi - b.durasi);                   break;
      case 'durasi_desc': list.sort((a, b) => b.durasi - a.durasi);                   break;
      case 'az':          list.sort((a, b) => a.film.localeCompare(b.film));           break;
    }

    return list;
  }

  /* ─── Stats bar ─────────────────────────────────────────────────────── */
  function renderStats() {
    const grand = FILMS.reduce((s, f) => s + totalVotes(f.id), 0);
    const top   = [...FILMS].sort((a, b) => totalVotes(b.id) - totalVotes(a.id))[0];
    const wlLen = getWishlist().length;

    document.getElementById('trendStats').innerHTML = `
      <div class="t-stat">
        <div class="t-stat-icon">🔥</div>
        <div>
          <div class="t-stat-val">${fmtVotes(grand)}</div>
          <div class="t-stat-lbl">Total vote minggu ini</div>
        </div>
      </div>
      <div class="t-stat">
        <div class="t-stat-icon">🎬</div>
        <div>
          <div class="t-stat-val">${FILMS.length}</div>
          <div class="t-stat-lbl">Film sedang tayang</div>
        </div>
      </div>
      <div class="t-stat">
        <div class="t-stat-icon">🏆</div>
        <div>
          <div class="t-stat-val" style="font-size:.88rem;line-height:1.3">
            ${top.film.length > 20 ? top.film.slice(0, 20) + '…' : top.film}
          </div>
          <div class="t-stat-lbl">Film terpopuler saat ini</div>
        </div>
      </div>
      <div class="t-stat">
        <div class="t-stat-icon">❤️</div>
        <div>
          <div class="t-stat-val">${wlLen}</div>
          <div class="t-stat-lbl">Film di wishlist kamu</div>
        </div>
      </div>
    `;
  }

  /* ─── Grid render ───────────────────────────────────────────────────── */
  function renderGrid(films) {
    const wrap = document.createElement('div');
    wrap.className = 'trend-grid';

    films.forEach((f, idx) => {
      const rank   = idx + 1;
      const votes  = totalVotes(f.id);
      const voted  = hasVoted(f.id);
      const wled   = inWishlist(f.id);
      const encImg = encodeURIComponent(f.film.slice(0, 14));

      const card = document.createElement('div');
      card.className = 'trend-card';
      card.innerHTML = `
        <div class="rank-badge ${rankBadgeClass(rank)}">${rankLabel(rank)}</div>
        <button class="wl-card-btn${wled ? ' wled' : ''}"
                data-id="${f.id}"
                title="${wled ? 'Hapus dari wishlist' : 'Simpan ke wishlist'}">
          ${wled ? '❤️' : '🤍'}
        </button>

        <div class="poster-wrap">
          <img
            src="${f.poster}"
            alt="${escHtml(f.film)}"
            onerror="this.src='https://placehold.co/300x400/120a02/fb923c?text=${encImg}'"
          />
          <div class="poster-overlay">
            <button class="btn-detail-overlay" data-id="${f.id}">
              Lihat Detail →
            </button>
          </div>
        </div>

        <div class="trend-card-body">
          <div class="trend-card-title">${escHtml(f.film)}</div>
          <div class="trend-card-genre">${escHtml(f.genre)}</div>
          <div class="trend-card-meta">
            <span class="rating-pill">⭐ ${f.rating}</span>
            <span class="dur-pill">${fmtDur(f.durasi)}</span>
          </div>
          <hr class="trend-divider" />
          <div class="vote-row">
            <div class="vote-count">
              🔥 ${fmtVotes(votes)} <span class="vlbl">votes</span>
            </div>
            <button
              class="btn-vote${voted ? ' voted' : ''}"
              data-id="${f.id}"
              ${voted ? 'disabled' : ''}
            >${voted ? '✓ Voted' : '+ Vote'}</button>
          </div>
          <a href="Booking.html?film=${f.bookingKey}" class="btn-card-book">Pesan Tiket</a>
        </div>
      `;
      wrap.appendChild(card);
    });

    return wrap;
  }

  /* ─── List render ───────────────────────────────────────────────────── */
  function renderList(films) {
    const wrap = document.createElement('div');
    wrap.className = 'trend-list';

    films.forEach((f, idx) => {
      const rank  = idx + 1;
      const votes = totalVotes(f.id);
      const voted = hasVoted(f.id);
      const wled  = inWishlist(f.id);
      const encImg = encodeURIComponent(f.film.slice(0, 12));

      const item = document.createElement('div');
      item.className = 'trend-list-item';
      item.innerHTML = `
        <div class="list-rank-num ${listRankClass(rank)}">${rankLabel(rank)}</div>

        <img
          class="list-poster"
          src="${f.poster}"
          alt="${escHtml(f.film)}"
          onerror="this.src='https://placehold.co/70x100/120a02/fb923c?text=${encImg}'"
        />

        <div class="list-info">
          <div class="list-title">${escHtml(f.film)}</div>
          <div class="list-meta">
            <span>⭐ ${f.rating}</span>
            <span>⏱ ${fmtDur(f.durasi)}</span>
            <span>${f.tahun}</span>
            <span style="color:#3a2010">${escHtml(f.genre)}</span>
          </div>
          <p class="list-sinopsis">${escHtml(f.sinopsis)}</p>
        </div>

        <div class="list-actions">
          <div class="list-vote-num">
            🔥 ${fmtVotes(votes)}
            <span class="lbl">votes</span>
          </div>
          <div class="list-btn-row">
            <button class="btn-vote${voted ? ' voted' : ''}" data-id="${f.id}" ${voted ? 'disabled' : ''}>${voted ? '✓' : '+ Vote'}</button>
            <button class="wl-card-btn${wled ? ' wled' : ''}" data-id="${f.id}" title="${wled ? 'Hapus wishlist' : 'Simpan ke wishlist'}">${wled ? '❤️' : '🤍'}</button>
          </div>
          <button class="btn-list-detail" data-id="${f.id}">Detail</button>
          <a href="Booking.html?film=${f.bookingKey}" class="btn-list-book">Pesan →</a>
        </div>
      `;
      wrap.appendChild(item);
    });

    return wrap;
  }

  /* ─── Empty state ───────────────────────────────────────────────────── */
  function renderEmpty() {
    const div = document.createElement('div');
    div.className = 'trend-empty';
    div.innerHTML = `
      <div class="ei">🎬</div>
      <h3>Tidak ada film ditemukan</h3>
      <p>Coba ubah kata kunci pencarian atau filter genre.</p>
    `;
    return div;
  }

  /* ─── Bind card events (vote, wishlist, detail) ──────────────────────── */
  function bindEvents(container) {
    // Vote buttons
    container.querySelectorAll('.btn-vote:not([disabled])').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        if (castVote(id)) {
          showToast('🔥 Vote berhasil! Terima kasih sudah memilih.');
          render();
          if (openFilmId === id) populateModal(id);
        }
      });
    });

    // Wishlist buttons
    container.querySelectorAll('.wl-card-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        toggleWishlist(parseInt(btn.dataset.id));
      });
    });

    // Detail buttons (grid overlay + list)
    container.querySelectorAll('.btn-detail-overlay, .btn-list-detail').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        openModal(parseInt(btn.dataset.id));
      });
    });
  }

  /* ─── Main render ───────────────────────────────────────────────────── */
  function render() {
    const films = getFilteredSorted();
    document.getElementById('resultCount').textContent = `${films.length} film`;
    renderStats();

    const container = document.getElementById('trendContainer');
    container.innerHTML = '';

    if (films.length === 0) {
      container.appendChild(renderEmpty());
      return;
    }

    const view = viewMode === 'grid' ? renderGrid(films) : renderList(films);
    container.appendChild(view);
    bindEvents(container);
  }

  /* ─── Modal ─────────────────────────────────────────────────────────── */
  function populateModal(id) {
    const f     = FILMS.find(f => f.id === id);
    if (!f) return;
    const votes = totalVotes(id);
    const voted = hasVoted(id);
    const wled  = inWishlist(id);
    const encImg = encodeURIComponent(f.film.slice(0, 14));

    document.getElementById('mPoster').src = f.poster;
    document.getElementById('mPoster').alt = f.film;
    document.getElementById('mPoster').onerror = function () {
      this.src = `https://placehold.co/100x142/120a02/fb923c?text=${encImg}`;
    };

    document.getElementById('mTitle').textContent    = f.film;
    document.getElementById('mRating').innerHTML     = `⭐ ${f.rating} <small>/ 10</small>`;
    document.getElementById('mSinopsis').textContent = f.sinopsis;
    document.getElementById('mVoteNum').textContent  = fmtVotes(votes);

    document.getElementById('mPills').innerHTML = `
      <span class="mpill mpill-genre">${escHtml(f.genre)}</span>
      <span class="mpill mpill-year">📅 ${f.tahun}</span>
      <span class="mpill mpill-dur">⏱ ${fmtDur(f.durasi)}</span>
    `;

    document.getElementById('mInfoGrid').innerHTML = `
      <div class="modal-info-item">
        <div class="mi-lbl">Sutradara</div>
        <div class="mi-val">${escHtml(f.sutradara)}</div>
      </div>
      <div class="modal-info-item">
        <div class="mi-lbl">Durasi</div>
        <div class="mi-val">${f.durasi} menit</div>
      </div>
      <div class="modal-info-item" style="grid-column:1/-1">
        <div class="mi-lbl">Pemain</div>
        <div class="mi-val">${escHtml(f.pemain)}</div>
      </div>
    `;

    // Vote button in modal
    const btnVote = document.getElementById('btnModalVote');
    btnVote.textContent = voted ? '✓ Sudah Divote' : '🔥 Vote Film Ini';
    btnVote.className   = 'btn-modal-vote' + (voted ? ' mv-voted' : '');
    btnVote.onclick     = () => {
      if (castVote(id)) {
        showToast('🔥 Vote berhasil!');
        populateModal(id);
        render();
      }
    };

    // Wishlist button in modal
    const btnWl = document.getElementById('btnModalWl');
    btnWl.innerHTML   = wled ? '❤️ Ada di Wishlist' : '🤍 Simpan ke Wishlist';
    btnWl.className   = 'btn-modal-wl' + (wled ? ' mwl-on' : '');
    btnWl.onclick     = () => toggleWishlist(id);

    // Booking link
    document.getElementById('btnModalBook').href = `Booking.html?film=${f.bookingKey}`;
  }

  function openModal(id) {
    openFilmId = id;
    populateModal(id);
    document.getElementById('filmModalOverlay').classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('filmModalOverlay').classList.remove('show');
    document.body.style.overflow = '';
    openFilmId = null;
  }

  document.getElementById('btnModalClose').addEventListener('click', closeModal);
  document.getElementById('filmModalOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* ─── View toggle ───────────────────────────────────────────────────── */
  document.getElementById('btnViewGrid').addEventListener('click', () => {
    viewMode = 'grid';
    document.getElementById('btnViewGrid').classList.add('active');
    document.getElementById('btnViewList').classList.remove('active');
    render();
  });

  document.getElementById('btnViewList').addEventListener('click', () => {
    viewMode = 'list';
    document.getElementById('btnViewList').classList.add('active');
    document.getElementById('btnViewGrid').classList.remove('active');
    render();
  });

  /* ─── Search ────────────────────────────────────────────────────────── */
  document.getElementById('trendSearch').addEventListener('input', e => {
    searchQuery = e.target.value.trim();
    render();
  });

  /* ─── Sort ──────────────────────────────────────────────────────────── */
  document.getElementById('sortSelect').addEventListener('change', e => {
    activeSort = e.target.value;
    render();
  });

  /* ─── Init ──────────────────────────────────────────────────────────── */
  buildGenrePills();
  render();

});
