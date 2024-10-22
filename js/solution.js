import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

let scene, camera, renderer, particleSystem;

function init() {
    const container = document.getElementById('air-effect-container');

    // Create scene
    scene = new THREE.Scene();
    
    // Set up camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Set up renderer
    renderer = new THREE.WebGLRenderer({ alpha: true }); // Set alpha to true for transparency
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create particles
    const particleCount = 500;
    const particles = new THREE.BufferGeometry();
    const positions = [];
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
        positions.push(Math.random() * 20 - 10, Math.random() * 5 - 2.5, Math.random() * 5 - 2.5); // Spread particles in 3D space
        velocities.push(Math.random() * 0.02 - 0.01, 0, 0); // Horizontal movement
    }

    particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particles.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0xfb9250,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
    });

    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Start animation loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    const positions = particleSystem.geometry.attributes.position.array;
    const velocities = particleSystem.geometry.attributes.velocity.array;

    for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i]; // Move particles horizontally

        // Reset particles when they move out of view
        if (positions[i] > 10) {
            positions[i] = -10;
        }
    }

    particleSystem.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Initialize the scene
init();

document.addEventListener("DOMContentLoaded", function () {
    // Select all the market-content boxes
    const marketBoxes = document.querySelectorAll('.solution-content');

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

document.addEventListener("DOMContentLoaded", function () {
    // Select all the market-content boxes
    const marketBoxes = document.querySelectorAll('.solution-content');

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
