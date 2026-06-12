const KEY_TIKET = 'cinego_tiket';
const EMAIL_RE  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className   = 'toast';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

function validateField(id, cond, errId) {
  const el = document.getElementById(id);
  const er = document.getElementById(errId);
  if (!cond(el)) {
    el.classList.add('error');
    er.classList.add('show');
    return false;
  }
  el.classList.remove('error');
  er.classList.remove('show');
  return true;
}

function clearErr(id) {
  document.getElementById(id)?.classList.remove('error');
  document.getElementById('err-' + id)?.classList.remove('show');
}

function setErr(id, msg) {
  const el  = document.getElementById(id);
  const err = document.getElementById('err-' + id);
  if (el)  el.classList.add('error');
  if (err) { err.textContent = msg; err.classList.add('show'); }
}

function formatRp(n)  { return 'Rp ' + n.toLocaleString('id-ID'); }
function escHtml(s)   {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function formatTgl(s) {
  if (!s) return '-';
  const [y, m, d] = s.split('-');
  const bln = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${d} ${bln[parseInt(m) - 1]} ${y}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const session = AUTH.getSession();

  if (!session) {
    document.getElementById('authGate').style.display       = 'block';
    document.getElementById('accountContent').style.display = 'none';
    initAuthGate();
  } else {
    document.getElementById('authGate').style.display       = 'none';
    document.getElementById('accountContent').style.display = 'block';
    initAccountPage();
  }
});

function initAuthGate() {

  document.querySelectorAll('.auth-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => AUTH.switchAuthTab(btn.dataset.tab));
  });
  document.getElementById('gateLinkToDaftar')?.addEventListener('click', e => {
    e.preventDefault(); AUTH.switchAuthTab('daftar');
  });
  document.getElementById('gateLinkToLogin')?.addEventListener('click', e => {
    e.preventDefault(); AUTH.switchAuthTab('login');
  });

  document.getElementById('toggleGLoginPw')?.addEventListener('click', () => {
    const inp = document.getElementById('gLoginPw');
    inp.type  = inp.type === 'password' ? 'text' : 'password';
    document.getElementById('toggleGLoginPw').textContent = inp.type === 'password' ? '👁' : '🙈';
  });
  document.getElementById('toggleGRegPw')?.addEventListener('click', () => {
    const inp = document.getElementById('gRegPw');
    inp.type  = inp.type === 'password' ? 'text' : 'password';
    document.getElementById('toggleGRegPw').textContent = inp.type === 'password' ? '👁' : '🙈';
  });

  ['gLoginEmail','gLoginPw','gRegNama','gRegEmail','gRegPw','gRegPwConfirm'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => clearErr(id));
  });

  document.getElementById('gateLoginForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('gLoginEmail').value.trim();
    const pw    = document.getElementById('gLoginPw').value;
    let ok = true;
    if (!EMAIL_RE.test(email)) { setErr('gLoginEmail', 'Email tidak valid.'); ok = false; }
    if (!pw)                   { setErr('gLoginPw', 'Password wajib diisi.'); ok = false; }
    if (!ok) return;

    const result = AUTH.login(email, pw);
    if (!result.ok) {
      if (result.msg.includes('Email')) setErr('gLoginEmail', result.msg);
      else                              setErr('gLoginPw', result.msg);
      return;
    }
    window.location.reload();
  });

  document.getElementById('gateRegisterForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const nama    = document.getElementById('gRegNama').value.trim();
    const email   = document.getElementById('gRegEmail').value.trim();
    const pw      = document.getElementById('gRegPw').value;
    const confirm = document.getElementById('gRegPwConfirm').value;
    let ok = true;
    if (nama.length < 2)       { setErr('gRegNama', 'Nama minimal 2 karakter.'); ok = false; }
    if (!EMAIL_RE.test(email)) { setErr('gRegEmail', 'Email tidak valid.'); ok = false; }
    if (pw.length < 8)         { setErr('gRegPw', 'Password minimal 8 karakter.'); ok = false; }
    if (pw !== confirm)        { setErr('gRegPwConfirm', 'Password tidak cocok.'); ok = false; }
    if (!ok) return;

    const result = AUTH.register({ nama, email, password: pw });
    if (!result.ok) { setErr('gRegEmail', result.msg); return; }
    window.location.reload();
  });
}

