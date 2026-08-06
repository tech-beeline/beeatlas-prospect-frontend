import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabVariant } from 'features/applications';

import { Text } from 'components/core';
import { Icon, IconButton, Skeleton } from 'components/ui';

import { useGetApplicationsQuery } from 'api/queries/applications';
import { useGetUserProductsQuery } from 'api/queries/product';
import { useGetUserInfoQuery } from 'api/queries/profile';
// import { useGetSubscriptionsQuery } from 'api/queries/subscriptions';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { pluralize } from 'utils/helpers';

import { availableStatusAliasesForTab } from './const';
import * as S from './units';

export const MySpaceSection = () => {
    const navigate = useNavigate();
    const [showAllApps, setShowAllApps] = useState(false);

    const { data: userInfo } = useGetUserInfoQuery();
    const userProductIds = userInfo?.productsIds || [];
    const { data: products, isLoading: isLoadingProducts } =
        useGetUserProductsQuery(userProductIds);

    // const { data: subscriptions, isLoading: isLoadingSubscriptions } = useGetSubscriptionsQuery();
    const { data: applications, isLoading: isLoadingApplications } = useGetApplicationsQuery({
        enabled: true,
    });

    const isLoading = isLoadingProducts || isLoadingApplications;

    const visibleApps = useMemo(() => {
        const apps = products ?? [];

        return showAllApps ? apps : apps.slice(0, 1);
    }, [products, showAllApps]);

    const activeApplicationsCount = useMemo(
        () =>
            (applications ?? []).filter((application) =>
                availableStatusAliasesForTab[TabVariant.ACTIVE].includes(application.status.alias),
            ).length,
        [applications],
    );

    const reviewedApplicationsCount = useMemo(
        () =>
            (applications ?? []).filter((application) =>
                availableStatusAliasesForTab[TabVariant.REVIEWED].includes(
                    application.status.alias,
                ),
            ).length,
        [applications],
    );

    // const subscriptionsCount = subscriptions?.length ?? 0;
    const hasHiddenApps = (products?.length ?? 0) > 1;

    return (
        <S.Section>
            <Text variant="h4">Моё пространство</Text>

            <S.MySpaceGrid>
                {isLoading &&
                    Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} height={178} radius={12} />
                    ))}
                {!isLoading && (
                    <>
                        <S.SpaceCard>
                            <S.SpaceCardHeader>
                                <Text variant="subtitle2">Мои приложения</Text>
                            </S.SpaceCardHeader>

                            <S.SpaceCardBody>
                                {visibleApps.length === 0 && (
                                    <Text variant="body2" inactive>
                                        Нет приложений
                                    </Text>
                                )}

                                <S.AppsContainer>
                                    {visibleApps.map((product) => (
                                        <S.AppContainer
                                            key={product.id}
                                            onClick={() =>
                                                navigate(
                                                    `${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${product.alias}`,
                                                )
                                            }
                                        >
                                            <Text variant="body2" link>
                                                {product.name}
                                            </Text>
                                            <Text variant="body3" inactive>
                                                {product.alias}
                                            </Text>
                                        </S.AppContainer>
                                    ))}
                                </S.AppsContainer>

                                {hasHiddenApps && (
                                    <S.ButtonStyled onClick={() => setShowAllApps((prev) => !prev)}>
                                        <Text variant="subtitle3">
                                            {showAllApps ? 'Скрыть' : 'Показать полностью'}
                                        </Text>
                                        <Icon
                                            iconName={
                                                showAllApps
                                                    ? Icons.FastArrowTop
                                                    : Icons.FastArrowDown
                                            }
                                        />
                                    </S.ButtonStyled>
                                )}
                            </S.SpaceCardBody>
                        </S.SpaceCard>

                        {/* <S.SpaceCard
                            role="button"
                            tabIndex={0}
                            onClick={() => navigate(`${R.PROFILE_PATH}${R.SUBSCRIPTIONS_PATH}`)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    navigate(`${R.PROFILE_PATH}${R.SUBSCRIPTIONS_PATH}`);
                                }
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <S.SpaceCardHeader>
                                <Text variant="subtitle2">Мои подписки</Text>
                                <IconButton iconName={Icons.ArrowRight} size="small" />
                            </S.SpaceCardHeader>

                            <S.SpaceCardBody>
                                <Text variant="body2" inactive>
                                    Всего {subscriptionsCount}{' '}
                                    {pluralize(
                                        ['подписка', 'подписки', 'подписок'],
                                        subscriptionsCount,
                                    )}
                                </Text>
                            </S.SpaceCardBody>
                        </S.SpaceCard> */}

                        <S.SpaceCard
                            role="button"
                            tabIndex={0}
                            onClick={() => navigate(`${R.PROFILE_PATH}${R.APPLICATIONS_PATH}`)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    navigate(`${R.PROFILE_PATH}${R.APPLICATIONS_PATH}`);
                                }
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <S.SpaceCardHeader>
                                <Text variant="subtitle2">Мои заявки</Text>
                                <IconButton iconName={Icons.ArrowRight} size="small" />
                            </S.SpaceCardHeader>

                            <S.SpaceCardBody>
                                <Text variant="body2" inactive>
                                    {activeApplicationsCount}{' '}
                                    {pluralize(
                                        ['активная заявка', 'активных заявки', 'активных заявок'],
                                        activeApplicationsCount,
                                    )}
                                </Text>
                                <Text variant="body2" inactive>
                                    {reviewedApplicationsCount}{' '}
                                    {pluralize(
                                        [
                                            'завершенная заявка',
                                            'завершенных заявки',
                                            'завершенных заявок',
                                        ],
                                        reviewedApplicationsCount,
                                    )}
                                </Text>
                            </S.SpaceCardBody>
                        </S.SpaceCard>
                    </>
                )}
            </S.MySpaceGrid>
        </S.Section>
    );
};
