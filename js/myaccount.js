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
