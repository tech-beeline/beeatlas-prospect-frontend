type Side = 'left' | 'right';

export interface IPanelRestoreButton {
    side: Side;
    onClick: () => void;
}
