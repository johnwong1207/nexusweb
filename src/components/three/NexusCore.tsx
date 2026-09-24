"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { LearningNode, type OrbitNode } from "./LearningNode";
import { makeCircuitTexture } from "./waferTexture";

const CYAN = "#00D9FF";
const AQUA = "#00F5C8";

type Props = {
  labels: string[];
  reduced: boolean;
  heroRef: RefObject<HTMLElement>;
};

export function NexusCore({ labels, reduced, heroRef }: Props) {
  const orbit = useRef<THREE.Group>(null);
  const wafer = useRef<THREE.Group>(null);
  const { pointer, camera } = useThree();
  const tex = useMemo(() => makeCircuitTexture(), []);

  const nodes = useMemo<OrbitNode[]>(() => {
    const accents = [CYAN, AQUA, "#1388FF", CYAN, AQUA, "#1388FF", CYAN, AQUA];
    return labels.slice(0, 8).map((label, i) => {
      const inner = i < 4;
      const k = i % 4;
      const angle = (k / 4) * Math.PI * 2 + (inner ? 0 : Math.PI / 4);
      return {
        label,
        radius: inner ? 2.35 : 3.55,
        angle,
        y: inner ? Math.sin(angle * 1.5) * 0.45 : Math.cos(angle * 2) * 0.85,
        accent: accents[i % accents.length],
      };
    });
  }, [labels]);

  useFrame((_, delta) => {
    if (reduced) return;
    const d = Math.min(delta, 0.05);
    // very slow orbit
    if (orbit.current) {
      orbit.current.rotation.y += d * 0.07;
      orbit.current.rotation.x += (THREE.MathUtils.clamp(pointer.y * 0.1, -0.14, 0.14) - orbit.current.rotation.x) * 0.04;
      orbit.current.position.x += (pointer.x * 0.22 - orbit.current.position.x) * 0.04;
    }
    // slight wafer tilt following cursor
    if (wafer.current) {
      wafer.current.rotation.x += (-0.42 + pointer.y * 0.1 - wafer.current.rotation.x) * 0.05;
      wafer.current.rotation.z += d * 0.05;
    }
    // scroll dolly: draw subtly closer as hero scrolls away
    const hero = heroRef.current;
    if (hero) {
      const r = hero.getBoundingClientRect();
      const p = THREE.MathUtils.clamp(-r.top / Math.max(r.height, 1), 0, 1);
      const target = 8.4 - p * 1.3;
      camera.position.z += (target - camera.position.z) * 0.06;
      camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.04;
      camera.position.y += (0.5 + pointer.y * 0.3 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={orbit}>
      {/* orbit guides */}
      <mesh rotation={[Math.PI / 2.1, 0, 0]}>
        <torusGeometry args={[2.35, 0.006, 8, 128]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 1.92, 0.2, 0]}>
        <torusGeometry args={[3.55, 0.006, 8, 160]} />
        <meshBasicMaterial color={AQUA} transparent opacity={0.2} />
      </mesh>

      {/* wafer core */}
      <group ref={wafer} rotation={[-0.42, 0, 0]}>
        <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.45}>
          <mesh>
            <cylinderGeometry args={[1.55, 1.55, 0.1, 72]} />
            <meshStandardMaterial color="#0E2233" metalness={0.92} roughness={0.28} transparent opacity={0.96} />
          </mesh>
          {/* circuit face */}
          <mesh position={[0, 0.052, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.5, 72]} />
            <meshBasicMaterial map={tex} transparent opacity={0.85} depthWrite={false} />
          </mesh>
          {/* rim glow (fresnel read) */}
          <mesh>
            <torusGeometry args={[1.55, 0.014, 12, 128]} />
            <meshBasicMaterial color={CYAN} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
          <mesh scale={1.09}>
            <torusGeometry args={[1.55, 0.05, 12, 128]} />
            <meshBasicMaterial color={CYAN} transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
          {/* inner core light */}
          <mesh>
            <sphereGeometry args={[0.3, 24, 24]} />
            <meshBasicMaterial color={AQUA} transparent opacity={0.9} />
          </mesh>
          <pointLight intensity={26} distance={10} color={CYAN} />
          <pointLight position={[0, -1.5, 1]} intensity={6} distance={6} color="#F4FAFC" />
        </Float>
      </group>

      {nodes.map((n) => (
        <LearningNode key={n.label} node={n} />
      ))}
    </group>
  );
}
