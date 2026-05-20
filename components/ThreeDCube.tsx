'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus, Box, Line, Points } from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useScroll } from '@react-three/drei';

function RotatingRings({ scroll }: { scroll: number }) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const speed = 1 + scroll * 3;
    if (ring1Ref.current) ring1Ref.current.rotation.x += delta * 0.5 * speed;
    if (ring1Ref.current) ring1Ref.current.rotation.y += delta * 0.3 * speed;
    if (ring2Ref.current) ring2Ref.current.rotation.y += delta * 0.8 * speed;
    if (ring2Ref.current) ring2Ref.current.rotation.z += delta * 0.4 * speed;
    if (ring3Ref.current) ring3Ref.current.rotation.x += delta * 0.6 * speed;
    if (ring3Ref.current) ring3Ref.current.rotation.z += delta * 0.7 * speed;
  });

  return (
    <group>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.6, 0.01, 16, 100]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function FloatingParticles({ scroll }: { scroll: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(150 * 3);
    for (let i = 0; i < 150 * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05 * (1 + scroll);
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={150}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#22d3ee"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function TechCube({ scroll }: { scroll: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const cubeRef = useRef<THREE.Mesh>(null);
  const innerCubeRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      
      const scale = 1 + scroll * 0.3;
      groupRef.current.scale.setScalar(scale);
    }

    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.003;
      cubeRef.current.rotation.y += 0.005;
    }

    if (innerCubeRef.current) {
      innerCubeRef.current.rotation.x -= 0.005;
      innerCubeRef.current.rotation.y -= 0.003;
    }

    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 4) * 0.15;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  const hue = (scroll * 0.15 + 0.5) % 1;
  const color = new THREE.Color().setHSL(hue, 1, 0.5);
  const color2 = new THREE.Color().setHSL((hue + 0.1) % 1, 0.8, 0.6);

  return (
    <group ref={groupRef}>
      {/* Main wireframe cube */}
      <mesh ref={cubeRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color={color} wireframe linewidth={2} />
      </mesh>

      {/* Inner cube */}
      <mesh ref={innerCubeRef}>
        <boxGeometry args={[1.6, 1.6, 1.6]} />
        <meshBasicMaterial color={color2} transparent opacity={0.15} wireframe />
      </mesh>

      {/* Core sphere */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe />
      </mesh>

      {/* Corner glows */}
      {[[1,1,1], [-1,1,1], [1,-1,1], [-1,-1,1], [1,1,-1], [-1,1,-1], [1,-1,-1], [-1,-1,-1]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const scroll = useScroll();
  const scrollRef = useRef(0);
  
  useFrame(() => {
    scrollRef.current = scroll.offset;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <TechCube scroll={scrollRef.current} />
      <RotatingRings scroll={scrollRef.current} />
      <FloatingParticles scroll={scrollRef.current} />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function ThreeDCube() {
  const [scrollY, setScrollY] = useState(0);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setScrollY(window.scrollY);
    });
  }

  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Scene />
      </Canvas>
      
      {/* Background gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, #030712 70%)',
        }}
      />
    </div>
  );
}