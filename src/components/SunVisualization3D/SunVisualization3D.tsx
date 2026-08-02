import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import type { SunriseData } from '../../types/sunrise.types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Sun } from 'lucide-react';

interface SunVisualization3DProps {
  data: SunriseData;
}

// Componente del Sol 3D con animación
const AnimatedSun = ({ altitude }: { altitude: number }) => {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
      sunRef.current.rotation.x += 0.001;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  // Convertir altitud a posición Y (0-90° -> -2 a 3)
  const sunY = (altitude / 90) * 5 - 2;

  return (
    <group position={[0, sunY, -5]}>
      {/* Glow exterior */}
      <Sphere ref={glowRef} args={[1.5, 32, 32]}>
        <meshBasicMaterial
          color="#ff6b00"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Sol principal */}
      <Sphere ref={sunRef} args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#ff8800"
          emissive="#ff4400"
          emissiveIntensity={2}
          roughness={0.7}
          metalness={0.3}
        />
      </Sphere>

      {/* Luz del sol */}
      <pointLight
        color="#ffaa00"
        intensity={200}
        distance={30}
        decay={2}
      />
      <pointLight
        color="#ff6600"
        intensity={50}
        distance={15}
        decay={2}
      />
    </group>
  );
};

// Componente de la Tierra
const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={earthRef} args={[2, 64, 64]} position={[0, -2, 0]}>
      <meshStandardMaterial
        color="#1e40af"
        emissive="#0c1e47"
        emissiveIntensity={0.3}
        roughness={0.8}
        metalness={0.2}
      />
    </Sphere>
  );
};

// Horizonte y atmósfera
const Atmosphere = () => {
  return (
    <>
      {/* Atmósfera */}
      <Sphere args={[2.3, 64, 64]} position={[0, -2, 0]}>
        <meshBasicMaterial
          color="#4299e1"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Horizonte */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.1, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#134e4a"
          emissive="#042f2e"
          emissiveIntensity={0.2}
          roughness={0.9}
        />
      </mesh>
    </>
  );
};

// Escena completa
const Scene = ({ data }: { data: SunriseData }) => {
  return (
    <>
      <color attach="background" args={['#0a0e1a']} />
      <fog attach="fog" args={['#0a0e1a', 5, 30]} />
      
      {/* Estrellas de fondo */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Luz ambiental suave */}
      <ambientLight intensity={0.1} />
      
      {/* Sol animado */}
      <AnimatedSun altitude={data.sun_altitude} />
      
      {/* Tierra y atmósfera */}
      <Earth />
      <Atmosphere />

      {/* Controles de cámara */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={5}
        maxDistance={20}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
};

export const SunVisualization3D = ({ data }: SunVisualization3DProps) => {
  return (
    <Card className="w-full shadow-2xl bg-gray-900/50 backdrop-blur-sm border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3 text-white">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <Sun className="w-6 h-6 text-orange-500" />
          </div>
          Visualización 3D del Sol
        </CardTitle>
        <div className="text-sm text-gray-400">
          Altitud solar: {data.sun_altitude.toFixed(1)}° | Azimut: {data.sun_azimuth.toFixed(1)}°
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[500px] rounded-lg overflow-hidden bg-gradient-to-b from-gray-950 to-black border border-gray-800">
          <Canvas
            camera={{ position: [0, 2, 10], fov: 60 }}
            gl={{ antialias: true, alpha: false }}
          >
            <Scene data={data} />
          </Canvas>
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center">
          💡 Usa el mouse para rotar la vista • Scroll para zoom
        </div>
      </CardContent>
    </Card>
  );
};
