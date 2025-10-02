// Basic interactions: smooth scroll, reveal on scroll, nav active highlight
(function () {
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', this.getAttribute('href'));
      }
    });
  });

  // IntersectionObserver reveal for sections and project cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.section, .project, #hero, .card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Simple nav highlight
  const navLinks = Array.from(document.querySelectorAll('.nav a'));
  const sections = Array.from(document.querySelectorAll('main section, #hero'));
  function highlightNav() {
    let index = sections.findIndex(sec => {
      const r = sec.getBoundingClientRect();
      return r.top <= window.innerHeight * 0.4 && r.bottom >= window.innerHeight * 0.15;
    });
    navLinks.forEach(l => l.classList.remove('active'));
    if (index >= 0) {
      const id = sections[index].id;
      const link = navLinks.find(a => a.getAttribute('href') === '#' + id);
      if (link) link.classList.add('active');
    }
  }
  window.addEventListener('scroll', highlightNav, { passive: true });
  window.addEventListener('resize', highlightNav);
  highlightNav();
})();