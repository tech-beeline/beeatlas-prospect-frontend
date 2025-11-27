import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Icon, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';

import { useModal } from 'hooks';
import * as R from 'router/const';
import { useSnackbarStore } from 'widgets/Snackbar';

import {
    // AppTable,
    ContextDiagram,
    DeploymentAppTable,
    DeploymentDiagram,
    E2ETCTable,
    ImpactSearch,
    RateSideblock,
} from './components';
import * as S from './units';

export const ImpactPage = () => {
    const [params] = useSearchParams();
    const notFoundParam = params.get('notFound');
    // common
    const cmdbParam = params.get('cmdb');
    const nameParam = params.get('name');
    // system
    // server
    const idParam = params.get('id');

    const {
        modalOpened: sideblockOpened,
        openModal: openSideblock,
        closeModal: closeSideblock,
    } = useModal();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const handleCopyLinkButtonClick = async () => {
        await navigator.clipboard.writeText(window.location.href);
        showSnackbar({ message: 'Ссылка скопирована' });
    };

    return (
        <S.PageWrapper>
            <S.TitleContainer>
                <Text variant="h4">Архитектура компании</Text>
                {cmdbParam && (
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
            {notFoundParam && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.SEARCH}
                        title="Нет результатов, подходящих под параметры поиска"
                        text="Попробуйте изменить запрос"
                    />
                </S.NotFoundContainer>
            )}
            {cmdbParam && (
                <>
                    <S.AppTitleContainer>
                        <S.AppTitleIconWrapper>
                            {nameParam && <Text variant="h4">{nameParam}</Text>}
                            <IconButton
                                size="medium"
                                iconName={Icons.Link}
                                onClick={handleCopyLinkButtonClick}
                            />
                        </S.AppTitleIconWrapper>
                        <Text variant="subtitle3">
                            <Link
                                showIconPermanently
                                showOuterIcon
                                title="Общая информация"
                                url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${cmdbParam}`}
                            />
                        </Text>
                    </S.AppTitleContainer>
                    <S.GridContainer>
                        <S.FlexContainer>
                            {cmdbParam && nameParam && !idParam && (
                                <ContextDiagram cmdb={cmdbParam} />
                            )}
                            {idParam && <DeploymentDiagram id={idParam} cmdb={cmdbParam} />}
                        </S.FlexContainer>

                        <S.FlexContainer>
                            {idParam && <DeploymentAppTable id={idParam} />}
                            {/* <AppTable cmdb={cmdbParam} deploymentName={deploymentNameParam} /> */}
                            <E2ETCTable cmdb={cmdbParam} />
                        </S.FlexContainer>
                    </S.GridContainer>
                    <RateSideblock isOpen={sideblockOpened} onClose={closeSideblock} />
                </>
            )}
        </S.PageWrapper>
    );
};
