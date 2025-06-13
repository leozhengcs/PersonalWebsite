import { supabase } from "$lib/supabaseClient"

interface Project {
    created_at: Date,
    description: string,
    id: number,
    link: string,
    name: string,
    tech_stack: string[],
    date: string
}

export const filterByYear = (projects: Project[]) => {
    
}

export const filterByTech = (projects: Project[]) => {
    
}

export const getUnique = <T extends keyof Project>(projects: Project[], target: T) => {
    if (target === 'date') {

    }
    const allValues = projects.map((project) => project[target]);
    return new Set(allValues);
}

export const getUniqueYears = (projects: Project[]) => {
    const years = projects.map((project) => project.date.split('-')[0]);
    return new Set(years).values();
}

export const getUniqueTechs = (projects: Project[]) => {
    let techs: string[] = [];
    projects.forEach(project => {
        techs = techs.concat(project.tech_stack)
    });
    return new Set(techs).values();
}

export const listAllFiles = async (path = ''): Promise<string[]> => {
  const { data, error } = await supabase.storage.from('projects').list(path);

  if (error) {
    console.error(`Error listing path "${path}":`, error.message);
    return [];
  }

  let files: string[] = [];

  for (const item of data) {
    if (item.name) {
      const isFolder = item.id === null || item.metadata === null;

      if (isFolder) {
        const nestedFiles = await listAllFiles(`${path}${item.name}/`);
        files = files.concat(nestedFiles);
      } else {
        files.push(`${path}${item.name}`);
      }
    }
  }

  return files;
}
