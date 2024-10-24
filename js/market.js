document.addEventListener("DOMContentLoaded", function () {
    // Select all the market-content boxes
    const marketBoxes = document.querySelectorAll('.market-content');

    // Create an IntersectionObserver to observe when the market section enters view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply Animate.css classes when the market section is visible
                const animation = entry.target.getAttribute('data-animation');
                entry.target.classList.add('animate__animated', animation); // Add animation class
                entry.target.classList.remove('opacity-0'); // Make the box visible
                observer.unobserve(entry.target); // Stop observing after the animation is triggered
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

    // Apply the observer to each market-content box
    marketBoxes.forEach(box => {
        observer.observe(box);
    });
});