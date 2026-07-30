import React, { FC, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { Link, NotFoundBlock } from 'components/other';
import {
    Button,
    Icon,
    Progress,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import { useRestartProcessMutation } from 'api/queries/camunda';
import { useGetUserProductsKeyById } from 'api/queries/product';
import { useGetUserInfoQuery } from 'api/queries/profile';
import { useModal } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';
import { useSnackbarStore } from 'widgets/Snackbar';

import { BlurButton } from '../BlurButton';
import { CopyButton } from '../CopyButton';
import { CreateStructurizrWorkspaceSideblock } from '../CreateStructurizrWorkspaceSideblock';
import { UpdateArchitectureSideblock } from '../UpdateArchitectureSideblock';

import { keyToCriticalMap } from './const';
import { ICommonInfo } from './types';
import * as S from './units';

export const CommonInfo: FC<ICommonInfo> = ({
    productData,
    structurizrApiUrl,
    processesData,
    productId,
    cmdb,
}) => {
    const isUpdating = useRef(false);
    const showSnackbar = useSnackbarStore((store) => store.showSnackbar);
    useEffect(() => {
        if (
            processesData &&
            processesData[0] &&
            processesData[0].status.isDone &&
            isUpdating.current === true
        ) {
            showSnackbar({ message: 'Процесс обновления данных завершён' });
            isUpdating.current = false;
        } else if (
            processesData &&
            processesData[0] &&
            !processesData[0].status.isDone &&
            !processesData[0].status.isError
        ) {
            isUpdating.current = true;
        }
    }, [processesData]);
    const [tempDisabled, setTempDisabled] = useState(false);

    const [blurState, setBlurState] = useState({
        apiKey: true,
        apiSecret: true,
    });
    const toggleBlur = (key: keyof typeof blurState) => {
        setBlurState((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const { data: userInfoData } = useGetUserInfoQuery();

    const { mutateAsync } = useRestartProcessMutation();

    const handleRefreshClick = async () => {
        if (cmdb && processesData && processesData[0]) {
            try {
                setTempDisabled(true);
                await mutateAsync({ processId: processesData[0].id, cmdb });
                setTimeout(() => setTempDisabled(false), 15 * 1000);
            } catch (e) {
                setTempDisabled(false);
            }
        }
    };

    const isUserProduct = (userInfoData?.productsIds ?? []).includes(productId);
    const isAdministrator = userInfoData?.roles?.includes('ADMINISTRATOR');

    const canEditPublication = isUserProduct || isAdministrator;

    const { data: keysData } = useGetUserProductsKeyById(productId, {
        enabled: isUserProduct,
    });

    const hasKeyData = keysData?.structurizrApiKey && keysData?.structurizrApiSecret;
    const { openModal, closeModal, modalOpened } = useModal();
    const {
        openModal: openArchitectureModal,
        closeModal: closeArchitectureModal,
        modalOpened: isArchitectureModalOpened,
    } = useModal();
    return (
        <S.Container>
            <Text inactive variant="body2">
                Владелец приложения
            </Text>
            <Text variant="body2">{formatNullableString(productData?.ownerName)}</Text>
            {/* <Text inactive variant="body2">
                                Архитектор приложения
                            </Text>
                            <Text variant="body2">Крестовоздвиженский Филипп Пантелеймонович</Text> */}
            <Text inactive variant="body2">
                Критичность
            </Text>
            <Text variant="body2">
                {formatNullableString(
                    productData?.critical &&
                        `${productData.critical.split('_')[1]}-${
                            keyToCriticalMap[productData.critical.split('_')[0]] ??
                            productData.critical.split('_')[0]
                        }`,
                )}
            </Text>
            {isUserProduct && hasKeyData && (
                <>
                    <Text inactive variant="body2">
                        Structurizr_api_key
                    </Text>
                    <Text variant="body2">
                        <S.LinkContainer>
                            <S.BlurText $isBlurred={blurState.apiKey}>
                                {formatNullableString(keysData?.structurizrApiKey)}
                            </S.BlurText>
                            <BlurButton
                                isBlurred={blurState.apiKey}
                                onToggle={() => toggleBlur('apiKey')}
                            />
                            <CopyButton
                                text={keysData?.structurizrApiKey}
                                message="API_KEY скопирован"
                            />
                        </S.LinkContainer>
                    </Text>
                    <Text inactive variant="body2">
                        Structurizr_api_secret
                    </Text>
                    <Text variant="body2">
                        <S.LinkContainer>
                            <S.BlurText $isBlurred={blurState.apiSecret}>
                                {formatNullableString(keysData?.structurizrApiSecret)}
                            </S.BlurText>
                            <BlurButton
                                isBlurred={blurState.apiSecret}
                                onToggle={() => toggleBlur('apiSecret')}
                            />
                            <CopyButton
                                text={keysData?.structurizrApiSecret}
                                message="API_SECRET скопирован"
                            />
                        </S.LinkContainer>
                    </Text>
                </>
            )}
            {canEditPublication && structurizrApiUrl && structurizrApiUrl !== '' ? (
                <S.StructurizrTitle>
                    <Text inactive variant="body2">
                        Structurizr URL
                    </Text>
                </S.StructurizrTitle>
            ) : (
                <Text inactive variant="body2">
                    Structurizr URL
                </Text>
            )}
            {structurizrApiUrl && structurizrApiUrl !== '' ? (
                <S.StructurizrContainer>
                    <S.StructurizrTitleContainer>
                        <Text variant="body2">
                            <S.LinkContainer>
                                <Link
                                    title={formatNullableString(productData?.structurizrApiUrl)}
                                    url={productData?.structurizrApiUrl}
                                />
                                <CopyButton
                                    text={formatNullableString(productData?.structurizrApiUrl)}
                                    message="Ссылка скопирована"
                                />
                            </S.LinkContainer>
                        </Text>
                        {canEditPublication && (
                            <>
                                <Button
                                    disabled={
                                        tempDisabled ||
                                        !processesData ||
                                        !processesData[0] ||
                                        !(
                                            processesData[0].status.isDone ||
                                            processesData[0].status.isError
                                        )
                                    }
                                    data-tooltip-id="refresh"
                                    variant="outlined"
                                    startIcon={<Icon iconName={Icons.Refresh} />}
                                    onClick={handleRefreshClick}
                                />
                                <TooltipContainer id="refresh" offset={8} place="top" noArrow>
                                    Обновить
                                </TooltipContainer>
                                <Button
                                    disabled={
                                        tempDisabled ||
                                        (processesData &&
                                            processesData[0] &&
                                            !(
                                                processesData[0].status.isDone ||
                                                processesData[0].status.isError
                                            ))
                                    }
                                    data-tooltip-id="upload"
                                    variant="outlined"
                                    startIcon={<Icon iconName={Icons.Download} />}
                                    onClick={openArchitectureModal}
                                />
                                <TooltipContainer id="upload" offset={8} place="top" noArrow>
                                    Загрузка версии архитектуры
                                </TooltipContainer>
                            </>
                        )}
                    </S.StructurizrTitleContainer>
                    {processesData && processesData[0] && (
                        <S.TableStyled>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderData>ID</TableHeaderData>
                                    <TableHeaderData>Дата</TableHeaderData>
                                    <TableHeaderData>Тип обновления</TableHeaderData>
                                    <TableHeaderData>Статус</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableData>
                                        <S.StructurizrIdContainer>
                                            {!(
                                                processesData[0].status.isDone ||
                                                processesData[0].status.isError
                                            ) && (
                                                <S.ProgressContainer>
                                                    <Progress
                                                        cycled
                                                        data-tooltip-id="progress"
                                                        shape="circle"
                                                        size="mini"
                                                    />
                                                    <TooltipContainer
                                                        id="progress"
                                                        offset={8}
                                                        place="top"
                                                        noArrow
                                                    >
                                                        Идет процесс обновления данных
                                                    </TooltipContainer>
                                                </S.ProgressContainer>
                                            )}
                                            {processesData[0].procId}
                                        </S.StructurizrIdContainer>
                                    </TableData>
                                    <TableData>
                                        {dayjs(processesData[0].status.createdDate)
                                            .local()
                                            .format('DD.MM.YYYY, HH:mm')}
                                    </TableData>
                                    <TableData>{processesData[0].type.name}</TableData>
                                    <TableData>{processesData[0].status.name}</TableData>
                                </TableRow>
                            </TableBody>
                        </S.TableStyled>
                    )}
                    {cmdb && (
                        <UpdateArchitectureSideblock
                            isOpen={isArchitectureModalOpened}
                            onClose={closeArchitectureModal}
                            cmdb={cmdb}
                            setTempDisabled={setTempDisabled}
                        />
                    )}
                </S.StructurizrContainer>
            ) : (
                <Text variant="body2">{formatNullableString(null)}</Text>
            )}

            {cmdb &&
                (structurizrApiUrl === null || structurizrApiUrl === '') &&
                !hasKeyData &&
                canEditPublication && (
                    <>
                        <S.NotFoundContainer>
                            <NotFoundBlock
                                title="Чтобы получить доступ ко всем данным приложения, создайте рабочее пространство"
                                text="Данные будут перенесены из Structurizr"
                                buttonText="Создать"
                                buttonProps={{ onClick: openModal }}
                            />
                        </S.NotFoundContainer>
                        <CreateStructurizrWorkspaceSideblock
                            isOpen={modalOpened}
                            onClose={closeModal}
                            cmdb={cmdb}
                        />
                    </>
                )}
        </S.Container>
    );
};
