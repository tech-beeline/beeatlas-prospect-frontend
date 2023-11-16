import React from 'react';
// import React, { useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon, Label, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { FloatingNavigation } from 'components/interaction';
import { IconFeeling } from 'components/other';

import { useGetBIByIdQuery } from 'api/queries/bi';
// import { BI, useMockBIStore } from 'pages/CJPage/mocks';
import {
    formatLinkFromString,
    // getChannel,
    // getEnter,
    // getExit,
    getFeelingType,
    getParticipant,
    getStatus,
} from 'pages/CJPage/utils/formatters';
import * as ROUTER from 'router/const';
import { formatNullableString } from 'utils/formatters';

import * as S from './units';

export const BIViewPage = () => {
    const [params] = useSearchParams();
    const paramId = params.get('id');

    // const { getBiById } = useMockBIStore();

    const { data, isLoading } = useGetBIByIdQuery(paramId);

    // const [bi, setBi] = useState<BI | null>(null);

    // useEffect(() => {
    //     if (paramId) {
    //         const bi = getBiById(Number(paramId));
    //         if (bi) {
    //             setBi(bi);
    //         }
    //     }
    // }, [paramId, getBiById]);

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

                    {/* {bi ? (
                        <S.Title>{bi?.name}</S.Title>
                    ) : (
                        <Skeleton height={24} width={120} radius={5} />
                    )} */}
                    {data ? (
                        <S.Title>{data.name}</S.Title>
                    ) : (
                        <Skeleton height={24} width={120} radius={5} />
                    )}
                </S.FlexSideContainer>

                <S.FlexSideContainer>
                    <Button onClick={handleEditClick} variant="contained">
                        Редактировать
                    </Button>
                </S.FlexSideContainer>
            </S.Header>
            <S.Content>
                {/* {bi && (
                    <>
                        <S.DataContainer>
                            <S.LabelsContainer>
                                <Label
                                    title={bi?.type === 0 ? 'Целевой' : 'Фактический'}
                                    variant="contained"
                                    type="teal"
                                />
                                {bi?.communal && (
                                    <Label
                                        title="Коммунальный"
                                        variant="contained"
                                        type="magenta"
                                    />
                                )}
                                <Label
                                    title={getStatus(bi.status)}
                                    variant="contained"
                                    type="info"
                                />
                            </S.LabelsContainer>
                            <S.AttributesContainer>
                                <div id="description">
                                    <S.Body3>Описание</S.Body3>
                                    <S.Body2>{formatNullableString(bi?.descr)}</S.Body2>
                                </div>

                                <div>
                                    <S.Subtitle id="participants">
                                        Участники взаимодействия
                                    </S.Subtitle>
                                    {bi?.participants.length === 0 && (
                                        <S.Body2 marginTop>{formatNullableString(null)}</S.Body2>
                                    )}
                                    {(bi?.participants ?? []).map((participant, index) => (
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
                                            <S.Body2>{participant.value}</S.Body2>
                                        </>
                                    ))}
                                </div>

                                <div>
                                    <S.Subtitle id="feelings">Чувства и эмоции клиента</S.Subtitle>
                                    <S.IconContainer>
                                        {typeof bi?.feelings === 'number' && (
                                            <IconFeeling type={getFeelingType(bi.feelings)} />
                                        )}
                                    </S.IconContainer>
                                </div>

                                <div>
                                    <S.Subtitle id="scenarios">Сценарии</S.Subtitle>
                                    <S.Body3 marginTop>Клиентский сценарий</S.Body3>
                                    <S.Body2>{formatNullableString(bi?.clientScenario)}</S.Body2>
                                </div>

                                <div>
                                    <S.Body3>Ссылка на флоу</S.Body3>
                                    <S.Body2>{formatLinkFromString(bi?.flowLink)}</S.Body2>
                                </div>

                                <div>
                                    <S.Body3>Описание реакции ЕКП</S.Body3>
                                    <S.Body2>{formatNullableString(bi?.ucsReaction)}</S.Body2>
                                </div>

                                <div>
                                    <S.Subtitle id="channels">Канал</S.Subtitle>
                                    <S.Body2>{bi && getChannel(bi?.channel)}</S.Body2>
                                </div>

                                <div>
                                    <S.Subtitle id="documentation">Документация</S.Subtitle>
                                    <S.Body2>{formatLinkFromString(bi?.document)}</S.Body2>
                                </div>

                                <div>
                                    <S.Subtitle id="mockup">Макет</S.Subtitle>
                                    <S.Body2>{formatLinkFromString(bi?.mockup)}</S.Body2>
                                </div>

                                <div>
                                    <S.Subtitle id="service">Служебные поля</S.Subtitle>
                                    <S.Body3 marginTop>Идентификатор</S.Body3>
                                    <S.Body2>{formatNullableString(bi.identificator)}</S.Body2>
                                </div>
                            </S.AttributesContainer>
                        </S.DataContainer>
                        <S.Navigation>
                            <FloatingNavigation
                                items={[
                                    { id: 'description', label: bi.name },
                                    { id: 'participants', label: 'Участники взаимодействия' },
                                    { id: 'feelings', label: 'Чувства и эмоции' },
                                    { id: 'scenarios', label: 'Сценарии' },
                                    { id: 'channels', label: 'Канал' },
                                    { id: 'documentation', label: 'Документация' },
                                    { id: 'mockup', label: 'Макет' },
                                    { id: 'service', label: 'Служебные поля' },
                                ]}
                            />
                        </S.Navigation>
                    </>
                )} */}
                {data && (
                    <>
                        <S.DataContainer>
                            <S.LabelsContainer>
                                <Label
                                    title={data.type === 0 ? 'Целевой' : 'Фактический'}
                                    variant="contained"
                                    type="teal"
                                />
                                {data.communal && (
                                    <Label
                                        title="Коммунальный"
                                        variant="contained"
                                        type="magenta"
                                    />
                                )}
                                <Label
                                    title={getStatus(data.statusId)}
                                    variant="contained"
                                    type="info"
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
                                    {
                                        // bi?.participants.length === 0 && (
                                        // <S.Body2 marginTop>{formatNullableString(null)}</S.Body2>
                                        // )
                                    }
                                    {[{ participant: 0, descr: 'Описание', value: '' }].map(
                                        (participant, index) => (
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
                                        ),
                                    )}
                                </div>

                                <div>
                                    <S.Subtitle id="feelings">Чувства и эмоции клиента</S.Subtitle>
                                    <S.IconContainer>
                                        {
                                            // typeof data.feelings === 'number' && (
                                            // <IconFeeling type={getFeelingType(bi.feelings)} />
                                            // )
                                        }
                                        <IconFeeling type={getFeelingType(4)} />
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
                                    <S.Subtitle id="channels">Канал</S.Subtitle>
                                    {data.channel.map((channel, i) => (
                                        <S.Body2 key={i}>{channel.name}</S.Body2>
                                    ))}
                                </div>

                                <div>
                                    <S.Subtitle id="documentation">Документация</S.Subtitle>
                                    <S.Body2>{formatLinkFromString('')}</S.Body2>
                                </div>

                                <div>
                                    <S.Subtitle id="mockup">Макет</S.Subtitle>
                                    <S.Body2>{formatLinkFromString('')}</S.Body2>
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
                                    // { id: 'participants', label: 'Участники взаимодействия' },
                                    { id: 'feelings', label: 'Чувства и эмоции' },
                                    { id: 'scenarios', label: 'Сценарии' },
                                    // { id: 'channels', label: 'Канал' },
                                    { id: 'documentation', label: 'Документация' },
                                    { id: 'mockup', label: 'Макет' },
                                    { id: 'service', label: 'Служебные поля' },
                                ]}
                            />
                        </S.Navigation>
                    </>
                )}
                {/* {!bi && (
                    <S.SkeletonContainer>
                        <Skeleton height={20} radius={5} />
                        <Skeleton height={40} radius={5} />
                        <Skeleton height={40} radius={5} />
                        <Skeleton height={100} radius={5} />
                        <Skeleton height={40} radius={5} />
                    </S.SkeletonContainer>
                )} */}
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
