import React, { FC, useState } from 'react';
import {
    Button,
    Icon,
    Progress,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { Link, NotFoundBlock } from 'components/other';

import { useGetUserProductsKeyById } from 'api/queries/product';
import { useGetUserInfoQuery } from 'api/queries/profile';
import { useModal } from 'hooks';
import { formatNullableString } from 'utils/formatters';

import {
    BlurButton,
    CopyButton,
    CreateStructurizrWorkspaceSideblock,
    UpdateArchitectureSideblock,
} from './components';
import { keyToCriticalMap } from './const';
import { IGeneralInfo } from './types';
import * as S from './units';

export const GeneralInfo: FC<IGeneralInfo> = ({
    productData,
    productId,
    structurizrApiUrl,
    cmdb,
}) => {
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

    const canGetKeys = (userInfoData?.productsIds ?? []).includes(productId);
    const isAdministrator = userInfoData?.roles?.includes('ADMINISTRATOR');

    const { data: keysData } = useGetUserProductsKeyById(productId, {
        enabled: canGetKeys,
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
            {canGetKeys && hasKeyData && (
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
            {structurizrApiUrl && structurizrApiUrl !== '' ? (
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
                        <Button
                            disabled
                            data-tooltip-id="refresh"
                            variant="outlined"
                            startIcon={<Icon iconName={Icons.Refresh} />}
                        />
                        <TooltipContainer id="refresh" offset={8} place="top" noArrow>
                            Обновить
                        </TooltipContainer>
                        <Button
                            data-tooltip-id="upload"
                            variant="outlined"
                            startIcon={<Icon iconName={Icons.Download} />}
                            onClick={openArchitectureModal}
                        />
                        <TooltipContainer id="upload" offset={8} place="top" noArrow>
                            Загрузка версии архитектуры
                        </TooltipContainer>
                    </S.StructurizrTitleContainer>
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
                                        876.567.999
                                    </S.StructurizrIdContainer>
                                </TableData>
                                <TableData>12.12.2025, 23:59</TableData>
                                <TableData>GitOPS pipeline</TableData>
                                <TableData>Какой-то статус</TableData>
                            </TableRow>
                        </TableBody>
                    </S.TableStyled>
                    <UpdateArchitectureSideblock
                        isOpen={isArchitectureModalOpened}
                        onClose={closeArchitectureModal}
                    />
                </S.StructurizrContainer>
            ) : (
                <Text variant="body2">{formatNullableString(null)}</Text>
            )}

            <Text inactive variant="body2">
                Репозиторий архитектуры
            </Text>
            {productData && (
                <Text variant="body2">
                    {productData.gitUrl ? (
                        <S.LinkContainer>
                            <Link title={productData.gitUrl} url={productData.gitUrl} />
                            <CopyButton text={productData.gitUrl} message="Ссылка скопирована" />
                        </S.LinkContainer>
                    ) : (
                        formatNullableString(null)
                    )}
                </Text>
            )}
            <Text inactive variant="body2">
                Репозитории кода
            </Text>
            <S.TableStyled>
                <TableHead>
                    <TableRow>
                        <TableHeaderData>Название репозитория</TableHeaderData>
                        <TableHeaderData>Ссылка на репозиторий</TableHeaderData>
                        <TableHeaderData>Ссылка на контейнер</TableHeaderData>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableData>Текст ячейки</TableData>
                        <TableData>
                            <Link url="https://bw.beeline.ru/catalog/apps/53" />
                        </TableData>
                        <TableData>
                            <Link url="https://bw.beeline.ru/catalog/apps/53" />
                        </TableData>
                    </TableRow>
                </TableBody>
            </S.TableStyled>
            {cmdb &&
                (structurizrApiUrl === null || structurizrApiUrl === '') &&
                !hasKeyData &&
                (isAdministrator || canGetKeys) && (
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
            {/* <Text inactive variant="body2">
                Влияние приложения
            </Text>
            <Text variant="body2">
                <Link
                    showOuterIcon
                    showIconPermanently
                    title="Посмотреть влияние"
                    url="https://bw.beeline.ru/catalog/apps/53"
                />
            </Text>
            <Text inactive variant="body2">
                Информация о приложении
            </Text>
            <Text variant="body2">
                <S.LinkContainer>
                    <Link
                        title="https://bw.beeline.ru/catalog/apps/53"
                        url="https://bw.beeline.ru/catalog/apps/53"
                    />
                    <CopyButton
                        text="https://bw.beeline.ru/catalog/apps/53"
                        message="Ссылка скопирована"
                    />
                </S.LinkContainer>
            </Text>
            <Text inactive variant="body2">
                Дашборд приложения
            </Text>
            <Text variant="body2">
                <S.LinkContainer>
                    <Link
                        title="https://bw.beeline.ru/catalog/apps/53"
                        url="https://bw.beeline.ru/catalog/apps/53"
                    />
                    <CopyButton
                        text="https://bw.beeline.ru/catalog/apps/53"
                        message="Ссылка скопирована"
                    />
                </S.LinkContainer>
            </Text>
            <Text inactive variant="body2">
                Workspace Structurizr
            </Text>
            {isLoading && <Skeleton height={22} width={200} radius={4} />}
            {productData && (
                <Text variant="body2">
                    {productData.structurizrApiUrl ? (
                        <S.LinkContainer>
                            <Link
                                title={productData.structurizrApiUrl}
                                url={productData.structurizrApiUrl}
                            />
                            <CopyButton
                                text={productData.structurizrApiUrl}
                                message="Ссылка скопирована"
                            />
                        </S.LinkContainer>
                    ) : (
                        formatNullableString(null)
                    )}
                </Text>
            )}*/}
        </S.Container>
    );
};
