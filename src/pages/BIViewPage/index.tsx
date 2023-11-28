import React from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon, Label, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { FloatingNavigation } from 'components/interaction';
import { IconFeeling } from 'components/other';

import { useGetBIByIdQuery, useGetBIEditabilityByIdQuery } from 'api/queries/bi';
import { useGetCJCollectionByBIIdQuery } from 'api/queries/cj';
import {
    formatLinkFromString,
    // getChannel,
    // getEnter,
    // getExit,
    getFeelingType,
    getParticipant,
    // getStatus,
} from 'pages/CJPage/utils/formatters';
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

    return (
        <S.PageWrapper>
            <S.Header>
                <S.FlexSideContainer>
                    <Icon
                        iconName={Icons.ArrowLeft}
                        onClick={handleBackIconClick}
                        style={{ cursor: 'pointer' }}
                    />

                    {data ? (
                        <S.Title>{data.name}</S.Title>
                    ) : (
                        <Skeleton height={24} width={120} radius={5} />
                    )}
                </S.FlexSideContainer>

                <S.FlexSideContainer>
                    <Button
                        disabled={!editabilityData || !editabilityData.editability}
                        onClick={handleEditClick}
                        variant="contained"
                    >
                        Редактировать
                    </Button>
                </S.FlexSideContainer>
            </S.Header>
            <S.Content>
                {data && editabilityData && (
                    <>
                        <S.DataContainer>
                            {!editabilityData.editability && (
                                <S.BannerStyled
                                    color="default"
                                    iconName={Icons.InfoCircled}
                                    title="BI используется в других опубликованных Cj, редактирование недоступно!"
                                />
                            )}
                            <S.LabelsContainer>
                                <Label
                                    title={data.type === 0 ? 'Целевой' : 'Фактический'}
                                    type="teal"
                                />
                                {data.communal && <Label title="Коммунальный" type="magenta" />}
                                <Label
                                    // title={
                                    //     statuses.find((status) => status.id === data.statusId)?.name
                                    // }
                                    title="Передан в эксплуатацию"
                                    type="info"
                                />
                                <Label
                                    variant="contained"
                                    title={data.draft ? 'Не опубликован' : 'Опубликован'}
                                    type={data.draft ? 'error' : 'success'}
                                />
                            </S.LabelsContainer>
                            <S.AttributesContainer>
                                <div id="description">
                                    <S.Body3>Описание</S.Body3>
                                    <S.Body2>{formatNullableString(data.descr)}</S.Body2>
                                </div>

                                <div>
                                    <S.Subtitle id="participants">
                                        Участники взаимодействия
                                    </S.Subtitle>
                                    {data.participants.map((participant, index) => (
                                        <>
                                            <S.Body3 marginTop>Участник {index + 1}</S.Body3>
                                            <S.Body2>
                                                {getParticipant(participant.participant)}
                                            </S.Body2>
                                            <S.Body3 marginTop>
                                                Описание участника {index + 1}
                                            </S.Body3>
                                            <S.Body2>{participant.descr}</S.Body2>
                                            <S.Body3 marginTop>
                                                Ценностный результат для участника {index + 1}
                                            </S.Body3>
                                            <S.Body2>
                                                {formatNullableString(participant.value)}
                                            </S.Body2>
                                        </>
                                    ))}
                                </div>

                                <div>
                                    <S.Subtitle id="feelings">Чувства и эмоции клиента</S.Subtitle>
                                    <S.IconContainer>
                                        <IconFeeling type={getFeelingType(data.feelings)} />
                                    </S.IconContainer>
                                </div>

                                <div>
                                    <S.Subtitle id="scenarios">Сценарии</S.Subtitle>
                                    <S.Body3 marginTop>Клиентский сценарий</S.Body3>
                                    <S.Body2>{formatNullableString(data.clientScenario)}</S.Body2>
                                </div>

                                <div>
                                    <S.Body3>Ссылка на флоу</S.Body3>
                                    <S.Body2>{formatLinkFromString('')}</S.Body2>
                                </div>

                                <div>
                                    <S.Body3>Описание реакции ЕКП</S.Body3>
                                    <S.Body2>{formatNullableString(data.ucsReaction)}</S.Body2>
                                </div>

                                <div>
                                    <S.Subtitle marginBottom id="channels">
                                        Канал
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
                                                {formatLinkFromString(document.url)}
                                                {index < data.document.length - 1 && ', '}
                                            </>
                                        ))}
                                        {data.document.length === 0 && formatNullableString(null)}
                                    </S.Body2>
                                </div>

                                <div>
                                    <S.Subtitle marginBottom id="mockup">
                                        Макет
                                    </S.Subtitle>
                                    <S.Body2>
                                        {data.mockupLink.map((mockup, index) => (
                                            <>
                                                {formatLinkFromString(mockup.url)}
                                                {index < data.mockupLink.length - 1 && ', '}
                                            </>
                                        ))}
                                        {data.mockupLink.length === 0 && formatNullableString(null)}
                                    </S.Body2>
                                </div>

                                <div>
                                    <S.Subtitle marginBottom id="cjs">
                                        Привязка к CJ
                                    </S.Subtitle>
                                    <S.Body2>
                                        {cjs &&
                                            cjs.map((cj, index) => (
                                                <>
                                                    {formatLinkFromString(
                                                        `/cx/cj/add?id=${cj.id}`,
                                                        cj.name,
                                                    )}
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
                                </div>
                            </S.AttributesContainer>
                        </S.DataContainer>
                        <S.Navigation>
                            <FloatingNavigation
                                items={[
                                    { id: 'description', label: data.name },
                                    { id: 'participants', label: 'Участники взаимодействия' },
                                    { id: 'feelings', label: 'Чувства и эмоции' },
                                    { id: 'scenarios', label: 'Сценарии' },
                                    { id: 'channels', label: 'Канал' },
                                    { id: 'documentation', label: 'Документация' },
                                    { id: 'mockup', label: 'Макет' },
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
            </S.Content>
        </S.PageWrapper>
    );
};
