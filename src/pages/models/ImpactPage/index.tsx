import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Icon, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import { useModal } from 'hooks';

import { AppTable, ContextDiagram, E2ETCTable, ImpactSearch, RateSideblock } from './components';
import * as S from './units';

export const ImpactPage = () => {
    const [params] = useSearchParams();
    const cmdbParam = params.get('cmdb');
    const nameParam = params.get('name');

    const {
        modalOpened: sideblockOpened,
        openModal: openSideblock,
        closeModal: closeSideblock,
    } = useModal();

    return (
        <S.PageWrapper>
            <S.TitleContainer>
                <Text variant="h4">Влияние</Text>
                {cmdbParam && nameParam && (
                    <Button
                        size="small"
                        variant="overlay"
                        startIcon={<Icon iconName={Icons.Star} />}
                        onClick={openSideblock}
                    >
                        Оценить сервис
                    </Button>
                )}
            </S.TitleContainer>
            <ImpactSearch />
            {cmdbParam && nameParam && (
                <>
                    <S.AppTitleContainer>
                        <S.AppTitleIconWrapper>
                            <Text variant="h4">{nameParam}</Text>
                            <IconButton size="medium" iconName={Icons.Link} />
                        </S.AppTitleIconWrapper>
                        <Text link pointer variant="subtitle3">
                            Общая информация
                        </Text>
                    </S.AppTitleContainer>
                    <S.GridContainer>
                        <S.FlexContainer>
                            <ContextDiagram cmdb={cmdbParam} />
                        </S.FlexContainer>
                        <S.FlexContainer>
                            <AppTable cmdb={cmdbParam} />
                            <E2ETCTable cmdb={cmdbParam} />
                        </S.FlexContainer>
                    </S.GridContainer>
                </>
            )}
            <RateSideblock isOpen={sideblockOpened} onClose={closeSideblock} />
        </S.PageWrapper>
    );
};
