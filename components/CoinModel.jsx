// components/CoinModel.jsx
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function CoinModel({ onInsert }) {
  const { scene } = useGLTF("/Coin.glb");
  const arcade = useGLTF("/Arcade.glb");
  const ref = useRef();
  const arcadeRef = useRef();
  const { viewport } = useThree();

  const state = useRef({
    y: 8,
    velocity: 0,
    rotationSpeed: { x: 0.02, z: 0.01 },
    phase: "falling",
    scale: 20,
    inserted: false,
    target: new THREE.Vector3(0, 1.2, -2),
    t: 0,
    idleTime: 0,
    bounceTime: 0,
    arcadeScale: 0,
    shakeTimer: 0,
    shakeActive: false,
  });

  useFrame((_, delta) => {
    const s = state.current;
    const coin = ref.current;
    const arcadeObj = arcadeRef.current;

    if (!coin) return;

    switch (s.phase) {
      case "falling":
        // Cai com gravidade
        s.velocity += -9.8 * delta * 0.5;
        s.y += s.velocity * delta;
        coin.rotation.x += s.rotationSpeed.x;
        coin.rotation.z += s.rotationSpeed.z;

        if (s.y <= 0) {
          s.y = 0;
          s.velocity = 2.5;
          s.bounceTime = 0;
          s.phase = "bounce";
        }
        break;

      case "bounce":
        // pequeno bounce
        s.bounceTime += delta;
          s.y = Math.max(0, Math.sin(s.bounceTime * 6) * 0.5);

          if (coin.rotation.x > -0.6) coin.rotation.x -= 1.5 * delta;
          coin.rotation.z += Math.sin(s.bounceTime * 5) * 0.005;

          if (s.bounceTime > Math.PI / 3) {
              s.phase = "rest";
              s.idleTime = 0;
          }
        break;

      case "idle":
        // 💤 Parada, mas às vezes treme pra chamar atenção
        s.idleTime += delta;

        if (!s.shakeActive && s.shakeTimer > 5) {
          s.shakeActive = true;
          s.idleTime = 0;
          s.shakeTimer = 0;
        }

        if (s.shakeActive) {
          s.shakeTimer += delta;
          const shakeIntensity = 0.05;
          const shakeSpeed = 30;

          coin.rotation.z = Math.sin(s.shakeTimer * shakeSpeed) * shakeIntensity;
          coin.rotation.x = -0.5 + Math.sin(s.shakeTimer * shakeSpeed * 0.5) * shakeIntensity * 0.5;
          coin.position.x = Math.sin(s.shakeTimer * shakeSpeed * 1.2) * 0.05;

          if (s.shakeTimer > 0.4) {
              s.shakeActive = false;
              coin.rotation.z = 0;
              coin.position.x = 0;
          }
        }
        break;

      case "fly":
        // 🚀 voo até o arcade
        s.t += delta * 0.5; // mais devagar → animação longa e suave
        s.t = Math.min(s.t, 1);
        const pos = new THREE.Vector3().lerpVectors(
          new THREE.Vector3(0, 0, 0),
          s.target,
          s.t
        );

        coin.position.copy(pos);
        coin.rotation.x += 10 * delta;
        coin.rotation.y += 8 * delta;
        s.scale = Math.max(25 - s.t * 20, 5);
        coin.scale.setScalar(s.scale);

        // 🎰 Máquina crescendo bem devagar
        s.arcadeScale = THREE.MathUtils.lerp(s.arcadeScale, 0.8, delta * 0.1);
        if (arcadeObj) arcadeObj.scale.setScalar(s.arcadeScale);

        if (s.t >= 1 && !s.inserted) {
          s.inserted = true;
          s.phase = "done";
          if (onInsert) onInsert();
        }
        break;

      default:
        break;
    }

    coin.position.y = s.y;
  });

  const handleClick = () => {
    const s = state.current;
    if (s.phase === "idle") {
      s.phase = "fly";
      s.t = 0;
    }
  };

  return (
    <>
      {/* Ficha de fliperama */}
      <primitive
        ref={ref}
        object={scene}
        scale={state.current.scale}
        position={[0, state.current.y, 0]}
        onClick={handleClick}
      />

      {/* Máquina de fliperama (cresce devagar) */}
      <primitive
        ref={arcadeRef}
        object={arcade.scene}
        position={[0, -5, -2]}
        scale={state.current.arcadeScale}
      />
    </>
  );
}
