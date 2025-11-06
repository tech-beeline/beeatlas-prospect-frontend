import React, { FC, useState } from 'react';
import { Skeleton } from '@beeline/design-system-react';

// import {
//     Table,
//     TableBody,
//     TableData,
//     TableHead,
//     TableHeaderData,
//     TableRow,
// } from '@beeline/design-system-react';
import { Text } from 'components/core';
import { Link } from 'components/other';

import { formatNullableString } from 'utils/formatters';

import { BlurButton, CopyButton } from './components';
import { IGeneralInfo } from './types';
import * as S from './units';

export const GeneralInfo: FC<IGeneralInfo> = ({ productData, isLoading }) => {
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
    return (
        <S.Container>
            <Text inactive variant="body2">
                Владелец приложения
            </Text>
            <Text variant="body2">Константинопольский Константин Константинович</Text>
            <Text inactive variant="body2">
                Архитектор приложения
            </Text>
            <Text variant="body2">Крестовоздвиженский Филипп Пантелеймонович</Text>
            <Text inactive variant="body2">
                Критичность
            </Text>
            <Text variant="body2">4-Office Productivity</Text>
            <Text inactive variant="body2">
                Structurizr_api_key
            </Text>
            <Text variant="body2">
                <S.LinkContainer>
                    <S.BlurText $isBlurred={blurState.apiKey}>4-Office Productivity</S.BlurText>
                    <BlurButton
                        isBlurred={blurState.apiKey}
                        onToggle={() => toggleBlur('apiKey')}
                    />
                    <CopyButton text="4-Office Productivity" message="API_KEY скопирован" />
                </S.LinkContainer>
            </Text>
            <Text inactive variant="body2">
                Structurizr_api_secret
            </Text>
            <Text variant="body2">
                <S.LinkContainer>
                    <S.BlurText $isBlurred={blurState.apiSecret}>4-Office Productivity</S.BlurText>
                    <BlurButton
                        isBlurred={blurState.apiSecret}
                        onToggle={() => toggleBlur('apiSecret')}
                    />
                    <CopyButton text="4-Office Productivity" message="API_SECRET скопирован" />
                </S.LinkContainer>
            </Text>
            <Text inactive variant="body2">
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
            )}
            <Text inactive variant="body2">
                Git проект
            </Text>
            {isLoading && <Skeleton height={22} width={200} radius={4} />}
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
            {/* <Text inactive variant="body2">
                Git репозиторий
            </Text>
            <Table>
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
            </Table> */}
        </S.Container>
    );
};
