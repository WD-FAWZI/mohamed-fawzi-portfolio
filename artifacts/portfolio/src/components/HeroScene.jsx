"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";

function WebGLScene() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Float speed={2}>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial color="#ff4d4d" distort={0.4} speed={3} />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
}

function FallbackScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #ff6b6b, #ff4d4d, #c0392b)",
          boxShadow: "0 0 80px 20px rgba(255, 77, 77, 0.3), 0 0 120px 40px rgba(255, 77, 77, 0.1)",
          animation: "pulse-glow 3s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 80px 20px rgba(255,77,77,0.3), 0 0 120px 40px rgba(255,77,77,0.1); transform: scale(1); }
          50% { box-shadow: 0 0 100px 30px rgba(255,77,77,0.5), 0 0 160px 60px rgba(255,77,77,0.2); transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}

export default function HeroScene() {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return <FallbackScene />;
  }

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5] }}
      onCreated={({ gl }) => {
        if (!gl) setWebglSupported(false);
      }}
    >
      <WebGLScene />
    </Canvas>
  );
}
