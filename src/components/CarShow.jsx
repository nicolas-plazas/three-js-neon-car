import {
	OrbitControls,
	PerspectiveCamera,
	CubeCamera,
	Environment,
} from '@react-three/drei';
import {
	EffectComposer,
	Bloom,
	ChromaticAberration,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

import Car from './Car';
import FloatingGrid from './FloatingGrid';
import Ground from './Ground';
import Boxes from './Boxes';
import Rings from './Rings';

const CarShow = () => {
	return (
		<>
			{/*
                OrbitControls: Controla la camara.
                target: Es el punto al que mira la camara cuando se carga la pagina [x, y, z].
                maxPolarAngle: Es el angulo maximo que puede girar la camara.
            */}
			<OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
			{/*
                PerspectiveCamera: Es la camara que se va a utilizar.
                makeDefault: Hace que esta camara sea la camara por defecto.
                fov: Es el angulo de vision de la camara.
            */}
			<PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

			<color args={[0, 0, 0]} attach='background' />

			<CubeCamera resolution={256} frames={Infinity}>
				{(texture) => (
					<>
						<Environment map={texture} />
						<Car />
					</>
				)}
			</CubeCamera>

			{/*
                spotLight: Es una luz que se proyecta en una direccion concreta.
                let spotLight = new SpotLight();
                spotLight.intensity = 1.5;
                spotLight.position.set(0, 10, 0);
            */}
			<spotLight
				color={[1, 0.25, 0.7]}
				intensity={1.5}
				angle={0.6}
				penumbra={0.5}
				position={[5, 5, 0]}
				castShadow
				shadow-bias={-0.0001}
			/>

			<spotLight
				color={[0.14, 0.5, 1]}
				intensity={2}
				angle={0.6}
				penumbra={0.5}
				position={[-5, 5, 0]}
				castShadow
				shadow-bias={-0.0001}
			/>

			<Ground />
			<FloatingGrid />
			<Boxes />
			<Rings />

			<EffectComposer>
				<Bloom
					blendFunction={BlendFunction.ADD}
					intensity={1.3} // The bloom intensity.
					width={300} // render width
					height={300} // render height
					kernelSize={5} // blur kernel size
					luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
					luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
				/>
				<ChromaticAberration
					blendFunction={BlendFunction.NORMAL} // blend mode
					offset={[0.0005, 0.0012]} // color offset
				/>
			</EffectComposer>
		</>
	);
};

export default CarShow;
