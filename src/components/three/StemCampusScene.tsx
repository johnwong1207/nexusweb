"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { useInViewPause, usePrefersReducedMotion, useWebGLAvailable } from "./webgl";

export type CampusStation = { name: string; lab: string };

const CYAN = "#00D9FF";
const AQUA = "#00F5C8";
const BODY = "#13293D";
const METAL = "#C9D6DF";

/* ---------- stylised stations (educational forms, not product artwork) ---------- */

function MicrobitStation() {
  return (
    <group>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1.1, 0.07, 0.75]} />
        <meshStandardMaterial color="#0E4D5C" metalness={0.5} roughness={0.5} />
      </mesh>
      {Array.from({ length: 25 }).map((_, i) => {
        const ix = i % 5;
        const iz = Math.floor(i / 5);
        const on = (ix + iz) % 2 === 0;
        return (
          <mesh key={i} position={[-0.32 + ix * 0.16, 0.145, -0.32 + iz * 0.16]}>
            <planeGeometry args={[0.09, 0.09]} />
            <meshBasicMaterial color={on ? AQUA : "#12333D"} />
          </mesh>
        );
      })}
      <mesh position={[0, 0.1, 0.42]}>
        <boxGeometry args={[1.0, 0.05, 0.1]} />
        <meshStandardMaterial color={AQUA} emissive={AQUA} emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

function RoverStation() {
  return (
    <group>
      <mesh position={[0, 0.32, 0]}>
        <boxGeometry args={[1.0, 0.18, 0.7]} />
        <meshStandardMaterial color={BODY} metalness={0.7} roughness={0.4} />
      </mesh>
      {[
        [-0.5, -0.4],
        [0.5, -0.4],
        [-0.5, 0.4],
        [0.5, 0.4],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.18, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 20]} />
          <meshStandardMaterial color="#0A1722" roughness={0.7} />
        </mesh>
      ))}
      <mesh position={[-0.2, 0.45, 0.36]}>
        <cylinderGeometry args={[0.06, 0.06, 0.06, 12]} />
        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1} />
      </mesh>
      <mesh position={[0.2, 0.45, 0.36]}>
        <cylinderGeometry args={[0.06, 0.06, 0.06, 12]} />
        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function ArmStation() {
  return (
    <group>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.35, 0.42, 0.2, 20]} />
        <meshStandardMaterial color={BODY} metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.55, 0]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[0.22, 0.9, 0.22]} />
        <meshStandardMaterial color={METAL} metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0.28, 1.05, 0]} rotation={[0, 0, -1.1]}>
        <boxGeometry args={[0.16, 0.7, 0.16]} />
        <meshStandardMaterial color={METAL} metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0.55, 0.85, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color={AQUA} emissive={AQUA} emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

function IotStation() {
  return (
    <group>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.7, 0.06, 0.5]} />
        <meshStandardMaterial color={BODY} metalness={0.6} roughness={0.5} />
      </mesh>
      <mesh position={[0.25, 0.45, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.65, 8]} />
        <meshStandardMaterial color={METAL} metalness={0.9} roughness={0.3} />
      </mesh>
      {[0.3, 0.5].map((r, i) => (
        <mesh key={i} position={[0.25, 0.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.012, 8, 40]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.5 - i * 0.15} />
        </mesh>
      ))}
      <mesh position={[-0.15, 0.2, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color={AQUA} emissive={AQUA} emissiveIntensity={1.4} />
      </mesh>
    </group>
  );
}

function DroneStation({ reduced }: { reduced: boolean }) {
  const rotors = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (rotors.current && !reduced) rotors.current.rotation.y += Math.min(d, 0.05) * 6;
  });
  return (
    <group position={[0, 1.0, 0]}>
      <mesh>
        <boxGeometry args={[0.5, 0.16, 0.5]} />
        <meshStandardMaterial color={BODY} metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.12, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.4} />
      </mesh>
      <group ref={rotors}>
        {[
          [-0.45, -0.45],
          [0.45, -0.45],
          [-0.45, 0.45],
          [0.45, 0.45],
        ].map(([x, z], i) => (
          <group key={i} position={[x, 0.1, z]}>
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, 0.14, 8]} />
              <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.35} />
            </mesh>
            <mesh position={[0, 0.09, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.015, 20]} />
              <meshBasicMaterial color={CYAN} transparent opacity={0.35} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

