export const sizes = ['small', 'medium', 'large'] as const;
export type Sizes = (typeof sizes)[number];
export interface PropsSize {
    size?: Sizes;
}
