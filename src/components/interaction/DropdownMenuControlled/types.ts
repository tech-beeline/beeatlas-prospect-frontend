import { Icons } from 'styles/design-tokens/js/iconfont';

interface IDropdownMenuControlledcItem {
    title: string;
    icon: Icons;
    onClick: () => Promise<unknown> | void;
    dangerous?: boolean;
    disabled?: boolean;
}

export interface IDropdownMenuControlled {
    id: string;
    items: IDropdownMenuControlledcItem[][];
    onOpen?: () => void;
    onClose?: () => void;
}
