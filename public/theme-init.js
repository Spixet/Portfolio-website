(function () {
  function getInitialTheme() {
    try {
      var storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (error) {
      return 'dark';
    }

    return 'dark';
  }

  var theme = getInitialTheme();
  var root = document.documentElement;

  root.classList.remove('light', 'dark');
  root.classList.add(theme);

  try {
    if (window.localStorage.getItem('theme') !== theme) {
      window.localStorage.setItem('theme', theme);
    }
  } catch (error) {
    // Ignore localStorage issues and keep the calculated theme.
  }
})();
