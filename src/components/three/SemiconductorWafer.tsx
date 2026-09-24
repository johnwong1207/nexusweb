"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeCircuitTexture } from "./waferTexture";

export type FilmMethod = "PVD" | "CVD";

type Props = {
  /** 0 Wafer · 1 Cleanroom · 2 Lithography · 3 Etching · 4 Thin-film · 5 Testing · 6 Packaging */
  stage: number;
  film?: FilmMethod;
  reduced?: boolean;
};

const DIE_N = 8;
const DIE_GAP = 0.44;
const TILT = -0.38;

function diePositions(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let ix = 0; ix < DIE_N; ix++) {
    for (let iz = 0; iz < DIE_N; iz++) {
      const x = (ix - (DIE_N - 1) / 2) * DIE_GAP;
      const z = (iz - (DIE_N - 1) / 2) * DIE_GAP;
      if (Math.hypot(x, z) > 1.62) continue;
      pts.push(new THREE.Vector3(x, 0, z));
    }
  }
  return pts;
}

export function SemiconductorWafer({ stage, film = "PVD", reduced = false }: Props) {
  const spin = useRef<THREE.Group>(null);
  const beam = useRef<THREE.Mesh>(null);
  const etchRings = useRef<THREE.Group>(null);
  const filmLayer = useRef<THREE.Mesh>(null);
  const probes = useRef<THREE.Group>(null);
  const fault = useRef<THREE.Mesh>(null);
  const substrate = useRef<THREE.Mesh>(null);
  const dies = useRef<THREE.InstancedMesh>(null);
  const dust = useRef<THREE.Points>(null);
  const tex = useMemo(() => makeCircuitTexture(), []);
  const positions = useMemo(() => diePositions(), []);
  const tmp = useMemo(() => new THREE.Object3D(), []);

  const dustGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const arr = new Float32Array(220 * 3);
    for (let i = 0; i < 220; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 1] = Math.random() * 3.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useLayoutEffect(() => {
    const m = dies.current;
    if (!m) return;
    positions.forEach((p, i) => {
      tmp.position.set(p.x, 0.09, p.z);
      tmp.updateMatrix();
      m.setMatrixAt(i, tmp.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  }, [positions, tmp]);

  const t = useRef(0);
  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    if (!reduced) t.current += d;
    const time = t.current;
    const ease = reduced ? 1 : 0.07;

    if (spin.current && !reduced) spin.current.rotation.y += d * 0.16;

    if (beam.current) {
      const mat = beam.current.material as THREE.MeshBasicMaterial;
      const target = stage >= 2 ? 0.5 + Math.sin(time * 3) * 0.12 : 0;
      mat.opacity += (target - mat.opacity) * 0.08;
      beam.current.visible = mat.opacity > 0.02;
    }
    if (etchRings.current) {
      etchRings.current.visible = stage >= 3;
      if (!reduced && stage >= 3) {
        etchRings.current.children.forEach((r, i) => {
          const p = ((time * 0.4 + i / 3) % 1 + 1) % 1;
          r.scale.setScalar(0.5 + p * 1.6);
          ((r as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - p);
        });
      }
    }
    if (filmLayer.current) {
      const s = filmLayer.current.scale.x + ((stage >= 4 ? 1 : 0) - filmLayer.current.scale.x) * (reduced ? 1 : 0.05);
      filmLayer.current.scale.setScalar(Math.max(s, 0.001));
      filmLayer.current.visible = s > 0.02;
    }
    if (probes.current) {
      probes.current.position.y += ((stage >= 5 ? -0.7 : 0.6) - probes.current.position.y) * ease;
      probes.current.visible = stage >= 5;
    }
    if (fault.current) {
      (fault.current.material as THREE.MeshBasicMaterial).opacity = stage >= 5 ? 0.65 + Math.sin(time * 4) * 0.2 : 0;
      fault.current.visible = stage >= 5;
    }
    const m = dies.current;
    if (m) {
      const cur = (m.userData.lift ?? 0) as number;
      const next = cur + ((stage >= 6 ? 0.5 : 0) - cur) * ease;
      m.userData.lift = next;
      if (Math.abs(next - cur) > 0.0004 || reduced) {
        positions.forEach((p, i) => {
          tmp.position.set(p.x, 0.09 + next, p.z);
          tmp.updateMatrix();
          m.setMatrixAt(i, tmp.matrix);
        });
        m.instanceMatrix.needsUpdate = true;
      }
    }
    if (substrate.current) {
      const mat = substrate.current.material as THREE.MeshStandardMaterial;
      mat.opacity += ((stage >= 6 ? 1 : 0) - mat.opacity) * ease;
      substrate.current.visible = mat.opacity > 0.03;
    }
    if (dust.current) {
      dust.current.visible = stage >= 1;
      if (!reduced) dust.current.rotation.y += d * 0.02;
    }
  });

  return (
    <group ref={spin}>
      <group rotation={[TILT, 0, 0]}>
        {/* wafer body */}
        <mesh>
          <cylinderGeometry args={[2, 2, 0.12, 72]} />
          <meshStandardMaterial color="#10293F" metalness={0.88} roughness={0.3} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.062, 0]}>
          <circleGeometry args={[1.94, 72]} />
          <meshBasicMaterial map={tex} transparent opacity={0.7} depthWrite={false} />
        </mesh>
        {/* rim glow */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.016, 10, 128]} />
          <meshBasicMaterial color="#00D9FF" transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>

        {/* dies */}
        <instancedMesh ref={dies} args={[undefined, undefined, positions.length]}>
          <boxGeometry args={[0.34, 0.05, 0.34]} />
          <meshStandardMaterial color="#0B1E30" metalness={0.7} roughness={0.4} emissive="#00D9FF" emissiveIntensity={0.12} />
        </instancedMesh>

        {/* lithography: resist + mask + beam */}
        {stage >= 2 && (
          <group>
            <mesh position={[0, 0.13, 0]}>
              <cylinderGeometry args={[1.9, 1.9, 0.03, 64]} />
              <meshStandardMaterial color="#FFB84D" transparent opacity={0.2} roughness={0.6} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.2, 0]}>
              <planeGeometry args={[3.4, 3.4]} />
              <meshBasicMaterial color="#061018" transparent opacity={0.72} side={THREE.DoubleSide} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.2, 0]}>
              <planeGeometry args={[3.4, 3.4, 8, 8]} />
              <meshBasicMaterial color="#00D9FF" wireframe transparent opacity={0.32} />
            </mesh>
          </group>
        )}
        <mesh ref={beam} position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.5, 1.5, 1.1, 32, 1, true]} />
          <meshBasicMaterial color="#BDEFFF" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>

        {/* etching pulse rings */}
        <group ref={etchRings} visible={false}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
              <torusGeometry args={[0.8, 0.02, 8, 64]} />
              <meshBasicMaterial color="#FFB84D" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          ))}
        </group>

        {/* thin film layer */}
        <mesh ref={filmLayer} position={[0, 0.17, 0]} scale={0.001} visible={false}>
          <cylinderGeometry args={[1.88, 1.88, 0.025, 64]} />
          <meshStandardMaterial
            color={film === "PVD" ? "#00D9FF" : "#00F5C8"}
            transparent
            opacity={0.3}
            metalness={0.6}
            roughness={0.35}
          />
        </mesh>

        {/* testing probes + fault marker */}
        <group ref={probes} visible={false}>
          {[-0.7, 0, 0.7].map((x) => (
            <mesh key={x} position={[x, 0.7, 0.4]}>
              <cylinderGeometry args={[0.02, 0.008, 1.2, 8]} />
              <meshStandardMaterial color="#C9D6DF" metalness={0.9} roughness={0.25} />
            </mesh>
          ))}
          <mesh ref={fault} position={[0.7, 0.2, -0.5]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshBasicMaterial color="#FFB84D" transparent opacity={0} />
          </mesh>
        </group>

        {/* packaging substrate */}
        <mesh ref={substrate} position={[0, -0.5, 0]} visible={false}>
          <boxGeometry args={[4.4, 0.1, 4.4]} />
          <meshStandardMaterial color="#0A1722" transparent opacity={0} metalness={0.4} roughness={0.6} />
        </mesh>
      </group>

      {/* cleanroom dust (world space) */}
      <points ref={dust} geometry={dustGeo} visible={false}>
        <pointsMaterial size={0.025} color="#C9D6DF" transparent opacity={0.45} depthWrite={false} />
      </points>

      <pointLight position={[0, 3, 1.5]} intensity={20} distance={12} color="#00D9FF" />
      <pointLight position={[0, -2, -2]} intensity={5} distance={8} color="#F4FAFC" />
    </group>
  );
}
