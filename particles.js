document.addEventListener("DOMContentLoaded", function () {
    const particlesContainer = document.getElementById('particles-js');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    particlesContainer.appendChild(canvas);

    let particles = [];
    const particleCount = 100; // Number of particles
    const particleColor = "#ffffff"; // Color of the particles (white)
    const particleSize = 3; // Size of each particle
    const particleSpeed = 0.5; // Speed of particle movement

    // Set canvas size
    canvas.width = particlesContainer.offsetWidth;
    canvas.height = particlesContainer.offsetHeight;

    // Particle constructor
    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * particleSpeed;
        this.vy = (Math.random() - 0.5) * particleSpeed;
        this.size = Math.random() * particleSize + 1;
    }

    // Create particles
    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Update particle positions
    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce particles off the edges
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();
        });
    }

    // Resize canvas when window is resized
    window.addEventListener('resize', () => {
        canvas.width = particlesContainer.offsetWidth;
        canvas.height = particlesContainer.offsetHeight;
        particles = [];
        createParticles();
    });

    // Animation loop
    function animateParticles() {
        updateParticles();
        requestAnimationFrame(animateParticles);
    }

    createParticles();
    animateParticles();
});
