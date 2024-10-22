document.addEventListener("DOMContentLoaded", function () {
    // Target the roadmap section
    const roadmapSection = document.querySelector('#roadmap-section');

    // Target the specific elements inside the roadmap section to animate
    const roadmapContent = roadmapSection.querySelectorAll('[data-animation]'); // Select elements with data-animation attribute

    // Create an IntersectionObserver to observe when the roadmap section enters view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply Animate.css classes when the roadmap section is visible
                roadmapContent.forEach(content => {
                    const animationClass = content.getAttribute('data-animation');
                    content.classList.add('animate__animated', animationClass); // Add animation classes
                    content.classList.remove('opacity-0'); // Ensure content is visible
                });
                observer.unobserve(entry.target); // Stop observing after animation is triggered
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    observer.observe(roadmapSection); // Start observing the roadmap section
});



