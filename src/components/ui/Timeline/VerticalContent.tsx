import React from 'react';

import { Typography } from '../Typography';

import { TimelineAtom } from './TimelineAtom';
import type { VerticalContentProps } from './types';
import * as S from './units';
import { classNames } from './utils';

export const VerticalContent = ({
    id,
    type,
    position,
    title,
    text,
    signature,
    action,
    collapsable = false,
    collapsed = false,
    iconName,
}: VerticalContentProps) => {
    const variant = type === 'active' || type === 'inactive' ? 'body2' : 'subtitle2';

    return (
        <S.VerticalItem
            data-testid="VerticalContent"
            className="dsb-timeline__vertical"
            role="listitem"
        >
            <TimelineAtom
                type={type}
                position={position}
                direction="vertical"
                collapsable={collapsable}
                collapsed={collapsed}
                iconName={iconName}
            />
            <S.VerticalBody className="dsb-timeline-body timeline-vertical-body">
                <S.VerticalBodyTitle
                    className={classNames(
                        'dsb-timeline-body-title',
                        `dsb-timeline-body-title__${type}`,
                    )}
                >
                    {title && (
                        <Typography
                            variant={variant}
                            className={classNames(
                                'dsb-timeline-body-title-name',
                                `dsb-timeline-body-title-name__${type}`,
                            )}
                        >
                            {title}
                        </Typography>
                    )}
                    {signature && (
                        <Typography
                            variant="caption"
                            className={classNames(
                                'dsb-timeline-body-title-signature',
                                `dsb-timeline-body-title-signature__${type}`,
                            )}
                        >
                            {signature}
                        </Typography>
                    )}
                </S.VerticalBodyTitle>
                {text && (
                    <Typography
                        variant="body3"
                        className={classNames(
                            'dsb-timeline-body-text',
                            `dsb-timeline-body-text__${type}`,
                        )}
                    >
                        {text}
                    </Typography>
                )}
                {(type === 'current' || type === 'error') && action && (
                    <S.VerticalBodyAction className="dsb-timeline-body-action">
                        {action}
                    </S.VerticalBodyAction>
                )}
            </S.VerticalBody>
        </S.VerticalItem>
    );
};
