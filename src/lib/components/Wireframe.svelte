<script lang='ts'>
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

  let container: HTMLDivElement;
  let isMouseInContainer = $state(false);
  const clock = new THREE.Clock();

  onMount(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x161925);
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    container.addEventListener('mouseenter', () => {
      isMouseInContainer = true;
    });

    container.addEventListener('mouseleave', () => {
      isMouseInContainer = false;
    });

    const geometry = new THREE.OctahedronGeometry( 5, 2);
    const edges = new THREE.EdgesGeometry( geometry ); 
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 
    scene.add(line);

    camera.position.z = 25;

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Handle resizing
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta() / 4;

      controls.update();
      if (!isMouseInContainer) {
        line.rotation.y += delta;
        line.rotation.x += delta;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  });
</script>
  
<style>
  .three-container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
</style>

<div bind:this={container} class="three-container"></div>
  