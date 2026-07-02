/* ===========================================================
   YOGENDER SINGH — PORTFOLIO — interactions
   =========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Starfield ---------- */
  const starfield = document.getElementById('starfield');
  if (starfield) {
    const count = window.innerWidth < 640 ? 60 : 130;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      star.className = 'star';
      const size = (Math.random() * 2 + 0.6).toFixed(2);
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.setProperty('--min-o', (Math.random() * 0.25 + 0.05).toFixed(2));
      star.style.setProperty('--max-o', (Math.random() * 0.5 + 0.45).toFixed(2));
      if (!reducedMotion) {
        star.style.animationDuration = `${(Math.random() * 4 + 2.5).toFixed(2)}s`;
        star.style.animationDelay = `${(Math.random() * 4).toFixed(2)}s`;
      }
      frag.appendChild(star);
    }
    starfield.appendChild(frag);
  }

  /* ---------- Sticky nav state ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- Scroll reveals ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-group, .tl-step');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Timeline rail fill ---------- */
  const rail = document.getElementById('timelineRailFill');
  const timeline = document.getElementById('timeline');
  if (rail && timeline) {
    const updateRail = () => {
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      let progressed = vh * 0.75 - rect.top;
      progressed = Math.max(0, Math.min(progressed, total));
      const pct = total > 0 ? (progressed / total) * 100 : 0;
      rail.style.height = `${pct}%`;
    };
    updateRail();
    window.addEventListener('scroll', updateRail, { passive: true });
    window.addEventListener('resize', updateRail);
  }
});
