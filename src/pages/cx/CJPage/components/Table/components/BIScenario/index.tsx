import React, { FC, useState } from 'react';
import { Avatar, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { Link } from 'components/other';

import { useModal } from 'hooks';
import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import { BIEditScenario } from '../../../BIEditScenario';
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

    const {
        openModal: openRealtionsSidesheet,
        closeModal: closeRelationsSidesheet,
        modalOpened: isRelationsSidesheetOpened,
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
                    <Text variant="body3">{biSteps.name}</Text>
                </S.ScenationTitleWrapper>
                <IconButton iconName={Icons.Edit} size="medium" onClick={openRealtionsSidesheet} />
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
                                    {formatNullableString(biSteps.errorRate)}
                                </Text>
                            </S.FlexWrapper>
                        </S.SLAContent>
                    </S.SLAWrapper>

                    {!biSteps.relations || biSteps.relations.length === 0 ? (
                        <S.FlexWrapper gap="16">
                            <Text variant="subtitle3">Нет вызовов</Text>
                        </S.FlexWrapper>
                    ) : (
                        biSteps.relations.map((relation, index) => (
                            <S.FlexWrapper key={index} gap="16">
                                <Text variant="subtitle3">Вызов {index + 1}</Text>

                                <S.FlexWrapper gap="24">
                                    <S.FlexWrapper>
                                        <Text variant="overline" inactive>
                                            ОПИСАНИЕ
                                        </Text>
                                        {formatNullableString(relation.description)}
                                    </S.FlexWrapper>

                                    <S.FlexWrapper>
                                        <Text variant="overline" inactive>
                                            ПРИЛОЖЕНИЕ
                                        </Text>
                                        {relation.productName && relation.productAlias ? (
                                            <Link
                                                title={relation.productName}
                                                url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${relation.productAlias}`}
                                            />
                                        ) : (
                                            formatNullableString(null)
                                        )}
                                    </S.FlexWrapper>

                                    <S.FlexWrapper>
                                        <Text variant="overline" inactive>
                                            ТЕХНИЧЕСКАЯ ВОЗМОЖНОСТЬ
                                        </Text>
                                        {relation.tcName && relation.tcId ? (
                                            <Link
                                                title={relation.tcName}
                                                url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${relation.tcId}&type=TECH`}
                                            />
                                        ) : (
                                            formatNullableString(null)
                                        )}
                                    </S.FlexWrapper>

                                    <S.FlexWrapper>
                                        <Text variant="overline" inactive>
                                            ИНТЕРФЕЙС
                                        </Text>
                                        {relation.productAlias &&
                                        relation.interfaceName &&
                                        relation.interfaceId ? (
                                            <Link
                                                title={relation.interfaceName}
                                                url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?tab=INTERFACES_AND_METHODS&cmdb=${relation.productAlias}&id=${relation.interfaceId}&type=arch_interface`}
                                            />
                                        ) : (
                                            formatNullableString(null)
                                        )}
                                    </S.FlexWrapper>

                                    <S.FlexWrapper>
                                        <Text variant="overline" inactive>
                                            ENDPOINT
                                        </Text>
                                        {relation.productAlias &&
                                        relation.operation &&
                                        relation.operationId ? (
                                            <Link
                                                title={relation.operation}
                                                url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?tab=INTERFACES_AND_METHODS&cmdb=${relation.productAlias}&id=${relation.operationId}&type=arch_operation`}
                                            />
                                        ) : (
                                            formatNullableString(null)
                                        )}
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
                data={{ errorRate: biSteps.errorRate, latency: biSteps.latency, rps: biSteps.rps }}
            />
            <BIEditScenario
                isOpen={isRelationsSidesheetOpened}
                onClose={closeRelationsSidesheet}
                stepId={biSteps.id}
                relationsData={biSteps.relations}
            />
        </>
    );
};
