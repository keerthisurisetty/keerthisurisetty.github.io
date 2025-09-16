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

        // Ensure gap is at least 16px if not specified
        const gap = parseInt(getComputedStyle(track).gap || '16');
        track.style.gap = gap + 'px';

        // Clone all cards for seamless infinite scroll
        const clonesBefore = cards.slice(-cards.length).map(card => card.cloneNode(true));
        const clonesAfter = cards.slice(0, cards.length).map(card => card.cloneNode(true));

        // Add clones to the track
        clonesBefore.forEach(clone => track.insertBefore(clone, track.firstChild));
        clonesAfter.forEach(clone => track.appendChild(clone));

        // Initial position (start at the first set of original cards)
        position = -cardWidth * cards.length;
        track.style.transform = `translateX(${position}px)`;
        track.style.transition = 'none';
        requestAnimationFrame(() => {
            track.style.transition = 'none';
        });

        // Seamless continuous auto-scroll
        let lastTimestamp = null;
        let autoScrollSpeed = 0.5; // px per frame (adjust for speed)
        let isPaused = false;

        function seamlessScroll(timestamp) {
            if (isPaused) return;
            if (!lastTimestamp) lastTimestamp = timestamp;
            position -= autoScrollSpeed;
            track.style.transform = `translateX(${position}px)`;
            // Loop seamlessly
            if (position <= -cardWidth * (cards.length * 2)) {
                position = -cardWidth * cards.length;
                track.style.transform = `translateX(${position}px)`;
            }
            requestAnimationFrame(seamlessScroll);
        }
        requestAnimationFrame(seamlessScroll);

        // Pause on hover
        container.addEventListener('mouseenter', () => { isPaused = true; });
        container.addEventListener('mouseleave', () => {
            isPaused = false;
            requestAnimationFrame(seamlessScroll);
        });

        function moveRight() {
            position -= cardWidth;
            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = `translateX(${position}px)`;
            track.addEventListener('transitionend', handleRightTransition);
        }

        function handleRightTransition() {
            track.removeEventListener('transitionend', handleRightTransition);
            if (position <= -cardWidth * (cards.length * 2)) {
                position = -cardWidth * cards.length;
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
            rightArrow.addEventListener('click', (e) => {
                e.preventDefault();
                isPaused = true;
                moveRight();
                setTimeout(() => {
                    isPaused = false;
                    requestAnimationFrame(seamlessScroll);
                }, 600);
            });
        }
        if (leftArrow) {
            leftArrow.addEventListener('click', (e) => {
                e.preventDefault();
                isPaused = true;
                moveLeft();
                setTimeout(() => {
                    isPaused = false;
                    requestAnimationFrame(seamlessScroll);
                }, 600);
            });
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap || '0');
            visibleCount = Math.floor(container.offsetWidth / cardWidth);
            position = -cardWidth * cards.length;
            track.style.transition = 'none';
            track.style.transform = `translateX(${position}px)`;
        });
    }

    // Initialize carousels
    setupCarousel('featured-carousel');
    setupCarousel('other-carousel');
});