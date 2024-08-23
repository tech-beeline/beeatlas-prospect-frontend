import { Icons } from '@beeline/design-tokens/js/iconfont';

interface IDropdownMenuItem {
    title: string;
    icon: Icons;
    onClick: () => Promise<void> | void;
}

export interface IDropdownMenu {
    id: string;
    items: IDropdownMenuItem[];
}
