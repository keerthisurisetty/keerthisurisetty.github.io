// Toggle mobile menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

function setupCarousel(carouselId) {
  const container = document.getElementById(carouselId);
  const track = container.querySelector('.carousel-track');
  const leftArrow = container.querySelector('.carousel-arrow.left');
  const rightArrow = container.querySelector('.carousel-arrow.right');
  const cards = track.children;

  const visibleCards = Math.floor(container.offsetWidth / cards[0].offsetWidth); // number of cards visible
  const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap);

  let position = 0;

  // Move carousel
  function moveRight() {
    position -= cardWidth; 
    const maxPosition = -(cardWidth * (cards.length - visibleCards));
    if (position < maxPosition) position = 0;
    track.style.transform = `translateX(${position}px)`;
  }

  function moveLeft() {
    position += cardWidth;
    const maxPosition = 0;
    if (position > maxPosition) position = -(cardWidth * (cards.length - visibleCards));
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
}

// Initialize both carousels
setupCarousel('featured-carousel');
setupCarousel('other-carousel');
