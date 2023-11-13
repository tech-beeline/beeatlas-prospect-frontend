export interface IData {
    label: string;
    quadrant: number;
    ring: number;
    link?: string;
    category?: string;
    x?: any;
    y?: any;
    segment?: any;
}

export type TRing = 'hold' | 'assess' | 'trial' | 'adopt';
