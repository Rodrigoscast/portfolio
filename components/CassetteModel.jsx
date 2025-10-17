// components/CassetteModel.jsx
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

export default function CassetteModel({ onInsert }) {
    const { scene } = useGLTF("/cassette.glb");
    const ref = useRef();

    const state = useRef({
        y: 8,
        velocity: 0,
        rotationSpeed: { x: 0.02, z: 0.01 },
        phase: "falling",
        bounceTime: 0,
        idleTime: 0,
        shakeTime: 0,
        isShaking: false,
        scale: 0.05,
    });

    useFrame((_, delta) => {
        const s = state.current;

        if (s.phase === "falling") {
            s.velocity += -9.8 * delta * 0.5;
            s.y += s.velocity * delta;
            ref.current.rotation.x += s.rotationSpeed.x;
            ref.current.rotation.z += s.rotationSpeed.z;

            if (s.y <= 0) {
                s.y = 0;
                s.phase = "bounce";
                s.bounceTime = 0;
                s.velocity = 2.5;
            }
        } else if (s.phase === "bounce") {
            s.bounceTime += delta;
            s.y = Math.max(0, Math.sin(s.bounceTime * 6) * 0.5);

            if (ref.current.rotation.x > -0.6) ref.current.rotation.x -= 1.5 * delta;
            ref.current.rotation.z += Math.sin(s.bounceTime * 5) * 0.005;

            if (s.bounceTime > Math.PI / 3) {
                s.phase = "rest";
                s.idleTime = 0;
            }
        } else if (s.phase === "rest") {
            s.idleTime += delta;

            if (!s.isShaking && s.idleTime > 5) {
                s.isShaking = true;
                s.idleTime = 0;
                s.shakeTime = 0;
            }

            if (s.isShaking) {
                s.shakeTime += delta;
                const shakeIntensity = 0.05;
                const shakeSpeed = 30;

                ref.current.rotation.z = Math.sin(s.shakeTime * shakeSpeed) * shakeIntensity;
                ref.current.rotation.x = -0.5 + Math.sin(s.shakeTime * shakeSpeed * 0.5) * shakeIntensity * 0.5;
                ref.current.position.x = Math.sin(s.shakeTime * shakeSpeed * 1.2) * 0.05;

                if (s.shakeTime > 0.4) {
                    s.isShaking = false;
                    ref.current.rotation.z = 0;
                    ref.current.position.x = 0;
                }
            } else {
                ref.current.rotation.x += (-0.5 - ref.current.rotation.x) * delta * 2;
                ref.current.rotation.z *= 0.95;
                ref.current.position.x *= 0.9;
            }
        } else if (s.phase === "insert") {
            s.y += delta * 0.3;
            s.scale = Math.max(0, s.scale - delta * 0.03);

            ref.current.position.y = s.y;
            ref.current.scale.setScalar(s.scale);

            if (s.scale <= 0.001) {
                s.phase = "done";
                if (onInsert) onInsert();
            }
        }

        ref.current.position.y = s.y;
    });

    const handleClick = () => {
        const s = state.current;
        if (s.phase === "rest" && !s.isShaking) {
            s.phase = "insert";
        }
    };

    return (
        <primitive
            ref={ref}
            object={scene}
            scale={state.current.scale}
            onClick={handleClick}
        />
    );
}
