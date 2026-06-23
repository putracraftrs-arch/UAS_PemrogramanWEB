(function () {
  'use strict';

  const FILMS = {
    'Jumbo': {
      genre: 'Animation / Adventure',
      durasi: '102 menit',
      poster: 'Images/jumbo-indonesian-movie-poster.jpg',
      jadwal: [
        { tanggal: '2026-06-02', hari: 'Sel', tgl: '2', bln: 'Jun', sesi: ['13:00', '16:00', '19:00'] },
        { tanggal: '2026-06-03', hari: 'Rab', tgl: '3', bln: 'Jun', sesi: ['13:00', '16:00', '19:00'] },
        { tanggal: '2026-06-04', hari: 'Kam', tgl: '4', bln: 'Jun', sesi: ['13:00', '16:00', '19:00'] },
        { tanggal: '2026-06-05', hari: 'Jum', tgl: '5', bln: 'Jun', sesi: ['12:00', '15:00', '18:00', '21:00'] },
        { tanggal: '2026-06-06', hari: 'Sab', tgl: '6', bln: 'Jun', sesi: ['09:00', '12:00', '15:00', '18:00', '21:00'] },
        { tanggal: '2026-06-07', hari: 'Min', tgl: '7', bln: 'Jun', sesi: ['10:00', '13:00', '16:00', '19:00'] },
        { tanggal: '2026-06-08', hari: 'Sen', tgl: '8', bln: 'Jun', sesi: ['13:00', '16:00', '19:00'] },
      ],
    },
    'Ancika: 1995': {
      genre: 'Romance / Drama',
      durasi: '100 menit',
      poster: 'Images/ancika-1995.jpg',
      jadwal: [
        { tanggal: '2026-06-03', hari: 'Rab', tgl: '3', bln: 'Jun', sesi: ['13:10', '16:10', '19:10'] },
        { tanggal: '2026-06-04', hari: 'Kam', tgl: '4', bln: 'Jun', sesi: ['13:10', '16:10', '19:10'] },
        { tanggal: '2026-06-05', hari: 'Jum', tgl: '5', bln: 'Jun', sesi: ['12:10', '15:10', '18:10', '21:10'] },
        { tanggal: '2026-06-06', hari: 'Sab', tgl: '6', bln: 'Jun', sesi: ['09:10', '12:10', '15:10', '18:10', '21:10'] },
        { tanggal: '2026-06-07', hari: 'Min', tgl: '7', bln: 'Jun', sesi: ['10:10', '13:10', '16:10', '19:10'] },
        { tanggal: '2026-06-08', hari: 'Sen', tgl: '8', bln: 'Jun', sesi: ['13:10', '16:10', '19:10'] },
        { tanggal: '2026-06-09', hari: 'Sel', tgl: '9', bln: 'Jun', sesi: ['13:10', '16:10', '19:10'] },
      ],
    },
    'A Minecraft Movie': {
      genre: 'Adventure / Fantasy',
      durasi: '101 menit',
      poster: 'Images/a-minecraft-movie-movie-poster.jpg',
      jadwal: [
        { tanggal: '2026-06-04', hari: 'Kam', tgl: '4', bln: 'Jun', sesi: ['12:30', '15:30', '18:30'] },
        { tanggal: '2026-06-05', hari: 'Jum', tgl: '5', bln: 'Jun', sesi: ['11:30', '14:30', '17:30', '20:30'] },
        { tanggal: '2026-06-06', hari: 'Sab', tgl: '6', bln: 'Jun', sesi: ['08:30', '11:30', '14:30', '17:30', '20:30'] },
        { tanggal: '2026-06-07', hari: 'Min', tgl: '7', bln: 'Jun', sesi: ['09:30', '12:30', '15:30', '18:30'] },
        { tanggal: '2026-06-08', hari: 'Sen', tgl: '8', bln: 'Jun', sesi: ['12:30', '15:30', '18:30'] },
        { tanggal: '2026-06-09', hari: 'Sel', tgl: '9', bln: 'Jun', sesi: ['12:30', '15:30', '18:30'] },
        { tanggal: '2026-06-10', hari: 'Rab', tgl: '10', bln: 'Jun', sesi: ['12:30', '15:30', '18:30'] },
      ],
    },
    'Agak Laen': {
      genre: 'Horror / Comedy',
      durasi: '119 menit',
      poster: 'Images/agak-laen.jpg',
      jadwal: [
        { tanggal: '2026-06-05', hari: 'Jum', tgl: '5', bln: 'Jun', sesi: ['13:25', '16:25', '19:25', '22:25'] },
        { tanggal: '2026-06-06', hari: 'Sab', tgl: '6', bln: 'Jun', sesi: ['10:25', '13:25', '16:25', '19:25', '22:25'] },
        { tanggal: '2026-06-07', hari: 'Min', tgl: '7', bln: 'Jun', sesi: ['11:25', '14:25', '17:25', '20:25'] },
        { tanggal: '2026-06-08', hari: 'Sen', tgl: '8', bln: 'Jun', sesi: ['14:25', '17:25', '20:25'] },
        { tanggal: '2026-06-09', hari: 'Sel', tgl: '9', bln: 'Jun', sesi: ['14:25', '17:25', '20:25'] },
        { tanggal: '2026-06-10', hari: 'Rab', tgl: '10', bln: 'Jun', sesi: ['14:25', '17:25', '20:25'] },
        { tanggal: '2026-06-11', hari: 'Kam', tgl: '11', bln: 'Jun', sesi: ['14:25', '17:25', '20:25'] },
      ],
    },
    'Siksa Kubur': {
      genre: 'Horror / Drama',
      durasi: '117 menit',
      poster: 'Images/siksa-kubur.jpg',
      jadwal: [
        { tanggal: '2026-06-06', hari: 'Sab', tgl: '6', bln: 'Jun', sesi: ['10:00', '13:00', '16:00', '19:00', '22:00'] },
        { tanggal: '2026-06-07', hari: 'Min', tgl: '7', bln: 'Jun', sesi: ['11:00', '14:00', '17:00', '20:00'] },
        { tanggal: '2026-06-08', hari: 'Sen', tgl: '8', bln: 'Jun', sesi: ['14:00', '17:00', '20:00'] },
        { tanggal: '2026-06-09', hari: 'Sel', tgl: '9', bln: 'Jun', sesi: ['14:00', '17:00', '20:00'] },
        { tanggal: '2026-06-10', hari: 'Rab', tgl: '10', bln: 'Jun', sesi: ['14:00', '17:00', '20:00'] },
        { tanggal: '2026-06-11', hari: 'Kam', tgl: '11', bln: 'Jun', sesi: ['14:00', '17:00', '20:00'] },
        { tanggal: '2026-06-12', hari: 'Jum', tgl: '12', bln: 'Jun', sesi: ['13:00', '16:00', '19:00', '22:00'] },
      ],
    },
    'Mission: Impossible – The Final Reckoning': {
      genre: 'Action / Thriller',
      durasi: '169 menit',
      poster: 'Images/25MIFR.jpg',
      jadwal: [
        { tanggal: '2026-06-07', hari: 'Min', tgl: '7', bln: 'Jun', sesi: ['10:00', '13:30', '17:00', '20:30'] },
        { tanggal: '2026-06-08', hari: 'Sen', tgl: '8', bln: 'Jun', sesi: ['13:30', '17:00', '20:30'] },
        { tanggal: '2026-06-09', hari: 'Sel', tgl: '9', bln: 'Jun', sesi: ['13:30', '17:00', '20:30'] },
        { tanggal: '2026-06-10', hari: 'Rab', tgl: '10', bln: 'Jun', sesi: ['13:30', '17:00', '20:30'] },
        { tanggal: '2026-06-11', hari: 'Kam', tgl: '11', bln: 'Jun', sesi: ['13:30', '17:00', '20:30'] },
        { tanggal: '2026-06-12', hari: 'Jum', tgl: '12', bln: 'Jun', sesi: ['12:30', '16:00', '19:30'] },
        { tanggal: '2026-06-13', hari: 'Sab', tgl: '13', bln: 'Jun', sesi: ['09:00', '12:30', '16:00', '19:30'] },
      ],
    },
    'Avengers: Infinity War': {
      genre: 'Action / Sci-Fi',
      durasi: '149 menit',
      poster: 'Images/infinity.jpg',
      jadwal: [
        { tanggal: '2026-06-08', hari: 'Sen', tgl: '8', bln: 'Jun', sesi: ['12:45', '15:45', '18:45'] },
        { tanggal: '2026-06-09', hari: 'Sel', tgl: '9', bln: 'Jun', sesi: ['12:45', '15:45', '18:45'] },
        { tanggal: '2026-06-10', hari: 'Rab', tgl: '10', bln: 'Jun', sesi: ['12:45', '15:45', '18:45'] },
        { tanggal: '2026-06-11', hari: 'Kam', tgl: '11', bln: 'Jun', sesi: ['12:45', '15:45', '18:45'] },
        { tanggal: '2026-06-12', hari: 'Jum', tgl: '12', bln: 'Jun', sesi: ['14:45', '17:45', '20:45'] },
        { tanggal: '2026-06-13', hari: 'Sab', tgl: '13', bln: 'Jun', sesi: ['11:45', '14:45', '17:45', '20:45'] },
        { tanggal: '2026-06-14', hari: 'Min', tgl: '14', bln: 'Jun', sesi: ['09:45', '12:45', '15:45', '18:45'] },
      ],
    },
  };

  const CINEMAS = [
    { id: 'cgv-sun', nama: 'CGV Sun Plaza', lokasi: 'Sun Plaza, Lt. 4 — Medan', tipe: 'Regular', badgeClass: 'badge-regular', harga: 55000, rows: 8, cols: 14 },
    { id: 'cgv-focal', nama: 'CGV Focal Point', lokasi: 'Focal Point Mall, Lt. 3 — Medan', tipe: 'Regular', badgeClass: 'badge-regular', harga: 50000, rows: 8, cols: 14 },
    { id: 'xxi-carefour', nama: 'XXI Carefour Medan', lokasi: 'Carefour Gatot Subroto — Medan', tipe: 'Regular', badgeClass: 'badge-regular', harga: 45000, rows: 7, cols: 12 },
    { id: 'xxi-plaza', nama: 'XXI Plaza Medan Fair', lokasi: 'Plaza Medan Fair, Lt. 5 — Medan', tipe: 'Regular', badgeClass: 'badge-regular', harga: 48000, rows: 7, cols: 12 },
    { id: 'imax-sun', nama: 'CGV IMAX Sun Plaza', lokasi: 'Sun Plaza, Lt. 4 — Medan', tipe: 'IMAX', badgeClass: 'badge-imax', harga: 110000, rows: 10, cols: 16 },
    { id: '4dx-focal', nama: 'CGV 4DX Focal Point', lokasi: 'Focal Point Mall, Lt. 3 — Medan', tipe: '4DX', badgeClass: 'badge-4dx', harga: 135000, rows: 6, cols: 10 },
  ];

  let selFilm = null;
  let selCinema = null;
  let selTanggal = null;
  let selJam = null;
  let selSeats = [];
  let seatState = {};

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatRp(n) {
    return 'Rp ' + n.toLocaleString('id-ID');
  }

  function showToast(msg, color) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.style.background = color || '';
    t.classList.add('show');
    setTimeout(() => {
      t.classList.remove('show');
      t.style.background = '';
    }, 2400);
  }

  const HARI_FULL = { Sen: 'Senin', Sel: 'Selasa', Rab: 'Rabu', Kam: 'Kamis', Jum: 'Jumat', Sab: 'Sabtu', Min: 'Minggu' };
  const BLN_FULL = { Jan: 'Januari', Feb: 'Februari', Mar: 'Maret', Apr: 'April', Mei: 'Mei', Jun: 'Juni', Jul: 'Juli', Agu: 'Agustus', Sep: 'September', Okt: 'Oktober', Nov: 'November', Des: 'Desember' };

  function setStep(n) {
    [1, 2, 3, 4].forEach(i => {
      const el = document.getElementById('si' + i);
      if (!el) return;
      el.classList.toggle('active', i === n);
      el.classList.toggle('done', i < n);
    });
  }

  function goToStep(n) {
    [1, 2, 3, 4].forEach(i => {
      const el = document.getElementById('step' + i);
      if (el) el.style.display = i === n ? 'block' : 'none';
    });
    setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showEl(id, visible) {
    const el = document.getElementById(id);
    if (el) el.style.display = visible ? 'block' : 'none';
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function updateSeatButton() {
    const btn = document.getElementById('btnToSeats');
    if (!btn) return;
    const ready = Boolean(selFilm && selCinema && selTanggal && selJam);
    btn.style.display = 'block';
    btn.disabled = !ready; // FIX: disable saat pilihan belum lengkap

    if (ready) {
      btn.textContent = 'Pilih Kursi ->';
    } else if (!selCinema) {
      btn.textContent = 'Pilih bioskop dulu';
    } else if (!selTanggal) {
      btn.textContent = 'Pilih tanggal dulu';
    } else {
      btn.textContent = 'Pilih jam tayang dulu';
    }
  }

  // ── STEP 1 ─────────────────────────────────────────────────────────
  function renderFilmPicker() {
    const grid = document.getElementById('filmPickerGrid');
    if (!grid) return;
    grid.innerHTML = '';

    Object.entries(FILMS).forEach(([nama, data]) => {
      const card = document.createElement('div');
      card.className = 'fp-card';
      card.innerHTML = `
        <img src="${esc(data.poster)}" alt="${esc(nama)}"
          onerror="this.src='https:
        <div class="fp-info">
          <span class="fp-title">${esc(nama)}</span>
          <span class="fp-genre">${esc(data.genre)}</span>
          <span class="fp-dur">⏱ ${esc(data.durasi)}</span>
        </div>
      `;
      card.addEventListener('click', () => selectFilm(nama));
      grid.appendChild(card);
    });
  }

  function selectFilm(nama) {
    selFilm = nama;
    selCinema = null;
    selTanggal = null;
    selJam = null;
    selSeats = [];

    const data = FILMS[nama];

    const poster2 = document.getElementById('fiPoster2');
    if (poster2) {
      poster2.src = data.poster;
      poster2.onerror = function () {
        this.src = 'https://placehold.co/60x84/120a02/fb923c?text=Film';
      };
    }

    setText('fiTitle2', nama);
    setText('fiGenre2', data.genre);
    setText('fiDurasi2', '⏱ ' + data.durasi);

    renderCinemas();
    goToStep(2);
  }

  // ── STEP 2 ─────────────────────────────────────────────────────────
  function renderCinemas() {
    const list = document.getElementById('cinemaList');
    if (!list) return;
    list.innerHTML = '';

    CINEMAS.forEach(cinema => {
      const card = document.createElement('div');
      card.className = 'cinema-card';
      card.dataset.id = cinema.id;
      card.innerHTML = `
        <div class="cinema-left">
          <span class="cinema-name">${esc(cinema.nama)}</span>
          <span class="cinema-loc">📍 ${esc(cinema.lokasi)}</span>
          <div style="margin-top:6px">
            <span class="cinema-type-badge ${esc(cinema.badgeClass)}">${esc(cinema.tipe)}</span>
          </div>
        </div>
        <div class="cinema-price">
          <span class="price-val">${formatRp(cinema.harga)}</span>
          <span class="price-note">/ kursi</span>
        </div>
      `;
      card.addEventListener('click', () => selectCinema(cinema.id));
      list.appendChild(card);
    });

    showEl('dateCard', false);
    showEl('timeCard', false);
    updateSeatButton();
  }

  function selectCinema(cinemaId) {
    selCinema = CINEMAS.find(c => c.id === cinemaId);
    selTanggal = null;
    selJam = null;

    document.querySelectorAll('.cinema-card').forEach(c => {
      c.classList.toggle('active', c.dataset.id === cinemaId);
    });

    renderDateStrip();
    showEl('dateCard', true);
    showEl('timeCard', false);
    updateSeatButton();
    document.getElementById('dateCard')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function renderDateStrip() {
    const strip = document.getElementById('dateStrip');
    if (!strip) return;
    strip.innerHTML = '';

    const jadwal = FILMS[selFilm].jadwal;
    jadwal.forEach(j => {
      const chip = document.createElement('div');
      chip.className = 'date-chip';
      chip.innerHTML = `
        <span class="day">${esc(j.hari)}</span>
        <span class="num">${esc(j.tgl)}</span>
        <span class="mon">${esc(j.bln)}</span>
      `;
      chip.addEventListener('click', () => selectTanggal(j, chip));
      strip.appendChild(chip);
    });
  }

  function selectTanggal(j, chip) {
    selTanggal = j;
    selJam = null;

    document.querySelectorAll('.date-chip').forEach(c => c.classList.remove('active'));
    if (chip && chip.classList) chip.classList.add('active');

    renderTimeGrid(j);
    showEl('timeCard', true);
    updateSeatButton();
    document.getElementById('timeCard')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function renderTimeGrid(j) {
    const grid = document.getElementById('timeGrid');
    const sub = document.getElementById('timeCardSub');
    if (!grid) return;
    grid.innerHTML = '';

    if (sub) sub.textContent = `${HARI_FULL[j.hari]}, ${j.tgl} ${BLN_FULL[j.bln]} ${j.tanggal.split('-')[0]}`;

    j.sesi.forEach(jam => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'time-btn';
      btn.textContent = jam;
      btn.addEventListener('click', () => selectJam(jam, btn));
      grid.appendChild(btn);
    });
  }

  function selectJam(jam, btn) {
    selJam = jam;
    selSeats = [];

    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    updateSeatButton();
    document.getElementById('btnToSeats')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ── STEP 3 ─────────────────────────────────────────────────────────
  function generateSeatState(cinema) {
    const seedStr = selFilm + cinema.id + selTanggal.tanggal + selJam;
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) {
      seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
    }

    function rand() {
      seed ^= seed << 13;
      seed ^= seed >> 17;
      seed ^= seed << 5;
      return (seed >>> 0) / 4294967296;
    }

    const state = {};
    const ROWS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, cinema.rows);
    const occupancyRate = 0.35 + rand() * 0.40;
    const midRow = Math.floor(cinema.rows / 2);

    for (let r = 0; r < cinema.rows; r++) {
      const rowLetter = ROWS[r];
      const distFromMid = Math.abs(r - midRow) / cinema.rows;
      const rowOccupancy = Math.max(0.1, occupancyRate - distFromMid * 0.3 + rand() * 0.15);

      for (let c = 1; c <= cinema.cols; c++) {
        const seatId = rowLetter + c;
        const roll = rand();

        if (roll < rowOccupancy) {
          state[seatId] = 'taken';
        } else {
          state[seatId] = 'available';
        }
      }
    }

    return state;
  }

  function renderSeatGrid() {
    const cinema = selCinema;
    seatState = generateSeatState(cinema);

    const allTickets = JSON.parse(localStorage.getItem('cinego_tiket') || '[]');
    allTickets.forEach(t => {
      if (
        t.film === selFilm &&
        t.cinemaId === cinema.id &&
        t.tanggal === selTanggal.tanggal &&
        t.jam === selJam &&
        Array.isArray(t.kursi)
      ) {
        t.kursi.forEach(s => {
          if (seatState[s] !== undefined) seatState[s] = 'taken';
        });
      }
    });

    const ROWS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, cinema.rows).split('');
    const grid = document.getElementById('seatGrid');

    if (!grid) return;
    grid.innerHTML = '';

    ROWS.forEach(rowLetter => {
      const row = document.createElement('div');
      row.className = 'seat-row';

      const lbl = document.createElement('span');
      lbl.className = 'row-label';
      lbl.textContent = rowLetter;
      row.appendChild(lbl);

      const halfCols = Math.floor(cinema.cols / 2);

      for (let c = 1; c <= cinema.cols; c++) {
        if (c === halfCols + 1) {
          const gap = document.createElement('div');
          gap.className = 'seat-gap';
          row.appendChild(gap);
        }

        const seatId = rowLetter + c;
        const status = seatState[seatId];

        const seat = document.createElement('button');
        seat.type = 'button';
        seat.className = 'seat ' + status;
        seat.dataset.seatId = seatId;
        seat.title = seatId;

        seat.addEventListener('click', () => toggleSeat(seat, seatId));
        row.appendChild(seat);
      }

      grid.appendChild(row);
    });

    updateSeatCounter();
  }

  function toggleSeat(btn, seatId) {
    if (seatState[seatId] === 'taken') return;

    const idx = selSeats.indexOf(seatId);
    if (idx === -1) {
      if (selSeats.length >= 6) {
        showToast('⚠️ Maksimal 6 kursi per pemesanan', '#b45309');
        return;
      }
      selSeats.push(seatId);
      btn.className = 'seat selected';
    } else {
      selSeats.splice(idx, 1);
      btn.className = 'seat ' + seatState[seatId];
    }

    updateSeatCounter();
  }

  function updateSeatCounter() {
    const counter = document.getElementById('seatCounter');
    if (!counter) return;

    if (selSeats.length === 0) {
      counter.textContent = 'Pilih kursi kamu';
      return;
    }

    const total = selSeats.length * selCinema.harga;
    counter.innerHTML = `<strong>${selSeats.length}</strong> kursi dipilih: <strong>${selSeats.join(', ')}</strong> — <strong>${formatRp(total)}</strong>`;
  }

  function goToSeatStep() {
    if (!selFilm || !selCinema || !selTanggal || !selJam) {
      showToast('Pilih bioskop, tanggal, dan jam tayang dulu.', '#b45309');
      updateSeatButton();
      return;
    }

    const data = FILMS[selFilm];

    const sPoster = document.getElementById('sSumPoster');
    if (sPoster) {
      sPoster.src = data.poster;
      sPoster.onerror = function () {
        this.src = 'https://placehold.co/60x84/120a02/fb923c?text=Film';
      };
    }

    setText('sSumFilm', selFilm);
    setText('sSumMeta', `${HARI_FULL[selTanggal.hari]}, ${selTanggal.tgl} ${BLN_FULL[selTanggal.bln]} ${selTanggal.tanggal.split('-')[0]} • ${selJam}`);
    setText('sSumCinema', `🏛️ ${selCinema.nama} • ${formatRp(selCinema.harga)}/kursi`);

    selSeats = [];
    renderSeatGrid();
    goToStep(3);
  }

  // ── STEP 4 ─────────────────────────────────────────────────────────
  function goToBookingForm() {
    const data = FILMS[selFilm];

    const bPoster = document.getElementById('bsStripPoster');
    if (bPoster) {
      bPoster.src = data.poster;
      bPoster.onerror = function () {
        this.src = 'https://placehold.co/42x58/120a02/fb923c?text=Film';
      };
    }

    setText('bsStripFilm', selFilm + ' — ' + selCinema.nama);
    setText('bsStripMeta', `${HARI_FULL[selTanggal.hari]}, ${selTanggal.tgl} ${BLN_FULL[selTanggal.bln]} ${selTanggal.tanggal.split('-')[0]} • ${selJam}`);
    setText('bsStripSeats', selSeats.join(', '));
    setText('bsStripPrice', `${selSeats.length} kursi × ${formatRp(selCinema.harga)}`);

    const total = selSeats.length * selCinema.harga;
    setText('selectedSeatNames', selSeats.join(', '));
    setText('pricePerSeat', formatRp(selCinema.harga));
    setText('totalHarga', formatRp(total));

    if (typeof AUTH !== 'undefined') {
      const user = AUTH.getCurrentUser();
      if (user) {
        const namaEl = document.getElementById('nama');
        const emailEl = document.getElementById('email');
        if (namaEl && !namaEl.value) namaEl.value = user.nama || '';
        if (emailEl) emailEl.value = user.email || '';
      }
    }

    goToStep(4);
  }

  function openAuthRequired() {
    const overlay = document.getElementById('authRequiredOverlay');
    const modal = document.getElementById('authRequiredModal');
    if (!overlay || !modal) return;

    overlay.classList.add('show');
    modal.classList.add('show');
    overlay.style.display = 'block';
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';

    modal.style.display = 'block';
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'all';

    document.body.style.overflow = 'hidden';
  }

  function closeAuthRequired() {
    const overlay = document.getElementById('authRequiredOverlay');
    const modal = document.getElementById('authRequiredModal');
    if (overlay) overlay.classList.remove('show');
    if (modal) modal.classList.remove('show');

    if (overlay) {
      overlay.style.display = '';
      overlay.style.opacity = '';
      overlay.style.pointerEvents = '';
    }
    if (modal) {
      modal.style.display = '';
      modal.style.opacity = '';
      modal.style.pointerEvents = '';
    }
    document.body.style.overflow = '';
  }

  function setErr(id, msg) {
    const el = document.getElementById(id);
    const err = document.getElementById('err-' + id);
    if (el) el.classList.add('error');
    if (err) {
      err.textContent = msg;
      err.classList.add('show');
    }
  }

  function clrErr(id) {
    const el = document.getElementById(id);
    const err = document.getElementById('err-' + id);
    if (el) el.classList.remove('error');
    if (err) err.classList.remove('show');
  }

  // dipakai oleh onclick inline (kalau masih ada di halaman lama)
  window.cinegoGoToSeats = goToSeatStep;

  // ── INIT ────────────────────────────────────────────────────────────
  function initBooking() {
    document.getElementById('btnGantiFilm')?.addEventListener('click', () => goToStep(1));
    document.getElementById('btnBackToSchedule')?.addEventListener('click', () => goToStep(2));
    document.getElementById('btnBackToSeats')?.addEventListener('click', () => {
      selSeats = [];
      goToStep(3);
      renderSeatGrid();
    });

    document.getElementById('btnToSeats')?.addEventListener('click', () => {
      if (!selCinema || !selTanggal || !selJam) {
        showToast('Pilih bioskop, tanggal, dan jam tayang dulu.', '#b45309');
        updateSeatButton();
        return;
      }

      goToSeatStep();
    });

    document.getElementById('btnToBookingForm')?.addEventListener('click', () => {
      if (selSeats.length === 0) {
        showToast('⚠️ Pilih minimal 1 kursi', '#b45309');
        return;
      }
      goToBookingForm();
    });

    // Form booking
    document.getElementById('nama')?.addEventListener('input', () => clrErr('nama'));

    document.getElementById('bookingForm')?.addEventListener('submit', function (e) {
      e.preventDefault();

      const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const nama = document.getElementById('nama').value.trim();

      if (typeof AUTH === 'undefined' || !AUTH.getSession) {
        showToast('Sistem login belum siap (AUTH tidak ditemukan).', '#b45309');
        return;
      }

      const session = AUTH.getSession();
      const email = (session?.email || document.getElementById('email').value).trim().toLowerCase();

      if (!session) {
        openAuthRequired();
        return;
      }

      let ok = true;
      if (!nama) {
        setErr('nama', 'Nama wajib diisi.');
        ok = false;
      }
      if (!ok) return;

      const tiket = {
        id: Date.now(),
        nama,
        email,
        film: selFilm,
        cinemaId: selCinema.id,
        cinema: selCinema.nama,
        tipe: selCinema.tipe,
        tanggal: selTanggal.tanggal,
        jam: selJam,
        kursi: [...selSeats],
        jumlah: selSeats.length,
        hargaPerKursi: selCinema.harga,
        total: selSeats.length * selCinema.harga,
      };

      const semua = JSON.parse(localStorage.getItem('cinego_tiket') || '[]');
      semua.push(tiket);
      localStorage.setItem('cinego_tiket', JSON.stringify(semua));

      [1, 2, 3, 4].forEach(i => {
        const si = document.getElementById('si' + i);
        if (si) {
          si.classList.remove('active');
          si.classList.add('done');
        }
      });

      showToast('✅ Tiket berhasil dipesan!', '#15803d');
      setTimeout(() => {
        window.location.href = 'MyTicket.html';
      }, 1900);
    });

    // Modal auth required
    document.getElementById('btnCloseAuthRequired')?.addEventListener('click', closeAuthRequired);
    document.getElementById('authRequiredOverlay')?.addEventListener('click', e => {
      if (e.target === e.currentTarget) closeAuthRequired();
    });

    // Tab switching di modal
    document.querySelectorAll('#authRequiredModal .auth-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#authRequiredModal .auth-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('#authRequiredModal .auth-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('bkPanel-' + btn.dataset.tab)?.classList.add('active');
      });
    });

    document.getElementById('linkBkToDaftar')?.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('#authRequiredModal .auth-tab-btn')
        .forEach(b => b.classList.toggle('active', b.dataset.tab === 'daftar'));
      document.querySelectorAll('#authRequiredModal .auth-panel')
        .forEach(p => p.classList.toggle('active', p.id === 'bkPanel-daftar'));
    });

    document.getElementById('linkBkToLogin')?.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('#authRequiredModal .auth-tab-btn')
        .forEach(b => b.classList.toggle('active', b.dataset.tab === 'login'));
      document.querySelectorAll('#authRequiredModal .auth-panel')
        .forEach(p => p.classList.toggle('active', p.id === 'bkPanel-login'));
    });

    // Password toggle (booking modal)
    document.getElementById('toggleBkLoginPw')?.addEventListener('click', () => {
      const inp = document.getElementById('bkLoginPw');
      if (!inp) return;
      inp.type = inp.type === 'password' ? 'text' : 'password';
      const btn = document.getElementById('toggleBkLoginPw');
      if (btn) btn.textContent = inp.type === 'password' ? '👁' : '🙈';
    });

    document.getElementById('toggleBkRegPw')?.addEventListener('click', () => {
      const inp = document.getElementById('bkRegPw');
      if (!inp) return;
      inp.type = inp.type === 'password' ? 'text' : 'password';
      const btn = document.getElementById('toggleBkRegPw');
      if (btn) btn.textContent = inp.type === 'password' ? '👁' : '🙈';
    });

    // Login modal
    document.getElementById('bkLoginForm')?.addEventListener('submit', e => {
      e.preventDefault();
      const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const email = document.getElementById('bkLoginEmail').value.trim();
      const pw = document.getElementById('bkLoginPw').value;
      const emailErr = document.getElementById('err-bkLoginEmail');
      const pwErr = document.getElementById('err-bkLoginPw');

      emailErr?.classList.remove('show');
      pwErr?.classList.remove('show');

      if (!EMAIL_RE.test(email)) {
        emailErr.textContent = 'Email tidak valid.';
        emailErr.classList.add('show');
        return;
      }
      if (!pw) {
        pwErr.textContent = 'Password wajib diisi.';
        pwErr.classList.add('show');
        return;
      }

      const result = AUTH.login(email, pw);
      if (!result.ok) {
        if (result.msg.includes('Email')) {
          emailErr.textContent = result.msg;
          emailErr.classList.add('show');
        } else {
          pwErr.textContent = result.msg;
          pwErr.classList.add('show');
        }
        return;
      }

      closeAuthRequired();
      goToSeatStep();
    });

    // Register modal
    document.getElementById('bkRegisterForm')?.addEventListener('submit', e => {
      e.preventDefault();
      const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const nama = document.getElementById('bkRegNama').value.trim();
      const email = document.getElementById('bkRegEmail').value.trim();
      const pw = document.getElementById('bkRegPw').value;
      const confirm = document.getElementById('bkRegPwConfirm').value;

      const namaErr = document.getElementById('err-bkRegNama');
      const emailErr = document.getElementById('err-bkRegEmail');
      const pwErr = document.getElementById('err-bkRegPw');
      const confirmErr = document.getElementById('err-bkRegPwConfirm');

      [namaErr, emailErr, pwErr, confirmErr].forEach(el => el?.classList.remove('show'));

      let ok = true;
      if (nama.length < 2) {
        namaErr.textContent = 'Nama minimal 2 karakter.';
        namaErr.classList.add('show');
        ok = false;
      }
      if (!EMAIL_RE.test(email)) {
        emailErr.textContent = 'Email tidak valid.';
        emailErr.classList.add('show');
        ok = false;
      }
      if (pw.length < 8) {
        pwErr.textContent = 'Password minimal 8 karakter.';
        pwErr.classList.add('show');
        ok = false;
      }
      if (pw !== confirm) {
        confirmErr.textContent = 'Password tidak cocok.';
        confirmErr.classList.add('show');
        ok = false;
      }
      if (!ok) return;

      const result = AUTH.register({ nama, email, password: pw });
      if (!result.ok) {
        emailErr.textContent = result.msg;
        emailErr.classList.add('show');
        return;
      }

      closeAuthRequired();
      goToSeatStep();
    });

    // INIT UI
    renderFilmPicker();
    [2, 3, 4].forEach(i => showEl('step' + i, false));

    // Auto-select from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilm = urlParams.get('film');
    const urlTanggal = urlParams.get('tanggal');
    const urlJam = urlParams.get('jam');
    const urlStudio = urlParams.get('studio');

    if (urlFilm && FILMS[urlFilm]) {
      selectFilm(urlFilm);

      if (urlTanggal && urlJam) {
        const jadwal = FILMS[urlFilm].jadwal;
        const jadwalEntry = jadwal.find(j => j.tanggal === urlTanggal);

        if (jadwalEntry) {
          let targetCinemaId = 'cgv-sun';
          if (urlStudio && urlStudio.includes('IMAX')) targetCinemaId = 'imax-sun';
          else if (urlStudio && urlStudio.includes('4DX')) targetCinemaId = '4dx-focal';

          selectCinema(targetCinemaId);

          // Cari chip berdasarkan tanggal (bukan index), supaya aman saat jumlah/urutan chip berubah
          const chipCandidates = Array.from(document.querySelectorAll('.date-chip'));
          const chipEl = chipCandidates.find(c => {
            // bandingkan berdasarkan teks tanggal: num+mon yang dibangun dari data
            const txt = (c.textContent || '').replace(/\s+/g, ' ').trim();
            return txt.includes(String(jadwalEntry.tgl)) && txt.toLowerCase().includes(String(jadwalEntry.bln).toLowerCase());
          });
          // fallback: kalau tidak ketemu, ambil elemen pertama
          selectTanggal(jadwalEntry, chipEl || chipCandidates[0]);

          if (jadwalEntry.sesi.includes(urlJam)) {
            const timeBtn = Array.from(document.querySelectorAll('.time-btn')).find(b => b.textContent === urlJam);
            if (timeBtn) selectJam(urlJam, timeBtn);
          }

          setTimeout(() => {
            document.getElementById('btnToSeats')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 200);
          return;
        }
      }

      setTimeout(() => {
        document.getElementById('step2')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }

  // Auto init sesuai readyState
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBooking);
  } else {
    initBooking();
  }

})();
