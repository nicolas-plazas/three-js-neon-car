import { useEffect } from 'react';
import { MeshReflectorMaterial } from '@react-three/drei';
import { useLoader, useFrame } from '@react-three/fiber';
import { LinearEncoding, RepeatWrapping, TextureLoader } from 'three';

export default function Ground() {
	const [roughness, normal] = useLoader(TextureLoader, [
		'/textures/terrain-roughness.jpg',
		'/textures/terrain-normal.jpg',
	]);

	useEffect(() => {
		[roughness, normal].forEach((texture) => {
			texture.wrapS = RepeatWrapping;
			texture.wrapT = RepeatWrapping;
			texture.repeat.set(5, 5);
			texture.offset.set(0, 0);
		});

		// es necesario para que el suelo se vea correctamente
		normal.encoding = LinearEncoding;
	}, [roughness, normal]);

	// Se encarga de animar el suelo para que parezca que se mueve
	useFrame((state, _delta) => {
		let t = -state.clock.getElapsedTime() * 0.128;
		roughness.offset.set(0, t % 1);
		normal.offset.set(0, t % 1);
	});

	return (
		<mesh
			rotation-x={-Math.PI * 0.5}
			castShadow
			receiveShadow
		>
			{/*
                args: [width, height]
            */}
			<planeGeometry args={[30, 30]} />
			<MeshReflectorMaterial
				envMapIntensity={0}
				normalMap={normal}
				normalScale={[0.15, 0.15]}
				roughnessMap={roughness}
				dithering={true}
				color={[0.015, 0.015, 0.015]}
				roughness={0.7}
				blur={[1000, 400]}
				mixBlur={30}
				mixStrength={80}
				mixContrast={1}
				resolution={1024}
				mirror={0}
				depthScale={0.01}
				minDepthThreshold={0.9}
				maxDepthThreshold={1}
				depthToBlurRatioBias={0.25}
				debug={0}
				reflectorOffset={0.2}
			/>
		</mesh>
	);
}
