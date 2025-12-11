import React, { FC, useState } from 'react';
import { Avatar, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { Link } from 'components/other';

import { useModal } from 'hooks';
import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import { BIEditSLA } from '../../../BIEditSLA';

import { IBIScenario } from './types';
import * as S from './units';

export const BIScenario: FC<IBIScenario> = ({ biSteps, last }) => {
    const [expanded, setExpanded] = useState(false);
    const {
        openModal: openSlaSidesheet,
        closeModal: closeSlaSidesheet,
        modalOpened: isSlaSidesheetOpened,
    } = useModal();

    return (
        <>
            <S.ScenarionTdWrapper last={last} expanded={expanded}>
                <S.ScenationTitleWrapper>
                    <IconButton
                        onClick={() => setExpanded(!expanded)}
                        iconName={expanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                        size="medium"
                    />
                    <Avatar variant="circle" iconName={Icons.Settings} color="blue" />
                    <Text variant="body3">Сценарий</Text>
                </S.ScenationTitleWrapper>
                <IconButton
                    iconName={Icons.Edit}
                    size="medium"
                    // onClick={() => toggleSideSheet(SideSheetVariants.EDIT_SCENARIO_BI)}
                />
            </S.ScenarionTdWrapper>

            {expanded && (
                <S.ScenarioContentWrapper>
                    <S.SLAWrapper>
                        <S.SLATitle>
                            <Text variant="body3">SLA</Text>
                            <IconButton
                                iconName={Icons.Edit}
                                size="medium"
                                onClick={openSlaSidesheet}
                            />
                        </S.SLATitle>
                        <S.SLAContent>
                            <S.FlexWrapper>
                                <Text variant="overline">RPS</Text>
                                <Text variant="overline">{formatNullableString(biSteps.rps)}</Text>
                            </S.FlexWrapper>
                            <S.FlexWrapper>
                                <Text variant="overline">LATENSY, MS</Text>
                                <Text variant="overline">
                                    {formatNullableString(biSteps.latency)}
                                </Text>
                            </S.FlexWrapper>
                            <S.FlexWrapper>
                                <Text variant="overline">ERROR RATE, %</Text>
                                <Text variant="overline">
                                    {formatNullableString(biSteps.error_rate)}
                                </Text>
                            </S.FlexWrapper>
                        </S.SLAContent>
                    </S.SLAWrapper>

                    {!biSteps.relations || biSteps.relations.length === 0 ? (
                        <S.FlexWrapper gap="16">
                            <Text variant="subtitle3">Вызов 1</Text>

                            <S.FlexWrapper gap="24">
                                <S.FlexWrapper>
                                    <Text variant="overline" inactive>
                                        ПРИЛОЖЕНИЕ
                                    </Text>
                                    <Link title="Заголовок" />
                                </S.FlexWrapper>

                                <S.FlexWrapper>
                                    <Text variant="overline" inactive>
                                        ТЕХНИЧЕСКАЯ ВОЗМОЖНОСТЬ
                                    </Text>
                                    <Link title="Заголовок" />
                                </S.FlexWrapper>

                                <S.FlexWrapper>
                                    <Text variant="overline" inactive>
                                        ENDPOINT
                                    </Text>
                                    <Link title="Заголовок" />
                                </S.FlexWrapper>

                                <S.FlexWrapper>
                                    <Text variant="overline" inactive>
                                        ИНТЕРФЕЙС
                                    </Text>
                                    <Link title="Заголовок" />
                                </S.FlexWrapper>
                            </S.FlexWrapper>
                        </S.FlexWrapper>
                    ) : (
                        biSteps.relations.map((relation, index) => (
                            <S.FlexWrapper key={index} gap="16">
                                <Text variant="subtitle3">Вызов {index + 1}</Text>

                                <S.FlexWrapper gap="24">
                                    <S.FlexWrapper>
                                        <Text variant="overline" inactive>
                                            ПРИЛОЖЕНИЕ
                                        </Text>
                                        <Link
                                            title={relation.productName}
                                            url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${relation.productAlias}`}
                                        />
                                    </S.FlexWrapper>

                                    <S.FlexWrapper>
                                        <Text variant="overline" inactive>
                                            ТЕХНИЧЕСКАЯ ВОЗМОЖНОСТЬ
                                        </Text>
                                        <Link
                                            title={relation.tcName}
                                            url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${relation.tcId}&type=TECH`}
                                        />
                                    </S.FlexWrapper>

                                    <S.FlexWrapper>
                                        <Text variant="overline" inactive>
                                            ENDPOINT
                                        </Text>
                                        <Link title={relation.operation} />
                                    </S.FlexWrapper>

                                    <S.FlexWrapper>
                                        <Text variant="overline" inactive>
                                            ИНТЕРФЕЙС
                                        </Text>
                                        <Link title={relation.interfaceName} />
                                    </S.FlexWrapper>
                                </S.FlexWrapper>
                            </S.FlexWrapper>
                        ))
                    )}
                </S.ScenarioContentWrapper>
            )}
            <BIEditSLA
                isOpen={isSlaSidesheetOpened}
                onClose={closeSlaSidesheet}
                slaId={String(biSteps.id)}
                data={{ errorRate: biSteps.error_rate, latency: biSteps.latency, rps: biSteps.rps }}
            />
        </>
    );
};
