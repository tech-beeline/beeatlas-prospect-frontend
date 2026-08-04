export interface Point {
    x: number;
    y: number;
}

export interface EdgeLabel {
    text: string;
    x: number;
    y: number;
    align: CanvasTextAlign;
}

export interface EdgeLabelGeom extends EdgeLabel {}
