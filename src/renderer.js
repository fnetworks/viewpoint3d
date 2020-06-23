import * as THREE from 'three';

import { createCoordinateSystem, createPoint } from './geom';
import { registerInputHandlers } from './input';

const graphContainer = document.getElementById("graphContainer");
const heightCorr = 4;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, graphContainer.scrollWidth / (graphContainer.scrollHeight - heightCorr), 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(graphContainer.scrollWidth, graphContainer.scrollHeight - heightCorr);
renderer.setClearColor(0xffffff, 1);
graphContainer.appendChild(renderer.domElement);

const cs = createCoordinateSystem(20);
scene.add(cs);

const pt1 = createPoint();
pt1.position.x = 10;
pt1.position.y = 10;
pt1.position.z = 10;
scene.add(pt1);

camera.position.z = 50;

registerInputHandlers(renderer.domElement, {
	camera,
	scene,
	sensitivity: 0.01,
});

function updateSize() {
	graphContainer.removeChild(renderer.domElement);
	renderer.setSize(graphContainer.scrollWidth, graphContainer.scrollHeight - heightCorr);
	camera.aspect = graphContainer.scrollWidth / (graphContainer.scrollHeight - heightCorr);
	camera.updateProjectionMatrix();
	graphContainer.appendChild(renderer.domElement);
}
window.addEventListener("resize", updateSize);

function animate() {
	requestAnimationFrame(animate);
	
	renderer.render(scene, camera);
}
animate();
