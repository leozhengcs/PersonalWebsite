<script lang='ts'>
    import { navbarState } from "$lib/stores/navbar.svelte";
    import Signature from "$lib/assets/signature.svelte";

    const state = $state(navbarState);
</script>

<nav class={`w-full h-32 ${state.backgroundColor} px-5`}>
    <div class="h-full">
        <Signature stroke="text-white"/>
    </div>
</nav>