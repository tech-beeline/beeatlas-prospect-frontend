export interface IHint {
    text: string;
    tooltipId: string;
    isInfo?: boolean;

    children?: React.ReactElement;
}
