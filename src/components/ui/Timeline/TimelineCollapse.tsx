import React from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { Icon } from '../Icon';
import { Typography } from '../Typography';

import { TimelineAtom } from './TimelineAtom';
import type { TimelineCollapseProps } from './types';
import * as S from './units';
import { classNames } from './utils';

export const TimelineCollapse = ({
    onCollapse,
    collapsed,
    className,
    takenStepsCount,
    amountStepsCount,
    completed = false,
    pastSteps = false,
    children,
}: TimelineCollapseProps) => {
    const takenStepsText = completed ? amountStepsCount : takenStepsCount;

    return (
        <S.CollapseRoot
            data-testid="TimelineCollapse"
            className={classNames('dsb_timeline-collapse', className)}
        >
            {pastSteps && (
                <S.CollapseBody className="dsb_timeline-collapse-body">
                    <TimelineAtom type="active" position="top" />
                    <S.CollapseBodyTitle
                        role="button"
                        tabIndex={0}
                        className="dsb_timeline-collapse-body-title"
                        onClick={onCollapse}
                        onKeyDown={(event) => event.key === 'Enter' && onCollapse?.()}
                    >
                        <Typography variant="body2">
                            <S.CollapseBodyTitleText
                                className={classNames(
                                    'dsb_timeline-collapse-body-title-text',
                                    collapsed && 'dsb_timeline-collapse-body-title-text__collapsed',
                                )}
                                $collapsed={collapsed}
                            >
                                {collapsed
                                    ? `Завершено ${takenStepsText} из ${amountStepsCount} этапов`
                                    : 'Свернуть'}
                            </S.CollapseBodyTitleText>
                        </Typography>
                        <S.CollapseBodyTitleIcon
                            className={classNames(
                                'dsb_timeline-collapse-body-title-icon',
                                collapsed && 'dsb_timeline-collapse-body-title-icon__collapsed',
                            )}
                            $collapsed={collapsed}
                        >
                            <Icon size="medium" iconName={Icons.NavArrowUp} />
                        </S.CollapseBodyTitleIcon>
                    </S.CollapseBodyTitle>
                </S.CollapseBody>
            )}
            <S.CollapseContent
                className={classNames(
                    'dsb_timeline-collapse-content',
                    collapsed && 'dsb_timeline-collapse-content__collapsed',
                )}
                $collapsed={collapsed}
            >
                {children}
            </S.CollapseContent>
        </S.CollapseRoot>
    );
};
