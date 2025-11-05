import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Icon, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { Link } from 'components/other';

import { useModal } from 'hooks';
import * as R from 'router/const';
import { useSnackbarStore } from 'widgets/Snackbar';

import {
    AppTable,
    ContextDiagram,
    DeploymentDiagram,
    E2ETCTable,
    ImpactSearch,
    RateSideblock,
} from './components';
import * as S from './units';

export const ImpactPage = () => {
    const [params] = useSearchParams();
    // common
    const cmdbParam = params.get('cmdb');
    // system
    const nameParam = params.get('name');
    // server
    const environmentNameParam = params.get('environmentName');
    const deploymentNameParam = params.get('deploymentName');

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
                <Text variant="h4">Влияние</Text>
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
            {cmdbParam && (
                <>
                    <S.AppTitleContainer>
                        <S.AppTitleIconWrapper>
                            {nameParam && <Text variant="h4">{nameParam}</Text>}
                            {deploymentNameParam && <Text variant="h4">{deploymentNameParam}</Text>}
                            <IconButton
                                size="medium"
                                iconName={Icons.Link}
                                onClick={handleCopyLinkButtonClick}
                            />
                        </S.AppTitleIconWrapper>
                        <Text variant="subtitle3">
                            <Link
                                title="Общая информация"
                                url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${cmdbParam}`}
                            />
                        </Text>
                    </S.AppTitleContainer>
                    <S.GridContainer>
                        <S.FlexContainer>
                            {cmdbParam && nameParam && <ContextDiagram cmdb={cmdbParam} />}
                            {cmdbParam && deploymentNameParam && environmentNameParam && (
                                <DeploymentDiagram
                                    cmdb={cmdbParam}
                                    deploymentName={deploymentNameParam}
                                    environmentName={environmentNameParam}
                                />
                            )}
                        </S.FlexContainer>

                        <S.FlexContainer>
                            <AppTable cmdb={cmdbParam} deploymentName={deploymentNameParam} />
                            <E2ETCTable cmdb={cmdbParam} />
                        </S.FlexContainer>
                    </S.GridContainer>
                    <RateSideblock isOpen={sideblockOpened} onClose={closeSideblock} />
                </>
            )}
        </S.PageWrapper>
    );
};
