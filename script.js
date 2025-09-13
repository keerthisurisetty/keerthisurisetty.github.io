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
  let cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap);
  let visibleCount = Math.floor(container.offsetWidth / cardWidth);

  // Clone first and last few cards for seamless loop
  const clonesBefore = cards.slice(-visibleCount).map(card => card.cloneNode(true));
  const clonesAfter = cards.slice(0, visibleCount).map(card => card.cloneNode(true));

  clonesBefore.forEach(clone => track.insertBefore(clone, track.firstChild));
  clonesAfter.forEach(clone => track.appendChild(clone));

  // Update track position to start correctly
  position = -cardWidth * visibleCount;
  track.style.transform = `translateX(${position}px)`;

  function moveRight() {
    position -= cardWidth;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(${position}px)`;

    // After transition, reset if at clones
    setTimeout(() => {
      if (position <= -cardWidth * (cards.length)) {
        position = -cardWidth * visibleCount;
        track.style.transition = 'none';
        track.style.transform = `translateX(${position}px)`;
      }
    }, 500);
  }

  function moveLeft() {
    position += cardWidth;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(${position}px)`;

    setTimeout(() => {
      if (position >= 0) {
        position = -cardWidth * (cards.length - visibleCount);
        track.style.transition = 'none';
        track.style.transform = `translateX(${position}px)`;
      }
    }, 500);
  }

  // Auto-scroll every 2 seconds
  let interval = setInterval(moveRight, 2000);

  // Pause on hover
  container.addEventListener('mouseenter', () => clearInterval(interval));
  container.addEventListener('mouseleave', () => interval = setInterval(moveRight, 2000));

  // Manual navigation
  rightArrow.addEventListener('click', moveRight);
  leftArrow.addEventListener('click', moveLeft);

  // Handle window resize
  window.addEventListener('resize', () => {
    cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap);
    visibleCount = Math.floor(container.offsetWidth / cardWidth);
    position = -cardWidth * visibleCount;
    track.style.transition = 'none';
    track.style.transform = `translateX(${position}px)`;
  });
}

// Initialize both carousels
setupCarousel('featured-carousel');
setupCarousel('other-carousel');
