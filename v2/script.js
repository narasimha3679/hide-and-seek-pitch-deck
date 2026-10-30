// Hide and Seek v2: WebGL gold dust, cursor, scroll scale, spotlight, 3D fan, drag gallery, twist beats.
(function () {
  var fine = window.matchMedia('(pointer: fine)').matches;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Loader count, then lift the curtain.
  var loader = document.getElementById('loader');
  var loaderNum = document.getElementById('loaderNum');
  var n = 0;
  var timer = setInterval(function () {
    n += 7; if (n > 100) n = 100;
    if (loaderNum) loaderNum.textContent = String(n).padStart(3, '0');
    if (n >= 100) { clearInterval(timer); setTimeout(function () { if (loader) loader.classList.add('done'); }, 250); }
  }, 55);

  // Custom cursor.
  var dot = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  if (fine && dot && ring && !reduced) {
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
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

  // WebGL gold dust. If Three.js or WebGL is missing, the site still works in 2D.
  try {
    if (typeof THREE !== 'undefined') {
      var canvas = document.getElementById('webgl');
      var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(innerWidth, innerHeight);
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
      camera.position.z = 8;
      var count = 1400, pos = new Float32Array(count * 3);
      for (var i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 22;
      var geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      var mat = new THREE.PointsMaterial({ color: 0xd4af37, size: 0.035, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false });
      var dust = new THREE.Points(geo, mat);
      scene.add(dust);
      var targetX = 0, targetY = 0;
      document.addEventListener('mousemove', function (e) {
        targetX = (e.clientX / innerWidth - 0.5) * 0.6;
        targetY = (e.clientY / innerHeight - 0.5) * 0.4;
      }, { passive: true });
      (function animate() {
        requestAnimationFrame(animate);
        if (!reduced) { dust.rotation.y += 0.0006; dust.rotation.x += 0.0002; }
        camera.position.x += (targetX - camera.position.x) * 0.04;
        camera.position.y += (-targetY - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      })();
      addEventListener('resize', function () {
        camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
      });
    }
  } catch (err) { /* 2D fallback, no action needed */ }

  // Reveal and scroll scale for the theatre stack.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) { if (entry.isIntersecting) entry.target.classList.add('in'); });
  }, { threshold: 0.25 });
  document.querySelectorAll('.screen').forEach(function (el) { io.observe(el); });

  var screens = document.querySelectorAll('.screen');
  var heroImg = document.querySelector('.hero-img');
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      screens.forEach(function (s) {
        var r = s.getBoundingClientRect();
        var p = Math.max(0, Math.min(1, (innerHeight - r.top) / innerHeight));
        var img = s.querySelector('img');
        if (img) img.style.setProperty('--scale', (1.25 - p * 0.25).toFixed(3));
      });
      if (heroImg) {
        var hp = Math.min(1, scrollY / innerHeight);
        heroImg.style.transform = 'scale(' + (1.08 + hp * 0.12) + ')';
      }
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hero tilt.
  var hero = document.querySelector('[data-tilt-hero]');
  if (hero && fine && !reduced) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      heroImg.style.transform = 'scale(1.12) translate(' + (x * -18) + 'px,' + (y * -12) + 'px)';
    });
    hero.addEventListener('mouseleave', function () { heroImg.style.transform = ''; });
  }

  // Spotlight search.
  var seek = document.getElementById('seek');
  if (seek) {
    var moveSeek = function (x, y) {
      var r = seek.getBoundingClientRect();
      seek.style.setProperty('--sx', ((x - r.left) / r.width * 100) + '%');
      seek.style.setProperty('--sy', ((y - r.top) / r.height * 100) + '%');
    };
    seek.addEventListener('pointermove', function (e) { moveSeek(e.clientX, e.clientY); }, { passive: true });
    seek.addEventListener('pointerdown', function (e) { moveSeek(e.clientX, e.clientY); }, { passive: true });
  }

  // 3D card fan.
  var fan = document.querySelector('[data-fan]');
  if (fan) {
    var cards = fan.querySelectorAll('.fan-card');
    cards.forEach(function (c, i) { c.style.setProperty('--rz', ((i - 2) * 14) + 'deg'); });
    fan.addEventListener('pointermove', function (e) {
      var r = fan.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      cards.forEach(function (c) { c.style.setProperty('--ry', (x * 22) + 'deg'); });
    }, { passive: true });
  }

  // Twist in three beats.
  var lines = ["She was the officer's daughter.", "He never locked the door.", "Who is the one?"];
  var dots = document.querySelectorAll('.twist-dots span');
  var lineEl = document.getElementById('twistLine');
  var btn = document.getElementById('twistBtn');
  var idx = 0;
  if (btn && lineEl) {
    btn.addEventListener('click', function () {
      idx = (idx + 1) % lines.length;
      lineEl.textContent = lines[idx];
      dots.forEach(function (d, i) { d.classList.toggle('on', i === idx); });
      btn.textContent = idx === lines.length - 1 ? 'Back to the start' : 'Next reveal';
    });
  }

  // Drag gallery with simple inertia.
  var gal = document.querySelector('[data-gallery]');
  if (gal) {
    var x = 0, startX = 0, startScroll = 0, dragging = false, vel = 0, last = 0;
    var maxX = function () { return Math.max(0, gal.scrollWidth - gal.parentElement.clientWidth + 40); };
    gal.addEventListener('pointerdown', function (e) { dragging = true; startX = e.clientX; startScroll = x; last = e.clientX; gal.setPointerCapture(e.pointerId); });
    gal.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      vel = e.clientX - last; last = e.clientX;
      x = Math.max(-maxX(), Math.min(0, startScroll + (e.clientX - startX)));
      gal.style.transform = 'translateX(' + x + 'px)';
    });
    gal.addEventListener('pointerup', function () {
      dragging = false;
      var inertia = function () {
        if (dragging) return;
        x = Math.max(-maxX(), Math.min(0, x + vel)); vel *= 0.92;
        gal.style.transform = 'translateX(' + x + 'px)';
        if (Math.abs(vel) > 0.5) requestAnimationFrame(inertia);
      };
      requestAnimationFrame(inertia);
    });
  }
})();
