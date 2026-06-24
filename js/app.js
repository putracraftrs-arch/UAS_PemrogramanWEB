const AUTH = (() => {
  const KEY_USERS = "cinego_users";
  const KEY_SESSION = "cinego_session";

  function getUsers() {
    return JSON.parse(localStorage.getItem(KEY_USERS) || "[]");
  }

  function saveUsers(arr) {
    localStorage.setItem(KEY_USERS, JSON.stringify(arr));
  }

  function getSession() {
    const raw = localStorage.getItem(KEY_SESSION);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function getCurrentUser() {
    const session = getSession();
    if (!session) return null;
    const users = getUsers();
    return users.find((u) => u.email === session.email) || null;
  }

  function register({ nama, email, password }) {
    const users = getUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, msg: "Email sudah terdaftar." };
    }
    const user = {
      id: Date.now(),
      nama: nama.trim(),
      email: email.trim().toLowerCase(),
      password,
      username: "",
      telp: "",
      tgl: "",
      gender: "",
      kota: "",
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    saveUsers(users);
    localStorage.setItem(
      KEY_SESSION,
      JSON.stringify({ email: user.email, nama: user.nama }),
    );
    updateNavUI();
    return { ok: true };
  }

  function login(email, password) {
    const users = getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
    );
    if (!user) return { ok: false, msg: "Email tidak ditemukan." };
    if (user.password !== password)
      return { ok: false, msg: "Password salah." };
    localStorage.setItem(
      KEY_SESSION,
      JSON.stringify({ email: user.email, nama: user.nama }),
    );
    updateNavUI();
    return { ok: true };
  }

  function logout() {
    localStorage.removeItem(KEY_SESSION);
    updateNavUI();
    window.location.href = "Home.html";
  }

  function updateProfile(data) {
    const session = getSession();
    if (!session) return { ok: false, msg: "Sesi tidak ditemukan." };
    if (data.email) data.email = data.email.trim().toLowerCase();
    const users = getUsers();
    const idx = users.findIndex((u) => u.email === session.email);
    if (idx === -1) return { ok: false, msg: "Akun tidak ditemukan." };
    if (
      data.email &&
      data.email !== session.email &&
      users.some((u, i) => i !== idx && u.email.toLowerCase() === data.email)
    ) {
      return { ok: false, msg: "Email sudah terdaftar." };
    }
    const oldEmail = users[idx].email;
    users[idx] = { ...users[idx], ...data, password: users[idx].password };
    saveUsers(users);
    if (data.email && data.email !== oldEmail) {
      const tickets = JSON.parse(localStorage.getItem("cinego_tiket") || "[]");
      tickets.forEach((t) => {
        if ((t.email || "").toLowerCase() === oldEmail.toLowerCase()) {
          t.email = data.email.trim().toLowerCase();
        }
      });
      localStorage.setItem("cinego_tiket", JSON.stringify(tickets));
    }
    const nextNama = data.nama !== undefined ? data.nama : users[idx].nama;
    localStorage.setItem(
      KEY_SESSION,
      JSON.stringify({ email: users[idx].email, nama: nextNama }),
    );
    updateNavUI();
    return { ok: true };
  }

  function changePassword(oldPw, newPw) {
    const session = getSession();
    if (!session) return { ok: false, msg: "Sesi tidak ditemukan." };
    const users = getUsers();
    const idx = users.findIndex((u) => u.email === session.email);
    if (idx === -1) return { ok: false, msg: "Akun tidak ditemukan." };
    if (users[idx].password !== oldPw)
      return { ok: false, msg: "Password lama salah." };
    users[idx].password = newPw;
    saveUsers(users);
    return { ok: true };
  }

  function deleteAccount() {
    const session = getSession();
    if (!session) return;
    let users = getUsers();
    users = users.filter((u) => u.email !== session.email);
    saveUsers(users);
    const tickets = JSON.parse(localStorage.getItem("cinego_tiket") || "[]");
    const remainingTickets = tickets.filter(
      (t) => (t.email || "").toLowerCase() !== session.email.toLowerCase(),
    );
    localStorage.setItem("cinego_tiket", JSON.stringify(remainingTickets));
    localStorage.removeItem(KEY_SESSION);
    window.location.href = "Home.html";
  }

  function switchAuthTab(tab) {
    document.querySelectorAll(".auth-tab-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tab);
    });
    document.querySelectorAll(".auth-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === "authPanel-" + tab);
    });
  }

  function updateNavUI() {
    const session = getSession();
    document.querySelectorAll(".nav-logout-btn").forEach((btn) => btn.remove());
    const myAccountLinks = document.querySelectorAll(
      '.nav-menu li a[href="MyAccount.html"]',
    );
    if (session) {
      myAccountLinks.forEach((link) => {
        link.textContent = "👤 " + session.nama.split(" ")[0];
        link.classList.add("nav-logged-in");
        const btn = document.createElement("button");
        btn.className = "nav-logout-btn";
        btn.textContent = "Keluar";
        btn.title = "Logout";
        btn.addEventListener("click", () => {
          if (confirm("Yakin ingin keluar?")) logout();
        });
        link.parentElement.appendChild(btn);
      });
    } else {
      myAccountLinks.forEach((link) => {
        link.textContent = "MyAccount";
        link.classList.remove("nav-logged-in");
      });
    }
  }

  function initHomeModal() {
    const overlay = document.getElementById("authOverlay");
    const modal = document.getElementById("authModal");
    const btnOpenAuth = document.getElementById("btnOpenAuth");
    const btnOpenReg = document.getElementById("btnOpenRegister");
    const btnClose = document.getElementById("authClose");
    const linkToDaftar = document.getElementById("linkToDaftar");
    const linkToLogin = document.getElementById("linkToLogin");
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!overlay || !modal) return;

    function openModal(tab) {
      overlay.classList.add("show");
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
      ["login", "daftar"].forEach((t) => {
        document
          .querySelector(`#authModal .auth-tab-btn[data-tab="${t}"]`)
          ?.classList.toggle("active", t === tab);
        document
          .getElementById("authPanel-" + t)
          ?.classList.toggle("active", t === tab);
      });
    }

    function closeModal() {
      overlay.classList.remove("show");
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }

    btnOpenAuth?.addEventListener("click", () => openModal("login"));
    btnOpenReg?.addEventListener("click", (e) => {
      e.preventDefault();
      openModal("daftar");
    });
    btnClose?.addEventListener("click", closeModal);
    overlay?.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });
    linkToDaftar?.addEventListener("click", (e) => {
      e.preventDefault();
      openModal("daftar");
    });
    linkToLogin?.addEventListener("click", (e) => {
      e.preventDefault();
      openModal("login");
    });

    document.querySelectorAll("#authModal .auth-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll("#authModal .auth-tab-btn")
          .forEach((b) => b.classList.remove("active"));
        document
          .querySelectorAll("#authModal .auth-panel")
          .forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        document
          .getElementById("authPanel-" + btn.dataset.tab)
          ?.classList.add("active");
      });
    });

    document.getElementById("toggleLoginPw")?.addEventListener("click", () => {
      const inp = document.getElementById("loginPw");
      inp.type = inp.type === "password" ? "text" : "password";
      document.getElementById("toggleLoginPw").textContent =
        inp.type === "password" ? "👁" : "🙈";
    });
    document.getElementById("toggleRegPw")?.addEventListener("click", () => {
      const inp = document.getElementById("regPw");
      inp.type = inp.type === "password" ? "text" : "password";
      document.getElementById("toggleRegPw").textContent =
        inp.type === "password" ? "👁" : "🙈";
    });

    function clrErr(id) {
      document.getElementById(id)?.classList.remove("error");
      document.getElementById("err-" + id)?.classList.remove("show");
    }
    function setErr(id, msg) {
      const el = document.getElementById(id);
      const err = document.getElementById("err-" + id);
      el?.classList.add("error");
      if (err) {
        err.textContent = msg;
        err.classList.add("show");
      }
    }

    ["loginEmail", "loginPw"].forEach((id) =>
      document.getElementById(id)?.addEventListener("input", () => clrErr(id)),
    );
    ["regNama", "regEmail", "regPw", "regPwConfirm"].forEach((id) =>
      document.getElementById(id)?.addEventListener("input", () => clrErr(id)),
    );

    document.getElementById("loginForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const pw = document.getElementById("loginPw").value;
      let ok = true;
      if (!EMAIL_RE.test(email)) {
        setErr("loginEmail", "Email tidak valid.");
        ok = false;
      }
      if (!pw) {
        setErr("loginPw", "Password wajib diisi.");
        ok = false;
      }
      if (!ok) return;
      const result = login(email, pw);
      if (!result.ok) {
        if (result.msg.includes("Email")) setErr("loginEmail", result.msg);
        else setErr("loginPw", result.msg);
        return;
      }
      closeModal();
      showToastGlobal(
        "👋 Selamat datang kembali, " + getSession().nama.split(" ")[0] + "!",
      );
    });

    document.getElementById("registerForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const nama = document.getElementById("regNama").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const pw = document.getElementById("regPw").value;
      const confirm = document.getElementById("regPwConfirm").value;
      let ok = true;
      if (nama.length < 2) {
        setErr("regNama", "Nama minimal 2 karakter.");
        ok = false;
      }
      if (!EMAIL_RE.test(email)) {
        setErr("regEmail", "Email tidak valid.");
        ok = false;
      }
      if (pw.length < 8) {
        setErr("regPw", "Password minimal 8 karakter.");
        ok = false;
      }
      if (pw !== confirm) {
        setErr("regPwConfirm", "Password tidak cocok.");
        ok = false;
      }
      if (!ok) return;
      const result = register({ nama, email, password: pw });
      if (!result.ok) {
        setErr("regEmail", result.msg);
        return;
      }
      closeModal();
      showToastGlobal(
        "🎉 Akun berhasil dibuat! Selamat datang, " + nama.split(" ")[0] + "!",
      );
    });

    const session = getSession();
    if (session) {
      const heroActions = document.querySelector(".hero-actions");
      if (heroActions) {
        heroActions.innerHTML = `
          <a href="Schedule.html" class="btn-pesan">🎬 Pesan Tiket Sekarang</a>
          <a href="MyAccount.html" class="btn-auth-hero">👤 ${session.nama.split(" ")[0]}</a>
        `;
      }
      const hint = document.querySelector(".hero-register-hint");
      if (hint) hint.style.display = "none";
    }
  }

  function showToastGlobal(msg) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2500);
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateNavUI();
    initHomeModal();
  });

  return {
    getSession,
    getCurrentUser,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    deleteAccount,
    switchAuthTab,
    updateNavUI,
  };
})();

