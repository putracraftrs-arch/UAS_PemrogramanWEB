(function () {
  "use strict";

  const FILMS = {
    Jumbo: {
      genre: "Animation / Adventure",
      durasi: "102 menit",
      poster: "Images/jumbo-indonesian-movie-poster.jpg",
      jadwal: [
        {
          tanggal: "2026-06-02",
          hari: "Sel",
          tgl: "2",
          bln: "Jun",
          sesi: ["13:00", "16:00", "19:00"],
        },
        {
          tanggal: "2026-06-03",
          hari: "Rab",
          tgl: "3",
          bln: "Jun",
          sesi: ["13:00", "16:00", "19:00"],
        },
        {
          tanggal: "2026-06-04",
          hari: "Kam",
          tgl: "4",
          bln: "Jun",
          sesi: ["13:00", "16:00", "19:00"],
        },
        {
          tanggal: "2026-06-05",
          hari: "Jum",
          tgl: "5",
          bln: "Jun",
          sesi: ["12:00", "15:00", "18:00", "21:00"],
        },
        {
          tanggal: "2026-06-06",
          hari: "Sab",
          tgl: "6",
          bln: "Jun",
          sesi: ["09:00", "12:00", "15:00", "18:00", "21:00"],
        },
        {
          tanggal: "2026-06-07",
          hari: "Min",
          tgl: "7",
          bln: "Jun",
          sesi: ["10:00", "13:00", "16:00", "19:00"],
        },
        {
          tanggal: "2026-06-08",
          hari: "Sen",
          tgl: "8",
          bln: "Jun",
          sesi: ["13:00", "16:00", "19:00"],
        },
      ],
    },
    "Ancika: 1995": {
      genre: "Romance / Drama",
      durasi: "100 menit",
      poster: "Images/ancika-1995.jpg",
      jadwal: [
        {
          tanggal: "2026-06-03",
          hari: "Rab",
          tgl: "3",
          bln: "Jun",
          sesi: ["13:10", "16:10", "19:10"],
        },
        {
          tanggal: "2026-06-04",
          hari: "Kam",
          tgl: "4",
          bln: "Jun",
          sesi: ["13:10", "16:10", "19:10"],
        },
        {
          tanggal: "2026-06-05",
          hari: "Jum",
          tgl: "5",
          bln: "Jun",
          sesi: ["12:10", "15:10", "18:10", "21:10"],
        },
        {
          tanggal: "2026-06-06",
          hari: "Sab",
          tgl: "6",
          bln: "Jun",
          sesi: ["09:10", "12:10", "15:10", "18:10", "21:10"],
        },
        {
          tanggal: "2026-06-07",
          hari: "Min",
          tgl: "7",
          bln: "Jun",
          sesi: ["10:10", "13:10", "16:10", "19:10"],
        },
        {
          tanggal: "2026-06-08",
          hari: "Sen",
          tgl: "8",
          bln: "Jun",
          sesi: ["13:10", "16:10", "19:10"],
        },
        {
          tanggal: "2026-06-09",
          hari: "Sel",
          tgl: "9",
          bln: "Jun",
          sesi: ["13:10", "16:10", "19:10"],
        },
      ],
    },
    "A Minecraft Movie": {
      genre: "Adventure / Fantasy",
      durasi: "101 menit",
      poster: "Images/a-minecraft-movie-movie-poster.jpg",
      jadwal: [
        {
          tanggal: "2026-06-04",
          hari: "Kam",
          tgl: "4",
          bln: "Jun",
          sesi: ["12:30", "15:30", "18:30"],
        },
        {
          tanggal: "2026-06-05",
          hari: "Jum",
          tgl: "5",
          bln: "Jun",
          sesi: ["11:30", "14:30", "17:30", "20:30"],
        },
        {
          tanggal: "2026-06-06",
          hari: "Sab",
          tgl: "6",
          bln: "Jun",
          sesi: ["08:30", "11:30", "14:30", "17:30", "20:30"],
        },
        {
          tanggal: "2026-06-07",
          hari: "Min",
          tgl: "7",
          bln: "Jun",
          sesi: ["09:30", "12:30", "15:30", "18:30"],
        },
        {
          tanggal: "2026-06-08",
          hari: "Sen",
          tgl: "8",
          bln: "Jun",
          sesi: ["12:30", "15:30", "18:30"],
        },
        {
          tanggal: "2026-06-09",
          hari: "Sel",
          tgl: "9",
          bln: "Jun",
          sesi: ["12:30", "15:30", "18:30"],
        },
        {
          tanggal: "2026-06-10",
          hari: "Rab",
          tgl: "10",
          bln: "Jun",
          sesi: ["12:30", "15:30", "18:30"],
        },
      ],
    },
    "Agak Laen": {
      genre: "Horror / Comedy",
      durasi: "119 menit",
      poster: "Images/agak-laen.jpg",
      jadwal: [
        {
          tanggal: "2026-06-05",
          hari: "Jum",
          tgl: "5",
          bln: "Jun",
          sesi: ["13:25", "16:25", "19:25", "22:25"],
        },
        {
          tanggal: "2026-06-06",
          hari: "Sab",
          tgl: "6",
          bln: "Jun",
          sesi: ["10:25", "13:25", "16:25", "19:25", "22:25"],
        },
        {
          tanggal: "2026-06-07",
          hari: "Min",
          tgl: "7",
          bln: "Jun",
          sesi: ["11:25", "14:25", "17:25", "20:25"],
        },
        {
          tanggal: "2026-06-08",
          hari: "Sen",
          tgl: "8",
          bln: "Jun",
          sesi: ["14:25", "17:25", "20:25"],
        },
        {
          tanggal: "2026-06-09",
          hari: "Sel",
          tgl: "9",
          bln: "Jun",
          sesi: ["14:25", "17:25", "20:25"],
        },
        {
          tanggal: "2026-06-10",
          hari: "Rab",
          tgl: "10",
          bln: "Jun",
          sesi: ["14:25", "17:25", "20:25"],
        },
        {
          tanggal: "2026-06-11",
          hari: "Kam",
          tgl: "11",
          bln: "Jun",
          sesi: ["14:25", "17:25", "20:25"],
        },
      ],
    },
    "Siksa Kubur": {
      genre: "Horror / Drama",
      durasi: "117 menit",
      poster: "Images/siksa-kubur.jpg",
      jadwal: [
        {
          tanggal: "2026-06-06",
          hari: "Sab",
          tgl: "6",
          bln: "Jun",
          sesi: ["10:00", "13:00", "16:00", "19:00", "22:00"],
        },
        {
          tanggal: "2026-06-07",
          hari: "Min",
          tgl: "7",
          bln: "Jun",
          sesi: ["11:00", "14:00", "17:00", "20:00"],
        },
        {
          tanggal: "2026-06-08",
          hari: "Sen",
          tgl: "8",
          bln: "Jun",
          sesi: ["14:00", "17:00", "20:00"],
        },
        {
          tanggal: "2026-06-09",
          hari: "Sel",
          tgl: "9",
          bln: "Jun",
          sesi: ["14:00", "17:00", "20:00"],
        },
        {
          tanggal: "2026-06-10",
          hari: "Rab",
          tgl: "10",
          bln: "Jun",
          sesi: ["14:00", "17:00", "20:00"],
        },
        {
          tanggal: "2026-06-11",
          hari: "Kam",
          tgl: "11",
          bln: "Jun",
          sesi: ["14:00", "17:00", "20:00"],
        },
        {
          tanggal: "2026-06-12",
          hari: "Jum",
          tgl: "12",
          bln: "Jun",
          sesi: ["13:00", "16:00", "19:00", "22:00"],
        },
      ],
    },
    "Mission: Impossible \u2013 The Final Reckoning": {
      genre: "Action / Thriller",
      durasi: "169 menit",
      poster: "Images/25MIFR.jpg",
      jadwal: [
        {
          tanggal: "2026-06-07",
          hari: "Min",
          tgl: "7",
          bln: "Jun",
          sesi: ["10:00", "13:30", "17:00", "20:30"],
        },
        {
          tanggal: "2026-06-08",
          hari: "Sen",
          tgl: "8",
          bln: "Jun",
          sesi: ["13:30", "17:00", "20:30"],
        },
        {
          tanggal: "2026-06-09",
          hari: "Sel",
          tgl: "9",
          bln: "Jun",
          sesi: ["13:30", "17:00", "20:30"],
        },
        {
          tanggal: "2026-06-10",
          hari: "Rab",
          tgl: "10",
          bln: "Jun",
          sesi: ["13:30", "17:00", "20:30"],
        },
        {
          tanggal: "2026-06-11",
          hari: "Kam",
          tgl: "11",
          bln: "Jun",
          sesi: ["13:30", "17:00", "20:30"],
        },
        {
          tanggal: "2026-06-12",
          hari: "Jum",
          tgl: "12",
          bln: "Jun",
          sesi: ["12:30", "16:00", "19:30"],
        },
        {
          tanggal: "2026-06-13",
          hari: "Sab",
          tgl: "13",
          bln: "Jun",
          sesi: ["09:00", "12:30", "16:00", "19:30"],
        },
      ],
    },
    "Avengers: Infinity War": {
      genre: "Action / Sci-Fi",
      durasi: "149 menit",
      poster: "Images/infinity.jpg",
      jadwal: [
        {
          tanggal: "2026-06-08",
          hari: "Sen",
          tgl: "8",
          bln: "Jun",
          sesi: ["12:45", "15:45", "18:45"],
        },
        {
          tanggal: "2026-06-09",
          hari: "Sel",
          tgl: "9",
          bln: "Jun",
          sesi: ["12:45", "15:45", "18:45"],
        },
        {
          tanggal: "2026-06-10",
          hari: "Rab",
          tgl: "10",
          bln: "Jun",
          sesi: ["12:45", "15:45", "18:45"],
        },
        {
          tanggal: "2026-06-11",
          hari: "Kam",
          tgl: "11",
          bln: "Jun",
          sesi: ["12:45", "15:45", "18:45"],
        },
        {
          tanggal: "2026-06-12",
          hari: "Jum",
          tgl: "12",
          bln: "Jun",
          sesi: ["14:45", "17:45", "20:45"],
        },
        {
          tanggal: "2026-06-13",
          hari: "Sab",
          tgl: "13",
          bln: "Jun",
          sesi: ["11:45", "14:45", "17:45", "20:45"],
        },
        {
          tanggal: "2026-06-14",
          hari: "Min",
          tgl: "14",
          bln: "Jun",
          sesi: ["09:45", "12:45", "15:45", "18:45"],
        },
      ],
    },
    "Fantastic Four: First Steps": {
      genre: "Action / Sci-Fi",
      durasi: "130 menit",
      poster: "Images/fantastic 4.jpg",
      presale: true,
      jadwal: [
        { tanggal: "2026-07-01", hari: "Rab", tgl: "1", bln: "Jul", sesi: ["13:00", "16:00", "19:00"] },
        { tanggal: "2026-07-02", hari: "Kam", tgl: "2", bln: "Jul", sesi: ["13:00", "16:00", "19:00"] },
        { tanggal: "2026-07-03", hari: "Jum", tgl: "3", bln: "Jul", sesi: ["12:00", "15:00", "18:00", "21:00"] },
        { tanggal: "2026-07-04", hari: "Sab", tgl: "4", bln: "Jul", sesi: ["09:00", "12:00", "15:00", "18:00", "21:00"] },
        { tanggal: "2026-07-05", hari: "Min", tgl: "5", bln: "Jul", sesi: ["10:00", "13:00", "16:00", "19:00"] },
        { tanggal: "2026-07-06", hari: "Sen", tgl: "6", bln: "Jul", sesi: ["13:00", "16:00", "19:00"] },
        { tanggal: "2026-07-07", hari: "Sel", tgl: "7", bln: "Jul", sesi: ["13:00", "16:00", "19:00"] },
      ],
    },
    "Jurassic World Rebirth": {
      genre: "Action / Adventure",
      durasi: "125 menit",
      poster: "Images/Jurassic world.jpg",
      presale: true,
      jadwal: [
        { tanggal: "2026-07-03", hari: "Jum", tgl: "3", bln: "Jul", sesi: ["13:30", "16:30", "19:30", "21:30"] },
        { tanggal: "2026-07-04", hari: "Sab", tgl: "4", bln: "Jul", sesi: ["09:30", "12:30", "15:30", "18:30", "21:30"] },
        { tanggal: "2026-07-05", hari: "Min", tgl: "5", bln: "Jul", sesi: ["10:30", "13:30", "16:30", "19:30"] },
        { tanggal: "2026-07-06", hari: "Sen", tgl: "6", bln: "Jul", sesi: ["13:30", "16:30", "19:30"] },
        { tanggal: "2026-07-07", hari: "Sel", tgl: "7", bln: "Jul", sesi: ["13:30", "16:30", "19:30"] },
        { tanggal: "2026-07-08", hari: "Rab", tgl: "8", bln: "Jul", sesi: ["13:30", "16:30", "19:30"] },
        { tanggal: "2026-07-09", hari: "Kam", tgl: "9", bln: "Jul", sesi: ["13:30", "16:30", "19:30"] },
      ],
    },
    "Superman: Legacy": {
      genre: "Action / Superhero",
      durasi: "138 menit",
      poster: "Images/Superman.jpg",
      presale: true,
      jadwal: [
        { tanggal: "2026-07-08", hari: "Rab", tgl: "8", bln: "Jul", sesi: ["12:15", "15:15", "18:15", "21:15"] },
        { tanggal: "2026-07-09", hari: "Kam", tgl: "9", bln: "Jul", sesi: ["12:15", "15:15", "18:15"] },
        { tanggal: "2026-07-10", hari: "Jum", tgl: "10", bln: "Jul", sesi: ["12:15", "15:15", "18:15", "21:15"] },
        { tanggal: "2026-07-11", hari: "Sab", tgl: "11", bln: "Jul", sesi: ["09:15", "12:15", "15:15", "18:15", "21:15"] },
        { tanggal: "2026-07-12", hari: "Min", tgl: "12", bln: "Jul", sesi: ["10:15", "13:15", "16:15", "19:15"] },
        { tanggal: "2026-07-13", hari: "Sen", tgl: "13", bln: "Jul", sesi: ["12:15", "15:15", "18:15"] },
        { tanggal: "2026-07-14", hari: "Sel", tgl: "14", bln: "Jul", sesi: ["12:15", "15:15", "18:15"] },
      ],
    },
    "The Batman Part II": {
      genre: "Action / Thriller",
      durasi: "165 menit",
      poster: "Images/Batman II.jpg",
      presale: true,
      jadwal: [
        { tanggal: "2026-07-10", hari: "Jum", tgl: "10", bln: "Jul", sesi: ["14:00", "17:30", "21:00"] },
        { tanggal: "2026-07-11", hari: "Sab", tgl: "11", bln: "Jul", sesi: ["10:00", "14:00", "17:30", "21:00"] },
        { tanggal: "2026-07-12", hari: "Min", tgl: "12", bln: "Jul", sesi: ["10:00", "14:00", "17:30", "21:00"] },
        { tanggal: "2026-07-13", hari: "Sen", tgl: "13", bln: "Jul", sesi: ["14:00", "17:30", "21:00"] },
        { tanggal: "2026-07-14", hari: "Sel", tgl: "14", bln: "Jul", sesi: ["14:00", "17:30", "21:00"] },
        { tanggal: "2026-07-15", hari: "Rab", tgl: "15", bln: "Jul", sesi: ["14:00", "17:30", "21:00"] },
        { tanggal: "2026-07-16", hari: "Kam", tgl: "16", bln: "Jul", sesi: ["14:00", "17:30"] },
      ],
    },
  };

  const CINEMAS = [
    {
      id: "cgv-sun",
      nama: "CGV Sun Plaza",
      lokasi: "Sun Plaza, Lt. 4 — Medan",
      tipe: "Regular",
      badgeClass: "badge-regular",
      harga: 55000,
      rows: 8,
      cols: 14,
    },
    {
      id: "cgv-focal",
      nama: "CGV Focal Point",
      lokasi: "Focal Point Mall, Lt. 3 — Medan",
      tipe: "Regular",
      badgeClass: "badge-regular",
      harga: 50000,
      rows: 8,
      cols: 14,
    },
    {
      id: "xxi-carefour",
      nama: "XXI Carefour Medan",
      lokasi: "Carefour Gatot Subroto — Medan",
      tipe: "Regular",
      badgeClass: "badge-regular",
      harga: 45000,
      rows: 7,
      cols: 12,
    },
    {
      id: "xxi-plaza",
      nama: "XXI Plaza Medan Fair",
      lokasi: "Plaza Medan Fair, Lt. 5 — Medan",
      tipe: "Regular",
      badgeClass: "badge-regular",
      harga: 48000,
      rows: 7,
      cols: 12,
    },
    {
      id: "imax-sun",
      nama: "CGV IMAX Sun Plaza",
      lokasi: "Sun Plaza, Lt. 4 — Medan",
      tipe: "IMAX",
      badgeClass: "badge-imax",
      harga: 110000,
      rows: 10,
      cols: 16,
    },
    {
      id: "4dx-focal",
      nama: "CGV 4DX Focal Point",
      lokasi: "Focal Point Mall, Lt. 3 — Medan",
      tipe: "4DX",
      badgeClass: "badge-4dx",
      harga: 135000,
      rows: 6,
      cols: 10,
    },
  ];

  let selFilm = null,
    selCinema = null,
    selTanggal = null,
    selJam = null;
  let selSeats = [],
    seatState = {};

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function formatRp(n) {
    return "Rp " + n.toLocaleString("id-ID");
  }

  function showToast(msg, color) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.style.background = color || "";
    t.classList.add("show");
    setTimeout(() => {
      t.classList.remove("show");
      t.style.background = "";
    }, 2400);
  }

  const HARI_FULL = {
    Sen: "Senin",
    Sel: "Selasa",
    Rab: "Rabu",
    Kam: "Kamis",
    Jum: "Jumat",
    Sab: "Sabtu",
    Min: "Minggu",
  };
  const BLN_FULL = {
    Jan: "Januari",
    Feb: "Februari",
    Mar: "Maret",
    Apr: "April",
    Mei: "Mei",
    Jun: "Juni",
    Jul: "Juli",
    Agu: "Agustus",
    Sep: "September",
    Okt: "Oktober",
    Nov: "November",
    Des: "Desember",
  };

  function setStep(n) {
    [1, 2, 3, 4, 5].forEach((i) => {
      const el = document.getElementById("si" + i);
      if (!el) return;
      el.classList.toggle("active", i === n);
      el.classList.toggle("done", i < n);
    });
  }

  function goToStep(n) {
    [1, 2, 3, 4, 5].forEach((i) => {
      const el = document.getElementById("step" + i);
      if (el) el.style.display = i === n ? "block" : "none";
    });
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showEl(id, visible) {
    const el = document.getElementById(id);
    if (el) el.style.display = visible ? "block" : "none";
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function updateSeatButton() {
    const btn = document.getElementById("btnToSeats");
    if (!btn) return;
    const ready = Boolean(selFilm && selCinema && selTanggal && selJam);
    btn.style.display = "block";
    btn.disabled = !ready;
    if (ready) btn.textContent = "Pilih Kursi ->";
    else if (!selCinema) btn.textContent = "Pilih bioskop dulu";
    else if (!selTanggal) btn.textContent = "Pilih tanggal dulu";
    else btn.textContent = "Pilih jam tayang dulu";
  }

  function renderFilmPicker() {
    const grid = document.getElementById("filmPickerGrid");
    if (!grid) return;
    grid.innerHTML = "";
    Object.entries(FILMS).forEach(([nama, data]) => {
      const card = document.createElement("div");
      card.className = "fp-card";
      card.innerHTML = `
        <img src="${esc(data.poster)}" alt="${esc(nama)}"
          onerror="this.src='https://placehold.co/80x114/120a02/fb923c?text=${encodeURIComponent(nama.slice(0, 12))}'"/>
        <div class="fp-info">
          <span class="fp-title">${esc(nama)}</span>
          <span class="fp-genre">${esc(data.genre)}</span>
          <span class="fp-dur">⏱ ${esc(data.durasi)}</span>
        </div>
      `;
      card.addEventListener("click", () => selectFilm(nama));
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
    const poster2 = document.getElementById("fiPoster2");
    if (poster2) {
      poster2.src = data.poster;
      poster2.onerror = function () {
        this.src = "https://placehold.co/60x84/120a02/fb923c?text=Film";
      };
    }
    setText("fiTitle2", nama);
    setText("fiGenre2", data.genre);
    setText("fiDurasi2", "⏱ " + data.durasi);
    renderCinemas();
    goToStep(2);
  }

  function renderCinemas() {
    const list = document.getElementById("cinemaList");
    if (!list) return;
    list.innerHTML = "";
    CINEMAS.forEach((cinema) => {
      const card = document.createElement("div");
      card.className = "cinema-card";
      card.dataset.id = cinema.id;
      card.innerHTML = `
        <div class="cinema-left">
          <span class="cinema-name">${esc(cinema.nama)}</span>
          <span class="cinema-loc">📍 ${esc(cinema.lokasi)}</span>
          <div style="margin-top:6px"><span class="cinema-type-badge ${esc(cinema.badgeClass)}">${esc(cinema.tipe)}</span></div>
        </div>
        <div class="cinema-price">
          <span class="price-val">${formatRp(cinema.harga)}</span>
          <span class="price-note">/ kursi</span>
        </div>
      `;
      card.addEventListener("click", () => selectCinema(cinema.id));
      list.appendChild(card);
    });
    showEl("dateCard", false);
    showEl("timeCard", false);
    updateSeatButton();
  }

  function selectCinema(cinemaId) {
    selCinema = CINEMAS.find((c) => c.id === cinemaId);
    selTanggal = null;
    selJam = null;
    document
      .querySelectorAll(".cinema-card")
      .forEach((c) => c.classList.toggle("active", c.dataset.id === cinemaId));
    renderDateStrip();
    showEl("dateCard", true);
    showEl("timeCard", false);
    updateSeatButton();
    document
      .getElementById("dateCard")
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderDateStrip() {
    const strip = document.getElementById("dateStrip");
    if (!strip) return;
    strip.innerHTML = "";
    FILMS[selFilm].jadwal.forEach((j) => {
      const chip = document.createElement("div");
      chip.className = "date-chip";
      chip.innerHTML = `<span class="day">${esc(j.hari)}</span><span class="num">${esc(j.tgl)}</span><span class="mon">${esc(j.bln)}</span>`;
      chip.addEventListener("click", () => selectTanggal(j, chip));
      strip.appendChild(chip);
    });
  }

  function selectTanggal(j, chip) {
    selTanggal = j;
    selJam = null;
    document
      .querySelectorAll(".date-chip")
      .forEach((c) => c.classList.remove("active"));
    if (chip && chip.classList) chip.classList.add("active");
    renderTimeGrid(j);
    showEl("timeCard", true);
    updateSeatButton();
    document
      .getElementById("timeCard")
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderTimeGrid(j) {
    const grid = document.getElementById("timeGrid");
    const sub = document.getElementById("timeCardSub");
    if (!grid) return;
    grid.innerHTML = "";
    if (sub)
      sub.textContent = `${HARI_FULL[j.hari]}, ${j.tgl} ${BLN_FULL[j.bln]} ${j.tanggal.split("-")[0]}`;
    j.sesi.forEach((jam) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "time-btn";
      btn.textContent = jam;
      btn.addEventListener("click", () => selectJam(jam, btn));
      grid.appendChild(btn);
    });
  }

  function selectJam(jam, btn) {
    selJam = jam;
    selSeats = [];
    document
      .querySelectorAll(".time-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    updateSeatButton();
    document
      .getElementById("btnToSeats")
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function generateSeatState(cinema) {
    const ROWS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, cinema.rows);
    const state = {};
    if (FILMS[selFilm]?.presale) {
      for (let r = 0; r < cinema.rows; r++) {
        for (let c = 1; c <= cinema.cols; c++) {
          state[ROWS[r] + c] = "available";
        }
      }
      return state;
    }
    const seedStr = selFilm + cinema.id + selTanggal.tanggal + selJam;
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++)
      seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
    function rand() {
      seed ^= seed << 13;
      seed ^= seed >> 17;
      seed ^= seed << 5;
      return (seed >>> 0) / 4294967296;
    }
    const occupancyRate = 0.35 + rand() * 0.4;
    const midRow = Math.floor(cinema.rows / 2);
    for (let r = 0; r < cinema.rows; r++) {
      const rowLetter = ROWS[r];
      const distFromMid = Math.abs(r - midRow) / cinema.rows;
      const rowOccupancy = Math.max(
        0.1,
        occupancyRate - distFromMid * 0.3 + rand() * 0.15,
      );
      for (let c = 1; c <= cinema.cols; c++) {
        state[rowLetter + c] = rand() < rowOccupancy ? "taken" : "available";
      }
    }
    return state;
  }

  function renderSeatGrid() {
    const cinema = selCinema;
    seatState = generateSeatState(cinema);
    const allTickets = JSON.parse(localStorage.getItem("cinego_tiket") || "[]");
    allTickets.forEach((t) => {
      if (
        t.film === selFilm &&
        t.cinemaId === cinema.id &&
        t.tanggal === selTanggal.tanggal &&
        t.jam === selJam &&
        Array.isArray(t.kursi)
      ) {
        t.kursi.forEach((s) => {
          if (seatState[s] !== undefined) seatState[s] = "taken";
        });
      }
    });
    const ROWS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, cinema.rows).split("");
    const grid = document.getElementById("seatGrid");
    if (!grid) return;
    grid.innerHTML = "";
    ROWS.forEach((rowLetter) => {
      const row = document.createElement("div");
      row.className = "seat-row";
      const lbl = document.createElement("span");
      lbl.className = "row-label";
      lbl.textContent = rowLetter;
      row.appendChild(lbl);
      const halfCols = Math.floor(cinema.cols / 2);
      for (let c = 1; c <= cinema.cols; c++) {
        if (c === halfCols + 1) {
          const gap = document.createElement("div");
          gap.className = "seat-gap";
          row.appendChild(gap);
        }
        const seatId = rowLetter + c;
        const seat = document.createElement("button");
        seat.type = "button";
        seat.className = "seat " + seatState[seatId];
        seat.dataset.seatId = seatId;
        seat.title = seatId;
        seat.addEventListener("click", () => toggleSeat(seat, seatId));
        row.appendChild(seat);
      }
      grid.appendChild(row);
    });
    updateSeatCounter();
  }

  function toggleSeat(btn, seatId) {
    if (seatState[seatId] === "taken") return;
    const idx = selSeats.indexOf(seatId);
    if (idx === -1) {
      if (selSeats.length >= 6) {
        showToast("⚠️ Maksimal 6 kursi per pemesanan", "#b45309");
        return;
      }
      selSeats.push(seatId);
      btn.className = "seat selected";
    } else {
      selSeats.splice(idx, 1);
      btn.className = "seat " + seatState[seatId];
    }
    updateSeatCounter();
  }

  function updateSeatCounter() {
    const counter = document.getElementById("seatCounter");
    if (!counter) return;
    if (selSeats.length === 0) {
      counter.textContent = "Pilih kursi kamu";
      return;
    }
    const total = selSeats.length * selCinema.harga;
    counter.innerHTML = `<strong>${selSeats.length}</strong> kursi dipilih: <strong>${selSeats.join(", ")}</strong> — <strong>${formatRp(total)}</strong>`;
  }

  function goToSeatStep() {
    if (!selFilm || !selCinema || !selTanggal || !selJam) {
      showToast("Pilih bioskop, tanggal, dan jam tayang dulu.", "#b45309");
      updateSeatButton();
      return;
    }
    const data = FILMS[selFilm];
    const sPoster = document.getElementById("sSumPoster");
    if (sPoster) {
      sPoster.src = data.poster;
      sPoster.onerror = function () {
        this.src = "https://placehold.co/60x84/120a02/fb923c?text=Film";
      };
    }
    setText("sSumFilm", selFilm);
    setText(
      "sSumMeta",
      `${HARI_FULL[selTanggal.hari]}, ${selTanggal.tgl} ${BLN_FULL[selTanggal.bln]} ${selTanggal.tanggal.split("-")[0]} • ${selJam}`,
    );
    setText(
      "sSumCinema",
      `🏛️ ${selCinema.nama} • ${formatRp(selCinema.harga)}/kursi`,
    );
    selSeats = [];
    renderSeatGrid();
    goToStep(3);
  }

  function goToBookingForm() {
    const data = FILMS[selFilm];
    const bPoster = document.getElementById("bsStripPoster");
    if (bPoster) {
      bPoster.src = data.poster;
      bPoster.onerror = function () {
        this.src = "https://placehold.co/42x58/120a02/fb923c?text=Film";
      };
    }
    setText("bsStripFilm", selFilm + " — " + selCinema.nama);
    setText(
      "bsStripMeta",
      `${HARI_FULL[selTanggal.hari]}, ${selTanggal.tgl} ${BLN_FULL[selTanggal.bln]} ${selTanggal.tanggal.split("-")[0]} • ${selJam}`,
    );
    setText("bsStripSeats", selSeats.join(", "));
    setText(
      "bsStripPrice",
      `${selSeats.length} kursi × ${formatRp(selCinema.harga)}`,
    );
    const total = selSeats.length * selCinema.harga;
    setText("selectedSeatNames", selSeats.join(", "));
    setText("pricePerSeat", formatRp(selCinema.harga));
    setText("totalHarga", formatRp(total));
    if (typeof AUTH !== "undefined") {
      const user = AUTH.getCurrentUser();
      if (user) {
        const namaEl = document.getElementById("nama");
        const emailEl = document.getElementById("email");
        if (namaEl && !namaEl.value) namaEl.value = user.nama || "";
        if (emailEl) emailEl.value = user.email || "";
      }
    }
    goToStep(4);
  }

  function openAuthRequired() {
    const overlay = document.getElementById("authRequiredOverlay");
    const modal = document.getElementById("authRequiredModal");
    if (!overlay || !modal) return;
    overlay.classList.add("show");
    modal.classList.add("show");
    overlay.style.cssText = "display:block;opacity:1;pointer-events:all";
    modal.style.cssText = "display:block;opacity:1;pointer-events:all";
    document.body.style.overflow = "hidden";
  }

  function closeAuthRequired() {
    const overlay = document.getElementById("authRequiredOverlay");
    const modal = document.getElementById("authRequiredModal");
    if (overlay) {
      overlay.classList.remove("show");
      overlay.style.cssText = "";
    }
    if (modal) {
      modal.classList.remove("show");
      modal.style.cssText = "";
    }
    document.body.style.overflow = "";
  }

  function setErr(id, msg) {
    const el = document.getElementById(id);
    const err = document.getElementById("err-" + id);
    if (el) el.classList.add("error");
    if (err) {
      err.textContent = msg;
      err.classList.add("show");
    }
  }
  function clrErr(id) {
    const el = document.getElementById(id);
    const err = document.getElementById("err-" + id);
    if (el) el.classList.remove("error");
    if (err) err.classList.remove("show");
  }

  window.cinegoGoToSeats = goToSeatStep;

  function initBooking() {
    if (!document.getElementById("filmPickerGrid")) return;

    document
      .getElementById("btnGantiFilm")
      ?.addEventListener("click", () => goToStep(1));
    document
      .getElementById("btnBackToSchedule")
      ?.addEventListener("click", () => goToStep(2));
    document.getElementById("btnBackToSeats")?.addEventListener("click", () => {
      selSeats = [];
      goToStep(3);
      renderSeatGrid();
    });

    document.getElementById("btnToSeats")?.addEventListener("click", () => {
      if (!selCinema || !selTanggal || !selJam) {
        showToast("Pilih bioskop, tanggal, dan jam tayang dulu.", "#b45309");
        updateSeatButton();
        return;
      }
      goToSeatStep();
    });

    document
      .getElementById("btnToBookingForm")
      ?.addEventListener("click", () => {
        if (selSeats.length === 0) {
          showToast("⚠️ Pilih minimal 1 kursi", "#b45309");
          return;
        }
        goToBookingForm();
      });

    document
      .getElementById("nama")
      ?.addEventListener("input", () => clrErr("nama"));

    document
      .getElementById("bookingForm")
      ?.addEventListener("submit", function (e) {
        e.preventDefault();
        const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nama = document.getElementById("nama").value.trim();
        if (typeof AUTH === "undefined" || !AUTH.getSession) {
          showToast("Sistem login belum siap.", "#b45309");
          return;
        }
        const session = AUTH.getSession();
        const email = (session?.email || document.getElementById("email").value)
          .trim()
          .toLowerCase();
        if (!session) {
          openAuthRequired();
          return;
        }
        if (!nama) {
          setErr("nama", "Nama wajib diisi.");
          return;
        }
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
          status: "Menunggu Pembayaran",
        };
        // Proceed to QRIS payment step
        goToQrisStep(tiket);
      });


    document
      .getElementById("btnCloseAuthRequired")
      ?.addEventListener("click", closeAuthRequired);
    document
      .getElementById("authRequiredOverlay")
      ?.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) closeAuthRequired();
      });

    document
      .querySelectorAll("#authRequiredModal .auth-tab-btn")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          document
            .querySelectorAll("#authRequiredModal .auth-tab-btn")
            .forEach((b) => b.classList.remove("active"));
          document
            .querySelectorAll("#authRequiredModal .auth-panel")
            .forEach((p) => p.classList.remove("active"));
          btn.classList.add("active");
          document
            .getElementById("bkPanel-" + btn.dataset.tab)
            ?.classList.add("active");
        });
      });

    document
      .getElementById("linkBkToDaftar")
      ?.addEventListener("click", (e) => {
        e.preventDefault();
        document
          .querySelectorAll("#authRequiredModal .auth-tab-btn")
          .forEach((b) =>
            b.classList.toggle("active", b.dataset.tab === "daftar"),
          );
        document
          .querySelectorAll("#authRequiredModal .auth-panel")
          .forEach((p) =>
            p.classList.toggle("active", p.id === "bkPanel-daftar"),
          );
      });
    document.getElementById("linkBkToLogin")?.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelectorAll("#authRequiredModal .auth-tab-btn")
        .forEach((b) =>
          b.classList.toggle("active", b.dataset.tab === "login"),
        );
      document
        .querySelectorAll("#authRequiredModal .auth-panel")
        .forEach((p) => p.classList.toggle("active", p.id === "bkPanel-login"));
    });

    document
      .getElementById("toggleBkLoginPw")
      ?.addEventListener("click", () => {
        const inp = document.getElementById("bkLoginPw");
        if (!inp) return;
        inp.type = inp.type === "password" ? "text" : "password";
        document.getElementById("toggleBkLoginPw").textContent =
          inp.type === "password" ? "👁" : "🙈";
      });
    document.getElementById("toggleBkRegPw")?.addEventListener("click", () => {
      const inp = document.getElementById("bkRegPw");
      if (!inp) return;
      inp.type = inp.type === "password" ? "text" : "password";
      document.getElementById("toggleBkRegPw").textContent =
        inp.type === "password" ? "👁" : "🙈";
    });

    document.getElementById("bkLoginForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const email = document.getElementById("bkLoginEmail").value.trim();
      const pw = document.getElementById("bkLoginPw").value;
      const emailErr = document.getElementById("err-bkLoginEmail");
      const pwErr = document.getElementById("err-bkLoginPw");
      emailErr?.classList.remove("show");
      pwErr?.classList.remove("show");
      if (!EMAIL_RE.test(email)) {
        emailErr.textContent = "Email tidak valid.";
        emailErr.classList.add("show");
        return;
      }
      if (!pw) {
        pwErr.textContent = "Password wajib diisi.";
        pwErr.classList.add("show");
        return;
      }
      const result = AUTH.login(email, pw);
      if (!result.ok) {
        if (result.msg.includes("Email")) {
          emailErr.textContent = result.msg;
          emailErr.classList.add("show");
        } else {
          pwErr.textContent = result.msg;
          pwErr.classList.add("show");
        }
        return;
      }
      closeAuthRequired();
      goToBookingForm();
    });

    document
      .getElementById("bkRegisterForm")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nama = document.getElementById("bkRegNama").value.trim();
        const email = document.getElementById("bkRegEmail").value.trim();
        const pw = document.getElementById("bkRegPw").value;
        const confirm = document.getElementById("bkRegPwConfirm").value;
        const namaErr = document.getElementById("err-bkRegNama");
        const emailErr = document.getElementById("err-bkRegEmail");
        const pwErr = document.getElementById("err-bkRegPw");
        const confErr = document.getElementById("err-bkRegPwConfirm");
        [namaErr, emailErr, pwErr, confErr].forEach((el) =>
          el?.classList.remove("show"),
        );
        let ok = true;
        if (nama.length < 2) {
          namaErr.textContent = "Nama minimal 2 karakter.";
          namaErr.classList.add("show");
          ok = false;
        }
        if (!EMAIL_RE.test(email)) {
          emailErr.textContent = "Email tidak valid.";
          emailErr.classList.add("show");
          ok = false;
        }
        if (pw.length < 8) {
          pwErr.textContent = "Password minimal 8 karakter.";
          pwErr.classList.add("show");
          ok = false;
        }
        if (pw !== confirm) {
          confErr.textContent = "Password tidak cocok.";
          confErr.classList.add("show");
          ok = false;
        }
        if (!ok) return;
        const result = AUTH.register({ nama, email, password: pw });
        if (!result.ok) {
          emailErr.textContent = result.msg;
          emailErr.classList.add("show");
          return;
        }
        closeAuthRequired();
        goToBookingForm();
      });

    renderFilmPicker();
    [2, 3, 4, 5].forEach((i) => showEl("step" + i, false));

    // QRIS button listeners
    document.getElementById("btnQrisClose")?.addEventListener("click", () => {
      clearQrisTimer();
      window.location.href = "MyTicket.html";
    });
    document.getElementById("btnQrisConfirm")?.addEventListener("click", () => {
      confirmQrisPayment();
    });

    const urlParams = new URLSearchParams(window.location.search);
    const urlFilm = urlParams.get("film");
    const urlTanggal = urlParams.get("tanggal");
    const urlJam = urlParams.get("jam");
    const urlStudio = urlParams.get("studio");

    if (urlFilm && FILMS[urlFilm]) {
      selectFilm(urlFilm);
      if (urlTanggal && urlJam) {
        const jadwalEntry = FILMS[urlFilm].jadwal.find(
          (j) => j.tanggal === urlTanggal,
        );
        if (jadwalEntry) {
          let targetCinemaId = "cgv-sun";
          if (urlStudio && urlStudio.includes("IMAX"))
            targetCinemaId = "imax-sun";
          else if (urlStudio && urlStudio.includes("4DX"))
            targetCinemaId = "4dx-focal";
          selectCinema(targetCinemaId);
          const chips = Array.from(document.querySelectorAll(".date-chip"));
          const chipEl = chips.find((c) => {
            const txt = (c.textContent || "").replace(/\s+/g, " ").trim();
            return (
              txt.includes(String(jadwalEntry.tgl)) &&
              txt.toLowerCase().includes(String(jadwalEntry.bln).toLowerCase())
            );
          });
          selectTanggal(jadwalEntry, chipEl || chips[0]);
          if (jadwalEntry.sesi.includes(urlJam)) {
            const timeBtn = Array.from(
              document.querySelectorAll(".time-btn"),
            ).find((b) => b.textContent === urlJam);
            if (timeBtn) selectJam(urlJam, timeBtn);
          }
          setTimeout(
            () =>
              document
                .getElementById("btnToSeats")
                ?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
            200,
          );
          return;
        }
      }
      setTimeout(
        () =>
          document
            .getElementById("step2")
            ?.scrollIntoView({ behavior: "smooth", block: "start" }),
        200,
      );
    }
  }

  // ─── QRIS PAYMENT ────────────────────────────────────────────────────────
  let qrisTimerInterval = null;
  let qrisPendingTicket = null;

  function clearQrisTimer() {
    if (qrisTimerInterval) {
      clearInterval(qrisTimerInterval);
      qrisTimerInterval = null;
    }
  }

  function generateQRSVG(seed) {
    const SIZE = 29;
    const MOD = 7;
    const MARGIN = 14;
    const total = SIZE * MOD + MARGIN * 2;
    const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

    // Finder pattern helper (7×7 with white interior ring, 3×3 dark center)
    function addFinder(r, c) {
      for (let i = 0; i < 7; i++) {
        grid[r + i][c] = 1; grid[r + i][c + 6] = 1;
        grid[r][c + i] = 1; grid[r + 6][c + i] = 1;
      }
      for (let i = 1; i < 6; i++) for (let j = 1; j < 6; j++) grid[r + i][c + j] = 0;
      for (let i = 2; i < 5; i++) for (let j = 2; j < 5; j++) grid[r + i][c + j] = 1;
    }
    addFinder(0, 0);
    addFinder(0, SIZE - 7);
    addFinder(SIZE - 7, 0);

    // Timing patterns
    for (let i = 8; i < SIZE - 8; i++) {
      grid[6][i] = i % 2 === 0 ? 1 : 0;
      grid[i][6] = i % 2 === 0 ? 1 : 0;
    }

    // Mark reserved zones
    const reserved = new Set();
    for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) {
      reserved.add(i + "," + j);
      reserved.add(i + "," + (SIZE - 1 - j + 1));
      reserved.add((SIZE - 1 - i + 1) + "," + j);
    }
    for (let i = 8; i < SIZE - 8; i++) {
      reserved.add("6," + i); reserved.add(i + ",6");
    }

    // Seeded pseudo-random data modules
    let s = seed >>> 0;
    function rng() {
      s ^= s << 13; s ^= s >> 17; s ^= s << 5;
      return (s >>> 0) / 4294967296;
    }
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (!reserved.has(r + "," + c)) {
          grid[r][c] = rng() < 0.48 ? 1 : 0;
        }
      }
    }

    let rects = "";
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (grid[r][c]) {
          const x = MARGIN + c * MOD;
          const y = MARGIN + r * MOD;
          rects += `<rect x="${x}" y="${y}" width="${MOD}" height="${MOD}" fill="#1a0a00"/>`;
        }
      }
    }

    // White center patch for logo overlay
    const cx = Math.floor(total / 2), cy = Math.floor(total / 2), ps = 26;
    rects += `<rect x="${cx - ps / 2}" y="${cy - ps / 2}" width="${ps}" height="${ps}" fill="#fff" rx="4"/>`;
    rects += `<text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="9" font-weight="700" fill="#ea580c" font-family="Inter,sans-serif">QR</text>`;

    return `<svg viewBox="0 0 ${total} ${total}" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;max-width:220px;border-radius:10px;background:#fff">${rects}</svg>`;
  }

  function goToQrisStep(ticketData) {
    qrisPendingTicket = ticketData;

    // === Soal 7: simpan data ke MyTicket SEGERA setelah step 4, sebelum tampil QRIS ===
    const semuaTiket = JSON.parse(localStorage.getItem("cinego_tiket") || "[]");
    semuaTiket.push(ticketData);
    localStorage.setItem("cinego_tiket", JSON.stringify(semuaTiket));

    // Populate summary strip
    const data = FILMS[selFilm];
    const qsPoster = document.getElementById("qsStripPoster");
    if (qsPoster) {
      qsPoster.src = data.poster;
      qsPoster.onerror = function () { this.src = "https://placehold.co/42x58/120a02/fb923c?text=Film"; };
    }
    setText("qsStripFilm", selFilm + " — " + selCinema.nama);
    setText("qsStripMeta",
      `${HARI_FULL[selTanggal.hari]}, ${selTanggal.tgl} ${BLN_FULL[selTanggal.bln]} ${selTanggal.tanggal.split("-")[0]} • ${selJam}`
    );
    setText("qsStripSeats", selSeats.join(", "));
    setText("qsStripPrice", `${selSeats.length} kursi × ${formatRp(selCinema.harga)}`);

    // Order ID & total & nama
    const orderId = "CG" + String(ticketData.id).slice(-8).toUpperCase();
    setText("qrisOrderId", orderId);
    setText("qrisNama", ticketData.nama);
    setText("qrisTotalAmt", formatRp(ticketData.total));

    // Generate QR Code SVG
    const qrFrame = document.getElementById("qrisQrFrame");
    if (qrFrame) {
      let seed = 0;
      for (let i = 0; i < orderId.length; i++) seed = (seed * 31 + orderId.charCodeAt(i)) >>> 0;
      qrFrame.innerHTML = generateQRSVG(seed);
    }

    // Start 15-minute timer
    startQrisTimer(15 * 60);
    goToStep(5);
  }

  function startQrisTimer(seconds) {
    clearQrisTimer();
    let remaining = seconds;

    function tick() {
      const timerEl = document.getElementById("qrisTimer");
      if (!timerEl) { clearQrisTimer(); return; }
      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      timerEl.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      timerEl.classList.toggle("qris-timer-urgent", remaining <= 60);
      if (remaining <= 0) {
        clearQrisTimer();
        timerEl.textContent = "00:00";
        handleQrisExpired();
        return;
      }
      remaining--;
    }

    tick();
    qrisTimerInterval = setInterval(tick, 1000);
  }

  function handleQrisExpired() {
    showToast("⏰ Waktu pembayaran habis. Silakan mulai ulang.", "#b45309");

    // Hapus tiket yang belum dibayar (sudah tersimpan sejak masuk step 5)
    if (qrisPendingTicket) {
      const semua = JSON.parse(localStorage.getItem("cinego_tiket") || "[]");
      const filtered = semua.filter((t) => t.id !== qrisPendingTicket.id);
      localStorage.setItem("cinego_tiket", JSON.stringify(filtered));
    }

    qrisPendingTicket = null;
    setTimeout(() => goToStep(1), 2500);
  }

  function confirmQrisPayment() {
    if (!qrisPendingTicket) return;
    clearQrisTimer();

    // Data tiket sudah disimpan saat masuk step 5 (lihat goToQrisStep).
    // Di sini kita cukup update statusnya jadi "Lunas" / sudah dibayar.
    const semua = JSON.parse(localStorage.getItem("cinego_tiket") || "[]");
    const idx = semua.findIndex((t) => t.id === qrisPendingTicket.id);
    if (idx !== -1) {
      semua[idx].status = "Lunas";
    }
    localStorage.setItem("cinego_tiket", JSON.stringify(semua));
    qrisPendingTicket = null;

    [1, 2, 3, 4, 5].forEach((i) => {
      const si = document.getElementById("si" + i);
      if (si) { si.classList.remove("active"); si.classList.add("done"); }
    });

    showToast("🎉 Pembayaran berhasil! Tiket sedang diproses...", "#15803d");
    setTimeout(() => { window.location.href = "MyTicket.html"; }, 2000);
  }
  // ─── END QRIS ────────────────────────────────────────────────────────────

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", initBooking);
  else initBooking();
})();