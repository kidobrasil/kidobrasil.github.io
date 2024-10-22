import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);  // Set the background color to white
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Particle setup with multiple colors
const particlesCount = 250; // Reduced particle count for mobile performance
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

const colorOptions = [new THREE.Color("#ffc39a"), new THREE.Color("#5ab993"), new THREE.Color("#fb9250"), new THREE.Color("#2f78ba"), new THREE.Color("#333333")];

for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

    const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particleTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.15,
    map: particleTexture,
    vertexColors: true,
    transparent: true,
    alphaTest: 0.4,
    opacity: 0.4,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.002;
    renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});




