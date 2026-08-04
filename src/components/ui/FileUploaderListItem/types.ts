import type { HTMLAttributes, ReactNode } from 'react';

import type { Icons } from 'styles/design-tokens/js/iconfont/icons';

export type FileState = 'process' | 'upload' | 'error';

export interface FileUploaderListItemFile {
    id?: string | number | symbol;
    name: string;
    state?: FileState;
    iconName?: Icons;
    type?: string;
}

export interface FileUploaderListItemAction {
    tooltip?: string;
    icon: Icons;
    onClick: (file: FileUploaderListItemFile) => void;
    showStatuses?: FileState[];
}

export interface FileUploaderListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
    id?: FileUploaderListItemFile['id'];
    name: FileUploaderListItemFile['name'];
    state?: FileUploaderListItemFile['state'];
    iconName?: FileUploaderListItemFile['iconName'];
    type?: FileUploaderListItemFile['type'];
    helperText?: string;
    percent?: number;
    size?: string;
    loaded?: string;
    actions?: FileUploaderListItemAction[] | ReactNode;
    onRemove?: (file: FileUploaderListItemFile) => void;
    onRefresh?: (file: FileUploaderListItemFile) => void;
}
