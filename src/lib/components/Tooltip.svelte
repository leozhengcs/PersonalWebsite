<script lang='ts'>
    import { onMount, onDestroy } from "svelte";
    import { Spring } from "svelte/motion";

    let { text, children = null } = $props();

    let tooltipEl: HTMLElement | null = $state(null);
    let visible = $state(false);
    let coords = new Spring({ x: 0, y: 0 });

    function handleMouseMove(event: MouseEvent) {
        coords.target = { x: event.clientX + 25, y: event.clientY + 25 }
    }

    function handleMouseEnter(event: MouseEvent) {
        coords.set({ x: event.clientX + 25, y: event.clientY + 25 }, { instant: true });
        visible = true;
        window.addEventListener('mousemove', handleMouseMove);
    }

    function handleMouseLeave() {
        visible = false;
        window.removeEventListener('mousemove', handleMouseMove);
    }

    onMount(() => {
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        }
    });
</script>

<div
    role='presentation'
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    class='inline-block w-fit cursor-default'
>
    {@render children?.()}
    {#if visible}
        <div 
            bind:this={tooltipEl}
            class="fixed pointer-events-none z-50 bg-gray-800 text-secondary text-sm px-2 py-1 rounded shadow transition-opacity duration-100"
            style="left: {coords.current.x}px; top: {coords.current.y}px;"
        >
            {text}
        </div>
    {/if}
</div>