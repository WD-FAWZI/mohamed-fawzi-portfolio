"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

function Orb({ isDesktop }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <group position={[isDesktop ? 2.5 : 0, 0, 0]}>
      <mesh
        ref={ref}
        scale={isDesktop ? [1.2, 1.2, 1.2] : [1, 1, 1]}
      >
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial
          wireframe
          color="#00ffcc"
          emissive="#00ffcc"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}

function WebGLScene({ isDesktop }) {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffcc" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0088ff" />
      <Orb isDesktop={isDesktop} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.8}
      />
    </>
  );
}

function FallbackScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #00ffe0, #00ffcc44, transparent 70%)",
          boxShadow:
            "0 0 60px 10px rgba(0,255,204,0.25), 0 0 120px 30px rgba(0,255,204,0.1), inset 0 0 60px rgba(0,255,204,0.05)",
          border: "1px solid rgba(0,255,204,0.3)",
          animation: "cyber-pulse 3s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes cyber-pulse {
          0%, 100% {
            box-shadow: 0 0 60px 10px rgba(0,255,204,0.25), 0 0 120px 30px rgba(0,255,204,0.1);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 90px 20px rgba(0,255,204,0.45), 0 0 180px 50px rgba(0,255,204,0.2);
            transform: scale(1.06);
          }
        }
      `}</style>
    </div>
  );
}

export default function HeroScene() {
  const [webglSupported, setWebglSupported] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!webglSupported) {
    return <FallbackScene />;
  }

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6] }}
      onCreated={({ gl }) => {
        if (!gl) setWebglSupported(false);
      }}
    >
      <WebGLScene isDesktop={isDesktop} />
    </Canvas>
  );
}
