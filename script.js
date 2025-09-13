// Toggle mobile menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

function setupCarousel(carouselId) {
  const container = document.getElementById(carouselId);
  const track = container.querySelector('.carousel-track');
  const cards = track.children;
  const leftArrow = container.querySelector('.carousel-arrow.left');
  const rightArrow = container.querySelector('.carousel-arrow.right');

  const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap);
  let position = 0;

  function moveRight() {
    position -= cardWidth;
    const maxPosition = -(cardWidth * (cards.length - 4)); // show 4 cards at a time
    if (position < maxPosition) position = 0;
    track.style.transform = `translateX(${position}px)`;
  }

  function moveLeft() {
    position += cardWidth;
    if (position > 0) position = -(cardWidth * (cards.length - 4));
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
