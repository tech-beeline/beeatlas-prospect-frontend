import React, { useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon, Label, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { FloatingNavigation } from 'components/interaction';
import { IconFeeling } from 'components/other';

import { BI, useMockBIStore } from 'pages/CJPage/mocks';
import {
    formatLinkFromString,
    getChannel,
    getEnter,
    getExit,
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

    const { getBiById } = useMockBIStore();

    const [bi, setBi] = useState<BI | null>(null);

    useEffect(() => {
        if (paramId) {
            const bi = getBiById(Number(paramId));
            if (bi) {
                setBi(bi);
            }
        }
    }, [paramId, getBiById]);

    const navigate = useNavigate();

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
                        onClick={() => navigate(-1)}
                        style={{ cursor: 'pointer' }}
                    />

                    {bi ? (
                        <S.Title>{bi?.name}</S.Title>
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
                {bi && (
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
                                        <S.Body2>{formatNullableString(null)}</S.Body2>
                                    )}
                                    {(bi?.participants ?? []).map((participant, index) => (
                                        <>
                                            <S.Subtitle3>Участник {index + 1}</S.Subtitle3>
                                            <S.Body3>Участник</S.Body3>
                                            <S.Body2>
                                                {getParticipant(participant.participant)}
                                            </S.Body2>
                                            <S.Body3>Описание участника</S.Body3>
                                            <S.Body2>{participant.descr}</S.Body2>
                                            <S.Body3>Ценностный результат</S.Body3>
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
                                    <S.Subtitle id="enters">Входы и выходы</S.Subtitle>
                                    {bi?.enters.length === 0 && (
                                        <S.Body2>{formatNullableString(null)}</S.Body2>
                                    )}
                                    {(bi?.enters ?? []).map((enter, index) => (
                                        <>
                                            <S.Subtitle3>Вход и выход {index + 1}</S.Subtitle3>
                                            <S.Body3>Вход</S.Body3>
                                            <S.Body2>{getEnter(enter.enter)}</S.Body2>
                                            <S.Body3>Выход</S.Body3>
                                            <S.Body2>{getExit(enter.exit)}</S.Body2>
                                        </>
                                    ))}
                                </div>

                                <div>
                                    <S.Body3 id="scenarios">Клиентский сценарий</S.Body3>
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
                                    <S.Body3 id="channels">Канал</S.Body3>
                                    <S.Body2>{bi && getChannel(bi?.channel)}</S.Body2>
                                </div>

                                <div>
                                    <S.Body3 id="documentation">Документация</S.Body3>
                                    <S.Body2>{formatLinkFromString(bi?.document)}</S.Body2>
                                </div>

                                <div>
                                    <S.Body3 id="mockup">Макет</S.Body3>
                                    <S.Body2>{formatLinkFromString(bi?.mockup)}</S.Body2>
                                </div>
                            </S.AttributesContainer>
                        </S.DataContainer>
                        <S.Navigation>
                            <FloatingNavigation
                                items={[
                                    { id: 'description', label: bi.name },
                                    { id: 'participants', label: 'Участники взаимодействия' },
                                    { id: 'feelings', label: 'Чувства и эмоции' },
                                    { id: 'enters', label: 'Входы и выходы' },
                                    { id: 'scenarios', label: 'Сценарии' },
                                    { id: 'channels', label: 'Канал' },
                                    { id: 'documentation', label: 'Документация' },
                                    { id: 'mockup', label: 'Макет' },
                                ]}
                            />
                        </S.Navigation>
                    </>
                )}
                {!bi && (
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
