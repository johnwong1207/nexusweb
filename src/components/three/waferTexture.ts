"use client";

import * as THREE from "three";

/** Procedural 256px circuit-trace texture for wafer faces. Cheap, no downloads. */
export function makeCircuitTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const x = c.getContext("2d")!;
  x.clearRect(0, 0, 256, 256);
  x.strokeStyle = "rgba(0,217,255,0.55)";
  x.lineWidth = 1;
  for (const r of [110, 88, 66, 44]) {
    x.beginPath();
    x.arc(128, 128, r, 0, Math.PI * 2);
    x.stroke();
  }
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    x.beginPath();
    x.moveTo(128 + Math.cos(a) * 44, 128 + Math.sin(a) * 44);
    x.lineTo(128 + Math.cos(a) * 110, 128 + Math.sin(a) * 110);
    x.stroke();
    x.fillStyle = "rgba(0,245,200,0.7)";
    x.fillRect(128 + Math.cos(a) * 108 - 2, 128 + Math.sin(a) * 108 - 2, 4, 4);
  }
  x.strokeStyle = "rgba(201,214,223,0.28)";
  for (let i = -3; i <= 3; i++) {
    x.beginPath();
    x.moveTo(128 + i * 22, 40);
    x.lineTo(128 + i * 22, 216);
    x.stroke();
    x.beginPath();
    x.moveTo(40, 128 + i * 22);
    x.lineTo(216, 128 + i * 22);
    x.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  return tex;
}
