// (function () {
  document.querySelectorAll('#menu a').forEach(function(element) {
    element.addEventListener('click', function(e) {
      var dest = this.getAttribute('href');
      if (dest.substr(0, 1) === '#') {
        e.preventDefault();
        document.querySelector(dest).scrollIntoView({ behavior: 'smooth' });
      }
    });
  }, this);
// }());