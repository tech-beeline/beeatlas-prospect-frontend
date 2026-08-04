import React, { FC } from 'react';

import { DropdownMenu } from 'components/interaction';
import { Button, Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { TOOLBAR_EXPORT_BUTTONS } from './const';
import { DiagramToolbarProps } from './types';
import * as S from './units';
import { runGraphAction } from './utils';

export const DiagramToolbar: FC<DiagramToolbarProps> = ({
    canGoBack,
    graphRef,
    onBack,
    interactionMode,
    onToggleInteractionMode,
}) => {
    const exportMenuItems = TOOLBAR_EXPORT_BUTTONS.map((button) => ({
        title: button.title,
        icon: Icons.Download,
        onClick: () => {
            if (button.key === 'png') {
                runGraphAction(graphRef, (handle) => handle.exportPng());
                return;
            }
            if (button.key === 'svg') {
                runGraphAction(graphRef, (handle) => handle.exportSvg());
                return;
            }
            if (button.key === 'json') {
                runGraphAction(graphRef, (handle) => handle.exportJson());
                return;
            }
            runGraphAction(graphRef, (handle) => handle.exportPlantUml());
        },
    }));

    return (
        <S.Toolbar>
            <S.ToolbarGroup>
                <Button
                    size="small"
                    disabled={!canGoBack}
                    onClick={onBack}
                    startIcon={<Icon iconName={Icons.ArrowLeft} />}
                >
                    Назад
                </Button>
            </S.ToolbarGroup>
            <S.ToolbarGroup>
                <Button
                    size="small"
                    variant={interactionMode === 'edit' ? 'contained' : 'outlined'}
                    onClick={onToggleInteractionMode}
                    startIcon={<Icon iconName={Icons.Edit} />}
                >
                    Редактировать
                </Button>
                <Button
                    size="small"
                    onClick={() => runGraphAction(graphRef, (handle) => handle.zoomIn())}
                    startIcon={<Icon iconName={Icons.ZoomIn} />}
                />

                <Button
                    size="small"
                    onClick={() => runGraphAction(graphRef, (handle) => handle.zoomOut())}
                    startIcon={<Icon iconName={Icons.ZoomOut} />}
                />

                <Button
                    size="small"
                    onClick={() => runGraphAction(graphRef, (handle) => handle.fitToScreen())}
                    startIcon={<Icon iconName={Icons.Collapse} />}
                />

                <DropdownMenu id="diagram-export-menu" position="right" items={[exportMenuItems]}>
                    <Button size="small" endIcon={<Icon iconName={Icons.MoreVert} />} />
                </DropdownMenu>
            </S.ToolbarGroup>
        </S.Toolbar>
    );
};
