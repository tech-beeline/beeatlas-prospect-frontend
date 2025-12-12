import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';

import { useGetCJFileVersionByIdQuery } from 'api/queries/cj';

import { VersionRow } from './components/VersionRow';
import { ICJVersion } from './types';
import * as S from './units';

export const CJVersion: FC<ICJVersion> = ({ isOpen, onClose }) => {
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { data: version } = useGetCJFileVersionByIdQuery(paramId);

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

                {Array.isArray(version) &&
                    version.map((v) => <VersionRow key={v.id} version={v} cjId={paramId} />)}
            </S.Container>
        </SideBlock>
    );
};
