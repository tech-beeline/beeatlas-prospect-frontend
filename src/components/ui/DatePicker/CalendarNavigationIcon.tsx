import React from 'react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import { Icon } from 'components/ui';

import { classNames } from './utils';

type CalendarNavigationIconProps = {
    className?: string;
    direction: Icons;
    onClick?: () => void;
    disabled?: boolean;
    dataTestId?: string;
};

export const CalendarNavigationIcon = ({
    className: customClassName,
    direction,
    onClick,
    disabled = false,
    dataTestId,
}: CalendarNavigationIconProps) => (
    <Icon
        iconName={direction}
        className={classNames('dsb_calendar_icon', customClassName, disabled && 'disabled')}
        onClick={disabled ? undefined : onClick}
        size="large"
        dataTestId={dataTestId}
    />
);
