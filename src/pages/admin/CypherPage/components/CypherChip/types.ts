export interface ICypherChip {
    tooltipId: string;
    text: string;

    isActive?: boolean;
    onClick?: () => void;
    onClear?: () => void;
}
