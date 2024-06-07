import * as THREE from 'three';
import { createColoredMengerSponge, createMengerSponge } from './modules';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

createColoredMengerSponge(2, 3, scene);

// Create a directional light
const directionalLight = new THREE.PointLight(0xffffff, 0.5);
directionalLight.position.set(5, 4, 1); // set the light's position
scene.add(directionalLight);

// Position camera and create controls
camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement);

// Create raycaster and mouse for intersection detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Create tooltip
const tooltip = document.createElement('div');
tooltip.style.position = 'absolute';
tooltip.style.visibility = 'hidden';
tooltip.style.background = 'white';
document.body.appendChild(tooltip);

// Add event listeners
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mouseout', onMouseOut, false);

function onMouseMove(event) {
  // Calculate mouse position
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    tooltip.style.visibility = 'visible';
    tooltip.style.left = event.clientX + 'px';
    tooltip.style.top = event.clientY + 'px';
    tooltip.textContent = `x: ${intersects[0].point.x}, y: ${intersects[0].point.y}, z: ${intersects[0].point.z}`;
  } else {
    tooltip.style.visibility = 'hidden';
  }
}

function onMouseOut() {
  tooltip.style.visibility = 'hidden';
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();