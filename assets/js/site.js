document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    const closeMenu = () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    const revealTargets = document.querySelectorAll('section, .timeline-item, .project-card, .skill-card, .tool-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  if (filterButtons.length && cards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter || 'all';
        filterButtons.forEach((b) => b.classList.toggle('active', b === button));

        cards.forEach((card) => {
          const categories = (card.dataset.category || '').split(' ');
          const visible = filter === 'all' || categories.includes(filter);
          card.style.display = visible ? '' : 'none';
        });
      });
    });
  }

  document.querySelectorAll('.scroller-container').forEach((container) => {
    const scroller = container.querySelector('.scroller');
    const next = container.querySelector('.scroller-btn.next');
    const prev = container.querySelector('.scroller-btn.prev');

    if (!scroller) return;

    next?.addEventListener('click', () => scroller.scrollBy({ left: 220, behavior: 'smooth' }));
    prev?.addEventListener('click', () => scroller.scrollBy({ left: -220, behavior: 'smooth' }));
  });
});
