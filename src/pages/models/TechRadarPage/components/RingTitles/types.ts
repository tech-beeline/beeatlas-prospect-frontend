export interface IRingTitles {
    topTitlesPosition?: { hold: number; assess: number; trial: number; adopt: number };
    leftTitlesPosition?: number;
    type?: TRing;

    handleRing: (ring: TRing) => void;
}

type TRing = 'hold' | 'assess' | 'trial' | 'adopt';
