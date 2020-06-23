export function registerInputHandlers(element, data) {
	let mousePressed = false;

	const register = (name, fn) => element.addEventListener(name, fn, false);
	register('mousedown', e => {
		if (e.button === 0)
			mousePressed = true;
	});
	register('mouseup', e => {
		if (e.button === 0)
			mousePressed = false;
	});
	register('mousemove', e => {
		if (mousePressed) {
			data.scene.rotation.y += e.movementX * data.sensitivity;
			data.scene.rotation.x += e.movementY * data.sensitivity;
		}
	});
	register('wheel', e => {
		data.camera.position.z += e.deltaY;
	});
}
