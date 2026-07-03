import React, { useMemo } from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { Icon } from '../Icon';

import type { TimelineAtomProps } from './types';
import * as S from './units';
import { classNames } from './utils';

export const TimelineAtom = ({
    type = 'current',
    position = 'top',
    direction = 'vertical',
    iconName,
    collapsable = false,
    collapsed = false,
}: TimelineAtomProps) => {
    const atomIconName = useMemo(() => {
        if (iconName) {
            return iconName;
        }

        if (type === 'error') {
            return Icons.Close;
        }

        if (position === 'bottom') {
            return Icons.Check;
        }

        return Icons.FastArrowDown;
    }, [iconName, type, position]);

    return (
        <S.Atom
            data-testid="TimelineAtom"
            className={classNames('dsb_atom', `dsb_atom__${direction}`, `dsb_atom__${position}`)}
            $direction={direction}
        >
            <S.AtomContent
                className={classNames(
                    'dsb_atom-content',
                    collapsable && collapsed && 'dsb_atom-content__collapsed',
                    `dsb_atom-content__${position}`,
                    `dsb_atom-content__${type}`,
                    `dsb_atom-content__${direction}`,
                )}
                $type={type}
                $position={position}
                $direction={direction}
                $collapsed={collapsable && collapsed}
            >
                <S.AtomIcon
                    className={classNames('dsb_atom-icon', `dsb_atom-icon__${type}`)}
                    $type={type}
                >
                    {(type === 'current' || type === 'error') && (
                        <Icon size="medium" iconName={atomIconName} />
                    )}
                </S.AtomIcon>
            </S.AtomContent>
        </S.Atom>
    );
};
