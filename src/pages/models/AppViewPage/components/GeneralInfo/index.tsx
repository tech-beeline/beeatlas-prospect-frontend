import React from 'react';
import {
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';

import { Text } from 'components/core';
import { Link } from 'components/other';

import { CopyButton } from './components';
import * as S from './units';

export const GeneralInfo = () => {
    return (
        <S.Container>
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
                Владелец приложения
            </Text>
            <Text variant="body2">Константинопольский Константин Константинович</Text>
            <Text inactive variant="body2">
                Архитектор приложения
            </Text>
            <Text variant="body2">Крестовоздвиженский Филипп Пантелеймонович</Text>
            <Text inactive variant="body2">
                Информация о приложении
            </Text>
            <Text variant="body2">
                <S.LinkContainer>
                    <Link
                        title="https://bw.beeline.ru/catalog/apps/53"
                        url="https://bw.beeline.ru/catalog/apps/53"
                    />
                    <CopyButton text="https://bw.beeline.ru/catalog/apps/53" />
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
                    <CopyButton text="https://bw.beeline.ru/catalog/apps/53" />
                </S.LinkContainer>
            </Text>
            <Text inactive variant="body2">
                Workspace Structurizr
            </Text>
            <Text variant="body2">
                <S.LinkContainer>
                    <Link
                        title="https://bw.beeline.ru/catalog/apps/53"
                        url="https://bw.beeline.ru/catalog/apps/53"
                    />
                    <CopyButton text="https://bw.beeline.ru/catalog/apps/53" />
                </S.LinkContainer>
            </Text>
            <Text inactive variant="body2">
                Git проект
            </Text>
            <Text variant="body2">
                <S.LinkContainer>
                    <Link
                        title="https://bw.beeline.ru/catalog/apps/53"
                        url="https://bw.beeline.ru/catalog/apps/53"
                    />
                    <CopyButton text="https://bw.beeline.ru/catalog/apps/53" />
                </S.LinkContainer>
            </Text>
            <Text inactive variant="body2">
                Используемые технологий
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
            </Table>
        </S.Container>
    );
};
