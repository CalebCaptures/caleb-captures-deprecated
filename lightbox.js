/* Shared photo-grid lightbox for the portraits, events, and commercial pages */
(function () {
    const grid = document.querySelector('.photo-grid');
    const lightbox = document.getElementById('lightbox');
    if (!grid || !lightbox) return;

    const images = Array.from(grid.querySelectorAll('img'));
    if (images.length === 0) return;

    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const chevronBackward = document.getElementById('chevron-backward');
    const chevronForward = document.getElementById('chevron-forward');
    const closeButton = lightbox.querySelector('.lightbox-close');

    let currentIndex = -1;

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;
        const img = images[currentIndex];
        lightboxImage.src = img.currentSrc || img.src;
        lightboxImage.alt = img.alt;
        lightboxCounter.textContent = `${currentIndex + 1}/${images.length}`;
    }

    function openLightbox(index) {
        showImage(index);
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    images.forEach((img, i) => {
        img.addEventListener('click', () => openLightbox(i));
    });

    if (closeButton) {
        closeButton.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    if (chevronBackward) {
        chevronBackward.addEventListener('click', () => showImage(currentIndex - 1));
    }
    if (chevronForward) {
        chevronForward.addEventListener('click', () => showImage(currentIndex + 1));
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
})();
