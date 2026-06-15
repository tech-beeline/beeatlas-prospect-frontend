import React, { FC } from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { IconButton } from '../IconButton';

import { ExpansionPanelTitleProps } from './types';
import * as S from './units';
import {
    classNames,
    renderDescriptionContent,
    renderSubTitleContent,
    renderTitleContent,
} from './utils';

export const ExpansionPanelTitle: FC<ExpansionPanelTitleProps> = ({
    open = false,
    title,
    subTitle,
    description,
    iconName = Icons.NavArrowDown,
    customButton,
    className,
    onClick,
    ...props
}) => (
    <S.StyledExpansionPanelTitle
        data-testid="ExpansionPanelTitle"
        className={classNames('dsb_expansion-panel-title', className)}
        onClick={onClick}
        {...props}
    >
        <div className="dsb_title-left-part">
            {renderTitleContent(title)}
            {renderSubTitleContent(subTitle)}
        </div>

        {description && (
            <div className="dsb_title-right-part">{renderDescriptionContent(description)}</div>
        )}

        <div className="dsb_title-button-part">
            {customButton || (
                <IconButton
                    aria-expanded
                    size="large"
                    iconName={iconName}
                    className={classNames(
                        'dsb_expansion-icon-button',
                        open && 'dsb_expansion-icon-button__rotated',
                    )}
                />
            )}
        </div>
    </S.StyledExpansionPanelTitle>
);
