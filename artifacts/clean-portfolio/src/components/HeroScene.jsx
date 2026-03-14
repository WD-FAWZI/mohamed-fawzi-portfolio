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
    <group position={[isDesktop ? 3.8 : 0, 0, 0]}>
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

const START = [15, 10, -10];
const END = [-15, -10, -10];
const TOTAL_DIST = Math.sqrt(
  (END[0] - START[0]) ** 2 + (END[1] - START[1]) ** 2 + (END[2] - START[2]) ** 2
);

function ShootingStar() {
  const ref = useRef();
  const s = useRef({ active: false, progress: 0, timer: 0 });

  useFrame((_, delta) => {
    if (!ref.current) return;
    s.current.timer += delta;

    if (!s.current.active && s.current.timer >= 8) {
      s.current.active = true;
      s.current.progress = 0;
      s.current.timer = 0;
    }

    if (s.current.active) {
      s.current.progress += delta * 40;
      const t = Math.min(s.current.progress / TOTAL_DIST, 1);
      ref.current.position.set(
        START[0] + (END[0] - START[0]) * t,
        START[1] + (END[1] - START[1]) * t,
        START[2] + (END[2] - START[2]) * t
      );
      ref.current.visible = true;
      if (t >= 1) {
        s.current.active = false;
        ref.current.visible = false;
      }
    } else {
      ref.current.visible = false;
    }
  });

  return (
    <mesh ref={ref} visible={false} rotation={[0, 0, 2.16]}>
      <cylinderGeometry args={[0.01, 0.01, 3, 4]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
    </mesh>
  );
}

function WebGLScene({ isDesktop }) {
  return (
    <>
      <Stars radius={200} depth={60} count={6000} factor={5} saturation={0} fade speed={1} />
      <ShootingStar />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffcc" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0088ff" />
      <Orb isDesktop={isDesktop} />
      <OrbitControls
        target={[isDesktop ? 3.8 : 0, 0, 0]}
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={1.0}
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

    const update = () => setIsDesktop(window.innerWidth > 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
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
