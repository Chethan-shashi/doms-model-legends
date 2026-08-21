/* =========================================================
   Doms Model Legends — script.js
   Vanilla JavaScript. No dependencies.
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     CONTACT FORM SETUP  —  edit this one line only

     1. Go to  https://web3forms.com
     2. Enter  legendsmodelling1940@outlook.com  and press Create
     3. The access key arrives by email (no account needed)
     4. Paste it between the quotes below

     Until a key is set, the form falls back to opening the
     visitor's email app instead of sending directly.
     --------------------------------------------------------- */
  var ACCESS_KEY = 'b80749f2-f34f-41c9-b644-58a3df45bda4';   // e.g. 'a1b2c3d4-5e6f-7890-abcd-ef1234567890'

  /* =========================================================
     PAGE NAVIGATION
     Each "page" is a <div class="page" id="...">.
     Any element with data-page="id" switches to that page.
     Also updates the URL so links can be shared and the
     browser back button works.
     ========================================================= */

  var DEFAULT_PAGE = 'home';

  function showPage(id, push) {
    var target = document.getElementById(id);
    if (!target) { id = DEFAULT_PAGE; target = document.getElementById(id); }

    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) pages[i].classList.remove('active');
    target.classList.add('active');

    var links = document.querySelectorAll('[data-page]');
    for (var j = 0; j < links.length; j++) {
      links[j].classList.toggle('active', links[j].getAttribute('data-page') === id);
    }

    if (push !== false && window.history && history.pushState) {
      history.pushState({ page: id }, '', '#' + id);
    }

    document.title = pageTitle(id);
    window.scrollTo(0, 0);
    setTimeout(initFades, 80);

    var nav = document.getElementById('navLinks');
    if (nav) nav.classList.remove('open');
  }

  function pageTitle(id) {
    var base = 'Doms Model Legends';
    var titles = {
      'home': base + ' — Building Legends, One Model at a Time',
      'about': 'About Dom Pound | ' + base,
      'team': 'Development Team | ' + base,
      'models': 'Our Models | ' + base,
      'model-1940': 'The 1940 Model Trail of Remembrance | ' + base,
      'model-bomber': 'Bomber Command Model Trail | ' + base,
      'model-usaaf': 'The USAAF Model Trail | ' + base,
      'bob-collection': "Dom's WW2 Collection | " + base,
      'bobhs': 'Battle of Britain Historical Society | ' + base,
      'gallery': 'Gallery | ' + base,
      'contact': 'Contact & FAQ | ' + base
    };
    return titles[id] || base;
  }

  // Click anywhere -> if it (or a parent) has data-page, navigate
  document.addEventListener('click', function (e) {
    var el = e.target;
    while (el && el !== document) {
      if (el.hasAttribute && el.hasAttribute('data-page')) {
        e.preventDefault();
        e.stopPropagation();
        showPage(el.getAttribute('data-page'));
        return;
      }
      el = el.parentNode;
    }
  });

  // Browser back / forward buttons
  window.addEventListener('popstate', function () {
    showPage((location.hash || '#' + DEFAULT_PAGE).slice(1), false);
  });

  /* =========================================================
     MOBILE MENU
     ========================================================= */
  var burger = document.getElementById('burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var nav = document.getElementById('navLinks');
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* =========================================================
     FADE-IN ON SCROLL
     ========================================================= */
  function initFades() {
    if (!window.IntersectionObserver) {
      var all = document.querySelectorAll('.fade');
      for (var i = 0; i < all.length; i++) all[i].classList.add('in');
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.06 });
    var fades = document.querySelectorAll('.page.active .fade:not(.in)');
    for (var k = 0; k < fades.length; k++) obs.observe(fades[k]);
  }

  /* =========================================================
     FAQ ACCORDION
     ========================================================= */
  document.addEventListener('click', function (e) {
    var q = e.target.closest('.faq-q');
    if (q) {
      var item = q.parentElement;
      var open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
  });

  // Keyboard support for FAQ
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var q = e.target.closest('.faq-q');
    if (q) { e.preventDefault(); q.click(); }
  });

  /* =========================================================
     IMAGE POPUP / LIGHTBOX
     Works for .g-item (gallery) and .pop-img (single images)
     ========================================================= */
  function openPopup(src, alt) {
    var img = document.getElementById('lb-img');
    img.src = src;
    img.alt = alt || 'Enlarged image';
    document.getElementById('lightbox').classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    document.getElementById('lightbox').classList.remove('show');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (e) {
    var g = e.target.closest('.g-item');
    if (g) {
      var img = g.querySelector('img');
      if (img) openPopup(img.src, img.alt);
      return;
    }
    var p = e.target.closest('.pop-img');
    if (p) {
      var src = p.tagName === 'IMG' ? p.src : (p.querySelector('img') || {}).src;
      var alt = p.tagName === 'IMG' ? p.alt : '';
      if (src) openPopup(src, alt);
      return;
    }
    if (e.target.id === 'lightbox' || e.target.id === 'lb-close') closePopup();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePopup();
    // Enter / Space on the close button
    if ((e.key === 'Enter' || e.key === ' ') && e.target.id === 'lb-close') {
      e.preventDefault();
      closePopup();
    }
  });

  // Keyboard support for gallery items
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var g = e.target.closest('.g-item');
    if (g) { e.preventDefault(); g.click(); }
  });

  /* =========================================================
     YOUTUBE — coming soon
     ========================================================= */
  document.addEventListener('click', function (e) {
    var y = e.target.closest('[data-yt]');
    if (y) {
      e.preventDefault();
      e.stopPropagation();
      alert('YouTube channel — Coming Soon!');
    }
  });

  /* =========================================================
     CONTACT FORM
     Sends via Web3Forms when ACCESS_KEY is set.
     Falls back to opening the user's email client if not.
     ========================================================= */
  var form = document.getElementById('contactForm');

  if (form) {
    var btn = document.getElementById('formBtn');
    var msg = document.getElementById('formMsg');

    function say(text, kind) {
      msg.textContent = text;
      msg.className = 'form-msg show ' + kind;
    }

    function validEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var subject = form.subject.value;
      var message = form.message.value.trim();

      // Clear previous errors
      ['name', 'email', 'message'].forEach(function (f) {
        form[f].classList.remove('invalid');
      });

      // Validate
      if (!name) { form.name.classList.add('invalid'); return say('Please enter your name.', 'err'); }
      if (!validEmail(email)) { form.email.classList.add('invalid'); return say('Please enter a valid email address.', 'err'); }
      if (!message) { form.message.classList.add('invalid'); return say('Please enter a message.', 'err'); }

      // Honeypot — bots fill hidden fields, humans don't
      if (form.botcheck && form.botcheck.checked) return;

      // No access key yet -> fall back to opening the email app
      if (!ACCESS_KEY) {
        var body = 'Name: ' + name + '\nEmail: ' + email + '\nSubject: ' + subject + '\n\n' + message;
        window.location.href = 'mailto:legendsmodelling1940@outlook.com'
          + '?subject=' + encodeURIComponent('Website enquiry: ' + subject)
          + '&body=' + encodeURIComponent(body);
        say('Opening your email app…', 'ok');
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Sending…';
      say('Sending your message…', 'ok');

      var payload = {
        access_key: ACCESS_KEY,
        subject: 'Website enquiry: ' + subject,
        from_name: 'Doms Model Legends website',
        name: name,
        email: email,
        enquiry_type: subject,
        message: message
      };

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            form.reset();
            say('Thank you! Your message has been sent. Dom will be in touch soon.', 'ok');
            btn.textContent = 'Message Sent';
            setTimeout(function () {
              btn.disabled = false;
              btn.textContent = 'Send Message →';
            }, 4000);
          } else {
            throw new Error(data.message || 'Server error');
          }
        })
        .catch(function () {
          say('Something went wrong. Please email legendsmodelling1940@outlook.com directly.', 'err');
          btn.disabled = false;
          btn.textContent = 'Send Message →';
        });
    });
  }

  /* =========================================================
     START UP
     ========================================================= */
  var start = (location.hash || '').slice(1);
  showPage(start || DEFAULT_PAGE, false);
  initFades();

})();
