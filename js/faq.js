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

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

function initFAQParticles() {
    // Create the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create the renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('faq-canvas-container').appendChild(renderer.domElement);

    // Particle setup
    const particlesCount = 500;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0x2f78ba,
        size: 0.1,
        transparent: true,
        opacity: 0.6
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Slowly rotate the particles for a floating effect
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resizing
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
}

// Initialize Three.js animation when the DOM is ready
document.addEventListener('DOMContentLoaded', initFAQParticles);



