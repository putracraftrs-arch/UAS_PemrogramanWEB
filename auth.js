const AUTH = (() => {

  const KEY_USERS   = 'cinego_users';
  const KEY_SESSION = 'cinego_session';

  function getUsers() {
    return JSON.parse(localStorage.getItem(KEY_USERS) || '[]');
  }

  function saveUsers(arr) {
    localStorage.setItem(KEY_USERS, JSON.stringify(arr));
  }


  
  function getSession() {
    const raw = localStorage.getItem(KEY_SESSION);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  function getCurrentUser() {
    const session = getSession();
    if (!session) return null;
    const users = getUsers();
    return users.find(u => u.email === session.email) || null;
  }

  function register({ nama, email, password }) {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, msg: 'Email sudah terdaftar.' };
    }
    const user = {
      id       : Date.now(),
      nama     : nama.trim(),
      email    : email.trim().toLowerCase(),
      password,                         
      username : '',
      telp     : '',
      tgl      : '',
      gender   : '',
      kota     : '',
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    saveUsers(users);
    localStorage.setItem(KEY_SESSION, JSON.stringify({ email: user.email, nama: user.nama }));
    updateNavUI();
    return { ok: true };
  }

  function login(email, password) {
    const users = getUsers();
    const user  = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user)                    return { ok: false, msg: 'Email tidak ditemukan.' };
    if (user.password !== password) return { ok: false, msg: 'Password salah.' };
    localStorage.setItem(KEY_SESSION, JSON.stringify({ email: user.email, nama: user.nama }));
    updateNavUI();
    return { ok: true };
  }

  function logout() {
    localStorage.removeItem(KEY_SESSION);
    updateNavUI();
    window.location.href = 'Home.html';
  }

  function updateProfile(data) {
    const session = getSession();
    if (!session) return { ok: false, msg: 'Sesi tidak ditemukan.' };
    if (data.email) data.email = data.email.trim().toLowerCase();
    const users = getUsers();
    const idx   = users.findIndex(u => u.email === session.email);
    if (idx === -1) return { ok: false, msg: 'Akun tidak ditemukan.' };
    if (
      data.email &&
      data.email !== session.email &&
      users.some((u, i) => i !== idx && u.email.toLowerCase() === data.email)
    ) {
      return { ok: false, msg: 'Email sudah terdaftar.' };
    }
    const oldEmail = users[idx].email;
    users[idx] = { ...users[idx], ...data, password: users[idx].password };
    saveUsers(users);
    if (data.email && data.email !== oldEmail) {
      const tickets = JSON.parse(localStorage.getItem('cinego_tiket') || '[]');
      tickets.forEach(t => {
        if ((t.email || '').toLowerCase() === oldEmail.toLowerCase()) {
          t.email = data.email.trim().toLowerCase();
        }
      });
      localStorage.setItem('cinego_tiket', JSON.stringify(tickets));
    }
    // Update session agar email selalu sinkron (baik user ubah email saja, atau ubah nama/email sekaligus)
    const nextNama = (data.nama !== undefined ? data.nama : users[idx].nama);
    localStorage.setItem(KEY_SESSION, JSON.stringify({ email: users[idx].email, nama: nextNama }));

    updateNavUI();
    return { ok: true };
  }

  function changePassword(oldPw, newPw) {
    const session = getSession();
    if (!session) return { ok: false, msg: 'Sesi tidak ditemukan.' };
    const users = getUsers();
    const idx   = users.findIndex(u => u.email === session.email);
    if (idx === -1) return { ok: false, msg: 'Akun tidak ditemukan.' };
    if (users[idx].password !== oldPw) return { ok: false, msg: 'Password lama salah.' };
    users[idx].password = newPw;
    saveUsers(users);
    return { ok: true };
  }

  function deleteAccount() {
    const session = getSession();
    if (!session) return;
    let users = getUsers();
    users = users.filter(u => u.email !== session.email);
    saveUsers(users);
    const tickets = JSON.parse(localStorage.getItem('cinego_tiket') || '[]');
    const remainingTickets = tickets.filter(t =>
      (t.email || '').toLowerCase() !== session.email.toLowerCase()
    );
    localStorage.setItem('cinego_tiket', JSON.stringify(remainingTickets));
    localStorage.removeItem(KEY_SESSION);
    window.location.href = 'Home.html';
  }


  
  function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    document.querySelectorAll('.auth-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === 'authPanel-' + tab);
    });
  }

  function updateNavUI() {
    const session = getSession();

    document.querySelectorAll('.nav-logout-btn').forEach(btn => btn.remove());

    const myAccountLinks = document.querySelectorAll('.nav-menu li a[href="MyAccount.html"]');

    if (session) {
      myAccountLinks.forEach(link => {
        link.textContent = '👤 ' + session.nama.split(' ')[0];
        link.classList.add('nav-logged-in');

        const btn = document.createElement('button');
        btn.className   = 'nav-logout-btn';       
        btn.textContent = 'Keluar';
        btn.title       = 'Logout';
        btn.addEventListener('click', () => {
          if (confirm('Yakin ingin keluar?')) logout();
        });
        link.parentElement.appendChild(btn);
      });
    } else {
      myAccountLinks.forEach(link => {
        link.textContent = 'MyAccount';
        link.classList.remove('nav-logged-in');
      });
    }
  }

  function initHomeModal() {
    const overlay      = document.getElementById('authOverlay');
    const modal        = document.getElementById('authModal');
    const btnOpenAuth  = document.getElementById('btnOpenAuth');
    const btnOpenReg   = document.getElementById('btnOpenRegister');
    const btnClose     = document.getElementById('authClose');
    const linkToDaftar = document.getElementById('linkToDaftar');
    const linkToLogin  = document.getElementById('linkToLogin');
    const EMAIL_RE     = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!overlay || !modal) return;   

    function openModal(tab) {
      overlay.classList.add('show');
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      ['login', 'daftar'].forEach(t => {
        document.querySelector(`#authModal .auth-tab-btn[data-tab="${t}"]`)
          ?.classList.toggle('active', t === tab);
        document.getElementById('authPanel-' + t)
          ?.classList.toggle('active', t === tab);
      });
    }

    function closeModal() {
      overlay.classList.remove('show');
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }

    btnOpenAuth ?.addEventListener('click', () => openModal('login'));
    btnOpenReg  ?.addEventListener('click', e => { e.preventDefault(); openModal('daftar'); });
    btnClose    ?.addEventListener('click', closeModal);
    overlay     ?.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    linkToDaftar?.addEventListener('click', e => { e.preventDefault(); openModal('daftar'); });
    linkToLogin ?.addEventListener('click', e => { e.preventDefault(); openModal('login'); });

    document.querySelectorAll('#authModal .auth-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#authModal .auth-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('#authModal .auth-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('authPanel-' + btn.dataset.tab)?.classList.add('active');
      });
    });

    document.getElementById('toggleLoginPw')?.addEventListener('click', () => {
      const inp = document.getElementById('loginPw');
      inp.type  = inp.type === 'password' ? 'text' : 'password';
      document.getElementById('toggleLoginPw').textContent = inp.type === 'password' ? '👁' : '🙈';
    });
    document.getElementById('toggleRegPw')?.addEventListener('click', () => {
      const inp = document.getElementById('regPw');
      inp.type  = inp.type === 'password' ? 'text' : 'password';
      document.getElementById('toggleRegPw').textContent = inp.type === 'password' ? '👁' : '🙈';
    });

    function clrErr(id) {
      document.getElementById(id)?.classList.remove('error');
      document.getElementById('err-' + id)?.classList.remove('show');
    }
    function setErr(id, msg) {
      const el  = document.getElementById(id);
      const err = document.getElementById('err-' + id);
      el?.classList.add('error');
      if (err) { err.textContent = msg; err.classList.add('show'); }
    }

    ['loginEmail', 'loginPw'].forEach(id =>
      document.getElementById(id)?.addEventListener('input', () => clrErr(id))
    );
    ['regNama', 'regEmail', 'regPw', 'regPwConfirm'].forEach(id =>
      document.getElementById(id)?.addEventListener('input', () => clrErr(id))
    );

    document.getElementById('loginForm')?.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const pw    = document.getElementById('loginPw').value;
      let ok = true;
      if (!EMAIL_RE.test(email)) { setErr('loginEmail', 'Email tidak valid.'); ok = false; }
      if (!pw)                   { setErr('loginPw', 'Password wajib diisi.'); ok = false; }
      if (!ok) return;

      const result = login(email, pw);
      if (!result.ok) {
        if (result.msg.includes('Email')) setErr('loginEmail', result.msg);
        else                              setErr('loginPw', result.msg);
        return;
      }
      closeModal();
      showToastGlobal('👋 Selamat datang kembali, ' + getSession().nama.split(' ')[0] + '!');
    });

    document.getElementById('registerForm')?.addEventListener('submit', e => {
      e.preventDefault();
      const nama    = document.getElementById('regNama').value.trim();
      const email   = document.getElementById('regEmail').value.trim();
      const pw      = document.getElementById('regPw').value;
      const confirm = document.getElementById('regPwConfirm').value;
      let ok = true;
      if (nama.length < 2)       { setErr('regNama', 'Nama minimal 2 karakter.'); ok = false; }
      if (!EMAIL_RE.test(email)) { setErr('regEmail', 'Email tidak valid.'); ok = false; }
      if (pw.length < 8)         { setErr('regPw', 'Password minimal 8 karakter.'); ok = false; }
      if (pw !== confirm)        { setErr('regPwConfirm', 'Password tidak cocok.'); ok = false; }
      if (!ok) return;

      const result = register({ nama, email, password: pw });
      if (!result.ok) { setErr('regEmail', result.msg); return; }
      closeModal();
      showToastGlobal('🎉 Akun berhasil dibuat! Selamat datang, ' + nama.split(' ')[0] + '!');
    });

    const session = getSession();
    if (session) {
      const heroActions = document.querySelector('.hero-actions');
      if (heroActions) {
        heroActions.innerHTML = `
          <a href="Schedule.html" class="btn-pesan">🎬 Pesan Tiket Sekarang</a>
          <a href="MyAccount.html" class="btn-auth-hero">👤 ${session.nama.split(' ')[0]}</a>
        `;
      }
      const hint = document.querySelector('.hero-register-hint');
      if (hint) hint.style.display = 'none';
    }
  }

  function showToastGlobal(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }

  document.addEventListener('DOMContentLoaded', () => {
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


//tes commit