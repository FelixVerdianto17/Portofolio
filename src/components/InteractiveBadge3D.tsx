import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { RoundedBox, Text, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const HangingBadge = () => {
  const badgeGroup = useRef<THREE.Group>(null);
  const cardGroup = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Interaction State
  const isDragging = useRef(false);

  // Physics State
  const dragTarget = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const previousPointer = useRef({ x: 0, y: 0 });
  
  // Track previous position to calculate true velocity for realistic tilting
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleUp = () => {
      isDragging.current = false;
      document.body.style.cursor = 'auto';
    };
    window.addEventListener('pointerup', handleUp);
    return () => window.removeEventListener('pointerup', handleUp);
  }, []);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isDragging.current = true;
    document.body.style.cursor = 'grabbing';
  };

  const handlePointerOver = () => {
    if (!isDragging.current) {
      document.body.style.cursor = 'grab';
    }
  };

  const handlePointerOut = () => {
    if (!isDragging.current) {
      document.body.style.cursor = 'auto';
    }
  };

  useFrame((state) => {
    if (!badgeGroup.current || !cardGroup.current) return;

    // 1. Calculate safe pointer deltas
    let pDX = state.pointer.x - previousPointer.current.x;
    let pDY = state.pointer.y - previousPointer.current.y;
    
    // Clamp massive jumps (e.g., when pointer first enters iframe/window)
    pDX = THREE.MathUtils.clamp(pDX, -0.1, 0.1);
    pDY = THREE.MathUtils.clamp(pDY, -0.1, 0.1);

    previousPointer.current.x = state.pointer.x;
    previousPointer.current.y = state.pointer.y;

    if (isDragging.current) {
      // Scale pointer movement based on viewport to make it feel 1:1 mapped
      const sensitivityX = viewport.width * 0.8;
      const sensitivityY = viewport.height * 0.8;

      dragTarget.current.x += pDX * sensitivityX;
      dragTarget.current.y += pDY * sensitivityY;
      
      // Hard clamp bounds to ensure it never leaves the screen
      dragTarget.current.x = THREE.MathUtils.clamp(dragTarget.current.x, -1.8, 1.8);
      dragTarget.current.y = THREE.MathUtils.clamp(dragTarget.current.y, -1.0, 1.2);
    } else {
      // Option chosen: Premium Slow Gravity. 
      // Instead of freezing in place or violently snapping, gravity very slowly pulls it back to center.
      // This feels like a relaxing 3D playground.
      dragTarget.current.x = THREE.MathUtils.lerp(dragTarget.current.x, 0, 0.015);
      dragTarget.current.y = THREE.MathUtils.lerp(dragTarget.current.y, 0, 0.015);
    }

    // 2. Smoothly move the entire badge assembly to target
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, dragTarget.current.x, 0.12);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, dragTarget.current.y, 0.12);

    badgeGroup.current.position.x = currentPos.current.x;
    badgeGroup.current.position.y = currentPos.current.y;

    // 3. Calculate actual physical velocity of the badge movement
    const velX = currentPos.current.x - lastPos.current.x;
    const velY = currentPos.current.y - lastPos.current.y;
    lastPos.current.x = currentPos.current.x;
    lastPos.current.y = currentPos.current.y;

    // 4. Calculate responsive card swing/tilt based on velocity
    const targetTiltZ = -velX * 3.5; // Drag left -> swing right
    const targetTiltX = velY * 3.5;  // Drag down -> tilt forward
    
    // Slight ambient idle sway based on time
    const time = state.clock.getElapsedTime();
    const idleSwayZ = Math.sin(time * 1.5) * 0.03;
    const idleSwayX = Math.cos(time * 1.2) * 0.02;

    // 5. Apply rotations smoothly to the Card Pivot
    cardGroup.current.rotation.z = THREE.MathUtils.lerp(cardGroup.current.rotation.z, targetTiltZ + idleSwayZ, 0.15);
    cardGroup.current.rotation.x = THREE.MathUtils.lerp(cardGroup.current.rotation.x, targetTiltX + idleSwayX, 0.15);
    
    // Add a tiny bit of Y depth rotation based on absolute X position for a 3D parallax feel
    cardGroup.current.rotation.y = THREE.MathUtils.lerp(cardGroup.current.rotation.y, currentPos.current.x * 0.15, 0.05);
  });

  // Dynamically scale badge to fit narrow viewport widths on mobile
  const responsiveScale = Math.min(0.7, viewport.width / 6.5);

  return (
    <group position={[0, 0, 0]} scale={responsiveScale}>
      
      <group 
        ref={badgeGroup} 
        name="BadgeAssembly"
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        
        {/* Lanyard Group */}
        <group name="Lanyard" position={[0, 3.9, 0]}>
          <mesh>
            <boxGeometry args={[0.25, 6, 0.01]} />
            <meshStandardMaterial color="#050505" roughness={0.9} />
          </mesh>
          
          {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
            <Text
              key={i}
              position={[0, i * 0.8, 0.006]}
              rotation={[0, 0, -Math.PI / 2]}
              fontSize={0.08}
              fontWeight="bold"
              color="#ffffff"
              letterSpacing={0.1}
              fillOpacity={0.8}
              anchorX="center"
              anchorY="middle"
            >
              FELIX • WEB DEV
            </Text>
          ))}
        </group>

        {/* Connector Group */}
        <group name="Connector" position={[0, 0.9, 0]}>
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[0.1, 0.02, 16, 100]} />
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.15, 32]} />
            <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* Swinging ID Card Group - Pivots exactly at the ring (y: 0.9) */}
        <group ref={cardGroup} name="IDCardPivot" position={[0, 0.9, 0]}>
          
          {/* Card positioned below the pivot */}
          <group position={[0, -1.35, 0]}>
            <RoundedBox args={[1.55, 2.4, 0.04]} radius={0.08} smoothness={4}>
              <meshPhysicalMaterial 
                color="#050505" 
                metalness={0.5} 
                roughness={0.2} 
                clearcoat={1.0} 
                clearcoatRoughness={0.1} 
              />
            </RoundedBox>

            {/* Front Content */}
            <group position={[0, 0, 0.021]}>
              <Text position={[-0.6, 1.0, 0]} fontSize={0.2} fontWeight="bold" color="#ffffff" anchorX="left" anchorY="middle">
                F.
              </Text>

              <mesh position={[0, 0.7, 0]}>
                <planeGeometry args={[1.3, 0.005]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
              </mesh>

              {/* Bottom Left Details */}
              <group position={[-0.6, -0.25, 0]}>
                <Text position={[0, 0, 0]} fontSize={0.15} fontWeight="bold" color="#ffffff" anchorX="left" anchorY="middle">
                  Felix
                </Text>
                <Text position={[0, -0.18, 0]} fontSize={0.15} fontWeight="bold" color="#ffffff" anchorX="left" anchorY="middle">
                  Verdianto
                </Text>

                <Text position={[0, -0.45, 0]} fontSize={0.06} color="#a0a0a0" anchorX="left" anchorY="middle" letterSpacing={0.05}>
                  WEB DEVELOPER
                </Text>
                <Text position={[0, -0.55, 0]} fontSize={0.05} color="#a0a0a0" anchorX="left" anchorY="middle" letterSpacing={0.05}>
                  AI-ASSISTED DEVELOPMENT
                </Text>

                <Text position={[0, -0.75, 0]} fontSize={0.04} color="#555555" anchorX="left" anchorY="middle">
                  © 2026
                </Text>
              </group>

              {/* Right Side Vertical Typography */}
              <Text 
                position={[0.55, -0.7, 0]} 
                rotation={[0, 0, Math.PI / 2]} 
                fontSize={0.4} 
                fontWeight="black" 
                color="#ffffff" 
                fillOpacity={0.05} 
                anchorX="left" 
                anchorY="middle"
              >
                FELIX
              </Text>
            </group>

            {/* Back Content */}
            <group position={[0, 0, -0.021]} rotation={[0, Math.PI, 0]}>
              <Text position={[0, 0, 0]} fontSize={0.15} color="#ffffff" fillOpacity={0.2} anchorX="center" anchorY="middle" letterSpacing={0.2}>
                ACCESS GRANTED
              </Text>
              <mesh position={[0, 0.8, 0]}>
                 <planeGeometry args={[1.55, 0.3]} />
                 <meshBasicMaterial color="#111111" />
              </mesh>
            </group>
          </group>

        </group>
      </group>
    </group>
  );
};

export default function InteractiveBadge3D() {
  return (
    <section id="badge" className="relative h-screen min-h-[800px] bg-[var(--bg)] transition-colors duration-500 overflow-hidden flex items-center justify-center pt-10 pb-32">
      
      {/* Huge Subtle Background Text */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[25vw] md:text-[20vw] font-black text-[var(--text)] opacity-[0.02] leading-none tracking-tighter whitespace-nowrap">
          FELIX
        </span>
      </div>

      {/* 3D Canvas */}
      <div className="relative z-10 w-full h-full max-w-5xl mx-auto">
        <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
          <spotLight position={[-5, 5, 5]} intensity={0.8} angle={0.5} penumbra={1} />
          
          <Environment preset="city" />

          <HangingBadge />

          <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={15} blur={2.5} far={4} />
        </Canvas>
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-[var(--muted)] text-xs tracking-widest uppercase opacity-50">
        Drag freely
      </div>
      
    </section>
  );
}
