import React from 'react';

import { Text } from 'components/core';

import { ServiceItem } from './components';
import { SERVICE_CATEGORIES } from './const';
import * as S from './units';

export const ServicesSection = () => {
    return (
        <S.Section>
            <Text variant="h4">Сервисы</Text>

            <S.ServicesGrid>
                <S.FlexContainer>
                    {SERVICE_CATEGORIES.slice(0, 2).map((category) => (
                        <S.ServiceCategoryCard key={category.title}>
                            <Text variant="h6">{category.title}</Text>

                            <S.ServiceItemsList>
                                {category.items.map((item) => (
                                    <ServiceItem key={item.to} item={item} />
                                ))}
                            </S.ServiceItemsList>
                        </S.ServiceCategoryCard>
                    ))}
                </S.FlexContainer>
                {SERVICE_CATEGORIES.slice(2).map((category) => (
                    <S.ServiceCategoryCard key={category.title}>
                        <Text variant="h6">{category.title}</Text>

                        <S.ServiceItemsList>
                            {category.items.map((item) => (
                                <ServiceItem key={item.to} item={item} />
                            ))}
                        </S.ServiceItemsList>
                    </S.ServiceCategoryCard>
                ))}
            </S.ServicesGrid>
        </S.Section>
    );
};
