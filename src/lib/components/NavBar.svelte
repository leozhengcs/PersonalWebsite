<script lang='ts'>
    import { navbarState } from "$lib/stores/navbar.svelte";
    import Signature from "$lib/assets/signature.svelte";
    import { Hamburger } from "svelte-hamburgers";
    import { fade, fly, scale, slide } from "svelte/transition";
    import { scaleY } from "$lib/transitions/scaleY";
    import { backIn, backInOut } from "svelte/easing";
	import { tick } from "svelte";
    import Tooltip from "./Tooltip.svelte";

    let navState = $state(navbarState);

    // Navbar handlers
    let open = $state(false);
    const closeNav = () => { open ? open = !open : null; }

</script>

{#if open}
<div transition:fade={{ duration: 300 }} class="absolute top-0 w-full h-full bg-primary z-10 pt-32 px-32 gap-10">
    <div class='w-full h-full flex py-10'>
        <div class="flex flex-col gap-14">
            <a 
                href='/' 
                in:fly={{ duration: 600, delay: 100, x: -100, easing: backInOut }} 
                out:fade={{ duration: 300 }} class="w-fit text-secondary flex text-3xl relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-secondary after:transition-transform after:duration-300 hover:after:scale-x-100"
                onclick={closeNav}
            >
                Home
            </a>
            <a 
                href='/projects'
                onclick={closeNav} 
                in:fly={{ duration: 650, delay: 100, x: -100, easing: backInOut }} 
                out:fade={{ duration: 300 }} class="w-fit text-secondary flex text-3xl relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-secondary after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
                Projects
            </a>
            <Tooltip text='Under construction!'>
                <span  
                    in:fly={{ duration: 700, delay: 100, x: -100, easing: backInOut }} 
                    out:fade={{ duration: 300 }} class="text-secondary flex text-3xl"
                >
                    Blog
                </span>
            </Tooltip>
            <a 
                href='/about' 
                onclick={closeNav}
                in:fly={{ duration: 750, delay: 100, x: -100, easing: backInOut }} 
                out:fly={{ duration: 300 }} class="text-secondary flex text-3xl w-fit relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-secondary after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
                About
            </a>
        </div>
        <div class='flex flex-row gap-14 pl-14 w-full'>
            <div class="flex justify-center items-center h-full">
                <!-- Vertical Line -->
                <div 
                    class={`w-px h-full bg-secondary transform transition-transform duration-300 ease-in-out origin-center`}
                    class:animate-grow-from-center={open}
                    out:scaleY={{ duration: 300 }}
                ></div>
            </div>
            <section class='flex flex-col gap-14'>
                <h1 in:fly={{ duration: 600, delay: 100, x: 100, easing: backInOut}} class='text-secondary text-4xl'>About this site</h1>
                <p in:fly={{ duration: 600, delay: 100, x: 100, easing: backInOut}} class='text-secondary'>
                    When designing this website, I wanted to achieve a <i>bouncy</i> feeling that makes navigating the site feel smooth and seamless.
                    During planning, I wanted the website to showcase not only my technical skills but also make it fun for the user to interact with.
                    I chose the spinning globe thing to be the first thing you see upon visiting the site simply because I thought it was cool. But also because
                    of the fact that it naturally makes you want to interact with it. Though I do a lot of web development stuff, I am also very interested in AI and ML.
                    Hence, is why I also have a blog page where I will be uploading my latest findings and experiences regarding AI/ML and my latest projects on Kaggle
                    and other data science platforms.
                </p>
            </section>
        </div>
    </div>
</div>
{/if}

<nav class={`w-full h-24 ${navState.backgroundColor} px-5 py-2 absolute top-0 flex justify-between`}>
    <a class="h-full w-fit flex items-center z-50" href='/' onclick={closeNav}>
        <Signature stroke="text-secondary"/>
    </a>
    <div class='flex flex-row justify-center items-center gap-5'>
        <div class="flex flex-row gap-1 items-end">
            <a href="/leozheng-resume.pdf"
                download="Leo_Zheng_Web_Dev_Resume"
                class="flex flex-row items-end gap-1 relative text-secondary after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-secondary after:transition-transform after:duration-300 hover:after:scale-x-100">
                <span class="text-secondary text-xl p-0 m-0 leading-none">Resume</span>
                <div class="w-8 aspect-square self-end">
                    <img src="/icons/download.png" alt="download" class="w-full h-full object-contain" />
                </div>
            </a>
        </div>
        <div class="z-50">
            <Hamburger bind:open --color="#FFFFFA" --padding='0' --z-index='50'/>
        </div>
        <!-- <button onclick={toggleNest} class='text-secondary hover:cursor-pointer'>Update</button> -->
    </div>
</nav>