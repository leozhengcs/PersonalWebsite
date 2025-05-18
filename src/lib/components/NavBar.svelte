<script lang='ts'>
    import { navbarState } from "$lib/stores/navbar.svelte";
    import Signature from "$lib/assets/signature.svelte";

    const state = $state(navbarState);
</script>

<nav class={`w-full h-24 ${state.backgroundColor} px-5 py-2 absolute top-0`}>
    <div class="h-full flex items-center">
        <Signature stroke="text-white"/>
    </div>
</nav>