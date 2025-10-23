import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip, IconButton, Label } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { DropdownMenu } from 'components/interaction';
import { Link } from 'components/other';

import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import { IPatternCard } from './types';
import * as S from './units';

export const PatternCard: FC<IPatternCard> = ({ isAdmin, pattern, setPatternToDelete }) => {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.ADD_PATH}`);
    };

    return (
        <S.Card>
            <S.Content>
                <Label
                    title={pattern.isAntiPattern ? 'Антипаттерн' : 'Паттерн'}
                    variant="contained"
                    type={pattern.isAntiPattern ? 'error' : 'success'}
                />
                <S.TitleContainer>
                    <Text variant="subtitle2">
                        <Link
                            outer={false}
                            title={pattern.name}
                            url={`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.VIEW_PATH}?id=${pattern.id}`}
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
                                        onClick: () => setPatternToDelete(pattern),
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
                    <Text variant="body2">{formatNullableString(pattern.description)}</Text>
                </S.MarginContainer>
                {pattern.groups.length > 0 && (
                    <S.MarginContainer>
                        <S.ChipsContainer>
                            {pattern.groups.map((group) => (
                                <Chip key={group.id} label={group.name} />
                            ))}
                        </S.ChipsContainer>
                    </S.MarginContainer>
                )}
            </S.Content>
        </S.Card>
    );
};