function initAccountPage() {
  const user = AUTH.getCurrentUser();
  if (!user) return;

  function updateAvatar() {
    const u    = AUTH.getCurrentUser() || {};
    const nama = u.nama || 'Pengguna CineGo';
    document.getElementById('avatarInitial').textContent = nama.charAt(0).toUpperCase();
    document.getElementById('avatarName').textContent    = nama;
    document.getElementById('avatarEmail').textContent   = u.email || '—';

    const tiket = getTicketsForCurrentUser();
    document.getElementById('statPesan').textContent = tiket.length;
    document.getElementById('statTiket').textContent = tiket.reduce((s, t) => s + (t.jumlah || 0), 0);
  }
  updateAvatar();

  const fields = {
    acNama    : 'nama',
    acUsername: 'username',
    acEmail   : 'email',
    acTelp    : 'telp',
    acTgl     : 'tgl',
    acKota    : 'kota',
  };
  Object.entries(fields).forEach(([elId, key]) => {
    const el = document.getElementById(elId);
    if (el && user[key]) el.value = user[key];
  });
  const genderSel = document.getElementById('acGender');
  if (genderSel && user.gender) genderSel.value = user.gender;

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
      if (btn.dataset.tab === 'riwayat') renderRiwayat();
    });
  });

  document.getElementById('btnLogout')?.addEventListener('click', () => {
    if (confirm('Yakin ingin keluar?')) AUTH.logout();
  });

  ['acNama', 'acEmail'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => clearErr(id));
  });

  document.getElementById('profilForm')?.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    if (!validateField('acNama',  el => el.value.trim() !== '',         'err-acNama'))  ok = false;
    if (!validateField('acEmail', el => EMAIL_RE.test(el.value.trim()), 'err-acEmail')) ok = false;
    if (!ok) return;

    const result = AUTH.updateProfile({
      nama    : document.getElementById('acNama').value.trim(),
      username: document.getElementById('acUsername').value.trim(),
      email   : document.getElementById('acEmail').value.trim(),
      telp    : document.getElementById('acTelp').value.trim(),
      tgl     : document.getElementById('acTgl').value,
      gender  : document.getElementById('acGender').value,
      kota    : document.getElementById('acKota').value.trim(),
    });
    if (!result?.ok) {
      setErr('acEmail', result?.msg || 'Profil gagal disimpan.');
      return;
    }
    updateAvatar();
    showToast('✅ Profil berhasil disimpan!');
  });

  document.getElementById('btnResetProfil')?.addEventListener('click', () => {
    document.getElementById('profilForm').reset();
  });

  document.querySelectorAll('.toggle-pw[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const inp = document.getElementById(btn.dataset.target);
      inp.type  = inp.type === 'password' ? 'text' : 'password';
      btn.textContent = inp.type === 'password' ? '👁' : '🙈';
    });
  });

  ['pwLama', 'pwBaru', 'pwKonfirm'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => clearErr(id));
  });

  document.getElementById('pwForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const lama    = document.getElementById('pwLama').value;
    const baru    = document.getElementById('pwBaru').value;
    const konfirm = document.getElementById('pwKonfirm').value;
    let ok = true;
    if (!lama)           { setErr('pwLama',    'Password lama wajib diisi.');  ok = false; }
    if (baru.length < 8) { setErr('pwBaru',    'Password minimal 8 karakter.');ok = false; }
    if (baru !== konfirm){ setErr('pwKonfirm', 'Password tidak cocok.');        ok = false; }
    if (!ok) return;

    const result = AUTH.changePassword(lama, baru);
    if (!result.ok) { setErr('pwLama', result.msg); return; }
    document.getElementById('pwForm').reset();
    showToast('🔒 Password berhasil diubah!');
  });

  document.getElementById('btnDeleteAccount')?.addEventListener('click', () => {
    if (!confirm('Hapus akun secara permanen? Semua data akan hilang.')) return;
    AUTH.deleteAccount();
  });
}

function renderRiwayat() {
  const semua = getTicketsForCurrentUser();
  const body  = document.getElementById('riwayatBody');
  const empty = document.getElementById('riwayatEmpty');
  const wrap  = document.getElementById('riwayatWrapper');
  body.innerHTML = '';

  if (!semua.length) {
    wrap.style.display  = 'none';
    empty.style.display = 'block';
    return;
  }
  wrap.style.display  = '';
  empty.style.display = 'none';

  semua.forEach((t, i) => {
    const tipe    = t.tipe || 'Regular';
    const jumlah  = t.jumlah || (Array.isArray(t.kursi) ? t.kursi.length : 1);
    const badgeCls =
      tipe === 'VIP'  ? 'badge-vip'  :
      tipe === 'IMAX' ? 'badge-imax' :
      tipe === '4DX'  ? 'badge-4dx'  : 'badge-regular';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="color:#5a3a20;font-size:.78rem">${i + 1}</td>
      <td style="font-weight:600;color:#f1f5f9">${escHtml(t.film)}</td>
      <td>${formatTgl(t.tanggal)}</td>
      <td>${escHtml(t.jam)}</td>
      <td><span class="badge ${badgeCls}">${escHtml(tipe)}</span></td>
      <td style="text-align:center">${jumlah}</td>
      <td class="harga-cell">${formatRp(t.total || 0)}</td>
    `;
    body.appendChild(tr);
  });
}

function getTicketsForCurrentUser() {
  const email = (AUTH.getSession()?.email || '').toLowerCase();
  const semua = JSON.parse(localStorage.getItem(KEY_TIKET) || '[]');
  return semua.filter(t => (t.email || '').toLowerCase() === email);
}
