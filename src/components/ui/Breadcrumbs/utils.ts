import type { ReactNode } from 'react';

export const normalizeChildren = (children?: ReactNode | ReactNode[]): ReactNode[] => {
    if (!children) {
        return [];
    }

    return Array.isArray(children) ? children : [children];
};
