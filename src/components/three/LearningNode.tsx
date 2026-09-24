"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

export type OrbitNode = {
  label: string;
  radius: number;
  angle: number;
  y: number;
  accent: string;
};

/** One floating node: luminous point + label pill + trace line to the core. */
export function LearningNode({ node, dim = false }: { node: OrbitNode; dim?: boolean }) {
  const pos = useMemo(
    () => new THREE.Vector3(Math.cos(node.angle) * node.radius, node.y, Math.sin(node.angle) * node.radius),
    [node.angle, node.radius, node.y]
  );

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array([0, 0, 0, -pos.x, -pos.y, -pos.z]), 3));
    return g;
  }, [pos]);

  return (
    <group position={pos}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#00D9FF" transparent opacity={dim ? 0.1 : 0.28} />
      </lineSegments>
      <Float speed={1.6} rotationIntensity={0.1} floatIntensity={0.9}>
        <mesh>
          <sphereGeometry args={[0.11, 20, 20]} />
          <meshStandardMaterial
            color={node.accent}
            emissive={node.accent}
            emissiveIntensity={dim ? 0.5 : 1.6}
            roughness={0.35}
          />
        </mesh>
        <Html center distanceFactor={10} zIndexRange={[15, 0]} wrapperClass="pointer-events-none select-none">
          <div
            className="pointer-events-none whitespace-nowrap rounded-sm border px-2 py-0.5 font-mono text-[10px] tracking-wider backdrop-blur"
            style={{
              borderColor: `${node.accent}55`,
              background: "rgba(6,16,24,0.82)",
              color: "#F4FAFC",
            }}
          >
            {node.label}
          </div>
        </Html>
      </Float>
    </group>
  );
}

export function useNodeReaction(group: React.RefObject<THREE.Group>, strength = 0.05) {
  const t = useRef(0);
  useFrame(({ pointer }, delta) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(delta, 0.05);
    t.current += d;
    g.position.x += (pointer.x * strength - g.position.x) * 0.05;
    g.position.y += Math.sin(t.current * 0.7) * 0.0006;
  });
}