window.AUTH = AUTH;

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
});

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
    [1, 2, 3, 4].forEach((i) => {
      const el = document.getElementById("si" + i);
      if (!el) return;
      el.classList.toggle("active", i === n);
      el.classList.toggle("done", i < n);
    });
  }

  function goToStep(n) {
    [1, 2, 3, 4].forEach((i) => {
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
    const state = {};
    const ROWS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, cinema.rows);
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
        };
        const semua = JSON.parse(localStorage.getItem("cinego_tiket") || "[]");
        semua.push(tiket);
        localStorage.setItem("cinego_tiket", JSON.stringify(semua));
        [1, 2, 3, 4].forEach((i) => {
          const si = document.getElementById("si" + i);
          if (si) {
            si.classList.remove("active");
            si.classList.add("done");
          }
        });
        showToast("✅ Tiket berhasil dipesan!", "#15803d");
        setTimeout(() => {
          window.location.href = "MyTicket.html";
        }, 1900);
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
    [2, 3, 4].forEach((i) => showEl("step" + i, false));

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

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", initBooking);
  else initBooking();
})();

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("trendContainer")) return;

  const FILMS_TR = [
    {
      id: 1,
      film: "Siksa Kubur",
      genre: "Horror / Drama",
      tags: ["Horror", "Drama"],
      durasi: 117,
      rating: 8.2,
      tahun: 2024,
      sutradara: "Joko Anwar",
      pemain: "Faradina Mufti, Reza Rahadian, Slamet Rahardjo",
      sinopsis:
        "Sita adalah seorang wanita ateis yang keras kepala. Untuk membuktikan bahwa siksa kubur hanyalah isapan jempol belaka, ia memutuskan mengalaminya sendiri — dan apa yang ia temukan di sana mengubah segalanya.",
      poster: "Images/siksa-kubur.jpg",
      bookingKey: "Siksa+Kubur",
      baseVotes: 1240,
    },
    {
      id: 2,
      film: "A Minecraft Movie",
      genre: "Adventure / Fantasy",
      tags: ["Adventure", "Fantasy", "Family"],
      durasi: 101,
      rating: 7.8,
      tahun: 2025,
      sutradara: "Jared Hess",
      pemain: "Jack Black, Jason Momoa, Jennifer Coolidge",
      sinopsis:
        "Empat orang tersedot ke dalam dunia balok bernama Overworld dan harus berjuang untuk bertahan hidup. Satu-satunya harapan mereka adalah seorang pahlawan tak terduga bernama Steve.",
      poster: "Images/a-minecraft-movie-movie-poster.jpg",
      bookingKey: "A+Minecraft+Movie",
      baseVotes: 980,
    },
    {
      id: 3,
      film: "Agak Laen",
      genre: "Horror / Comedy",
      tags: ["Horror", "Comedy"],
      durasi: 119,
      rating: 8.5,
      tahun: 2024,
      sutradara: "Muhadkly Acho",
      pemain: "Bene Dion, Oki Rengga, Dimas Anggara, Indra Jegel",
      sinopsis:
        "Empat sahabat pengelola rumah hantu ketiban sial saat dukun sewaan mereka tewas di dalam wahana. Sosok sang dukun pun mulai gentayangan, membuat terror nyata bagi mereka sendiri.",
      poster: "Images/agak-laen.jpg",
      bookingKey: "Agak+Laen",
      baseVotes: 870,
    },
    {
      id: 4,
      film: "Avengers: Infinity War",
      genre: "Action / Sci-Fi",
      tags: ["Action", "Sci-Fi", "Marvel"],
      durasi: 149,
      rating: 8.4,
      tahun: 2018,
      sutradara: "Anthony & Joe Russo",
      pemain:
        "Robert Downey Jr., Chris Evans, Chris Hemsworth, Scarlett Johansson",
      sinopsis:
        "Thanos berusaha mengumpulkan enam Infinity Stones untuk memusnahkan setengah populasi alam semesta. Para Avengers bersatu dalam pertempuran paling epik untuk menghentikannya.",
      poster: "Images/infinity.jpg",
      bookingKey: "Avengers%3A+Infinity+War",
      baseVotes: 760,
    },
    {
      id: 5,
      film: "Jumbo",
      genre: "Animation / Adventure",
      tags: ["Animation", "Family", "Adventure"],
      durasi: 102,
      rating: 8.0,
      tahun: 2025,
      sutradara: "Ryan Andriandhy",
      pemain: "Angga Yunanda, Prilly Latuconsina",
      sinopsis:
        "Si kecil Don bersahabat dengan sosok misterius bernama Jumbo. Petualangan ajaib mereka membawa pelajaran berharga tentang persahabatan, keberanian, dan makna keluarga yang sesungguhnya.",
      poster: "Images/jumbo-indonesian-movie-poster.jpg",
      bookingKey: "Jumbo",
      baseVotes: 620,
    },
    {
      id: 6,
      film: "Ancika: 1995",
      genre: "Romance / Drama",
      tags: ["Romance", "Drama"],
      durasi: 100,
      rating: 7.9,
      tahun: 2023,
      sutradara: "Benni Setiawan",
      pemain: "Marthino Lio, Raisa Andriana",
      sinopsis:
        "Kisah cinta Dilan dan Ancika di Bandung tahun 1995. Dilan harus membuktikan dirinya kepada gadis yang memiliki kepribadian kuat, mandiri, dan tidak mudah takluk oleh rayuan.",
      poster: "Images/ancika-1995.jpg",
      bookingKey: "Ancika%3A+1995",
      baseVotes: 510,
    },
    {
      id: 7,
      film: "Mission: Impossible \u2013 The Final Reckoning",
      genre: "Action / Thriller",
      tags: ["Action", "Thriller"],
      durasi: 169,
      rating: 8.3,
      tahun: 2025,
      sutradara: "Christopher McQuarrie",
      pemain: "Tom Cruise, Hayley Atwell, Simon Pegg, Ving Rhames",
      sinopsis:
        "Ethan Hunt menghadapi ancaman terbesar sepanjang kariernya — sebuah AI bernama The Entity yang mampu mengendalikan seluruh persenjataan nuklir global. Ini misi terakhir, dengan taruhan tertinggi.",
      poster: "Images/25MIFR.jpg",
      bookingKey: "Mission%3A+Impossible+%E2%80%93+The+Final+Reckoning",
      baseVotes: 445,
    },
  ];

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
      <div class="t-stat"><div class="t-stat-icon">🎬</div><div><div class="t-stat-val">${FILMS_TR.length}</div><div class="t-stat-lbl">Film sedang tayang</div></div></div>
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
        <div class="rank-badge ${rankBadgeClass(rank)}">${rankLabel(rank)}</div>
        <button class="wl-card-btn${wled ? " wled" : ""}" data-id="${f.id}" title="${wled ? "Hapus dari wishlist" : "Simpan ke wishlist"}">${wled ? "❤️" : "🤍"}</button>
        <div class="poster-wrap">
          <img src="${f.poster}" alt="${escHtmlTR(f.film)}" onerror="this.src='https://placehold.co/300x400/120a02/fb923c?text=${encImg}'"/>
          <div class="poster-overlay"><button class="btn-detail-overlay" data-id="${f.id}">Lihat Detail →</button></div>
        </div>
        <div class="trend-card-body">
          <div class="trend-card-title">${escHtmlTR(f.film)}</div>
          <div class="trend-card-genre">${escHtmlTR(f.genre)}</div>
          <div class="trend-card-meta"><span class="rating-pill">⭐ ${f.rating}</span><span class="dur-pill">${fmtDur(f.durasi)}</span></div>
          <hr class="trend-divider"/>
          <div class="vote-row">
            <div class="vote-count">🔥 ${fmtVotes(votes)} <span class="vlbl">votes</span></div>
            <button class="btn-vote${voted ? " voted" : ""}" data-id="${f.id}" ${voted ? "disabled" : ""}>${voted ? "✓ Voted" : "+ Vote"}</button>
          </div>
          <a href="Booking.html?film=${f.bookingKey}" class="btn-card-book">Pesan Tiket</a>
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
      item.innerHTML = `
        <div class="list-rank-num ${listRankClass(rank)}">${rankLabel(rank)}</div>
        <img class="list-poster" src="${f.poster}" alt="${escHtmlTR(f.film)}" onerror="this.src='https://placehold.co/70x100/120a02/fb923c?text=${encImg}'"/>
        <div class="list-info">
          <div class="list-title">${escHtmlTR(f.film)}</div>
          <div class="list-meta"><span>⭐ ${f.rating}</span><span>⏱ ${fmtDur(f.durasi)}</span><span>${f.tahun}</span><span style="color:#3a2010">${escHtmlTR(f.genre)}</span></div>
          <p class="list-sinopsis">${escHtmlTR(f.sinopsis)}</p>
        </div>
        <div class="list-actions">
          <div class="list-vote-num">🔥 ${fmtVotes(votes)} <span class="lbl">votes</span></div>
          <div class="list-btn-row">
            <button class="btn-vote${voted ? " voted" : ""}" data-id="${f.id}" ${voted ? "disabled" : ""}>${voted ? "✓" : "+ Vote"}</button>
            <button class="wl-card-btn${wled ? " wled" : ""}" data-id="${f.id}" title="${wled ? "Hapus wishlist" : "Simpan ke wishlist"}">${wled ? "❤️" : "🤍"}</button>
          </div>
          <button class="btn-list-detail" data-id="${f.id}">Detail</button>
          <a href="Booking.html?film=${f.bookingKey}" class="btn-list-book">Pesan →</a>
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
    mPoster.src = f.poster;
    mPoster.alt = f.film;
    mPoster.onerror = function () {
      this.src = `https://placehold.co/100x142/120a02/fb923c?text=${encImg}`;
    };
    document.getElementById("mTitle").textContent = f.film;
    document.getElementById("mRating").innerHTML =
      `⭐ ${f.rating} <small>/ 10</small>`;
    document.getElementById("mSinopsis").textContent = f.sinopsis;
    document.getElementById("mVoteNum").textContent = fmtVotes(votes);
    document.getElementById("mPills").innerHTML =
      `<span class="mpill mpill-genre">${escHtmlTR(f.genre)}</span><span class="mpill mpill-year">📅 ${f.tahun}</span><span class="mpill mpill-dur">⏱ ${fmtDur(f.durasi)}</span>`;
    document.getElementById("mInfoGrid").innerHTML = `
      <div class="modal-info-item"><div class="mi-lbl">Sutradara</div><div class="mi-val">${escHtmlTR(f.sutradara)}</div></div>
      <div class="modal-info-item"><div class="mi-lbl">Durasi</div><div class="mi-val">${f.durasi} menit</div></div>
      <div class="modal-info-item" style="grid-column:1/-1"><div class="mi-lbl">Pemain</div><div class="mi-val">${escHtmlTR(f.pemain)}</div></div>
    `;
    const btnVote = document.getElementById("btnModalVote");
    btnVote.textContent = voted ? "✓ Sudah Divote" : "🔥 Vote Film Ini";
    btnVote.className = "btn-modal-vote" + (voted ? " mv-voted" : "");
    btnVote.onclick = () => {
      if (castVote(id)) {
        showToastTR("🔥 Vote berhasil!");
        populateModal(id);
        render();
      }
    };
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

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("ticketTable")) return;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function clearErr(id) {
    document.getElementById(id)?.classList.remove("error");
    document.getElementById("err-" + id)?.classList.remove("show");
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

  if (!AUTH.getSession()) {
    document.getElementById("authGate").style.display = "block";
    document.getElementById("ticketContent").style.display = "none";
    initAuthGateMT();
    return;
  }

  document.getElementById("authGate").style.display = "none";
  document.getElementById("ticketContent").style.display = "block";

  function initAuthGateMT() {
    document
      .querySelectorAll(".auth-tab-btn")
      .forEach((btn) =>
        btn.addEventListener("click", () =>
          AUTH.switchAuthTab(btn.dataset.tab),
        ),
      );
    document
      .getElementById("gateLinkToDaftar")
      ?.addEventListener("click", (e) => {
        e.preventDefault();
        AUTH.switchAuthTab("daftar");
      });
    document
      .getElementById("gateLinkToLogin")
      ?.addEventListener("click", (e) => {
        e.preventDefault();
        AUTH.switchAuthTab("login");
      });
    document.getElementById("toggleGLoginPw")?.addEventListener("click", () => {
      const inp = document.getElementById("gLoginPw");
      inp.type = inp.type === "password" ? "text" : "password";
      document.getElementById("toggleGLoginPw").textContent =
        inp.type === "password" ? "👁" : "🙈";
    });
    document.getElementById("toggleGRegPw")?.addEventListener("click", () => {
      const inp = document.getElementById("gRegPw");
      inp.type = inp.type === "password" ? "text" : "password";
      document.getElementById("toggleGRegPw").textContent =
        inp.type === "password" ? "👁" : "🙈";
    });
    [
      "gLoginEmail",
      "gLoginPw",
      "gRegNama",
      "gRegEmail",
      "gRegPw",
      "gRegPwConfirm",
    ].forEach((id) =>
      document
        .getElementById(id)
        ?.addEventListener("input", () => clearErr(id)),
    );

    document
      .getElementById("gateLoginForm")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("gLoginEmail").value.trim();
        const pw = document.getElementById("gLoginPw").value;
        let ok = true;
        if (!EMAIL_RE.test(email)) {
          setErr("gLoginEmail", "Email tidak valid.");
          ok = false;
        }
        if (!pw) {
          setErr("gLoginPw", "Password wajib diisi.");
          ok = false;
        }
        if (!ok) return;
        const result = AUTH.login(email, pw);
        if (!result.ok) {
          if (result.msg.includes("Email")) setErr("gLoginEmail", result.msg);
          else setErr("gLoginPw", result.msg);
          return;
        }
        window.location.reload();
      });

    document
      .getElementById("gateRegisterForm")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const nama = document.getElementById("gRegNama").value.trim(),
          email = document.getElementById("gRegEmail").value.trim();
        const pw = document.getElementById("gRegPw").value,
          confirm = document.getElementById("gRegPwConfirm").value;
        let ok = true;
        if (nama.length < 2) {
          setErr("gRegNama", "Nama minimal 2 karakter.");
          ok = false;
        }
        if (!EMAIL_RE.test(email)) {
          setErr("gRegEmail", "Email tidak valid.");
          ok = false;
        }
        if (pw.length < 8) {
          setErr("gRegPw", "Password minimal 8 karakter.");
          ok = false;
        }
        if (pw !== confirm) {
          setErr("gRegPwConfirm", "Password tidak cocok.");
          ok = false;
        }
        if (!ok) return;
        const result = AUTH.register({ nama, email, password: pw });
        if (!result.ok) {
          setErr("gRegEmail", result.msg);
          return;
        }
        window.location.reload();
      });
  }

  const KEY = "cinego_tiket";
  function getAllData() {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  }
  function getUserEmail() {
    return (AUTH.getSession()?.email || "").toLowerCase();
  }
  function getData() {
    const email = getUserEmail();
    return getAllData().filter((t) => (t.email || "").toLowerCase() === email);
  }
  function saveData(arr) {
    localStorage.setItem(KEY, JSON.stringify(arr));
  }
  function formatRpMT(n) {
    return "Rp " + n.toLocaleString("id-ID");
  }
  function formatTglMT(s) {
    if (!s) return "-";
    const [y, m, d] = s.split("-");
    const bln = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    return `${d} ${bln[parseInt(m) - 1]} ${y}`;
  }
  function escHtmlMT(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function badgeClass(tipe) {
    if (tipe === "VIP") return "badge-vip";
    if (tipe === "IMAX") return "badge-imax";
    if (tipe === "4DX") return "badge-4dx";
    return "badge-regular";
  }
  function showToastMT(msg, duration = 2200) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), duration);
  }

  let confirmCallback = null;
  function showModal(title, desc, onConfirm) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDesc").textContent = desc;
    confirmCallback = onConfirm;
    document.getElementById("modalOverlay").classList.add("show");
  }
  function closeModal() {
    document.getElementById("modalOverlay").classList.remove("show");
    confirmCallback = null;
  }

  document
    .getElementById("btnCancelModal")
    .addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.getElementById("btnConfirmModal").addEventListener("click", () => {
    if (confirmCallback) confirmCallback();
    closeModal();
  });

  let currentFilter = "";

  function renderTable() {
    const semua = getData();
    const filter = currentFilter.toLowerCase();
    const filtered = semua.filter(
      (t) =>
        t.nama.toLowerCase().includes(filter) ||
        t.film.toLowerCase().includes(filter) ||
        (t.email && t.email.toLowerCase().includes(filter)),
    );
    const body = document.getElementById("ticketBody");
    const wrapper = document.getElementById("tableWrapper");
    const empty = document.getElementById("emptyState");
    const stats = document.getElementById("statsBar");
    body.innerHTML = "";
    const totalTiket = semua.reduce((s, t) => s + (t.jumlah || 0), 0);
    const totalHarga = semua.reduce((s, t) => s + (t.total || 0), 0);
    stats.innerHTML = `
      <div class="stat-pill"><span class="sp-label">Pesanan</span><span class="sp-value">${semua.length}</span></div>
      <div class="stat-pill"><span class="sp-label">Total Tiket</span><span class="sp-value">${totalTiket}</span></div>
      <div class="stat-pill"><span class="sp-label">Total Belanja</span><span class="sp-value">${formatRpMT(totalHarga)}</span></div>
    `;
    if (semua.length === 0) {
      wrapper.style.display = "none";
      empty.style.display = "block";
      stats.style.display = "none";
      return;
    }
    wrapper.style.display = "";
    empty.style.display = "none";
    stats.style.display = "flex";
    if (filtered.length === 0) {
      body.innerHTML = `<tr><td colspan="11" style="text-align:center;color:#5a3a20;padding:32px">Tidak ada hasil untuk "<strong style="color:#a87050">${escHtmlMT(currentFilter)}</strong>"</td></tr>`;
      return;
    }
    filtered.forEach((t, idx) => {
      const tipe = t.tipe || "Regular";
      const cinemaStr = t.cinema || t.studio || "-";
      const kursiStr = Array.isArray(t.kursi)
        ? t.kursi.join(", ")
        : t.kursi || "-";
      const jumlah = t.jumlah || (Array.isArray(t.kursi) ? t.kursi.length : 1);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="color:#5a3a20;font-size:.8rem">${idx + 1}</td>
        <td><div class="film-name">${escHtmlMT(t.nama)}</div><div class="email-txt">${escHtmlMT(t.email || "")}</div></td>
        <td>${escHtmlMT(t.film)}</td>
        <td>${formatTglMT(t.tanggal)}</td>
        <td>${escHtmlMT(t.jam)}</td>
        <td style="color:#5a3a20;font-size:.78rem;max-width:120px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${escHtmlMT(cinemaStr)}">${escHtmlMT(cinemaStr)}</td>
        <td style="color:#a87050;font-size:.78rem;max-width:80px">${escHtmlMT(kursiStr)}</td>
        <td><span class="badge ${badgeClass(tipe)}">${escHtmlMT(tipe)}</span></td>
        <td style="text-align:center">${jumlah}</td>
        <td class="harga-cell">${formatRpMT(t.total || 0)}</td>
        <td><button class="btn-hapus" data-id="${t.id}">Hapus</button></td>
      `;
      body.appendChild(tr);
    });
    body.querySelectorAll(".btn-hapus").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id);
        const tiket = getData().find((t) => t.id === id);
        showModal(
          "Hapus Tiket?",
          `Hapus tiket "${tiket ? tiket.film : ""}" atas nama ${tiket ? tiket.nama : ""}?`,
          () => {
            saveData(getAllData().filter((t) => t.id !== id));
            renderTable();
            showToastMT("🗑️ Tiket berhasil dihapus.");
          },
        );
      });
    });
  }

  document.getElementById("btnHapusSemua").addEventListener("click", () => {
    const semua = getData();
    if (semua.length === 0) {
      showToastMT("Belum ada tiket untuk dihapus.");
      return;
    }
    showModal(
      "Hapus Semua Tiket?",
      `Semua ${semua.length} pesanan akan dihapus permanen.`,
      () => {
        const email = getUserEmail();
        saveData(
          getAllData().filter((t) => (t.email || "").toLowerCase() !== email),
        );
        renderTable();
        showToastMT("🗑️ Semua tiket telah dihapus.");
      },
    );
  });

  document.getElementById("searchInput").addEventListener("input", (e) => {
    currentFilter = e.target.value;
    renderTable();
  });
  renderTable();
});

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("accountContent")) return;

  const KEY_TIKET_MA = "cinego_tiket";
  const EMAIL_RE_MA = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showToastMA(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.className = "toast";
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2400);
  }
  function validateFieldMA(id, cond, errId) {
    const el = document.getElementById(id);
    const er = document.getElementById(errId);
    if (!cond(el)) {
      el.classList.add("error");
      er.classList.add("show");
      return false;
    }
    el.classList.remove("error");
    er.classList.remove("show");
    return true;
  }
  function clearErrMA(id) {
    document.getElementById(id)?.classList.remove("error");
    document.getElementById("err-" + id)?.classList.remove("show");
  }
  function setErrMA(id, msg) {
    const el = document.getElementById(id);
    const err = document.getElementById("err-" + id);
    if (el) el.classList.add("error");
    if (err) {
      err.textContent = msg;
      err.classList.add("show");
    }
  }
  function formatRpMA(n) {
    return "Rp " + n.toLocaleString("id-ID");
  }
  function escHtmlMA(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function formatTglMA(s) {
    if (!s) return "-";
    const [y, m, d] = s.split("-");
    const bln = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    return `${d} ${bln[parseInt(m) - 1]} ${y}`;
  }
  function getTicketsForCurrentUser() {
    const email = (AUTH.getSession()?.email || "").toLowerCase();
    return JSON.parse(localStorage.getItem(KEY_TIKET_MA) || "[]").filter(
      (t) => (t.email || "").toLowerCase() === email,
    );
  }

  const session = AUTH.getSession();

  if (!session) {
    document.getElementById("authGate").style.display = "block";
    document.getElementById("accountContent").style.display = "none";
    initAuthGateMA();
  } else {
    document.getElementById("authGate").style.display = "none";
    document.getElementById("accountContent").style.display = "block";
    initAccountPage();
  }

  function initAuthGateMA() {
    document
      .querySelectorAll(".auth-tab-btn")
      .forEach((btn) =>
        btn.addEventListener("click", () =>
          AUTH.switchAuthTab(btn.dataset.tab),
        ),
      );
    document
      .getElementById("gateLinkToDaftar")
      ?.addEventListener("click", (e) => {
        e.preventDefault();
        AUTH.switchAuthTab("daftar");
      });
    document
      .getElementById("gateLinkToLogin")
      ?.addEventListener("click", (e) => {
        e.preventDefault();
        AUTH.switchAuthTab("login");
      });
    document.getElementById("toggleGLoginPw")?.addEventListener("click", () => {
      const inp = document.getElementById("gLoginPw");
      inp.type = inp.type === "password" ? "text" : "password";
      document.getElementById("toggleGLoginPw").textContent =
        inp.type === "password" ? "👁" : "🙈";
    });
    document.getElementById("toggleGRegPw")?.addEventListener("click", () => {
      const inp = document.getElementById("gRegPw");
      inp.type = inp.type === "password" ? "text" : "password";
      document.getElementById("toggleGRegPw").textContent =
        inp.type === "password" ? "👁" : "🙈";
    });
    [
      "gLoginEmail",
      "gLoginPw",
      "gRegNama",
      "gRegEmail",
      "gRegPw",
      "gRegPwConfirm",
    ].forEach((id) =>
      document
        .getElementById(id)
        ?.addEventListener("input", () => clearErrMA(id)),
    );

    document
      .getElementById("gateLoginForm")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("gLoginEmail").value.trim(),
          pw = document.getElementById("gLoginPw").value;
        let ok = true;
        if (!EMAIL_RE_MA.test(email)) {
          setErrMA("gLoginEmail", "Email tidak valid.");
          ok = false;
        }
        if (!pw) {
          setErrMA("gLoginPw", "Password wajib diisi.");
          ok = false;
        }
        if (!ok) return;
        const result = AUTH.login(email, pw);
        if (!result.ok) {
          if (result.msg.includes("Email")) setErrMA("gLoginEmail", result.msg);
          else setErrMA("gLoginPw", result.msg);
          return;
        }
        window.location.reload();
      });

    document
      .getElementById("gateRegisterForm")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const nama = document.getElementById("gRegNama").value.trim(),
          email = document.getElementById("gRegEmail").value.trim();
        const pw = document.getElementById("gRegPw").value,
          confirm = document.getElementById("gRegPwConfirm").value;
        let ok = true;
        if (nama.length < 2) {
          setErrMA("gRegNama", "Nama minimal 2 karakter.");
          ok = false;
        }
        if (!EMAIL_RE_MA.test(email)) {
          setErrMA("gRegEmail", "Email tidak valid.");
          ok = false;
        }
        if (pw.length < 8) {
          setErrMA("gRegPw", "Password minimal 8 karakter.");
          ok = false;
        }
        if (pw !== confirm) {
          setErrMA("gRegPwConfirm", "Password tidak cocok.");
          ok = false;
        }
        if (!ok) return;
        const result = AUTH.register({ nama, email, password: pw });
        if (!result.ok) {
          setErrMA("gRegEmail", result.msg);
          return;
        }
        window.location.reload();
      });
  }

  function initAccountPage() {
    const user = AUTH.getCurrentUser();
    if (!user) return;

    function updateAvatar() {
      const u = AUTH.getCurrentUser() || {},
        nama = u.nama || "Pengguna CineGo";
      document.getElementById("avatarInitial").textContent = nama
        .charAt(0)
        .toUpperCase();
      document.getElementById("avatarName").textContent = nama;
      document.getElementById("avatarEmail").textContent = u.email || "—";
      const tiket = getTicketsForCurrentUser();
      document.getElementById("statPesan").textContent = tiket.length;
      document.getElementById("statTiket").textContent = tiket.reduce(
        (s, t) => s + (t.jumlah || 0),
        0,
      );
    }
    updateAvatar();

    const fields = {
      acNama: "nama",
      acUsername: "username",
      acEmail: "email",
      acTelp: "telp",
      acTgl: "tgl",
      acKota: "kota",
    };
    Object.entries(fields).forEach(([elId, key]) => {
      const el = document.getElementById(elId);
      if (el && user[key]) el.value = user[key];
    });
    const genderSel = document.getElementById("acGender");
    if (genderSel && user.gender) genderSel.value = user.gender;

    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".tab-btn")
          .forEach((b) => b.classList.remove("active"));
        document
          .querySelectorAll(".tab-panel")
          .forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        document
          .getElementById("tab-" + btn.dataset.tab)
          .classList.add("active");
        if (btn.dataset.tab === "riwayat") renderRiwayat();
      });
    });

    document.getElementById("btnLogout")?.addEventListener("click", () => {
      if (confirm("Yakin ingin keluar?")) AUTH.logout();
    });

    ["acNama", "acEmail"].forEach((id) =>
      document
        .getElementById(id)
        ?.addEventListener("input", () => clearErrMA(id)),
    );

    document.getElementById("profilForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      if (
        !validateFieldMA("acNama", (el) => el.value.trim() !== "", "err-acNama")
      )
        ok = false;
      if (
        !validateFieldMA(
          "acEmail",
          (el) => EMAIL_RE_MA.test(el.value.trim()),
          "err-acEmail",
        )
      )
        ok = false;
      if (!ok) return;
      const result = AUTH.updateProfile({
        nama: document.getElementById("acNama").value.trim(),
        username: document.getElementById("acUsername").value.trim(),
        email: document.getElementById("acEmail").value.trim(),
        telp: document.getElementById("acTelp").value.trim(),
        tgl: document.getElementById("acTgl").value,
        gender: document.getElementById("acGender").value,
        kota: document.getElementById("acKota").value.trim(),
      });
      if (!result?.ok) {
        setErrMA("acEmail", result?.msg || "Profil gagal disimpan.");
        return;
      }
      updateAvatar();
      showToastMA("✅ Profil berhasil disimpan!");
    });

    document
      .getElementById("btnResetProfil")
      ?.addEventListener("click", () =>
        document.getElementById("profilForm").reset(),
      );

    document.querySelectorAll(".toggle-pw[data-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const inp = document.getElementById(btn.dataset.target);
        inp.type = inp.type === "password" ? "text" : "password";
        btn.textContent = inp.type === "password" ? "👁" : "🙈";
      });
    });

    ["pwLama", "pwBaru", "pwKonfirm"].forEach((id) =>
      document
        .getElementById(id)
        ?.addEventListener("input", () => clearErrMA(id)),
    );

    document.getElementById("pwForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const lama = document.getElementById("pwLama").value,
        baru = document.getElementById("pwBaru").value,
        konfirm = document.getElementById("pwKonfirm").value;
      let ok = true;
      if (!lama) {
        setErrMA("pwLama", "Password lama wajib diisi.");
        ok = false;
      }
      if (baru.length < 8) {
        setErrMA("pwBaru", "Password minimal 8 karakter.");
        ok = false;
      }
      if (baru !== konfirm) {
        setErrMA("pwKonfirm", "Password tidak cocok.");
        ok = false;
      }
      if (!ok) return;
      const result = AUTH.changePassword(lama, baru);
      if (!result.ok) {
        setErrMA("pwLama", result.msg);
        return;
      }
      document.getElementById("pwForm").reset();
      showToastMA("🔒 Password berhasil diubah!");
    });

    document
      .getElementById("btnDeleteAccount")
      ?.addEventListener("click", () => {
        if (!confirm("Hapus akun secara permanen? Semua data akan hilang."))
          return;
        AUTH.deleteAccount();
      });
  }

  function renderRiwayat() {
    const semua = getTicketsForCurrentUser();
    const body = document.getElementById("riwayatBody");
    const empty = document.getElementById("riwayatEmpty");
    const wrap = document.getElementById("riwayatWrapper");
    body.innerHTML = "";
    if (!semua.length) {
      wrap.style.display = "none";
      empty.style.display = "block";
      return;
    }
    wrap.style.display = "";
    empty.style.display = "none";
    semua.forEach((t, i) => {
      const tipe = t.tipe || "Regular",
        jumlah = t.jumlah || (Array.isArray(t.kursi) ? t.kursi.length : 1);
      const badgeCls =
        tipe === "VIP"
          ? "badge-vip"
          : tipe === "IMAX"
            ? "badge-imax"
            : tipe === "4DX"
              ? "badge-4dx"
              : "badge-regular";
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="color:#5a3a20;font-size:.78rem">${i + 1}</td>
        <td style="font-weight:600;color:#f1f5f9">${escHtmlMA(t.film)}</td>
        <td>${formatTglMA(t.tanggal)}</td>
        <td>${escHtmlMA(t.jam)}</td>
        <td><span class="badge ${badgeCls}">${escHtmlMA(tipe)}</span></td>
        <td style="text-align:center">${jumlah}</td>
        <td class="harga-cell">${formatRpMA(t.total || 0)}</td>
      `;
      body.appendChild(tr);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("contactForm")) return;

  const pesanEl = document.getElementById("cnPesan");
  const charEl = document.getElementById("charCount");

  pesanEl.addEventListener("input", () => {
    charEl.textContent = pesanEl.value.length;
  });

  ["cnNama", "cnEmail", "cnTopik", "cnPesan"].forEach((id) => {
    const el = document.getElementById(id);
    ["input", "change"].forEach((ev) => {
      el.addEventListener(ev, () => {
        el.classList.remove("error");
        document.getElementById("err-" + id)?.classList.remove("show");
      });
    });
  });

  function validateFieldCU(id, condition, errId) {
    const el = document.getElementById(id);
    const err = document.getElementById(errId);
    if (!condition(el)) {
      el.classList.add("error");
      err?.classList.add("show");
      return false;
    }
    el.classList.remove("error");
    err?.classList.remove("show");
    return true;
  }

  function showToastCU(msg) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2500);
  }

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const valid = [
        validateFieldCU("cnNama", (el) => el.value.trim() !== "", "err-cnNama"),
        validateFieldCU(
          "cnEmail",
          (el) => emailRe.test(el.value.trim()),
          "err-cnEmail",
        ),
        validateFieldCU("cnTopik", (el) => el.value !== "", "err-cnTopik"),
        validateFieldCU(
          "cnPesan",
          (el) => el.value.trim().length >= 10,
          "err-cnPesan",
        ),
      ].every(Boolean);
      if (!valid) return;
      const pesan = {
        id: Date.now(),
        nama: document.getElementById("cnNama").value.trim(),
        email: document.getElementById("cnEmail").value.trim(),
        topik: document.getElementById("cnTopik").value,
        pesan: document.getElementById("cnPesan").value.trim(),
        waktu: new Date().toLocaleString("id-ID"),
      };
      const riwayat = JSON.parse(localStorage.getItem("cinego_pesan") || "[]");
      riwayat.push(pesan);
      localStorage.setItem("cinego_pesan", JSON.stringify(riwayat));
      document.getElementById("formView").style.display = "none";
      document.getElementById("successView").style.display = "block";
    });

  document.getElementById("btnBackForm").addEventListener("click", () => {
    document.getElementById("contactForm").reset();
    charEl.textContent = "0";
    document.getElementById("formView").style.display = "block";
    document.getElementById("successView").style.display = "none";
  });
});
