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
