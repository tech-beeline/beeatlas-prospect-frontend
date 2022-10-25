export interface ITab {
    isActive?: boolean;
    children: any;
    onClick: () => void;
}
