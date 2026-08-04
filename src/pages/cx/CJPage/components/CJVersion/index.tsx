import React, { FC } from 'react';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { VersionRow } from './components/VersionRow';
import { ICJVersion } from './types';
import * as S from './units';

export const CJVersion: FC<ICJVersion> = ({ isOpen, onClose, versions, cjId }) => {
    return (
        <SideBlock isOpen={isOpen} onClose={onClose} large={true} hasBackdrop>
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

                {Array.isArray(versions) &&
                    versions.map((v) => <VersionRow key={v.id} version={v} cjId={cjId} />)}
            </S.Container>
        </SideBlock>
    );
};
