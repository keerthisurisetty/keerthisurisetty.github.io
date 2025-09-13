// Toggle mobile menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

function setupCarousel(carouselId) {
  const container = document.getElementById(carouselId);
  const track = container.querySelector('.carousel-track');
  const cards = Array.from(track.children);
  const leftArrow = container.querySelector('.carousel-arrow.left');
  const rightArrow = container.querySelector('.carousel-arrow.right');

  let position = 0;

  function getCardWidth() {
    const style = getComputedStyle(track);
    const gap = parseFloat(style.gap) || 0;
    return cards[0].offsetWidth + gap;
  }

  function getVisibleCards() {
    return Math.floor(container.offsetWidth / cards[0].offsetWidth);
  }

  function moveRight() {
    const cardWidth = getCardWidth();
    const visibleCards = getVisibleCards();
    const maxPosition = -(cardWidth * (cards.length - visibleCards));
    position -= cardWidth;
    if (position < maxPosition) position = 0;
    track.style.transform = `translateX(${position}px)`;
  }

  function moveLeft() {
    const cardWidth = getCardWidth();
    const visibleCards = getVisibleCards();
    const maxPosition = -(cardWidth * (cards.length - visibleCards));
    position += cardWidth;
    if (position > 0) position = maxPosition;
    track.style.transform = `translateX(${position}px)`;
  }

  // Auto-slide every 2 seconds
  let interval = setInterval(moveRight, 2000);

  // Pause on hover
  container.addEventListener('mouseenter', () => clearInterval(interval));
  container.addEventListener('mouseleave', () => interval = setInterval(moveRight, 2000));

  // Manual navigation
  rightArrow.addEventListener('click', moveRight);
  leftArrow.addEventListener('click', moveLeft);

  // Recalculate on window resize
  window.addEventListener('resize', () => {
    const visibleCards = getVisibleCards();
    const cardWidth = getCardWidth();
    const maxPosition = -(cardWidth * (cards.length - visibleCards));
    if (position < maxPosition) position = maxPosition;
    track.style.transform = `translateX(${position}px)`;
  });
}

// Initialize both carousels
setupCarousel('featured-carousel');
setupCarousel('other-carousel');
