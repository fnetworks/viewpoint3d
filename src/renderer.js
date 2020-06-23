import THREE from 'three.js';

const graphContainer = document.getElementById("graphContainer");
const heightCorr = 4;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, graphContainer.scrollWidth / (graphContainer.scrollHeight - heightCorr), 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(graphContainer.scrollWidth, graphContainer.scrollHeight - heightCorr);
renderer.setClearColor(0xffffff, 1);
graphContainer.appendChild(renderer.domElement);

function createCoordinateSystem(size) {
	const material = new THREE.LineBasicMaterial({ color: 0x000000 });

	const coordinateSystem = new THREE.Group();

	const xGeometry = new THREE.Geometry();
	xGeometry.vertices.push(new THREE.Vector3(-size/2, 0, 0));
	xGeometry.vertices.push(new THREE.Vector3(size/2, 0, 0));
	const x = new THREE.Line(xGeometry, material);
	coordinateSystem.add(x);

	const yGeometry = new THREE.Geometry();
	yGeometry.vertices.push(new THREE.Vector3(0, -size/2, 0));
	yGeometry.vertices.push(new THREE.Vector3(0, size/2, 0));
	const y = new THREE.Line(yGeometry, material);
	coordinateSystem.add(y);

	const zGeometry = new THREE.Geometry();
	zGeometry.vertices.push(new THREE.Vector3(0, 0, -size/2));
	zGeometry.vertices.push(new THREE.Vector3(0, 0, size/2));
	const z = new THREE.Line(zGeometry, material);
	coordinateSystem.add(z);

	return coordinateSystem;
}

function createPoint() {
	const geometry = new THREE.SphereGeometry(0.5, 16, 16);
	const material = new THREE.MeshBasicMaterial({color: 0x00a0ff});
	const sphere = new THREE.Mesh(geometry, material);
	return sphere;
}

const cs = createCoordinateSystem(20);
scene.add(cs);

const pt1 = createPoint();
pt1.position.x = 10;
pt1.position.y = 10;
pt1.position.z = 10;
scene.add(pt1);

camera.position.z = 50;

let mousePressed = false;

function mouseDown(e) {
	if (e.button === 0) {
		mousePressed = true;
	}
}
renderer.domElement.addEventListener("mousedown", mouseDown, false);

function mouseUp(e) {
	if (e.button === 0) {
		mousePressed = false;
	}
}
renderer.domElement.addEventListener("mouseup", mouseUp, false);

const sensitivity = 0.01;
function mouseMoved(e) {
	if (mousePressed) {
		scene.rotation.y += e.movementX * sensitivity;
		scene.rotation.x += e.movementY * sensitivity;
	}
}
renderer.domElement.addEventListener("mousemove", mouseMoved, false);

function wheel(e) {
	camera.position.z += e.deltaY;
}
renderer.domElement.addEventListener("wheel", wheel, false);

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
