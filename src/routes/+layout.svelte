<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { navbarState } from '$lib/stores/navbar.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit'
	import '../app.css';
	
	injectAnalytics();
	navbarState.show = true;

	let { children } = $props();
</script>

{#if navbarState.show}
	<NavBar/>
{/if}
{@render children()}