import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip, IconButton, Label } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { DropdownMenu } from 'components/interaction';
import { Link } from 'components/other';

import * as R from 'router/const';

import pattern from './images/pattern.png';

import { IPatternCard } from './types';
import * as S from './units';

export const PatternCard: FC<IPatternCard> = ({ isAdmin, setPatternToDelete }) => {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.ADD_PATH}`);
    };

    return (
        <S.Card>
            <img src={pattern} />
            <S.Content>
                <Label title="Паттерн" variant="contained" type="success" />
                <S.TitleContainer>
                    <Text variant="subtitle2">
                        <Link
                            outer={false}
                            title="Витрина данных (Data Mart)"
                            url={`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.VIEW_PATH}`}
                        />
                    </Text>
                    {isAdmin && (
                        <DropdownMenu
                            id={String(Date.now())}
                            items={[
                                [
                                    {
                                        title: 'Редактировать',
                                        icon: Icons.Edit,
                                        onClick: handleEditClick,
                                    },
                                    {
                                        title: 'Скачать',
                                        icon: Icons.Download,
                                        onClick: handleEditClick,
                                    },
                                ],
                                [
                                    {
                                        title: 'Удалить',
                                        icon: Icons.Delete,
                                        onClick: () =>
                                            setPatternToDelete('Витрина данных (Data Mart)'),
                                    },
                                ],
                            ]}
                        />
                    )}
                    {!isAdmin && <IconButton iconName={Icons.Download} size="large" />}
                </S.TitleContainer>
                <S.MarginContainer>
                    <Text inactive variant="body3">
                        Описание
                    </Text>
                    <Text variant="body2">Заголовок</Text>
                </S.MarginContainer>
                <S.MarginContainer>
                    <S.ChipsContainer>
                        <Chip label="Архитектурный каталог Beeline" />
                        <Chip label="Data products" />
                        <Chip label="Structurizr OnPremise" />
                        <Chip label="Structurizr Lite" />
                    </S.ChipsContainer>
                </S.MarginContainer>
            </S.Content>
        </S.Card>
    );
};
