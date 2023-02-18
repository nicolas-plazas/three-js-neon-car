import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

const Box = ({ color }) => {
	const box = useRef();
	const time = useRef(0);
	const [position, setPosition] = useState(getInitialPosition());
	const [xRotSpeed] = useState(() => Math.random());
	const [yRotSpeed] = useState(() => Math.random());
	const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);

	function getInitialPosition() {
		let v = new Vector3(
			(Math.random() * 2 - 1) * 3,
			Math.random() * 2.5 + 0.1,
			(Math.random() * 2 - 1) * 15,
		);
		if (v.x < 0) v.x -= 1.75;
		if (v.x > 0) v.x += 1.75;

		return v;
	}

	function resetPosition() {
		let v = new Vector3(
			(Math.random() * 2 - 1) * 3,
			Math.random() * 2.5 + 0.1,
			Math.random() * 10 + 10,
		);
		if (v.x < 0) v.x -= 1.75;
		if (v.x > 0) v.x += 1.75;

		setPosition(v);
	}

	useFrame(
		(_state, delta) => {
            // Aumentamos el tiempo.
			time.current += delta * 1.2;
            // Calculamos la nueva posicion.
			let newZ = position.z - time.current;

            // Si la caja se sale de la pantalla, la reseteamos.
			if (newZ < -10) {
				resetPosition();
				time.current = 0;
			}

            // Actualizamos la posicion de la caja.
			box.current.position.set(position.x, position.y, newZ);
            // Actualizamos la rotacion de la caja.
			box.current.rotation.x += delta * xRotSpeed;
            // Actualizamos la rotacion de la caja.
			box.current.rotation.y += delta * yRotSpeed;
		},
		[xRotSpeed, yRotSpeed, position],
	);

	return (
		<mesh ref={box} rotation-x={Math.PI * 0.5} scale={scale} castShadow>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={color} envMapIntensity={0.15} />
		</mesh>
	);
};

const Boxes = () => {
	const [arrayOfBoxes] = useState(() => {
		let boxArray = [];
		for (let i = 0; i < 100; i++) boxArray.push(0);
		return boxArray;
	});

	return (
		<>
			{arrayOfBoxes.map((_item, i) => (
				<Box
					key={i}
					color={i % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]}
				/>
			))}
		</>
	);
};

export default Boxes;
