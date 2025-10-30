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

  // Deixa o material da moeda brilhante
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.metalness = 1;
        child.material.roughness = 0.25;
        child.material.emissive = new THREE.Color(0x111111);
        child.material.emissiveIntensity = 0.3;
      }
    });
  }, [scene]);

  const state = useRef({
    y: 20,
    velocity: 0,
    rotationSpeed: { x: 6, y: 2 },
    phase: "falling",
    scale: 20,
    inserted: false,
    target: new THREE.Vector3(0, 1.2, -2),
    t: 0,
    arcadeScale: 0,
    shakeTimer: 0,
    shakeActive: false,
  });

  useFrame((_, delta) => {
    const s = state.current;
    const coin = ref.current;
    const arcadeObj = arcadeRef.current;

    if (!coin) return;

    if (s.phase === "falling" && s.y === 10) {
      coin.position.set(0, s.y, 0);
      coin.rotation.set(-Math.PI / 2, 0, 0); // de pé e alinhada
    }

    switch (s.phase) {
      case "falling":
        // 🪙 Cai com gravidade
        s.velocity += -9.8 * delta * 0.8
        s.y += s.velocity * delta;
        coin.rotation.x += s.rotationSpeed.x * delta;
        coin.rotation.y += s.rotationSpeed.y * delta;

        if (s.y <= 0) {
          s.y = 0;
          s.velocity = 3;
          s.phase = "bounce";
        }
        break;

      case "bounce":
        // 💥 pequeno quique
        s.velocity -= 12 * delta;
        s.y = Math.max(0, s.y + s.velocity * delta);
        coin.rotation.x += 4 * delta;

        if (s.y <= 0.05) {
          s.y = 0.05;
          s.phase = "idle";
          // Alinha de pé e centraliza
          coin.rotation.x = -Math.PI / 2;
          coin.rotation.z = 0;
        }
        break;

      case "idle":
        // 💤 Parada, mas às vezes treme pra chamar atenção
        coin.rotation.y += delta * 0.5;

        s.shakeTimer += delta;
        if (!s.shakeActive && s.shakeTimer > 4) {
          s.shakeActive = true;
          s.shakeTimer = 0;
        }

        if (s.shakeActive) {
          const shakeIntensity = 0.05;
          coin.rotation.z = Math.sin(s.shakeTimer * 30) * shakeIntensity;
          coin.position.x = Math.sin(s.shakeTimer * 40) * 0.03;
          s.shakeTimer += delta;

          if (s.shakeTimer > 0.5) {
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
