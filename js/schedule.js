document.addEventListener('DOMContentLoaded', () => {

  const JADWAL = [
    {
      film    : 'Jumbo',
      genre   : 'Animation / Adventure',
      durasi  : '102 menit',
      tanggal : '2026-06-02',
      labelTgl: 'Selasa, 2 Jun 2026',
      poster  : 'Images/jumbo-indonesian-movie-poster.jpg',
      alt     : 'Jumbo',
    },
    {
      film    : 'Ancika: 1995',
      genre   : 'Romance / Drama',
      durasi  : '100 menit',
      tanggal : '2026-06-03',
      labelTgl: 'Rabu, 3 Jun 2026',
      poster  : 'Images/ancika-1995.jpg',
      alt     : 'Ancika: 1995',
    },
    {
      film    : 'A Minecraft Movie',
      genre   : 'Adventure / Fantasy',
      durasi  : '101 menit',
      tanggal : '2026-06-04',
      labelTgl: 'Kamis, 4 Jun 2026',
      poster  : 'Images/a-minecraft-movie-movie-poster.jpg',
      alt     : 'A Minecraft Movie',
    },
    {
      film    : 'Agak Laen',
      genre   : 'Horror / Comedy',
      durasi  : '119 menit',
      tanggal : '2026-06-05',
      labelTgl: 'Jumat, 5 Jun 2026',
      poster  : 'Images/agak-laen.jpg',
      alt     : 'Agak Laen',
    },
    {
      film    : 'Siksa Kubur',
      genre   : 'Horror / Drama',
      durasi  : '117 menit',
      tanggal : '2026-06-06',
      labelTgl: 'Sabtu, 6 Jun 2026',
      poster  : 'Images/siksa-kubur.jpg',
      alt     : 'Siksa Kubur',
    },
    {
      film    : 'Mission: Impossible \u2013 The Final Reckoning',
      genre   : 'Action / Thriller',
      durasi  : '169 menit',
      tanggal : '2026-06-07',
      labelTgl: 'Minggu, 7 Jun 2026',
      poster  : 'Images/25MIFR.jpg',
      alt     : 'Mission: Impossible \u2013 The Final Reckoning',
    },
    {
      film    : 'Avengers: Infinity War',
      genre   : 'Action / Sci-Fi',
      durasi  : '149 menit',
      tanggal : '2026-06-08',
      labelTgl: 'Senin, 8 Jun 2026',
      poster  : 'Images/infinity.jpg',
      alt     : 'Avengers: Infinity War',
    },
  ];

  localStorage.setItem('cinego_jadwal', JSON.stringify(JADWAL));

  const grid = document.getElementById('scheduleGrid');

  JADWAL.forEach(j => {
    const params = new URLSearchParams({
      film   : j.film,
      tanggal: j.tanggal,

    });

    const card = document.createElement('div');
    card.className = 'schedule-card';
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

});
