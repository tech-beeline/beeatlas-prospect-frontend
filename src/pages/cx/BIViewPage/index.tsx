import React, { useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { dataToFormValues, formValuesToData, StatusBadge, TargetBadge } from 'features/cx';

import { Text } from 'components/core';
import { FloatingNavigation } from 'components/interaction';
import { Link, NotFoundBlock, PivotArrow } from 'components/other';
import { IconButton } from 'components/ui';
import { Button, Label, Skeleton } from 'components/ui';

import {
    useGetBIByIdQuery,
    useGetBIEditabilityByIdQuery,
    useUpdateBIMutation,
} from 'api/queries/bi';
import { useGetCJCollectionByBIIdQuery } from 'api/queries/cj';
import { useGetAllProductsQuery } from 'api/queries/product';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';
import { safeNavigateBack } from 'utils/helpers';

import * as S from './units';

export const BIViewPage = () => {
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const [showCjs, setShowCjs] = useState(false);

    const { data, isLoading: isLoadingBI } = useGetBIByIdQuery(paramId);
    const {
        data: cjs,
        isLoading: isLoadingCjs,
        refetch,
    } = useGetCJCollectionByBIIdQuery(paramId, true);
    const { data: editabilityData, isLoading: isLoadingEditability } =
        useGetBIEditabilityByIdQuery(paramId);
    const { data: productsData } = useGetAllProductsQuery();
    const { mutateAsync: updateBi } = useUpdateBIMutation();
    const currentProduct = productsData?.find(
        (product) => String(product.id) === String(data?.productId),
    );
    const isLoading = isLoadingBI || isLoadingEditability;

    const navigate = useNavigate();

    const handleBackIconClick = () => {
        safeNavigateBack(navigate, `${R.CX_PATH}${R.BI_PATH}`);
    };

    const handleEditClick = () => {
        navigate({
            pathname: `${R.CX_PATH}${R.BI_PATH}${R.ADD_PATH}`,
            search: createSearchParams({ id: String(paramId) }).toString(),
        });
    };

    const handleMarkAsDraft = () => {
        if (data) {
            const formValues = dataToFormValues(data);
            const dataToUpdate = formValuesToData(formValues);
            updateBi({
                id: String(data.id),
                data: { ...dataToUpdate, draft: true },
            });
        }
    };

    const handleArrowClick = async () => {
        if (!showCjs) {
            await refetch();
        }
        setShowCjs(!showCjs);
    };

    const isEditDisabled = !editabilityData || !data || !editabilityData.editability;

    return (
        <S.PageWrapper>
            <S.Header>
                <S.FlexSideContainer>
                    <IconButton
                        iconName={Icons.ArrowLeft}
                        onClick={handleBackIconClick}
                        size="medium"
                    />
                    {data && <S.Title>{data.name}</S.Title>}
                    {isLoading && <Skeleton height={24} width={120} radius={5} />}
                </S.FlexSideContainer>

                <S.FlexSideContainer>
                    <Button
                        disabled={isEditDisabled}
                        onClick={data?.draft ? handleEditClick : handleMarkAsDraft}
                        variant="contained"
                    >
                        {data?.draft ? 'Редактировать' : 'Сделать черновиком'}
                    </Button>
                </S.FlexSideContainer>
            </S.Header>
            <S.Content>
                {data && editabilityData && (
                    <>
                        <S.DataContainer>
                            <div id="top" />
                            {!editabilityData.editability && (
                                <S.BannerStyled
                                    color="default"
                                    iconName={Icons.InfoCircled}
                                    title="BI используется в других опубликованных CJ, редактирование недоступно"
                                />
                            )}
                            <S.LabelsContainer>
                                <TargetBadge target={data.target} />
                                <StatusBadge status={data.status} />
                                <Label
                                    variant="contained"
                                    title={data.draft ? 'Черновик' : 'Опубликован'}
                                    type={data.draft ? 'default' : 'success'}
                                />
                            </S.LabelsContainer>
                            <S.AttributesContainer>
                                <div>
                                    <S.Body3>Описание</S.Body3>
                                    <S.Body2>{formatNullableString(data.descr)}</S.Body2>
                                </div>

                                <div>
                                    <S.Subtitle id="scenarios">Сценарий</S.Subtitle>
                                    <S.Body3 marginTop>Клиентский сценарий</S.Body3>
                                    <S.Body2>{formatNullableString(data.clientScenario)}</S.Body2>
                                </div>

                                <div>
                                    <S.Subtitle marginBottom id="channels">
                                        Каналы
                                    </S.Subtitle>
                                    <S.Body2>
                                        {formatNullableString(
                                            data.channel.map((channel) => channel.name).join(', '),
                                        )}
                                    </S.Body2>
                                </div>

                                <div>
                                    <S.Subtitle marginBottom id="documentation">
                                        Документация
                                    </S.Subtitle>
                                    <S.Body2>
                                        {data.document.map((document, index) => (
                                            <>
                                                <Link url={document.url} />
                                                <S.Body3 marginTop>Описание</S.Body3>
                                                <S.Body2
                                                    marginBottom={
                                                        index + 1 !== data.document.length
                                                    }
                                                >
                                                    {formatNullableString(document.descr)}
                                                </S.Body2>
                                            </>
                                        ))}
                                        {data.document.length === 0 && formatNullableString(null)}
                                    </S.Body2>
                                </div>

                                <div>
                                    <S.Subtitle marginBottom id="metrics">
                                        Метрики
                                    </S.Subtitle>
                                    <S.Body2>{formatNullableString(data.metrics)}</S.Body2>
                                </div>

                                <div>
                                    <S.FlexContainer>
                                        <S.Subtitle marginBottom id="cjs">
                                            Связанные CJ {`(${cjs?.length})`}
                                        </S.Subtitle>
                                        <PivotArrow
                                            style={{ cursor: 'pointer' }}
                                            position={showCjs && 'top'}
                                            onClick={handleArrowClick}
                                        />
                                    </S.FlexContainer>
                                    <S.CJContainer open={showCjs}>
                                        {cjs &&
                                            cjs.map((cj) => (
                                                <div key={cj.id}>
                                                    <Link
                                                        key={cj.id}
                                                        url={`/cx/cj/add?id=${cj.id}`}
                                                        title={cj.name}
                                                    />
                                                    <Text variant="body3" inactive>
                                                        {cj.uniqueIdent}
                                                    </Text>
                                                </div>
                                            ))}
                                        {cjs && cjs.length === 0 && (
                                            <Text variant="body2" inactive>
                                                Нет связанных CJ
                                            </Text>
                                        )}
                                        {isLoadingCjs && <Skeleton height={200} width={500} />}
                                    </S.CJContainer>
                                </div>

                                <div>
                                    <S.Subtitle id="service">Служебные поля</S.Subtitle>
                                    <S.Body3 marginTop>Идентификатор</S.Body3>
                                    <S.Body2>{formatNullableString(data.uniqueIdent)}</S.Body2>
                                    <S.Body3 marginTop>Приложение</S.Body3>
                                    <S.Body2>{formatNullableString(currentProduct?.name)}</S.Body2>
                                    <S.Body3 marginTop>Автор</S.Body3>
                                    <S.Body2>{data.author.fullName}</S.Body2>
                                    <S.Body3 marginTop>Дата изменения</S.Body3>
                                    <S.Body2>
                                        {dayjs(data.lastModifiedDate).format('DD.MM.YYYY')}
                                    </S.Body2>
                                </div>
                            </S.AttributesContainer>
                        </S.DataContainer>
                        <S.Navigation>
                            <FloatingNavigation
                                items={[
                                    { id: 'top', label: data.name },
                                    { id: 'scenarios', label: 'Сценарий' },
                                    { id: 'channels', label: 'Каналы' },
                                    { id: 'documentation', label: 'Документация' },
                                    { id: 'cjs', label: 'Привязка к CJ' },
                                    { id: 'service', label: 'Служебные поля' },
                                ]}
                            />
                        </S.Navigation>
                    </>
                )}
                {isLoading && (
                    <S.SkeletonContainer>
                        <Skeleton height={20} radius={5} />
                        <Skeleton height={40} radius={5} />
                        <Skeleton height={40} radius={5} />
                        <Skeleton height={100} radius={5} />
                        <Skeleton height={40} radius={5} />
                    </S.SkeletonContainer>
                )}
                {!data && !isLoading && (
                    <S.NotFoundContainer>
                        <NotFoundBlock />
                    </S.NotFoundContainer>
                )}
            </S.Content>
        </S.PageWrapper>
    );
};
