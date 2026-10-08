import React, { FC } from 'react';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { IViewDynamicSideblockProps } from './types';
import * as S from './units';

export const ViewDynamicSideblock: FC<IViewDynamicSideblockProps> = ({
    dynamic,
    isOpen,
    onClose,
}) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const handleCopy = async () => {
        if (!dynamic) return;

        try {
            await navigator.clipboard.writeText(dynamic.plantUml);
            showSnackbar({ message: 'PlantUML скопирован' });
        } catch {
            showSnackbar({ message: 'Не удалось скопировать PlantUML', showCloseButton: true });
        }
    };

    return (
        <SideBlock large hasBackdrop isOpen={isOpen} onClose={onClose}>
            <S.Container>
                <S.Header>
                    <S.Title>
                        <Text variant="h5">Dynamic-диаграмма {dynamic?.code ?? ''}</Text>
                        <Text inactive variant="body3">
                            Диаграмма последовательности вызовов части сценария, в нотации PlantUML
                        </Text>
                    </S.Title>
                    <IconButton
                        aria-label="Закрыть"
                        iconName={Icons.Close}
                        size="large"
                        onClick={onClose}
                    />
                </S.Header>

                <S.CodeContainer>
                    <S.CopyButton
                        aria-label="Копировать PlantUML"
                        iconName={Icons.Copy}
                        size="large"
                        onClick={handleCopy}
                    />
                    <S.Code>{dynamic?.plantUml ?? ''}</S.Code>
                </S.CodeContainer>
            </S.Container>
        </SideBlock>
    );
};
