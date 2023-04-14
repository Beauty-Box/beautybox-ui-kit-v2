export const colors = ['primary', 'white', 'info'] as const;
export type Colors = (typeof colors)[number] | `#${string}`;
export interface PropsColors {
    color?: Colors;
}
