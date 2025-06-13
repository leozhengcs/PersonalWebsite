<!-- src/routes/mobile-blocked/+page.svelte -->
<script>
    import { navbarState } from "$lib/stores/navbar.svelte";
    navbarState.show = false;
</script>

<div class='w-full h-full pt-32 flex flex-col justify-center'>
    <h1 class='text-secondary text-3xl text-center'>Mobile Access Blocked</h1>
    <p class='text-secondary text-center'>This site's mobile view is still under construction please visit from a desktop computer!</p>
</div>
