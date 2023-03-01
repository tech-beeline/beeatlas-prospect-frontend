export interface ILink {
    children: string;
    path: string;
    type?: 'default' | 'file';
    isInner?: boolean;
    fontSize?: number;
    noLine?: boolean;
    isInline?: boolean;
}
