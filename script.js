document.addEventListener('DOMContentLoaded', function() {// Toggle mobile menu

    const carousels = document.querySelectorAll('.project-carousel');const menuToggle = document.getElementById('menu-toggle');

    const navLinks = document.getElementById('nav-links');

    carousels.forEach(carousel => {

        const track = carousel.querySelector('.carousel-track');menuToggle.addEventListener('click', () => {

        const prevBtn = carousel.querySelector('.prev-btn');  navLinks.classList.toggle('show');

        const nextBtn = carousel.querySelector('.next-btn');});

        let scrollAmount = 0;

        const cardWidth = 300 + 24; // card width + gapfunction setupCarousel(carouselId) {

  const container = document.getElementById(carouselId);

        // Clone first set of cards and append to end for seamless loop  const track = container.querySelector('.carousel-track');

        const cards = track.querySelectorAll('.project-card');  const cards = Array.from(track.children);

        cards.forEach(card => {  const leftArrow = container.querySelector('.carousel-arrow.left');

            const clone = card.cloneNode(true);  const rightArrow = container.querySelector('.carousel-arrow.right');

            track.appendChild(clone);

        });  let position = 0;

  let cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap);

        prevBtn.addEventListener('click', () => {  let visibleCount = Math.floor(container.offsetWidth / cardWidth);

            scrollAmount = Math.max(scrollAmount - cardWidth, 0);

            track.style.transform = `translateX(-${scrollAmount}px)`;  // Clone first and last few cards for seamless loop

            track.style.transition = 'transform 0.5s ease';  const clonesBefore = cards.slice(-visibleCount).map(card => card.cloneNode(true));

              const clonesAfter = cards.slice(0, visibleCount).map(card => card.cloneNode(true));

            // Reset to end if at start

            if (scrollAmount === 0) {  clonesBefore.forEach(clone => track.insertBefore(clone, track.firstChild));

                setTimeout(() => {  clonesAfter.forEach(clone => track.appendChild(clone));

                    track.style.transition = 'none';

                    scrollAmount = cardWidth * (cards.length);  // Update track position to start correctly

                    track.style.transform = `translateX(-${scrollAmount}px)`;  position = -cardWidth * visibleCount;

                    requestAnimationFrame(() => {  track.style.transform = `translateX(${position}px)`;

                        track.style.transition = 'transform 0.5s ease';

                    });  function moveRight() {

                }, 500);    position -= cardWidth;

            }    track.style.transition = 'transform 0.5s ease-in-out';

        });    track.style.transform = `translateX(${position}px)`;



        nextBtn.addEventListener('click', () => {    // After transition, reset if at clones for seamless effect

            scrollAmount = Math.min(scrollAmount + cardWidth, cardWidth * cards.length * 2);    track.addEventListener('transitionend', handleRightTransition);

            track.style.transform = `translateX(-${scrollAmount}px)`;  }

            track.style.transition = 'transform 0.5s ease';

              function handleRightTransition() {

            // Reset to start if at end    track.removeEventListener('transitionend', handleRightTransition);

            if (scrollAmount >= cardWidth * cards.length * 2) {    if (position <= -cardWidth * (cards.length)) {

                setTimeout(() => {      position = -cardWidth * visibleCount;

                    track.style.transition = 'none';      track.style.transition = 'none';

                    scrollAmount = cardWidth * cards.length;      track.style.transform = `translateX(${position}px)`;

                    track.style.transform = `translateX(-${scrollAmount}px)`;      // Force reflow to allow next transition

                    requestAnimationFrame(() => {      void track.offsetWidth;

                        track.style.transition = 'transform 0.5s ease';      track.style.transition = 'transform 0.5s ease-in-out';

                    });    }

                }, 500);  }

            }

        });  function moveLeft() {

    position += cardWidth;

        // Handle the infinite scroll animation    track.style.transition = 'transform 0.5s ease-in-out';

        track.addEventListener('animationend', () => {    track.style.transform = `translateX(${position}px)`;

            track.style.animation = 'none';

            track.offsetHeight; // Trigger reflow    track.addEventListener('transitionend', handleLeftTransition);

            track.style.animation = 'carousel 20s linear infinite';  }

        });

    });  function handleLeftTransition() {

});    track.removeEventListener('transitionend', handleLeftTransition);
    if (position >= 0) {
      position = -cardWidth * (cards.length - visibleCount);
      track.style.transition = 'none';
      track.style.transform = `translateX(${position}px)`;
      void track.offsetWidth;
      track.style.transition = 'transform 0.5s ease-in-out';
    }
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
