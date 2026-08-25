import React, { FC } from 'react';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { Button, Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IRawDataSideblock } from './types';
import * as S from './units';

export const RawDataSideblock: FC<IRawDataSideblock> = ({ isOpen, onClose, data }) => {
    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(data?.rawData || '');
    };

    return (
        <SideBlock large hasBackdrop isOpen={isOpen} onClose={onClose}>
            <S.Container>
                <S.Header>
                    <Text variant="h5">{data?.title || ''}</Text>
                    <Button
                        startIcon={<Icon iconName={Icons.Copy} />}
                        variant="secondary"
                        size="small"
                        onClick={handleCopyClick}
                    >
                        Копировать
                    </Button>
                </S.Header>
                <S.RawDataContainer>{data?.rawData || ''}</S.RawDataContainer>
            </S.Container>
        </SideBlock>
    );
};
