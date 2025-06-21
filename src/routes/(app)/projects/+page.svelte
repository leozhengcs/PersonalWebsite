<script lang='ts'>
    import { getUniqueTechs, getUniqueYears, filterByTech, filterByYear } from '../../../handlers/DatabaseHandlers';
    import { TechLogoMapping } from '../../../handlers/AssetsHandler';
    import { formatDate } from '../../../handlers/ClientHandlers';
    import Tooltip from '$lib/components/Tooltip.svelte';
	import EmblaCarousel from '$lib/components/EmblaCarousel.svelte';
    import type { Project } from '$lib/types/DatabaseTypes';

    let { data } = $props();

    // Project View Section
    let selectedProject = $state(false);
    let projectTitle = $state('');
    let projectDescription = $state('');
    let projectLink = $state('');
    let projectDate = $state('');
    let projectTech = $state<string[]>([]);

    const handleSelectProject = (project: Project) => {
        selectedProject = true;
        projectTitle = project.name;
        projectLink = project.link;
        projectDate = project.date;
        projectDescription = project.description;
        projectTech = project.tech_stack;
    }

    // let filteredTech = $state('');
    // let filteredYear = $state('');

    // const years = getUniqueYears(data.data);
    // const techs = getUniqueTechs(data.data);

    // console.log(data.data);
    // console.log(data.grouped[data.data[1].name.replace(" ", "").toLowerCase()]);
</script>

<div class='grid auto-rows-[auto_1fr] grid-cols-[25%_75%] mx-24 gap-px bg-gray h-[calc(100vh-200px)] overflow-hidden'>
    <h1 class='text-5xl mb-10 col-span-2 bg-primary w-full h-full'>Projects</h1>
    <section class='w-full h-full flex flex-col gap-5 bg-primary pt-10 pr-2'>
        <!-- <h1 class='text-xl mt-'>By Technology</h1>
        <div class="flex flex-col gap-2">
            {#each techs as tech}
            <div>
                <button 
                    class={`cursor-pointer w-fit relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-secondary after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100 ${tech === filteredTech ? 'after:scale-x-100': ''}`}
                >
                    {tech}
                </button>
            </div>
            {/each}
        </div>
        <h1 class='text-xl'>By Year</h1> -->
        {#if selectedProject}
            <h2 class='text-3xl'>{projectTitle}</h2>
            <div class='flex flex-row gap-2'>
                {#each projectTech as tech}
                    <Tooltip text={tech}>
                            <div class='w-8 h-8'>
                                <img class='w-full h-full object-contain' src={TechLogoMapping[tech.toLowerCase()]} alt="{tech} Logo">
                            </div>
                    </Tooltip>
                {/each}
            </div>
            <p>{projectDescription}</p>
        {:else}
            <h2>Please click 'View' on a project to get started</h2>
        {/if}
    </section>
    <div class='w-full h-full bg-primary flex flex-col gap-16 overflow-y-auto p-10'>
        {#each data.data as project}
            <section class='w-full bg-gray/20 rounded-lg p-10 flex flex-col gap-2'>
                <h1 class='text-3xl'>{project.name} <span class="text-base">/{formatDate(project.date)}</span></h1>
                <!-- Tech Stack -->
                <div class='w-full flex flex-row items-center gap-2'>
                    <h2 class='text-xl'>Tech Stack</h2>
                    {#each project.tech_stack as tech}
                        <Tooltip text={tech}>
                            <div class='w-8 h-8'>
                                <img class='w-full h-full object-contain' src={TechLogoMapping[tech.toLowerCase()]} alt="{tech} Logo">
                            </div>
                        </Tooltip>
                    {/each}
                </div>
                <!-- Images -->
                <!-- <div class='w-full h-[400px] rounded-lg overflow-hidden' use:emblaCarouselSvelte={{ plugins, options }}>
                    <div class="flex">
                        {#each data.grouped[project.name.replace(" ", "").toLowerCase()] as images}
                            <div class='min-w-0 flex-none w-full h-full'>
                                <img src={images.url} alt="" class='w-full h-full'>
                            </div>
                        {/each}
                    </div>
                </div> -->
                { console.log(project.name.replace(" ", "").toLowerCase()) }
                <EmblaCarousel images={data.grouped[project.name.replace(/\s+/g, "").toLowerCase()]}/>
                <div class='flex w-full justify-end gap-5'>
                    <button 
                        class='p-2 w-fit bg-blue rounded-lg hover:bg-cream/50 transition-colors duration:600 hover:cursor-pointer'
                        onclick={() => handleSelectProject(project)}
                    >View</button>
                    <Tooltip text='Under construction!'>
                        <button class='p-2 w-fit bg-blue rounded-lg hover:bg-cream/50 transition-colors duration:600 hover:cursor-pointer'>Learn More</button>
                    </Tooltip>
                </div>
            </section>
        {/each}
    </div>
</div>