import React, { FC } from 'react';
import { Button, FileUploader, IconButton, ProgressButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';

import { IUpdateArchitectureSideblock } from './types';
import * as S from './units';

export const UpdateArchitectureSideblock: FC<IUpdateArchitectureSideblock> = ({
    isOpen,
    onClose,
}) => {
    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={onClose}>
            <S.SideblockContainer>
                <S.ContentContainer>
                    <S.TitleContainer>
                        <Text variant="h5">Загрузка версии архитектуры</Text>
                        <IconButton iconName={Icons.Close} size="large" onClick={onClose} />
                    </S.TitleContainer>
                    <FileUploader subTitle="dsl, json до 200 кб" accept=".dsl, .json" />
                </S.ContentContainer>
                <S.ButtonsContainer>
                    <Button fullWidth size="medium" variant="outlined" onClick={onClose}>
                        Отменить
                    </Button>
                    <ProgressButton
                        fullWidth
                        size="medium"
                        variant="contained"
                        // onClick={handleCreateButtonClick}
                        // state={isPending ? 'loading' : 'default'}
                    >
                        Запустить
                    </ProgressButton>
                </S.ButtonsContainer>
            </S.SideblockContainer>
        </SideBlock>
    );
};
