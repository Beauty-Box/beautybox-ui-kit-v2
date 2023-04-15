export const variants = ['fill', 'outline', 'text'] as const;
export type Variants = (typeof variants)[number];

export interface PropsVariant {
    variant?: Variants;
}
