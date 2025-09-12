// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Projects carousel functionality
function initializeCarousel(containerClass) {
  const container = document.querySelector(`.${containerClass}`);
  if (!container) return;
  const carousel = container.querySelector('.projects-carousel');
  const cards = carousel.querySelectorAll('.project-card');
  const prevButton = container.querySelector('.carousel-button.prev');
  const nextButton = container.querySelector('.carousel-button.next');
  let currentIndex = 0;
  let autoplayInterval;

  function updateCarousel() {
    const offset = -currentIndex * (100 / 3);
    carousel.style.transform = `translateX(${offset}%)`;

    cards.forEach((card, index) => {
      card.classList.toggle('active', index >= currentIndex && index < currentIndex + 3);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % (cards.length - 2);
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + (cards.length - 2)) % (cards.length - 2);
    updateCarousel();
  }

  function startAutoplay() { autoplayInterval = setInterval(nextSlide, 3000); }
  function stopAutoplay() { clearInterval(autoplayInterval); }

  prevButton.addEventListener('click', () => { prevSlide(); stopAutoplay(); });
  nextButton.addEventListener('click', () => { nextSlide(); stopAutoplay(); });

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  updateCarousel();
  startAutoplay();

  function updateCarouselResponsive() {
    const width = window.innerWidth;
    if (width <= 768) cards.forEach(card => card.style.flex = '0 0 calc(100% - 1rem)');
    else if (width <= 1024) cards.forEach(card => card.style.flex = '0 0 calc(50% - 1rem)');
    else cards.forEach(card => card.style.flex = '0 0 calc(33.333% - 1.33rem)');
  }

  updateCarouselResponsive();
}

initializeCarousel('featured-projects');
initializeCarousel('other-projects');

window.addEventListener('resize', () => {
  initializeCarousel('featured-projects');
  initializeCarousel('other-projects');
});
