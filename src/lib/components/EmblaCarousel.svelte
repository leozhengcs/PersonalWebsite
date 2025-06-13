<script lang='ts'>
    import emblaCarouselSvelte from "embla-carousel-svelte";
    import Autoplay from "embla-carousel-autoplay";

    let { images }  = $props();

    const options = { loop: true }
    const plugins = [Autoplay({ delay: 4000, stopOnMouseEnter: true })]
</script>

<div class='w-full h-[400px] rounded-lg overflow-hidden' use:emblaCarouselSvelte={{ plugins, options }}>
    <div class="flex">
        {#each images as image}
            <div class='min-w-0 flex-none w-full h-full'>
                <img src={image.url} alt="" class='w-full h-full'>
            </div>
        {/each}
    </div>
</div>