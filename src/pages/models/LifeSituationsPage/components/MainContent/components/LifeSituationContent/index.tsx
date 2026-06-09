import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { IconButton } from 'components/ui';
import { ButtonGroup, Icon } from 'components/ui';

import { useGetPatternsByChapterIdQuery } from 'api/queries/patterns';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { Patterns, Requirements } from './components';
import { ContentTypeOptions, DisplayOptions, ILifeSituationContent } from './types';
import * as S from './units';

export const LifeSituationContent: FC<ILifeSituationContent> = ({ activeItem, isAdmin }) => {
    const navigate = useNavigate();
    const [contentTypeOption, setContentTypeOption] = useState(ContentTypeOptions.REQUIREMENTS);
    const [displayOption, setDisplayOption] = useState(DisplayOptions.TABLE);

    const { data } = useGetPatternsByChapterIdQuery(activeItem.id);
    const handleEditButtonClick = () => {
        navigate(
            `${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}${R.ADD_PATH}?id=${activeItem.chapterData.id}`,
        );
    };

    return (
        <S.Container>
            <S.TitleRow>
                <S.TitleContainer>
                    <Text variant="h4">{formatNullableString(activeItem.chapterData.name)}</Text>
                    <Text inactive variant="body3">
                        {formatNullableString(activeItem.chapterData.code)}
                    </Text>
                </S.TitleContainer>
                {isAdmin && (
                    <IconButton
                        variant="outlined"
                        iconName={Icons.Edit}
                        size="small"
                        onClick={handleEditButtonClick}
                    />
                )}
            </S.TitleRow>
            <Text variant="body2">{formatNullableString(activeItem.chapterData.description)}</Text>
            <S.DocumentationContainer>
                <Text inactive variant="body3">
                    Документация
                </Text>
                <Link url={activeItem.chapterData.docLink} />
            </S.DocumentationContainer>
            <S.ControlsContainer>
                <ButtonGroup
                    alwaysSelected
                    selectedOption={{ id: contentTypeOption }}
                    size="small"
                    options={[
                        {
                            id: ContentTypeOptions.REQUIREMENTS,
                            label: `Связанные нефункциональные требования (${activeItem.chapterData.nfr.length})`,
                        },
                        {
                            id: ContentTypeOptions.PATTERNS,
                            label: `Связанные паттерны${data ? ` (${data.length})` : ''}`,
                        },
                    ]}
                    type="secondary"
                    onChange={(option) => setContentTypeOption(option.id as ContentTypeOptions)}
                />
                <ButtonGroup
                    alwaysSelected
                    selectedOption={{ id: displayOption }}
                    size="small"
                    options={[
                        {
                            id: DisplayOptions.TABLE,
                            startIcon: <Icon iconName={Icons.TableColumns} />,
                        },
                        { id: DisplayOptions.GRID, startIcon: <Icon iconName={Icons.Grid} /> },
                    ]}
                    type="secondary"
                    onChange={(option) => setDisplayOption(option.id as DisplayOptions)}
                />
            </S.ControlsContainer>
            {contentTypeOption === ContentTypeOptions.REQUIREMENTS && (
                <Requirements displayOption={displayOption} activeItem={activeItem} />
            )}
            {contentTypeOption === ContentTypeOptions.PATTERNS && data && (
                <Patterns displayOption={displayOption} patterns={data} activeItem={activeItem} />
            )}
        </S.Container>
    );
};
