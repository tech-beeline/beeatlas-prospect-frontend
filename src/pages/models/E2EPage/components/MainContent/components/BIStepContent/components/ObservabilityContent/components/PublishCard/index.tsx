import React, { FC } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';
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
    url,
    note,
    actionLabel,
    onAction,
    hasData,
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
                    {url && (
                        <div>
                            <Text inactive variant="body3">
                                Ссылка
                            </Text>
                            <Link title="Открыть" url={url} />
                        </div>
                    )}
                </S.MetadataContainer>
            )}
            {note && (
                <div>
                    <Text inactive variant="body3">
                        Комментарий
                    </Text>
                    <Text variant="body2">
                        <S.CommentContainer dangerouslySetInnerHTML={{ __html: note }} />
                    </Text>
                </div>
            )}
            <S.ButtonContainer>
                <Button
                    variant="outlined"
                    size="medium"
                    startIcon={hasData ? <Icon iconName={Icons.Refresh} /> : undefined}
                    onClick={onAction}
                >
                    {actionLabel}
                </Button>
            </S.ButtonContainer>
        </S.Container>
    );
};
