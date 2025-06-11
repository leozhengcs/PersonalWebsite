<script lang='ts'>
    import { getUniqueTechs, getUniqueYears, filterByTech, filterByYear } from '../../../handlers/DatabaseHandlers';
    
    let { data } = $props();
    let project = $state('');
    let filteredTech = $state('Javascript');
    let filteredYear = $state('');

    const years = getUniqueYears(data.data);
    const techs = getUniqueTechs(data.data);
</script>

<div class='grid auto-rows-auto grid-cols-[25%_75%] mx-24 gap-px bg-gray'>
    <h1 class='text-5xl mb-10 col-span-2 bg-primary w-full h-full'>Projects</h1>
    <section class='w-full h-full flex flex-col gap-5 bg-primary pt-10'>
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
        <span class={`${project === '' ? 'text-base' : 'text-3xl'}`}>{project === '' ? "Please click 'View' on a project to get started" : project}</span>
    </section>
    <div class='w-full h-full bg-primary'>
        
    </div>
</div>