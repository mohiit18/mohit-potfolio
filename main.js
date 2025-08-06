document.addEventListener('DOMContentLoaded', function () {
  // Typed.js initialization
  if (window.Typed) {
    new Typed("#typed", {
      strings: [
        "Coder",
        "Frontend Developer",
        "Framework-Reactjs  Nodejs",
        "Problem Solver"
      ],
      typeSpeed: 60,
      backSpeed: 34,
      smartBackspace: true,
      loop: true,
      backDelay: 800,
      startDelay: 100,
      showCursor: true,
      cursorChar: "|"
    });
  }

  // Fade-in sections when visible
  const fadeEls = document.querySelectorAll('.fade-in-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.style.opacity = 1;
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.style.opacity = 1);
  }

  // Single-page app style navigation: show one section at a time
  function showSection(id) {
    document.querySelectorAll('main > section').forEach(sec => {
      sec.classList.add('hide-section');
      sec.classList.remove('section-active');
    });
    const active = document.getElementById(id);
    if (active) {
      active.classList.remove('hide-section');
      active.classList.add('section-active');
    } else {
      document.getElementById('home').classList.remove('hide-section');
      document.getElementById('home').classList.add('section-active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Navigation links click handler
  document.querySelectorAll('[data-section]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const sec = this.getAttribute('data-section');
      if (!sec) return;

      // Update nav highlighting for all nav links & home nav links
      document.querySelectorAll('.navbar-nav .nav-link').forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.glass-navlink').forEach(l => l.classList.remove('active'));
      document.querySelectorAll('[data-section="' + sec + '"]').forEach(l => l.classList.add('active'));

      showSection(sec);

      // Close nav on mobile
      const navCollapse = document.getElementById('navCollapse');
      if (navCollapse && navCollapse.classList.contains('show')) {
        if (typeof bootstrap !== "undefined" && bootstrap.Collapse) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
        } else {
          navCollapse.classList.remove('show');
        }
      }
    });
  });

  // Initially show home section
  showSection('home');

  // Contact form front-end only submit feedback
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      document.getElementById("form-alert").innerHTML =
        '<div class="alert alert-success">Thank you! I\'ll reply soon.</div>';
      setTimeout(() => {
        document.getElementById("form-alert").innerHTML = "";
        contactForm.reset();
      }, 3500);
    });
  }

  // Ping-pong animation toggle on navbar brand
  window.addEventListener('scroll', function () {
    const navBrand = document.getElementById('brand-pingpong');
    const homeSection = document.getElementById('home');
    if (!navBrand || !homeSection) return;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const triggerY = homeSection.offsetHeight - 80;
    if (scrollY > triggerY) {
      if (!navBrand.classList.contains('pingpong-animate')) {
        navBrand.style.transition = 'left 0.8s ease-in-out';
        navBrand.classList.add('pingpong-animate');
        setTimeout(() => navBrand.style.transition = '', 800);
      }
    } else {
      if (navBrand.classList.contains('pingpong-animate')) {
        navBrand.style.transition = 'left 0.8s ease-in-out';
        navBrand.classList.remove('pingpong-animate');
        navBrand.style.left = '20px';
        setTimeout(() => navBrand.style.transition = '', 800);
      }
    }
  });
});
