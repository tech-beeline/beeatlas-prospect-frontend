import React from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon, Label, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import dayjs from 'dayjs';
import { CommunalLabel, StatusLabel, TargetLabel } from 'features/cx';

import { FloatingNavigation } from 'components/interaction';
import { Link, NotFoundBlock } from 'components/other';

import { useGetBIByIdQuery, useGetBIEditabilityByIdQuery } from 'api/queries/bi';
import { useGetCJCollectionByBIIdQuery } from 'api/queries/cj';
import { useGetUserProductsQuery } from 'api/queries/product';
import * as ROUTER from 'router/const';
import { formatNullableString } from 'utils/formatters';

import * as S from './units';

export const BIViewPage = () => {
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { data, isLoading: isLoadingBI } = useGetBIByIdQuery(paramId);
    const { data: cjs, isLoading: isLoadingCjs } = useGetCJCollectionByBIIdQuery(paramId);
    const { data: editabilityData, isLoading: isLoadingEditability } =
        useGetBIEditabilityByIdQuery(paramId);
    const { data: productsData } = useGetUserProductsQuery();

    const isLoading = isLoadingBI || isLoadingCjs || isLoadingEditability;

    const navigate = useNavigate();

    const handleBackIconClick = () => {
        navigate(`${ROUTER.CX_PATH}${ROUTER.BI_PATH}`);
    };

    const handleEditClick = () => {
        navigate({
            pathname: `${ROUTER.CX_PATH}${ROUTER.BI_PATH}${ROUTER.ADD_PATH}`,
            search: createSearchParams({ id: String(paramId) }).toString(),
        });
    };

    const isEditDisabled =
        !editabilityData || !data || !editabilityData.editability || (data.communal && !data.draft);

    return (
        <S.PageWrapper>
            <S.Header>
                <S.FlexSideContainer>
                    <Icon
                        iconName={Icons.ArrowLeft}
                        onClick={handleBackIconClick}
                        style={{ cursor: 'pointer' }}
                    />
                    {data && <S.Title>{data.name}</S.Title>}
                    {isLoading && <Skeleton height={24} width={120} radius={5} />}
                </S.FlexSideContainer>

                <S.FlexSideContainer>
                    <Button disabled={isEditDisabled} onClick={handleEditClick} variant="contained">
                        Редактировать
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
                            {data.communal && !data.draft && (
                                <S.BannerStyled
                                    color="default"
                                    iconName={Icons.InfoCircled}
                                    title="В коммунальный опубликованный BI нельзя вносить правки и удалять его."
                                />
                            )}
                            <S.LabelsContainer>
                                <TargetLabel target={data.target} />
                                {data.communal && <CommunalLabel />}
                                <StatusLabel status={data.status} />
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
                                    <S.Subtitle marginBottom id="cjs">
                                        Привязка к CJ
                                    </S.Subtitle>
                                    <S.Body2>
                                        {cjs &&
                                            cjs.map((cj, index) => (
                                                <>
                                                    <Link
                                                        url={`/cx/cj/add?id=${cj.id}`}
                                                        title={cj.name}
                                                    />
                                                    {index < cjs.length - 1 && ', '}
                                                </>
                                            ))}
                                        {cjs && cjs.length === 0 && formatNullableString(null)}
                                    </S.Body2>
                                </div>

                                <div>
                                    <S.Subtitle id="service">Служебные поля</S.Subtitle>
                                    <S.Body3 marginTop>Идентификатор</S.Body3>
                                    <S.Body2>{formatNullableString(data.uniqueIdent)}</S.Body2>
                                    <S.Body3 marginTop>Приложение</S.Body3>
                                    <S.Body2>
                                        {formatNullableString(
                                            productsData?.find(
                                                (product) => product.id === data.productId,
                                            )?.name,
                                        )}
                                    </S.Body2>
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
