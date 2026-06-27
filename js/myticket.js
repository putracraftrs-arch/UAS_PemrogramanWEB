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

  // ===================== E-TICKET MODAL =====================
  function openEticket(t) {
    const overlay = document.getElementById("eticketOverlay");
    const kursiStr = Array.isArray(t.kursi)
      ? t.kursi.join(", ")
      : t.kursi || "-";
    const jumlah = t.jumlah || (Array.isArray(t.kursi) ? t.kursi.length : 1);
    const cinemaStr = t.cinema || t.studio || "-";
    const kode = "CGO-" + String(t.id).slice(-6).padStart(6, "0");

    document.getElementById("etCode").textContent = kode;
    document.getElementById("etCode2").textContent = kode;
    document.getElementById("etBody").innerHTML = `
      <div class="et-film-title">${escHtmlMT(t.film)}</div>
      <div class="et-row"><span class="et-lbl">Nama</span><span class="et-val">${escHtmlMT(t.nama)}</span></div>
      <div class="et-row"><span class="et-lbl">Tanggal</span><span class="et-val">${formatTglMT(t.tanggal)}</span></div>
      <div class="et-row"><span class="et-lbl">Jam</span><span class="et-val">${escHtmlMT(t.jam)}</span></div>
      <div class="et-row"><span class="et-lbl">Bioskop</span><span class="et-val">${escHtmlMT(cinemaStr)}</span></div>
      <div class="et-row"><span class="et-lbl">Kursi</span><span class="et-val">${escHtmlMT(kursiStr)}</span></div>
      <div class="et-row"><span class="et-lbl">Tipe</span><span class="et-val">${escHtmlMT(t.tipe || "Regular")}</span></div>
      <div class="et-row"><span class="et-lbl">Jumlah</span><span class="et-val">${jumlah} tiket</span></div>
      <div class="et-row"><span class="et-lbl">Status</span><span class="et-val">${escHtmlMT(t.status || "Lunas")}</span></div>
      <div class="et-row"><span class="et-lbl">Total</span><span class="et-val">${formatRpMT(t.total || 0)}</span></div>
    `;

    // Generate simple barcode-like bars based on the booking code
    const barsEl = document.getElementById("etBars");
    let bars = "";
    for (let i = 0; i < kode.length * 4; i++) {
      const seed = kode.charCodeAt(i % kode.length) + i;
      const h = 20 + (seed % 24);
      bars += `<span style="height:${h}px"></span>`;
    }
    barsEl.innerHTML = bars;

    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
  }

  function closeEticket() {
    const overlay = document.getElementById("eticketOverlay");
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
  }

  document
    .getElementById("btnCloseEticket")
    ?.addEventListener("click", closeEticket);
  document
    .getElementById("eticketOverlay")
    ?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeEticket();
    });

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
        <td><button class="btn-lihat" data-id="${t.id}">Lihat</button><button class="btn-hapus" data-id="${t.id}">Hapus</button></td>
      `;
      body.appendChild(tr);
    });
    body.querySelectorAll(".btn-lihat").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id);
        const tiket = getData().find((t) => t.id === id);
        if (tiket) openEticket(tiket);
      });
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