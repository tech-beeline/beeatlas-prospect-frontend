import React, { FC } from 'react';
import { Button, FileUploader, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';

import { ICJImport } from './types';
import * as S from './units';

export const CJImport: FC<ICJImport> = ({ isOpen, onClose }) => {
    const handleFileUploader = true;
    return (
        <SideBlock isOpen={isOpen} onClose={onClose} large={true}>
            <S.Container>
                <S.FlexWrapper>
                    <div>
                        <S.SideBlockTitle>Импортировать cj</S.SideBlockTitle>
                        <Text inactive variant="body3">
                            Загрузка нового файла обновит предыдущие данные
                        </Text>
                    </div>

                    <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                </S.FlexWrapper>

                <FileUploader
                    hideFileList
                    accept=".md"
                    subTitle="bpmn до 200 кб"
                    onChange={() => handleFileUploader}
                />
                <S.ButtonContainer>
                    <Button type="button" onClick={onClose}>
                        Отменить
                    </Button>

                    <Button disabled={true} type="submit" variant="contained">
                        Сохранить
                    </Button>
                </S.ButtonContainer>
            </S.Container>
        </SideBlock>
    );
};
