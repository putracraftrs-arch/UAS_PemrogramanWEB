document.addEventListener('DOMContentLoaded', () => {

  const pesanEl = document.getElementById('cnPesan');
  const charEl  = document.getElementById('charCount');

  pesanEl.addEventListener('input', () => {
    charEl.textContent = pesanEl.value.length;
  });

  ['cnNama', 'cnEmail', 'cnTopik', 'cnPesan'].forEach(id => {
    const el = document.getElementById(id);
    ['input', 'change'].forEach(ev => {
      el.addEventListener(ev, () => {
        el.classList.remove('error');
        document.getElementById('err-' + id)?.classList.remove('show');
      });
    });
  });

  function validateField(id, condition, errId) {
    const el  = document.getElementById(id);
    const err = document.getElementById(errId);
    if (!condition(el)) {
      el.classList.add('error');
      err?.classList.add('show');
      return false;
    }
    el.classList.remove('error');
    err?.classList.remove('show');
    return true;
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }

  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = [
      validateField('cnNama',  el => el.value.trim() !== '',        'err-cnNama'),
      validateField('cnEmail', el => emailRe.test(el.value.trim()), 'err-cnEmail'),
      validateField('cnTopik', el => el.value !== '',               'err-cnTopik'),
      validateField('cnPesan', el => el.value.trim().length >= 10,  'err-cnPesan'),
    ].every(Boolean);

    if (!valid) return;

    const pesan = {
      id    : Date.now(),
      nama  : document.getElementById('cnNama').value.trim(),
      email : document.getElementById('cnEmail').value.trim(),
      topik : document.getElementById('cnTopik').value,
      pesan : document.getElementById('cnPesan').value.trim(),
      waktu : new Date().toLocaleString('id-ID'),
    };
    const riwayat = JSON.parse(localStorage.getItem('cinego_pesan') || '[]');
    riwayat.push(pesan);
    localStorage.setItem('cinego_pesan', JSON.stringify(riwayat));

    document.getElementById('formView').style.display    = 'none';
    document.getElementById('successView').style.display = 'block';
  });

  document.getElementById('btnBackForm').addEventListener('click', () => {
    document.getElementById('contactForm').reset();
    charEl.textContent = '0';
    document.getElementById('formView').style.display    = 'block';
    document.getElementById('successView').style.display = 'none';
  });

});
