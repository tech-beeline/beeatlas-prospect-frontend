export interface IBiMenu {
    biId: number;
    index: number;
    totalLength: number;

    removeBi: (id: number) => void;
    moveBi: (index: number, up: boolean) => void;
}
