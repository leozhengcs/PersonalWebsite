<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

  let container: HTMLDivElement;
  let desktopDisplayTT: HTMLDivElement;
  let isMouseInContainer = false;

  const clock = new THREE.Clock();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  onMount(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x161925);
    const camera = new THREE.PerspectiveCamera(25, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    container.addEventListener('mouseenter', () => {
      isMouseInContainer = true;
    });

    container.addEventListener('mouseleave', () => {
      isMouseInContainer = false;
    });

    const geometry = new THREE.OctahedronGeometry(5, 2);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.MeshBasicMaterial({ color: 0xF7F0F5, wireframe: true });
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xF7F0F5 }));
    scene.add(line);

    const vertexNodes: THREE.Mesh[] = [];

    const positionAttr = geometry.getAttribute('position');
    const vertices = new Set<string>();

    for (let i = 0; i < positionAttr.count; i++) {
      const vertex = new THREE.Vector3().fromBufferAttribute(positionAttr, i);
      const key = `${vertex.x.toFixed(4)},${vertex.y.toFixed(4)},${vertex.z.toFixed(4)}`;
      if (!vertices.has(key)) {
        vertices.add(key);
        const material = new THREE.MeshBasicMaterial({ color: 0xF7F0F5 });
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), material);
        sphere.position.copy(vertex);
        sphere.userData = { info: `Vertex ${i}` };
        line.add(sphere);
        vertexNodes.push(sphere);
      }
    }

    camera.position.z = 25;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;

    const handleResize = () => {};
    window.addEventListener('resize', handleResize);

    container.addEventListener('click', (event) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // reset all colors
      vertexNodes.forEach((v) => {
        (v.material as THREE.MeshBasicMaterial).color.set(0xF7F0F5);
      });

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(vertexNodes);

      if (intersects.length > 0) {
        const clicked = intersects[0].object as THREE.Mesh;
        // Highlight the clicked vertex
        (clicked.material as THREE.MeshBasicMaterial).color.set(0x233958);

        // Show the tooltip
        desktopDisplayTT.classList.add('lg:opacity-100');
        desktopDisplayTT.classList.remove('translate-x-10');
      } else {
        // Optional: hide if clicking outside vertices
        desktopDisplayTT.classList.remove('lg:opacity-100');
        desktopDisplayTT.classList.add('translate-x-10');
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);

      if (!container) return;

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
      renderer.domElement.remove();

      geometry.dispose();
      material.dispose();
    };
  });
</script>

<div class="h-[100vh] flex justify-center items-center bg-black">
  <div bind:this={container} class="w-[30vw] h-[50vh]"></div>
  <!-- Desktop Tooltip -->
  <div bind:this={desktopDisplayTT} id="desktop-display" class="opacity-0 absolute right-40 w-fit min-w-80 bg-gray rounded-lg p-10 text-white transition-all duration-300 translate-x-10 ease-in-out">
    <h1 class="text-white font-bold text-xl opacity-100">Fun Fact</h1>
    <span>Peter</span>
  </div>
  <!-- Mobile Tooltip -->
</div>
