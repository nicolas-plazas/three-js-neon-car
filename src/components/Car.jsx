import { useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh } from 'three';

const Car = () => {
	const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/car/corvette/scene.gltf');

	useEffect(() => {
        // Tamaño del coche [x, y, z]
		gltf.scene.scale.set(0.005, 0.005, 0.005);
        // Posición del coche [x, y, z]
		gltf.scene.position.set(0, -0.035, 0);
		gltf.scene.traverse((object) => {
			if (object instanceof Mesh) {
                // Sombra del coche
				object.castShadow = true;
				object.receiveShadow = true;
                // envMapIntensity es la intensidad de la luz que refleja el coche
				object.material.envMapIntensity = 20;
			}
		});
	}, [gltf]);

	useFrame((state, _delta) => {
		let t = state.clock.getElapsedTime();
		let group = gltf.scene.children[0].children[0].children[0];
		group.children[0].rotation.x = t * 2;
		group.children[2].rotation.x = t * 2;
		group.children[4].rotation.x = t * 2;
		group.children[6].rotation.x = t * 2;
	});

	return <primitive object={gltf.scene} />;
};

export default Car;
