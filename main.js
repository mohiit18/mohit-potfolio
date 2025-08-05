document.addEventListener('DOMContentLoaded', function () {
  // Typed.js initialization with smooth settings
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

  // Animate fade-in-up sections when visible
  const fadeEls = document.querySelectorAll('.fade-in-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.style.opacity = 1;
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => observer.observe(el));
  } else { fadeEls.forEach(el => el.style.opacity = 1); }

  // Smooth fade nav highlight based on scroll
  function smoothNavFade() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
      link.style.transition = 'color 0.5s ease, background 0.5s ease, box-shadow 0.5s ease';
      link.classList.remove('active');
      link.style.color = '';
      link.style.background = '';
      link.style.boxShadow = '';
    });

    let currentSectionId = '';

    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSectionId = link.getAttribute('href');
        }
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentSectionId) {
        link.classList.add('active');
        link.style.color = 'var(--accent)';
        link.style.background = 'rgba(255,184,35,0.10)';
        link.style.boxShadow = '0 0 10px 1px #FFB82344';
      }
    });
  }
  window.addEventListener('scroll', smoothNavFade);
  smoothNavFade();

  // Contact Form - fake submit feedback
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

  // Brand ping-pong animation with smooth transition & left spacing
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
