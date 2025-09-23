import React from 'react';
import { Divider } from '@beeline/design-system-react';

import { Text } from 'components/core';

import * as S from './units';

export const Changes = () => {
    return (
        <S.Container>
            <S.Column>
                <Text variant="body2">Что было добавлено</Text>
                <Divider />
                <div>
                    <Text inactive variant="body3">
                        Контейнер
                    </Text>
                    <Text variant="body2">Dashboard API&UI</Text>
                </div>
                <div>
                    <Text inactive variant="body3">
                        Интерфейс
                    </Text>
                    <Text variant="body2">API управление бизнес-возможностями</Text>
                </div>
                <div>
                    <Text inactive variant="body3">
                        Контейнер
                    </Text>
                    <Text variant="body2">API Gateway</Text>
                </div>
                <div>
                    <Text inactive variant="body3">
                        Связь
                    </Text>
                    <Text variant="body2">Запрос данных возможностей</Text>
                </div>
            </S.Column>
            <S.Divider />
            <S.Column>
                <Text variant="body2">Что было удалено</Text>
                <Divider />
                <div>
                    <Text inactive variant="body3">
                        Контейнер
                    </Text>
                    <Text variant="body2">Dashboard API&UI</Text>
                </div>
                <div>
                    <Text inactive variant="body3">
                        Интерфейс
                    </Text>
                    <Text variant="body2">API управление бизнес-возможностями</Text>
                </div>
                <div>
                    <Text inactive variant="body3">
                        Контейнер
                    </Text>
                    <Text variant="body2">API Gateway</Text>
                </div>
                <div>
                    <Text inactive variant="body3">
                        Связь
                    </Text>
                    <Text variant="body2">Запрос данных возможностей</Text>
                </div>
            </S.Column>
        </S.Container>
    );
};
