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
    y: 4,
    velocity: 0,
    rotationSpeed: { x: 2, z: 0.1, y: 2 },
    saveRot: { x: 0, y: 0, z: 0 },
    savePos: { x: 0, y: 0, z: 0 },
    phase: "start",
    lastPhase: "",
    scale: 20,
    inserted: false,
    target: new THREE.Vector3(0, -2, -2),
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
      case "start":
        coin.rotation.z = 0
        coin.rotation.y = 0
        coin.rotation.x = 0

        s.phase = "falling";

      case "falling":
        // Cai com gravidade
        s.velocity += -9.8 * delta * 0.005;
        s.y += s.velocity;
        coin.rotation.z += s.rotationSpeed.z;
        coin.rotation.x += delta * 2;

        if (s.y <= 0) {
          s.y = 0;
          s.bounceTime = 0;          
          s.lastPhase = "falling"
          s.phase = "aligning";
        }
        break;

      case "aligning":
        // Faz a moeda suavemente "assentar" no chão
        s.y = THREE.MathUtils.lerp(s.y, 0, delta * 6);

        // Suaviza rotações e posição até centralizar
        coin.rotation.x = THREE.MathUtils.lerp(coin.rotation.x, 0, delta * 3);
        coin.rotation.y = THREE.MathUtils.lerp(coin.rotation.y, 0, delta * 3);
        coin.rotation.z = THREE.MathUtils.lerp(coin.rotation.z, 0, delta * 3);
        coin.position.x = THREE.MathUtils.lerp(coin.position.x, 0, delta * 3);

        // Quando estiver quase centralizada e no chão, entra em idle
        if (
          Math.abs(coin.rotation.x) < 0.01 &&
          Math.abs(coin.rotation.y) < 0.01 &&
          Math.abs(coin.rotation.z) < 0.01 &&
          Math.abs(s.y) < 0.01
        ) {
          s.saveRot.x = coin.rotation.x;
          s.saveRot.y = coin.rotation.y;
          s.saveRot.z = coin.rotation.z;

          s.savePos.x = coin.position.x;
          s.savePos.y = coin.position.y;
          s.savePos.z = coin.position.z;

          if (s.lastPhase == "falling") {
            s.phase = "idle";
          } else {
            s.phase = "fly"
          }
        }
        break;

      case "idle":
        // Parada, mas às vezes treme pra chamar atenção
        s.idleTime += delta;
        s.shakeTimer += delta;
        coin.rotation.y += delta * 2;

        if (!s.shakeActive && s.shakeTimer > 5) {
          s.shakeActive = true;
          s.idleTime = 0;
          s.shakeTimer = 0;
        }

        if (s.shakeActive) {
          s.shakeTimer += delta;
          const shakeIntensity = 0.15;
          const shakeSpeed = 40;

          const offset = Math.sin(s.shakeTimer * shakeSpeed) * shakeIntensity;
          coin.position.x = s.savePos.x + offset;

          coin.rotation.y = s.saveRot.y + Math.sin(s.shakeTimer * shakeSpeed * 1.5) * 0.1;

          if (s.shakeTimer > 0.4) {
            coin.position.x = THREE.MathUtils.lerp(coin.position.x, s.savePos.x, delta * 15);
            coin.rotation.y = THREE.MathUtils.lerp(coin.rotation.y, s.saveRot.y, delta * 15);

            s.shakeTimer = 0;
            s.shakeActive = false;
          }
        }
        break;

      case "fly":
        // voo até o arcade
        s.t += delta * 0.5; // mais devagar → animação longa e suave
        s.t = Math.min(s.t, 1);
        const pos = new THREE.Vector3().lerpVectors(
          new THREE.Vector3(0, 0, 0),
          s.target,
          s.t
        );

        coin.position.copy(pos);
        coin.rotation.x -= 0.4;
        // coin.rotation.y += 8 * delta;
        s.scale = Math.max(25 - s.t * 20, 2);
        coin.scale.setScalar(s.scale);

        // Máquina crescendo bem devagar
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
    if(s.phase != "fly"){
      s.lastPhase = "idle"
      s.phase = "aligning";
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