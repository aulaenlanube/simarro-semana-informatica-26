/* =========================================================
   INSTITUTO INTELIGENTE — PRESENTATION CONTROLLER
   ========================================================= */

(() => {
  'use strict';

  /* ---------- PROGRESS BAR ---------- */
  const progressFill = document.getElementById('progressFill');
  const updateProgress = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    const pct = height > 0 ? (scrolled / height) * 100 : 0;
    progressFill.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();


  /* ---------- SIDE NAV ACTIVE DOT + CURRENT SLIDE ---------- */
  const dots = document.querySelectorAll('.side-nav__dot');
  const slides = document.querySelectorAll('.slide');
  const slidesArr = Array.from(slides);
  const topBand = document.querySelector('.si-band--top');

  let currentIdx = -1;
  const updateCurrentSlide = () => {
    const vpCenter = window.scrollY + window.innerHeight / 2;
    let closest = 0;
    let minDist = Infinity;
    for (let i = 0; i < slidesArr.length; i++) {
      const s = slidesArr[i];
      const center = s.offsetTop + s.offsetHeight / 2;
      const dist = Math.abs(vpCenter - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    }
    if (closest === currentIdx) return;
    if (currentIdx >= 0) slidesArr[currentIdx].classList.remove('is-current');
    const el = slidesArr[closest];
    el.classList.add('is-current');
    currentIdx = closest;
    const id = el.id;
    dots.forEach(d => {
      d.classList.toggle('is-active', d.getAttribute('href') === '#' + id);
    });
    if (topBand) topBand.classList.toggle('is-hidden', closest !== 0);
  };

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => { updateCurrentSlide(); scrollTicking = false; });
  }, { passive: true });
  window.addEventListener('resize', updateCurrentSlide, { passive: true });
  updateCurrentSlide();

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // stagger children with [data-reveal] inside the same section
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

  document.querySelectorAll('[data-reveal]').forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 90 + 'ms';
    revealObserver.observe(el);
  });

  /* ---------- NUMBER COUNTERS ---------- */
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const duration = 1800;
    const startTime = performance.now();
    const isInt = Number.isInteger(target);

    const step = (now) => {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / duration, 1);
      const val = target * easeOut(p);
      el.textContent = isInt ? Math.round(val).toLocaleString('es-ES') : val.toFixed(1);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = isInt ? target.toLocaleString('es-ES') : target.toString();
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.num').forEach(el => counterObserver.observe(el));

  /* ---------- CHART + MAP TRIGGER ---------- */
  const chart = document.querySelector('.chart');
  if (chart) {
    const chartObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          chartObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    chartObs.observe(chart);
  }

  const map = document.querySelector('.map');
  if (map) {
    const mapObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          mapObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    mapObs.observe(map);
  }

  /* ---------- PARALLAX MICRO-EFFECT ON HERO CHIP ---------- */
  const heroChip = document.querySelector('.hero-chip');
  if (heroChip) {
    let ticking = false;
    const handleMove = (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const { innerWidth: w, innerHeight: h } = window;
        const x = (e.clientX / w - 0.5) * 20;
        const y = (e.clientY / h - 0.5) * 20;
        heroChip.style.transform = `translate(${1120 + x}px, ${420 + y}px)`;
        ticking = false;
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
  }

  /* ---------- SMOOTH SCROLL FOR NAV ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- KEYBOARD NAVIGATION (PgUp/PgDn/Arrows) ---------- */
  const currentSlideIndex = () => {
    const scrollMid = window.scrollY + window.innerHeight / 2;
    for (let i = slidesArr.length - 1; i >= 0; i--) {
      if (slidesArr[i].offsetTop <= scrollMid) return i;
    }
    return 0;
  };

  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea')) return;
    let idx = currentSlideIndex();
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      idx = Math.min(idx + 1, slidesArr.length - 1);
      slidesArr[idx].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      idx = Math.max(idx - 1, 0);
      slidesArr[idx].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'Home') {
      e.preventDefault();
      slidesArr[0].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'End') {
      e.preventDefault();
      slidesArr[slidesArr.length - 1].scrollIntoView({ behavior: 'smooth' });
    }
  });

})();
