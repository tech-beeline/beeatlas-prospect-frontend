import React, { FC } from 'react';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';

import { formatSize } from 'utils/formatters';

import { ICJVersion } from './types';
import * as S from './units';

export const CJVersion: FC<ICJVersion> = ({ isOpen, onClose }) => {
    return (
        <SideBlock isOpen={isOpen} onClose={onClose} large={true}>
            <S.Container>
                <S.FlexWrapper>
                    <div>
                        <S.SideBlockTitle>Показать версии</S.SideBlockTitle>
                        <Text inactive variant="body3">
                            Cj доступен только для просмотра. Чтобы внести изменения, скачайте и
                            загрузите обновленный файл
                        </Text>
                    </div>

                    <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                </S.FlexWrapper>

                <S.FileUploaderListItemWrapper
                    name="Название файла в несколько строк.bpmn"
                    type="bpmn"
                    size={`${formatSize(2768)}`}
                    state="upload"
                />
            </S.Container>
        </SideBlock>
    );
};
