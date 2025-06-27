(function () {
  // Hide sidebar until JS is ready, then show all links on home, only Home link elsewhere
  document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const homePaths = [
      '/Offensivesec-kit/',
      '/Offensivesec-kit/index.html',
      '/'
    ];

    document.querySelectorAll('a.md-nav__link').forEach(link => {
      const span = link.querySelector('span.md-ellipsis');
      if (!span) return;
      const text = span.textContent.trim();

      if (homePaths.includes(currentPath)) {
        // On home page, show all links
        link.style.display = '';
        span.style.display = '';
      } else {
        // On any other page, show only Home link
        if (text === 'Home') {
          link.style.display = '';
          span.style.display = '';
        } else {
          link.style.display = 'none';
          span.style.display = 'none';
        }
      }
    });
  });
})();

document.querySelectorAll('a.md-nav__link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.href;
    // Force full reload of the page, no cache
    window.location.href = href;
  });
});
