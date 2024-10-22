document.addEventListener("DOMContentLoaded", function () {
    const problemBoxes = document.querySelectorAll('.problem-box');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.getAttribute('data-animation');
                entry.target.classList.add('animate__animated', animation); // Add Animate.css animation
                entry.target.classList.remove('opacity-0'); // Make the box visible
                observer.unobserve(entry.target); // Only trigger the animation once
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    problemBoxes.forEach(box => {
        observer.observe(box);
    });
});

