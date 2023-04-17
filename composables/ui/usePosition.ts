export const positions = ['fixed', 'absolute', 'relative', 'static', 'sticky'] as const;
export type Positions = (typeof positions)[number];

export interface PropsPositions {
    position?: Positions;
}
