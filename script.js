document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .groom-name, .bride-name');
    fadeElements.forEach(el => observer.observe(el));

    // Floating Hearts/Flowers Animation
    createFloatingElements();

    // Audio Control
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');

    musicBtn.style.display = 'flex'; // Show button once JS loaded

    // Try Auto-play
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Autoplay prevented. User interaction needed.");
            musicBtn.classList.add('paused');
        });
    }

    musicBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            musicBtn.classList.remove('paused');
            musicBtn.style.animation = 'rotateBtn 3s infinite linear';
        } else {
            audio.pause();
            musicBtn.classList.add('paused');
            musicBtn.style.animation = 'none';
        }
    });
});

function createFloatingElements() {
    const container = document.getElementById('particles');
    const symbols = ['🌸', '✨', '💖', '🕊️']; // Flower, Sparkle, Heart, Dove

    // Create elements periodically
    setInterval(() => {
        const span = document.createElement('span');
        span.classList.add('floating-item');
        span.innerText = symbols[Math.floor(Math.random() * symbols.length)];

        // Random Position
        span.style.left = Math.random() * 100 + 'vw';

        // Random Size
        const size = Math.random() * 20 + 10; // 10px to 30px
        span.style.fontSize = size + 'px';

        // Random Animation Duration
        const duration = Math.random() * 3 + 4; // 4s to 7s
        span.style.animationDuration = duration + 's';

        container.appendChild(span);

        // Remove after animation to prevent DOM clutter
        setTimeout(() => {
            span.remove();
        }, duration * 1000);
    }, 800);
}
