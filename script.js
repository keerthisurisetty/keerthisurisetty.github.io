document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile menu
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    function setupCarousel(carouselId) {
        const container = document.getElementById(carouselId);
        if (!container) return;

        const track = container.querySelector('.carousel-track');
        if (!track) return;

        const cards = Array.from(track.children);
        if (!cards.length) return;

        const leftArrow = container.querySelector('.carousel-arrow.left');
        const rightArrow = container.querySelector('.carousel-arrow.right');
        
        let position = 0;
        let cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap || '0');
        let visibleCount = Math.floor(container.offsetWidth / cardWidth);

        // Clone first and last few cards for seamless loop
        const clonesBefore = cards.slice(-visibleCount).map(card => card.cloneNode(true));
        const clonesAfter = cards.slice(0, visibleCount).map(card => card.cloneNode(true));

        clonesBefore.forEach(clone => track.insertBefore(clone, track.firstChild));
        clonesAfter.forEach(clone => track.appendChild(clone));

        // Initial position
        position = -cardWidth * visibleCount;
        track.style.transform = `translateX(${position}px)`;

        function moveRight() {
            position -= cardWidth;
            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = `translateX(${position}px)`;
            track.addEventListener('transitionend', handleRightTransition);
        }

        function handleRightTransition() {
            track.removeEventListener('transitionend', handleRightTransition);
            if (position <= -cardWidth * (cards.length + visibleCount)) {
                position = -cardWidth * visibleCount;
                track.style.transition = 'none';
                track.style.transform = `translateX(${position}px)`;
                void track.offsetWidth; // force reflow
                track.style.transition = 'transform 0.5s ease-in-out';
            }
        }

        function moveLeft() {
            position += cardWidth;
            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = `translateX(${position}px)`;
            track.addEventListener('transitionend', handleLeftTransition);
        }

        function handleLeftTransition() {
            track.removeEventListener('transitionend', handleLeftTransition);
            if (position >= 0) {
                position = -cardWidth * cards.length;
                track.style.transition = 'none';
                track.style.transform = `translateX(${position}px)`;
                void track.offsetWidth;
                track.style.transition = 'transform 0.5s ease-in-out';
            }
        }

        // Auto-scroll every 3 seconds
        let interval = setInterval(moveRight, 3000);

        // Pause on hover
        container.addEventListener('mouseenter', () => clearInterval(interval));
        container.addEventListener('mouseleave', () => interval = setInterval(moveRight, 3000));

        // Manual navigation
        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                clearInterval(interval);
                moveRight();
            });
        }
        
        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                clearInterval(interval);
                moveLeft();
            });
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap || '0');
            visibleCount = Math.floor(container.offsetWidth / cardWidth);
            position = -cardWidth * visibleCount;
            track.style.transition = 'none';
            track.style.transform = `translateX(${position}px)`;
        });
    }

    // Initialize carousels
    setupCarousel('featured-carousel');
    setupCarousel('other-carousel');
});