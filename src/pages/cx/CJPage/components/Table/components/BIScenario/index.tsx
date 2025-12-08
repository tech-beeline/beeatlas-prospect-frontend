import React, { useState } from 'react';
import { Avatar, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { useSideSheetStore } from 'features/cx/store';

import { Text } from 'components/core';
import { Link } from 'components/other';

import { SideSheetVariants } from 'pages/cx/CJPage/const';

import * as S from './units';

export const BIScenario = () => {
    const [expanded, setExpanded] = useState(false);
    const { toggleSideSheet } = useSideSheetStore();
    return (
        <>
            <S.ScenarionTdWrapper expanded={expanded}>
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
                    onClick={() => toggleSideSheet(SideSheetVariants.EDIT_SCENARIO_BI)}
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
                                onClick={() => toggleSideSheet(SideSheetVariants.EDIT_SLA_BI)}
                            />
                        </S.SLATitle>
                        <S.SLAContent>
                            <S.FlexWrapper>
                                <Text variant="overline">RPS</Text>
                                <Text variant="overline">-</Text>
                            </S.FlexWrapper>
                            <S.FlexWrapper>
                                <Text variant="overline">LATENSY, MS</Text>
                                <Text variant="overline">-</Text>
                            </S.FlexWrapper>
                            <S.FlexWrapper>
                                <Text variant="overline">ERROR RATE, %</Text>
                                <Text variant="overline">-</Text>
                            </S.FlexWrapper>
                        </S.SLAContent>
                    </S.SLAWrapper>
                    <S.FlexWrapper gap="16">
                        <Text variant="subtitle3">Вызов 1</Text>
                        <S.FlexWrapper gap="24">
                            <S.FlexWrapper>
                                <Text variant="overline" inactive>
                                    ПРИЛОЖЕНИЕ
                                </Text>
                                <Link title="Заголовок" outer={false} />
                            </S.FlexWrapper>
                            <S.FlexWrapper>
                                <Text variant="overline" inactive>
                                    ТЕХНИЧЕСКАЯ ВОЗМОЖНОСТЬ{' '}
                                </Text>
                                <Link title="Заголовок" outer={false} />
                            </S.FlexWrapper>
                            <S.FlexWrapper>
                                <Text variant="overline" inactive>
                                    ENDPOINT
                                </Text>
                                <Link title="Заголовок" outer={false} />
                            </S.FlexWrapper>
                            <S.FlexWrapper>
                                <Text variant="overline" inactive>
                                    ИНТЕРФЕЙС
                                </Text>
                                <Link title="Заголовок" outer={false} />
                            </S.FlexWrapper>
                        </S.FlexWrapper>
                    </S.FlexWrapper>
                </S.ScenarioContentWrapper>
            )}
        </>
    );
};
