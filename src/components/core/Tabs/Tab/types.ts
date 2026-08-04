export interface ITab {
    isActive?: boolean;
    children: any;
    onClick: (e: React.MouseEvent) => void;
    href: string;
}
