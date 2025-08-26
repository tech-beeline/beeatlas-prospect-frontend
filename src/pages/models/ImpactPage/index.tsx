import React, { useEffect, useState } from 'react';
import { Button, Icon, IconButton, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import { useModal } from 'hooks';

import { AppTable, ContextDiagram, E2ETCTable, ImpactSearch, RateSideblock } from './components';
import * as S from './units';

export const ImpactPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [isSelected, setIsSelected] = useState(true);

    const {
        modalOpened: sideblockOpened,
        openModal: openSideblock,
        closeModal: closeSideblock,
    } = useModal();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <S.PageWrapper>
            <S.TitleContainer>
                <Text variant="h4">Влияние</Text>
                {isSelected && (
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
            <ImpactSearch isLoading={isLoading} setIsSelected={setIsSelected} />
            {isLoading && (
                <>
                    <Skeleton height={32} radius={12} />
                    <S.GridContainer>
                        <Skeleton radius={12} /> <Skeleton radius={12} />
                    </S.GridContainer>
                </>
            )}
            {!isLoading && (
                <>
                    <S.AppTitleContainer>
                        <S.AppTitleIconWrapper>
                            <Text variant="h4">Ensemble</Text>
                            <IconButton size="medium" iconName={Icons.Link} />
                        </S.AppTitleIconWrapper>
                        <Text link pointer variant="subtitle3">
                            Общая информация
                        </Text>
                    </S.AppTitleContainer>
                    <S.GridContainer>
                        <S.FlexContainer>
                            <ContextDiagram />
                        </S.FlexContainer>
                        <S.FlexContainer>
                            <AppTable />
                            <E2ETCTable />
                        </S.FlexContainer>
                    </S.GridContainer>
                </>
            )}
            <RateSideblock isOpen={sideblockOpened} onClose={closeSideblock} />
        </S.PageWrapper>
    );
};
