document.querySelectorAll('.faq-item button').forEach(button => {
    button.addEventListener('click', () => {
        const faqContent = document.querySelector(button.getAttribute('data-target'));
        const svgIcon = button.querySelector('svg');

        // Toggle FAQ content visibility and height
        if (faqContent.classList.contains('max-h-0')) {
            faqContent.classList.remove('max-h-0');
            faqContent.style.maxHeight = faqContent.scrollHeight + 'px'; // Set to its natural height
        } else {
            faqContent.style.maxHeight = '0';
            faqContent.classList.add('max-h-0');
        }

        // Rotate the arrow icon for opened state
        svgIcon.classList.toggle('transform');
        svgIcon.classList.toggle('rotate-180');
    });
});
