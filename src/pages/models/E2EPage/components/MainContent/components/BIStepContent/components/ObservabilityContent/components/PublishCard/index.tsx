import React, { FC } from 'react';

import { Text } from 'components/core';
import { Button, Icon, Skeleton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IPublishCard } from './types';
import * as S from './units';

export const PublishCard: FC<IPublishCard> = ({
    title,
    isLoading,
    descriptions,
    status,
    fields,
    note,
    actionLabel,
    onAction,
}) => {
    if (isLoading) return <Skeleton radius={12} height={100} />;

    return (
        <S.Container>
            <S.TitleContainer>
                <div>
                    <Text variant="subtitle3">{title}</Text>
                    {descriptions.map((description) => (
                        <Text key={description} inactive variant="body3">
                            {description}
                        </Text>
                    ))}
                </div>
                {status && (
                    <S.Badge success={status === 'success'}>
                        <Text variant="body3">{status === 'success' ? 'Успешно' : 'Ошибка'}</Text>
                    </S.Badge>
                )}
            </S.TitleContainer>
            {fields.length > 0 && (
                <S.MetadataContainer>
                    {fields.map(({ label, value }) => (
                        <div key={label}>
                            <Text inactive variant="body3">
                                {label}
                            </Text>
                            <Text variant="body2">{value}</Text>
                        </div>
                    ))}
                </S.MetadataContainer>
            )}
            {note !== undefined && (
                <div>
                    <Text inactive variant="body3">
                        Комментарий
                    </Text>
                    <Text variant="body2">{note}</Text>
                </div>
            )}
            <S.ButtonContainer>
                <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<Icon iconName={Icons.Refresh} />}
                    onClick={onAction}
                >
                    {actionLabel}
                </Button>
            </S.ButtonContainer>
        </S.Container>
    );
};