function WaferStation() {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.55, 0.55, 0.06, 40]} />
        <meshStandardMaterial color="#10293F" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.012, 8, 48]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.9, 8]} />
        <meshStandardMaterial color={METAL} metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.02, 24]} />
        <meshStandardMaterial color="#0A1722" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

function CameraStation() {
  return (
    <group>
      {[-0.25, 0.25].map((x, i) => (
        <mesh key={i} position={[x, 0.35, 0]} rotation={[0, 0, x > 0 ? -0.25 : 0.25]}>
          <cylinderGeometry args={[0.025, 0.025, 0.9, 8]} />
          <meshStandardMaterial color={METAL} metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[0.5, 0.32, 0.34]} />
        <meshStandardMaterial color={BODY} metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.85, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.11, 0.13, 0.12, 20]} />
        <meshStandardMaterial color="#061018" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.85, 0.29]}>
        <circleGeometry args={[0.07, 20]} />
        <meshBasicMaterial color={CYAN} />
      </mesh>
    </group>
  );
}

function PrinterStation() {
  return (
    <group>
      {[
        [-0.35, -0.3],
        [0.35, -0.3],
        [-0.35, 0.3],
        [0.35, 0.3],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.6, z]}>
          <boxGeometry args={[0.07, 1.2, 0.07]} />
          <meshStandardMaterial color={METAL} metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.85, 0.07, 0.75]} />
        <meshStandardMaterial color={BODY} metalness={0.6} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.7, 0.08, 0.6]} />
        <meshStandardMaterial color="#0A1722" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <boxGeometry args={[0.22, 0.32, 0.22]} />
        <meshStandardMaterial color={AQUA} emissive={AQUA} emissiveIntensity={0.35} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

/* Stylised programmable brick hub with ports, motors and sensor. */
function SpikeStation() {
  return (
    <group>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.8, 0.5, 0.6]} />
        <meshStandardMaterial color="#DDE7EC" metalness={0.25} roughness={0.55} />
      </mesh>
      {/* ports */}
      {[-0.24, -0.08, 0.08, 0.24].map((x, i) => (
        <mesh key={i} position={[x, 0.3, 0.31]}>
          <boxGeometry args={[0.11, 0.11, 0.03]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? CYAN : AQUA}
            emissive={i % 2 === 0 ? CYAN : AQUA}
            emissiveIntensity={0.9}
          />
        </mesh>
      ))}
      {/* status light */}
      <mesh position={[0, 0.56, 0.1]}>
        <boxGeometry args={[0.16, 0.03, 0.16]} />
        <meshBasicMaterial color={AQUA} />
      </mesh>
      {/* motors */}
      {[-0.55, 0.55].map((x, i) => (
        <group key={i} position={[x, 0.2, 0]}>
          <mesh>
            <boxGeometry args={[0.28, 0.3, 0.4]} />
            <meshStandardMaterial color={BODY} metalness={0.5} roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 0.1, 18]} />
            <meshStandardMaterial color="#0A1722" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* Stylised edge-AI board: carrier, heatsink fins, fan and camera. */
function JetsonStation() {
  return (
    <group>
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[1.0, 0.06, 0.8]} />
        <meshStandardMaterial color="#0F3A2E" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* heatsink fins */}
      {[-0.24, -0.12, 0, 0.12, 0.24].map((x, i) => (
        <mesh key={i} position={[x - 0.1, 0.2, 0]}>
          <boxGeometry args={[0.05, 0.22, 0.5]} />
          <meshStandardMaterial color={METAL} metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
      {/* fan */}
      <mesh position={[0.32, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.08, 20]} />
        <meshStandardMaterial color="#061018" roughness={0.4} />
      </mesh>
      <mesh position={[0.32, 0.16, 0.05]}>
        <circleGeometry args={[0.09, 20]} />
        <meshBasicMaterial color={CYAN} />
      </mesh>
      {/* camera module */}
      <mesh position={[-0.32, 0.16, 0.25]}>
        <boxGeometry args={[0.16, 0.14, 0.1]} />
        <meshStandardMaterial color={BODY} metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[-0.32, 0.16, 0.31]}>
        <circleGeometry args={[0.04, 14]} />
        <meshBasicMaterial color={AQUA} />
      </mesh>
    </group>
  );
}

/* ---------- scene ---------- */

function StationPlot({
  index,
  position,
  hovered,
  onHover,
  children,
}: {
  index: number;
  position: [number, number, number];
  hovered: boolean;
  onHover: (i: number | null) => void;
  children: React.ReactNode;
}) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[0.85, 0.9, 40]} />
        <meshBasicMaterial color={hovered ? AQUA : CYAN} transparent opacity={hovered ? 0.9 : 0.3} />
      </mesh>
      <group
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(index);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = "";
        }}
      >
        <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.5}>
          <group scale={hovered ? 1.12 : 1}>{children}</group>
        </Float>
      </group>
      {hovered && <pointLight intensity={8} distance={4} color={AQUA} position={[0, 1, 0]} />}
    </group>
  );
}

