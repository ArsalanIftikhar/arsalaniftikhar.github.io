document.addEventListener('DOMContentLoaded', () => {
  const connectTarget = document.getElementById('connect');
  if (connectTarget && window.location.hash === '#connect') {
    connectTarget.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
});
