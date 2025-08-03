import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const glowSphereRef = useRef<THREE.Mesh | null>(null);
  const lightningRef = useRef<THREE.Group | null>(null);
  const trailRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const trailParticles = useRef<Array<{ position: THREE.Vector3; life: number; velocity: THREE.Vector3 }>>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Particles
    const particlesCount = 1500;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = (Math.random() - 0.5) * 30;
      positions[i + 2] = (Math.random() - 0.5) * 30;

      colors[i] = 0.8 + Math.random() * 0.2;
      colors[i + 1] = 0.2 + Math.random() * 0.3;
      colors[i + 2] = 0.1 + Math.random() * 0.2;
      
      sizes[i / 3] = Math.random() * 0.08 + 0.02;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Glowing fireball sphere
    const sphereGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const sphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        intensity: { value: 1.0 },
        color1: { value: new THREE.Color(0xff2200) },
        color2: { value: new THREE.Color(0xff8800) },
        color3: { value: new THREE.Color(0xffaa00) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float intensity;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        float noise(vec3 p) {
          return sin(p.x * 10.0 + time * 2.0) * sin(p.y * 10.0 + time * 1.5) * sin(p.z * 10.0 + time * 1.8);
        }
        
        void main() {
          float n1 = noise(vPosition);
          float n2 = noise(vPosition * 2.0 + vec3(100.0));
          float n3 = noise(vPosition * 4.0 + vec3(200.0));
          
          float combinedNoise = (n1 + n2 * 0.5 + n3 * 0.25) / 1.75;
          
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 1.5);
          
          vec3 color = mix(color1, color2, combinedNoise * 0.5 + 0.5);
          color = mix(color, color3, fresnel * 0.3);
          
          float alpha = (fresnel + 0.3) * intensity * (0.7 + combinedNoise * 0.3);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const glowSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(glowSphere);

    // Lightning effect
    const lightningGroup = new THREE.Group();
    const createLightningBolt = () => {
      const points = [];
      const segments = 25;
      
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = (Math.random() - 0.5) * 3;
        const y = (Math.random() - 0.5) * 3;
        const z = (Math.random() - 0.5) * 3;
        points.push(new THREE.Vector3(x, y, z));
      }
      
      const lightningGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lightningMaterial = new THREE.LineBasicMaterial({
        color: 0xff4400,
        transparent: true,
        opacity: 0.9,
        linewidth: 3,
      });
      
      return new THREE.Line(lightningGeometry, lightningMaterial);
    };

    // Create multiple lightning bolts
    for (let i = 0; i < 8; i++) {
      const bolt = createLightningBolt();
      lightningGroup.add(bolt);
    }
    scene.add(lightningGroup);

    // Fire trail system
    const trailGroup = new THREE.Group();
    const maxTrailParticles = 200;
    
    const trailGeometry = new THREE.BufferGeometry();
    const trailPositions = new Float32Array(maxTrailParticles * 3);
    const trailColors = new Float32Array(maxTrailParticles * 3);
    const trailSizes = new Float32Array(maxTrailParticles);
    const trailOpacities = new Float32Array(maxTrailParticles);

    trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    trailGeometry.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));
    trailGeometry.setAttribute('size', new THREE.BufferAttribute(trailSizes, 1));

    const trailMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          vColor = color;
          vOpacity = size; // Using size as opacity carrier
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          if (distanceToCenter > 0.5) discard;
          
          float alpha = (1.0 - distanceToCenter * 2.0) * vOpacity;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const trailPoints = new THREE.Points(trailGeometry, trailMaterial);
    trailGroup.add(trailPoints);
    scene.add(trailGroup);

    camera.position.z = 10;

    sceneRef.current = scene;
    rendererRef.current = renderer;
    particlesRef.current = particles;
    glowSphereRef.current = glowSphere;
    lightningRef.current = lightningGroup;
    trailRef.current = trailGroup;

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      prevMouseRef.current.x = targetMouseRef.current.x;
      prevMouseRef.current.y = targetMouseRef.current.y;
      
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Enhanced custom cursor with fire effect
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed;
      width: 50px;
      height: 50px;
      background: radial-gradient(circle, rgba(255,34,0,1) 0%, rgba(255,136,0,0.8) 30%, rgba(255,170,0,0.6) 60%, transparent 100%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: screen;
      transition: transform 0.1s ease;
      box-shadow: 
        0 0 20px rgba(255,34,0,0.8), 
        0 0 40px rgba(255,136,0,0.6),
        0 0 60px rgba(255,170,0,0.4);
      animation: fireballPulse 1.5s infinite;
    `;

    // Add fire pulsing animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fireballPulse {
        0%, 100% { 
          transform: scale(1); 
          opacity: 0.9;
          box-shadow: 
            0 0 20px rgba(255,34,0,0.8), 
            0 0 40px rgba(255,136,0,0.6),
            0 0 60px rgba(255,170,0,0.4);
        }
        50% { 
          transform: scale(1.3); 
          opacity: 1;
          box-shadow: 
            0 0 30px rgba(255,34,0,1), 
            0 0 60px rgba(255,136,0,0.8),
            0 0 90px rgba(255,170,0,0.6);
        }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(cursor);
    document.body.style.cursor = 'none';

    const updateCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX - 25 + 'px';
      cursor.style.top = e.clientY - 25 + 'px';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', updateCursor);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      timeRef.current += 0.016;

      // Smooth mouse following
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.1;

      // Add trail particles when mouse moves
      const mouseDelta = Math.sqrt(
        Math.pow(targetMouseRef.current.x - prevMouseRef.current.x, 2) +
        Math.pow(targetMouseRef.current.y - prevMouseRef.current.y, 2)
      );

      if (mouseDelta > 0.01) {
        for (let i = 0; i < 3; i++) {
          if (trailParticles.current.length < maxTrailParticles) {
            trailParticles.current.push({
              position: new THREE.Vector3(
                mouseRef.current.x * 4 + (Math.random() - 0.5) * 0.5,
                mouseRef.current.y * 4 + (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 2
              ),
              life: 1.0,
              velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.15,   // horizontal scatter
                Math.random() * 0.15 + 0.05,    // upward lift for rising smoke
                (Math.random() - 0.5) * 0.15
              )
            });
          }
        }
      }

      // Update trail particles
      const trailPositions = trailPoints.geometry.attributes.position.array as Float32Array;
      const trailColors = trailPoints.geometry.attributes.color.array as Float32Array;
      const trailSizes = trailPoints.geometry.attributes.size.array as Float32Array;

      for (let i = trailParticles.current.length - 1; i >= 0; i--) {
        const particle = trailParticles.current[i];
        particle.life -= 0.02;
        particle.position.add(particle.velocity);
        // add slight upward acceleration to mimic rising smoke
        particle.velocity.y += 0.002;
        particle.velocity.multiplyScalar(0.98);

        if (particle.life <= 0) {
          trailParticles.current.splice(i, 1);
        } else {
          const index = i * 3;
          trailPositions[index] = particle.position.x;
          trailPositions[index + 1] = particle.position.y;
          trailPositions[index + 2] = particle.position.z;

          // Fire-to-smoke color transition based on particle life
          const life = particle.life;
          const t = 1.0 - life; // 0 = fresh flame, 1 = dissipating smoke

          // Choose smoke color: red or white (randomly for variety)
          const smokeIsRed = Math.random() < 0.5;
          const fireR = 1.0, fireG = 0.5, fireB = 0.1;
          const smokeR = smokeIsRed ? 1.0 : 1.0;
          const smokeG = smokeIsRed ? 0.1 : 1.0;
          const smokeB = smokeIsRed ? 0.1 : 1.0;

          // Interpolate color from fire to smoke
          trailColors[index]     = fireR   * (1 - t) + smokeR * t;
          trailColors[index + 1] = fireG   * (1 - t) + smokeG * t;
          trailColors[index + 2] = fireB   * (1 - t) + smokeB * t;

          // Make smoke much larger for visibility
          trailSizes[i] = life > 0.5 
            ? life * 15 + 5            // shrinking flames
            : (1 - life) * 80 + 20;    // very large smoke
        }
      }

      // Clear unused particles
      for (let i = trailParticles.current.length; i < maxTrailParticles; i++) {
        const index = i * 3;
        trailPositions[index] = 0;
        trailPositions[index + 1] = 0;
        trailPositions[index + 2] = 0;
        trailColors[index] = 0;
        trailColors[index + 1] = 0;
        trailColors[index + 2] = 0;
        trailSizes[i] = 0;
      }

      trailPoints.geometry.attributes.position.needsUpdate = true;
      trailPoints.geometry.attributes.color.needsUpdate = true;
      trailPoints.geometry.attributes.size.needsUpdate = true;

      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.001;
        particlesRef.current.rotation.y += 0.0008;

        // Enhanced particle interaction
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;
        const sizes = particlesRef.current.geometry.attributes.size.array as Float32Array;

        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const y = positions[i + 1];
          
          const distance = Math.sqrt(
            Math.pow(x - mouseRef.current.x * 6, 2) + 
            Math.pow(y - mouseRef.current.y * 6, 2)
          );

          const intensity = Math.max(0, 1 - distance / 5);
          
          // Fire colors: red to orange to yellow
          colors[i] = 0.8 + intensity * 0.2;
          colors[i + 1] = 0.2 + intensity * 0.6;
          colors[i + 2] = intensity * 0.3;
          
          sizes[i / 3] = (0.03 + intensity * 0.1) * (1 + Math.sin(timeRef.current * 3 + i) * 0.4);
        }

        particlesRef.current.geometry.attributes.color.needsUpdate = true;
        particlesRef.current.geometry.attributes.size.needsUpdate = true;
      }

      // Animate glowing sphere
      if (glowSphereRef.current) {
        const sphere = glowSphereRef.current;
        sphere.position.x = mouseRef.current.x * 4;
        sphere.position.y = mouseRef.current.y * 4;
        sphere.rotation.x += 0.02;
        sphere.rotation.y += 0.025;
        
        const material = sphere.material as THREE.ShaderMaterial;
        material.uniforms.time.value = timeRef.current;
        material.uniforms.intensity.value = 1.2 + Math.sin(timeRef.current * 4) * 0.4;
      }

      // Animate lightning
      if (lightningRef.current) {
        lightningRef.current.position.x = mouseRef.current.x * 3;
        lightningRef.current.position.y = mouseRef.current.y * 3;
        lightningRef.current.rotation.z += 0.03;
        
        lightningRef.current.children.forEach((bolt, index) => {
          const line = bolt as THREE.Line;
          const material = line.material as THREE.LineBasicMaterial;
          material.opacity = 0.4 + Math.sin(timeRef.current * 6 + index) * 0.5;
          
          if (Math.random() < 0.015) {
            const points = [];
            const segments = 25;
            
            for (let i = 0; i <= segments; i++) {
              const x = (Math.random() - 0.5) * 4;
              const y = (Math.random() - 0.5) * 4;
              const z = (Math.random() - 0.5) * 4;
              points.push(new THREE.Vector3(x, y, z));
            }
            
            line.geometry.setFromPoints(points);
          }
        });
      }

      if (rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, camera);
      }
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('resize', handleResize);
      document.body.style.cursor = 'auto';
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);
  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};
export default ThreeBackground;