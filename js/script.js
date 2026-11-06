const menuToggle = document.querySelector('.menu-toggle');
const siteNavigation = document.querySelector('.site-navigation');

function setMenuOpen(isOpen) {
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  siteNavigation.classList.toggle('is-open', isOpen);
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  setMenuOpen(!isOpen);
});

siteNavigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    setMenuOpen(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (
    event.key === 'Escape' &&
    window.matchMedia('(max-width: 700px)').matches &&
    menuToggle.getAttribute('aria-expanded') === 'true'
  ) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

if ('IntersectionObserver' in window) {
  const sectionsToReveal = document.querySelectorAll('.about-section, .tech-section, .learning-section, .contact-section');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sectionsToReveal.forEach((section) => {
    section.classList.add('scroll-reveal');
    revealObserver.observe(section);
  });

  document.documentElement.classList.add('js-ready');
}
