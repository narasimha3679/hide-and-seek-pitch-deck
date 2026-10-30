// Hide and Seek: cursor, spotlight, scroll progress, parallax, reveals, twist.
(function () {
  var fine = window.matchMedia('(pointer: fine)').matches;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dot = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;

  if (fine && dot && ring && !reduced) {
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      document.querySelectorAll('[data-spotlight]').forEach(function (el) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (mx - r.left) + 'px');
        el.style.setProperty('--my', (my - r.top) + 'px');
      });
    }, { passive: true });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, [data-hover]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('is-hover'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('is-hover'); });
    });
  }

  // Reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('in');
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Counting interlude lights up when it arrives
  var counting = document.querySelector('[data-counting]');
  if (counting) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) counting.classList.add('lit');
      });
    }, { threshold: 0.4 }).observe(counting);
  }

  // Scroll progress, count, hero zoom, and gentle parallax
  var bar = document.querySelector('.progress-bar');
  var countNum = document.getElementById('countNum');
  var heroImg = document.querySelector('.hero-media img');
  var parallaxImgs = document.querySelectorAll('[data-parallax] .act-media img');
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var max = document.body.scrollHeight - innerHeight;
      var p = max > 0 ? scrollY / max : 0;
      if (bar) bar.style.width = (p * 100) + '%';
      if (countNum) countNum.textContent = String(Math.min(100, Math.floor(p * 100) + 1)).padStart(3, '0');
      if (heroImg && !reduced) heroImg.style.transform = 'scale(' + (1 + p * 0.08) + ')';
      parallaxImgs.forEach(function (img) {
        var r = img.closest('[data-parallax]').getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight) {
          var off = (r.top + r.height / 2 - innerHeight / 2) * 0.04;
          img.style.translate = '0 ' + off + 'px';
        }
      });
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Twist reveal
  var btn = document.getElementById('twistBtn');
  var body = document.getElementById('twistBody');
  if (btn && body) {
    btn.addEventListener('click', function () {
      var open = !body.hidden;
      body.hidden = open;
      btn.textContent = open ? 'Reveal the truth' : 'Hide the truth';
      btn.setAttribute('aria-expanded', String(!open));
      if (!open) body.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    });
  }

  // Character card tilt, desktop only
  if (fine && !reduced) {
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(800px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  }
})();
