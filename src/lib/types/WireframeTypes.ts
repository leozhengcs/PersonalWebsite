export const CategoryColors: Record<string, number> = {
    Hobbies: 0x0A9DC2,
    Skills: 0xE11A1A,
    Education: 0x3A6C3E
}

export interface FunFact {
    category: string,
    title: string,
    description: string
}