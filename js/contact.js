import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.18.0/dist/cannon-es.js';

function initPhysicsAnimation() {
    // Create the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create the renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('contact-canvas-container').appendChild(renderer.domElement);

    // Create a basic floor (invisible plane for physics)
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xffc39a, side: THREE.DoubleSide, visible: false });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    // Create physics world using Cannon.js
    const world = new CANNON.World();
    world.gravity.set(0, -2, 0); // Reduced gravity for slower fall

    // Create a floor in the physics world
    const floorBody = new CANNON.Body({
        mass: 0, // Infinite mass (static)
        shape: new CANNON.Plane(),
    });
    floorBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // Rotate to be horizontal
    world.addBody(floorBody);

    // Array to hold physics and visual bodies
    const objects = [];

    // Function to create spheres that fall
    function createFallingSphere() {
        const radius = 0.3;

        // Three.js visual sphere
        const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x2f78ba });
        const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphereMesh);

        // Cannon.js physical sphere
        const sphereBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3((Math.random() - 0.5) * 5, 5, 0), // Random X position, Y start high
            shape: new CANNON.Sphere(radius),
        });
        world.addBody(sphereBody);

        // Add both bodies to the array for tracking
        objects.push({ mesh: sphereMesh, body: sphereBody });
    }

    // Create multiple spheres with a longer delay
    for (let i = 0; i < 10; i++) {
        setTimeout(createFallingSphere, i * 1000); // Now creating a sphere every 1000ms (1 second)
    }

    // Physics and rendering loop
    function animate() {
        requestAnimationFrame(animate);

        // Update the physics world
        world.step(1 / 60);

        // Update the Three.js objects based on Cannon.js physics
        objects.forEach(obj => {
            obj.mesh.position.copy(obj.body.position);
            obj.mesh.quaternion.copy(obj.body.quaternion);
        });

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

// Initialize the animation when the DOM is ready
document.addEventListener('DOMContentLoaded', initPhysicsAnimation);

