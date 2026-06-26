document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.getElementById("carouselViewport");
  if (!viewport) return;

  const track = document.getElementById("carouselTrack");
  const dotsEl = document.getElementById("carouselDots");
  const btnPrev = document.getElementById("carouselPrev");
  const btnNext = document.getElementById("carouselNext");
  const cards = Array.from(track.querySelectorAll(".film-card-v2"));
  const total = cards.length;
  const GAP = 16;
  let currentIdx = 0;

  function getVisible() {
    const w = viewport.offsetWidth;
    if (w >= 820) return 5;
    if (w >= 620) return 4;
    if (w >= 420) return 3;
    return 2;
  }

  function getCardWidth() {
    const v = getVisible();
    return (viewport.offsetWidth - GAP * (v - 1)) / v;
  }

  function maxIndex() {
    return Math.max(0, total - getVisible());
  }

  function setWidths() {
    const w = getCardWidth();
    cards.forEach((c) => {
      c.style.width = w + "px";
      c.style.flexShrink = "0";
    });
  }

  function moveTo(idx) {
    currentIdx = Math.max(0, Math.min(idx, maxIndex()));
    const w = getCardWidth();
    track.style.transform = `translateX(-${currentIdx * (w + GAP)}px)`;
    if (btnPrev) btnPrev.disabled = currentIdx === 0;
    if (btnNext) btnNext.disabled = currentIdx >= maxIndex();
    updateDots();
  }

  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = "";
    const v = getVisible();
    const pages = Math.ceil(total / v);
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", "Halaman " + (i + 1));
      dot.addEventListener("click", () => {
        const vNow = getVisible();
        moveTo(Math.min(i * vNow, maxIndex()));
      });
      dotsEl.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsEl) return;
    const v = getVisible();
    const activePage = Math.round(currentIdx / v);
    dotsEl.querySelectorAll(".carousel-dot").forEach((d, i) => {
      d.classList.toggle("active", i === activePage);
    });
  }

  btnPrev?.addEventListener("click", () => moveTo(currentIdx - 1));
  btnNext?.addEventListener("click", () => moveTo(currentIdx + 1));

  let touchX = 0;
  track.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", (e) => {
    const dx = touchX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) moveTo(currentIdx + (dx > 0 ? 1 : -1));
  }, { passive: true });

  function init() {
    setWidths();
    buildDots();
    moveTo(0);
  }

  window.addEventListener("resize", () => {
    setWidths();
    buildDots();
    moveTo(Math.min(currentIdx, maxIndex()));
  });

  init();
});
