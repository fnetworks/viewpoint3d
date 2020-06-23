import {
	LineBasicMaterial, MeshBasicMaterial,
	Line, Mesh,
	Geometry, SphereGeometry,
	Vector3, Group,
} from 'three';

export function createCoordinateSystem(size) {
	const material = new LineBasicMaterial({ color: 0x000000 });

	const coordinateSystem = new Group();

	const xGeom = new Geometry();
	xGeom.vertices.push(new Vector3(-size / 2, 0, 0));
	xGeom.vertices.push(new Vector3(size / 2, 0, 0));
	const x = new Line(xGeom, material);
	coordinateSystem.add(x);

	const yGeom = new Geometry();
	yGeom.vertices.push(new Vector3(0, -size / 2, 0));
	yGeom.vertices.push(new Vector3(0, size / 2, 0));
	const y = new Line(yGeom, material);
	coordinateSystem.add(y);

	const zGeom = new Geometry();
	zGeom.vertices.push(new Vector3(0, 0, -size / 2));
	zGeom.vertices.push(new Vector3(0, 0, size / 2));
	const z = new Line(zGeom, material);
	coordinateSystem.add(z);

	return coordinateSystem;
}

export function createPoint() {
	const geometry = new SphereGeometry(0.5, 16, 16);
	const material = new MeshBasicMaterial({color: 0x00A0FF});
	const sphere = new Mesh(geometry, material);
	return sphere;
}
