import { supabase } from "$lib/supabaseClient";
import { listAllFiles } from "../../../handlers/DatabaseHandlers";

export const load = async () => {
    const { data } = await supabase.from('projects').select();
    const paths = await listAllFiles();

    const filteredPaths = paths.filter(path => !path.endsWith('/emptyFolderPlaceholder') && !path.endsWith('emptyFolderPlaceholder'));

    const imageEntries = filteredPaths.map(path => {
        const project = path.split('/')[0]; // top-level folder = project name
        const { data } = supabase.storage.from('projects').getPublicUrl(path);

        return {
            project,
            path,
            url: data.publicUrl
        };
    });

    // Group images by project
    const grouped: Record<string, typeof imageEntries> = {};

    for (const img of imageEntries) {
        if (!grouped[img.project]) grouped[img.project] = [];
        grouped[img.project].push(img);
    }

    return {
        data: data ?? [],
        grouped: grouped ?? []
    }
}
