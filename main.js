document.addEventListener('DOMContentLoaded', () => {
    // Configuración de ScrollReveal
    const sr = ScrollReveal({
        distance: '50px',
        duration: 1500,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: true
    });

    sr.reveal('.reveal', {
        origin: 'bottom',
        interval: 100
    });
});
