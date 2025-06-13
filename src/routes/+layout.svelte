<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit'
	import '../app.css';
	injectAnalytics();

	let { children } = $props();
</script>

<NavBar/>
{@render children()}