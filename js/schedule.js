document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("scheduleGrid");
  if (!grid) return;

  const JADWAL = [
    {
      film: "Jumbo",
      genre: "Animation / Adventure",
      durasi: "102 menit",
      tanggal: "2026-06-02",
      labelTgl: "Selasa, 2 Jun 2026",
      poster: "Images/jumbo-indonesian-movie-poster.jpg",
      alt: "Jumbo",
    },
    {
      film: "Ancika: 1995",
      genre: "Romance / Drama",
      durasi: "100 menit",
      tanggal: "2026-06-03",
      labelTgl: "Rabu, 3 Jun 2026",
      poster: "Images/ancika-1995.jpg",
      alt: "Ancika: 1995",
    },
    {
      film: "A Minecraft Movie",
      genre: "Adventure / Fantasy",
      durasi: "101 menit",
      tanggal: "2026-06-04",
      labelTgl: "Kamis, 4 Jun 2026",
      poster: "Images/a-minecraft-movie-movie-poster.jpg",
      alt: "A Minecraft Movie",
    },
    {
      film: "Agak Laen",
      genre: "Horror / Comedy",
      durasi: "119 menit",
      tanggal: "2026-06-05",
      labelTgl: "Jumat, 5 Jun 2026",
      poster: "Images/agak-laen.jpg",
      alt: "Agak Laen",
    },
    {
      film: "Siksa Kubur",
      genre: "Horror / Drama",
      durasi: "117 menit",
      tanggal: "2026-06-06",
      labelTgl: "Sabtu, 6 Jun 2026",
      poster: "Images/siksa-kubur.jpg",
      alt: "Siksa Kubur",
    },
    {
      film: "Mission: Impossible \u2013 The Final Reckoning",
      genre: "Action / Thriller",
      durasi: "169 menit",
      tanggal: "2026-06-07",
      labelTgl: "Minggu, 7 Jun 2026",
      poster: "Images/25MIFR.jpg",
      alt: "Mission: Impossible \u2013 The Final Reckoning",
    },
    {
      film: "Avengers: Infinity War",
      genre: "Action / Sci-Fi",
      durasi: "149 menit",
      tanggal: "2026-06-08",
      labelTgl: "Senin, 8 Jun 2026",
      poster: "Images/infinity.jpg",
      alt: "Avengers: Infinity War",
    },
  ];

  localStorage.setItem("cinego_jadwal", JSON.stringify(JADWAL));

  JADWAL.forEach((j) => {
    const params = new URLSearchParams({ film: j.film, tanggal: j.tanggal });
    const card = document.createElement("div");
    card.className = "schedule-card";
    card.innerHTML = `
      <img
        src="${j.poster}"
        alt="${j.alt}"
        onerror="this.src='https://placehold.co/80x114/120a02/fb923c?text=${encodeURIComponent(j.alt)}'"
      />
      <div class="schedule-info">
        <h3>${j.film}</h3>
        <p>${j.genre} &middot; ${j.durasi}</p>
        <div class="schedule-details">
          <span class="btn-date">📅 ${j.labelTgl}</span>
        </div>
        <a href="Booking.html?${params.toString()}" class="btn-booking">Pesan Tiket</a>
      </div>
    `;
    grid.appendChild(card);
  });

  const AKAN_TAYANG = [
    {
      film: "Fantastic Four: First Steps",
      genre: "Action / Sci-Fi",
      durasi: "130 menit",
      rilisDate: "2026-07-01",
      rilisLabel: "1 Juli 2026",
      poster: "Images/fantastic 4.jpg",
      alt: "Fantastic Four: First Steps",
    },
    {
      film: "Jurassic World Rebirth",
      genre: "Action / Adventure",
      durasi: "125 menit",
      rilisDate: "2026-07-03",
      rilisLabel: "3 Juli 2026",
      poster: "Images/Jurassic world.jpg",
      alt: "Jurassic World Rebirth",
    },
    {
      film: "Superman: Legacy",
      genre: "Action / Superhero",
      durasi: "138 menit",
      rilisDate: "2026-07-08",
      rilisLabel: "8 Juli 2026",
      poster: "Images/Superman.jpg",
      alt: "Superman: Legacy",
    },
    {
      film: "The Batman Part II",
      genre: "Action / Thriller",
      durasi: "165 menit",
      rilisDate: "2026-07-10",
      rilisLabel: "10 Juli 2026",
      poster: "Images/Batman II.jpg",
      alt: "The Batman Part II",
    },
  ];

  const scheduleSection = document.querySelector(".schedule-section");
  if (scheduleSection) {
    const titleAT = document.createElement("h2");
    titleAT.className = "section-title akan-tayang-title";
    titleAT.textContent = "Akan Tayang";

    const descAT = document.createElement("p");
    descAT.className = "section-desc";
    descAT.textContent = "Film yang segera hadir di bioskop Medan";

    const gridAT = document.createElement("div");
    gridAT.className = "schedule-grid akan-tayang-grid";
    gridAT.setAttribute("role", "list");
    gridAT.setAttribute("aria-label", "Daftar film akan tayang");

    AKAN_TAYANG.forEach((j) => {
      const card = document.createElement("div");
      card.className = "schedule-card schedule-card-cs";
      card.innerHTML = `
        <img src="${j.poster}" alt="${j.alt}" onerror="this.src='https://placehold.co/80x114/120a02/fb923c?text=${encodeURIComponent(j.alt)}'" />
        <div class="schedule-info">
          <div class="cs-presale-badge">Pre-Sale</div>
          <h3>${j.film}</h3>
          <p>${j.genre} &middot; ${j.durasi}</p>
          <div class="schedule-details">
            <span class="btn-date">🗓️ Rilis ${j.rilisLabel}</span>
          </div>
          <span class="btn-booking btn-booking-cs">🔔 Pre-Sale Segera</span>
        </div>
      `;
      gridAT.appendChild(card);
    });

    scheduleSection.appendChild(titleAT);
    scheduleSection.appendChild(descAT);
    scheduleSection.appendChild(gridAT);
  }
});
