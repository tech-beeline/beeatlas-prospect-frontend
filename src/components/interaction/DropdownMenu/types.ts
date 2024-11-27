import { Icons } from '@beeline/design-tokens/js/iconfont';

interface IDropdownMenuItem {
    title: string;
    icon: Icons;
    onClick: () => Promise<unknown> | void;
    dangerous?: boolean;
    disabled?: boolean;
}

export interface IDropdownMenu {
    id: string;
    items: IDropdownMenuItem[][];
}
