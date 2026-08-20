const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('#mainNav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  document.querySelectorAll('#mainNav a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open menu');
    });
  });
}

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const slider = document.querySelector('.showroom-slider');

if (slides.length) {
  let current = 0;
  let timer;
  let touchStartX = 0;
  let touchEndX = 0;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });

    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }

  function startSlider() {
    clearInterval(timer);
    timer = setInterval(() => showSlide(current + 1), 4500);
  }

  function stopSlider() {
    clearInterval(timer);
  }

  prevBtn?.addEventListener('click', () => {
    showSlide(current - 1);
    startSlider();
  });

  nextBtn?.addEventListener('click', () => {
    showSlide(current + 1);
    startSlider();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startSlider();
    });
  });

  slider?.addEventListener('mouseenter', stopSlider);
  slider?.addEventListener('mouseleave', startSlider);
  slider?.addEventListener('focusin', stopSlider);
  slider?.addEventListener('focusout', startSlider);

  slider?.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
    stopSlider();
  }, { passive: true });

  slider?.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) > 45) {
      showSlide(distance < 0 ? current + 1 : current - 1);
    }
    startSlider();
  }, { passive: true });

  showSlide(0);
  startSlider();
}
