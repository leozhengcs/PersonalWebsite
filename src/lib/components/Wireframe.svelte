<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { CategoryColors } from '$lib/types/WireframeTypes';
  import type { FunFact } from '$lib/types/WireframeTypes';

  let { funFacts }: { funFacts: FunFact[] } = $props();

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

    const group = new THREE.Group();
    scene.add(group);

    const vertexNodes: THREE.Mesh[] = [];
    const positionAttr = geometry.getAttribute('position');
    const vertices = new Set<string>();

    // Sort funFacts by category (you can customize the sort logic if needed)
    const sortedFacts = [...funFacts].sort((a, b) => {
      if (a.category < b.category) return -1;
      if (a.category > b.category) return 1;
      return 0;
    });

    let factIndex = 0;

    for (let i = 0; i < positionAttr.count && factIndex < sortedFacts.length; i++) {
      const vertex = new THREE.Vector3().fromBufferAttribute(positionAttr, i);
      const key = `${vertex.x.toFixed(4)},${vertex.y.toFixed(4)},${vertex.z.toFixed(4)}`;

      if (!vertices.has(key)) {
        vertices.add(key);

        const fact = sortedFacts[factIndex];
        const color = CategoryColors[fact.category] || 0x5B5B5B;

        const sphereMaterial = new THREE.MeshBasicMaterial({ color });
        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.15, 64, 64),
          sphereMaterial
        );

        sphere.position.copy(vertex);
        sphere.userData = {
          title: fact.title,
          description: fact.description,
          category: fact.category,
          color,
        };

        line.add(sphere); // add sphere to the rotating wireframe
        vertexNodes.push(sphere);

        factIndex++;
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
        const defaultColor = (v.userData.color as number) || 0x5B5B5B;
        (v.material as THREE.MeshBasicMaterial).color.set(defaultColor);
      });

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(vertexNodes);

      if (intersects.length > 0) {
        const clicked = intersects[0].object as THREE.Mesh;
        const { description, title, category } = clicked.userData;

        // Highlight the clicked vertex
        (clicked.material as THREE.MeshBasicMaterial).color.set(0xF7F0F5);

        // Show the tooltip
        desktopDisplayTT.querySelector('span')!.textContent = title;
        desktopDisplayTT.querySelector('small')!.textContent = category;
        desktopDisplayTT.querySelector('p')!.textContent = description;

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

<div class="h-[100vh] flex justify-center items-center bg-primary">
  <div bind:this={container} class="lg:w-[600px] lg:h-[600px]"></div>
  <!-- Desktop Tooltip -->
  <div bind:this={desktopDisplayTT} id="desktop-display" class="opacity-0 absolute flex flex-col gap-3 right-40 w-fit max-w-80 bg-gray/20 rounded-lg p-10 text-secondary text-lg transition-all duration-300 translate-x-10 ease-in-out">
    <span></span>
    <small></small>
    <p></p>
  </div>
  <!-- Mobile Tooltip -->
</div>
