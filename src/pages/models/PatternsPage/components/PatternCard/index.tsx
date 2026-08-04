import React, { FC } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { Text } from 'components/core';
import { DropdownMenu } from 'components/interaction';
import { Link } from 'components/other';
import { Label } from 'components/ui';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { IPatternCard } from './types';
import * as S from './units';

export const PatternCard: FC<IPatternCard> = ({ isAdmin, pattern, setPatternToDelete }) => {
    const navigate = useNavigate();

    const handleEditClick = (id?: number) => {
        navigate({
            pathname: `${R.MODELS_PATH}${R.PATTERNS_PATH}${R.ADD_PATH}`,
            search: id ? createSearchParams({ id: String(id) }).toString() : '',
        });
    };

    return (
        <S.Card>
            <S.Content>
                <Label
                    title={pattern.isAntiPattern ? 'Антипаттерн' : 'Паттерн'}
                    variant="contained"
                    type={pattern.isAntiPattern ? 'error' : 'success'}
                />
                <div>
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
                                            onClick: () => handleEditClick(pattern.id),
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
                    </S.TitleContainer>
                    <Text inactive variant="body3">
                        {pattern.code}
                    </Text>
                </div>
                <S.MarginContainer>
                    <Text inactive variant="body3">
                        Описание
                    </Text>
                    <Text variant="body2">{formatNullableString(pattern.description)}</Text>
                </S.MarginContainer>
                <div style={{ flex: 1 }} />
                {pattern.groups.length > 0 && (
                    <S.MarginContainer>
                        <S.ChipsContainer>
                            {pattern.groups.map((group) => (
                                <S.ChipStyled key={group.id} label={group.name} />
                            ))}
                        </S.ChipsContainer>
                    </S.MarginContainer>
                )}
                {pattern.technologies.length > 0 && (
                    <S.MarginContainer>
                        <S.ChipsContainer>
                            {pattern.technologies.map((tech) => (
                                <S.ChipStyled key={tech.id} label={tech.label} />
                            ))}
                        </S.ChipsContainer>
                    </S.MarginContainer>
                )}
            </S.Content>
        </S.Card>
    );
};
