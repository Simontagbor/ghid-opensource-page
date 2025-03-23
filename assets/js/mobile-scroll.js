document.addEventListener('DOMContentLoaded', function() {
    const tileContent = document.querySelector('.tile-content');
    let hasScrolled = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasScrolled) {
                tileContent.style.transform = 'translateX(-20px)';
                hasScrolled = true;
            } else if (!entry.isIntersecting && hasScrolled) {
                tileContent.style.transform = 'translateX(0)';
                hasScrolled = false;
            }
        });
    }, { threshold: 0.1 });

    observer.observe(tileContent);
});