function Campus({
  stations,
  onHover,
  reduced,
}: {
  stations: CampusStation[];
  onHover: (i: number | null, s: CampusStation | null) => void;
  reduced: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const platform = useRef<THREE.Group>(null);

  useFrame((_, d) => {
    if (platform.current && !reduced) platform.current.rotation.y += Math.min(d, 0.05) * 0.05;
  });

  const bodies = [
    <MicrobitStation key="m" />,
    <RoverStation key="r" />,
    <ArmStation key="a" />,
    <IotStation key="i" />,
    <DroneStation key="d" reduced={reduced} />,
    <WaferStation key="w" />,
    <CameraStation key="c" />,
    <PrinterStation key="p" />,
    <SpikeStation key="s" />,
    <JetsonStation key="j" />,
  ];

  const plots: [number, number][] = bodies.map((_, i) => {
    const a = (i / bodies.length) * Math.PI * 2;
    const r = bodies.length > 8 ? 3.35 : 3.1;
    return [Math.cos(a) * r, Math.sin(a) * r];
  });

  function handle(i: number | null) {
    setHovered(i);
    onHover(i, i === null ? null : stations[i]);
  }

  return (
    <group ref={platform}>
      {/* ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[4.4, 64]} />
        <meshStandardMaterial color="#08141D" metalness={0.4} roughness={0.7} />
      </mesh>
      {[4.4, 3.2, 2.0].map((r) => (
        <mesh key={r} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
          <ringGeometry args={[r - 0.015, r, 72]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.22} />
        </mesh>
      ))}
      {plots.map(([x, z], i) => (
        <StationPlot key={i} index={i} position={[x, 0, z]} hovered={hovered === i} onHover={handle}>
          {bodies[i]}
        </StationPlot>
      ))}
      {hovered !== null && (
        <Html position={[plots[hovered][0], 2.2, plots[hovered][1]]} center zIndexRange={[15, 0]} wrapperClass="pointer-events-none select-none">
          <div className="pointer-events-none whitespace-nowrap rounded-sm border border-aqua/50 bg-abyss/90 px-3 py-1.5 text-center backdrop-blur">
            <p className="text-xs font-bold text-paper">{stations[hovered].name}</p>
            <p className="mt-0.5 font-mono text-[10px] text-aqua">{stations[hovered].lab}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

export function CampusFallback({ stations }: { stations: CampusStation[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="img" aria-label="STEM Campus stations">
      {stations.map((s, i) => (
        <div key={s.name} className="etch rounded-lg p-4 text-center">
          <p className="font-mono text-[10px] text-signal">0{i + 1}</p>
          <p className="mt-1 text-sm font-bold text-paper">{s.name}</p>
          <p className="mt-1 text-[11px] text-muted">{s.lab}</p>
        </div>
      ))}
    </div>
  );
}

type Props = {
  stations: CampusStation[];
  onHover: (i: number | null, s: CampusStation | null) => void;
};

export default function StemCampusScene({ stations, onHover }: Props) {
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLAvailable();
  const { ref, visible } = useInViewPause<HTMLDivElement>();

  if (webgl === "no" || webgl === "checking") return <CampusFallback stations={stations} />;

  return (
    <div ref={ref} className="relative mx-auto aspect-[4/3] w-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 6.2, 8.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : visible ? "always" : "never"}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 4]} intensity={1} color="#F4FAFC" />
        <directionalLight position={[-5, 3, -4]} intensity={0.45} color="#00D9FF" />
        <Suspense fallback={null}>
          <Campus stations={stations} onHover={onHover} reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
