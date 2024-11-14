import { useRef, useEffect } from "react";
import * as THREE from "three";

interface WobblingRingSphereProps {
  color?: string;
  cameraPositionX?: number;
  cameraPositionY?: number;
  cameraPositionZ?: number;
}

export default function WobblingRingSphere(props: WobblingRingSphereProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const {
    color = "black",
    cameraPositionX = 0,
    cameraPositionY = 0,
    cameraPositionZ = 0,
  } = props;

  useEffect(() => {
    // Store mountRef.current in a local variable to avoid ESLint warning
    const mountNode = mountRef.current;

    // Scene, Camera, and Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountNode!.clientWidth / mountNode!.clientHeight,
      0.1,
      1000,
    );
    camera.position.x = cameraPositionX;
    camera.position.y = cameraPositionY;
    camera.position.z = cameraPositionZ;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountNode?.appendChild(renderer.domElement);

    // Create a group to hold the rings
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    // Function to create points for a circular line with optional deformation
    const createCirclePoints = (
      radius: number,
      segments: number,
      time: number,
      wobbleIntensity: number,
    ) => {
      const points = [];
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        // Add a wobble effect by slightly altering the radius
        const wobble = 1 + wobbleIntensity * Math.sin(time * 5 + i * 0.3);
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius * wobble,
            0,
            Math.sin(angle) * radius * wobble,
          ),
        );
      }
      return points;
    };

    // Create the circular rings
    const rings: { ring: THREE.Line; radius: number }[] = [];
    const segments = 128;
    for (let i = 0; i < 15; i++) {
      const radius = 1;
      const points = createCirclePoints(radius, segments, 0, 0.01);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: color,
      });

      const ring = new THREE.LineLoop(geometry, material);
      rings.push({ ring, radius });
      ringsGroup.add(ring);
    }

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      const time = performance.now() * 0.0005;

      rings.forEach(({ ring, radius }, index) => {
        const offset = index * 0.9;

        // Calculate y position in a range of [-1, 1] and map it to a spherical shape
        const positionY = ((time * 0.5 + offset) % 2) - 1;

        // Calculate radius based on positionY to form a spherical outline
        const currentRadius = Math.sqrt(1 - positionY ** 2); // Circular cross-section of a sphere

        // Update ring position and scale
        ring.position.y = positionY;
        ring.scale.set(currentRadius, currentRadius, currentRadius);

        // Update vertices with deformation for the wobble effect
        const newPoints = createCirclePoints(
          radius,
          segments,
          time + offset,
          0.1,
        );
        ring.geometry.setFromPoints(newPoints); // Update geometry points for wobbling
      });

      renderer.render(scene, camera);
    };

    // Start the animation
    animate();

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(mountNode!.clientWidth, mountNode!.clientHeight);
      camera.aspect = mountNode!.clientWidth / mountNode!.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Clean up on unmount using the local variable mountNode
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mountNode) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, [color, cameraPositionZ]); // Re-run the effect whenever the props change

  return <div ref={mountRef} className="fixed inset-0 z-[-1]" />;
}
