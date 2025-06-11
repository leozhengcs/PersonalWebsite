import { supabase } from "$lib/supabaseClient";

export const load = async () => {
    const { data } = await supabase.from('projects').select();
    return {
        data: data ?? []
    }
}