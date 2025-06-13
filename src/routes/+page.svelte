<script lang='ts'>
    import Wireframe from "$lib/components/Wireframe.svelte";

    let { data } = $props();
</script>

<main>
    <Wireframe funFacts={data.funFacts}/>
</main>