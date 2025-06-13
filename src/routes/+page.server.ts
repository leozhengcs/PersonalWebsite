import { supabase } from "$lib/supabaseClient"

export const load = async () => {
    const { data } = await supabase.from('facts').select();
    data?.sort((a, b) => a.category - b.category);

    return {
        funFacts: data ?? []
    }
}