<script lang='ts'>
    import Footer from "$lib/components/Footer.svelte";

    let { children } = $props();
</script>

<main class="min-h-[100vh] pt-40 text-secondary">
    {@render children()}
    <Footer/>
</main>
