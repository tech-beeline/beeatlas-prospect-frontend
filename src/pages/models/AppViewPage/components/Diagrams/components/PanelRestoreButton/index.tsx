import React, { FC } from 'react';

import { Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { PanelEdgeToggleButton } from '../../units';

import { IPanelRestoreButton } from './types';
import * as S from './units';

export const PanelRestoreButton: FC<IPanelRestoreButton> = ({ side, onClick }) => {
    const RestoreHit = side === 'left' ? S.LeftPanelRestoreHit : S.RightPanelRestoreHit;
    const iconName = side === 'left' ? Icons.NavArrowRight : Icons.NavArrowLeft;
    const surface = side === 'left' ? 'leftPanel' : 'rightPanel';

    return (
        <RestoreHit>
            <PanelEdgeToggleButton type="button" $surface={surface} onClick={onClick}>
                <Icon size="medium" iconName={iconName} />
            </PanelEdgeToggleButton>
        </RestoreHit>
    );
};
