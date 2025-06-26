export function slideCertificate(){
    const container = document.querySelector('.certificates-container');
    const cards = document.querySelectorAll('.certificate-card');
    const totalCards = cards.length;
    const indicatorDots = document.querySelector('.indicator-dots');

    let indes = 0;

    // Generate Dots
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                indes = i;
                updateSlider();
                resetInterval();
            });
        indicatorDots.appendChild(dot);
    }

    function updateSlider() {
        container.style.transform = `translateX(-${indes * 100}%)`;
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === indes);
        });
    }

    function nextSlide() {
        indes = (indes + 1) % totalCards;
        updateSlider();
    }

    let slideInterval = setInterval(nextSlide, 3000); // Auto-slide every 3 seconds

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000);
    }
}