document.addEventListener("DOMContentLoaded", function () {
    // Target the market section
    const marketSection = document.querySelector('#market-breakdown');

    // Target the specific elements inside the market section to animate
    const marketContent = marketSection.querySelectorAll('.market-content'); // Select elements to animate

    // Create an IntersectionObserver to observe when the market section enters view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply Animate.css classes when the market section is visible
                marketContent.forEach((content, index) => {
                    const animationClass = content.getAttribute('data-animation');
                    content.classList.add('animate__animated', animationClass); // Add animation classes
                    content.classList.remove('opacity-0'); // Ensure content is visible
                });
                observer.unobserve(entry.target); // Stop observing after animation is triggered
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

    observer.observe(marketSection); // Start observing the market section
});


