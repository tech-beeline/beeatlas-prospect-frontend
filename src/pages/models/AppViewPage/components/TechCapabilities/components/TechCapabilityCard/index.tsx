import React, { useState } from 'react';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import * as R from 'router/const';

import * as S from './units';

export const TechCapabilityCard = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <S.Container>
            <div>
                <Text
                    link
                    pointer
                    onClick={() => window.open(`${R.MODELS_PATH}${R.FDM_PATH}`)}
                    variant="subtitle2"
                >
                    Возможность online-отображения информации в процессе коммуникации сотрудников
                    офисов и call-центров с абонентами
                </Text>
                <Text inactive variant="body3">
                    B2CDIGITALRETAILDELIVERYCATALOG.002
                </Text>
            </div>
            <div>
                <Text inactive variant="body3">
                    Домен
                </Text>
                <Text
                    link
                    pointer
                    onClick={() => window.open(`${R.MODELS_PATH}${R.FDM_PATH}`)}
                    variant="body2"
                >
                    Омниканальное управление взаимодействиями; Реализация возможностей Communication
                    Platform
                </Text>
            </div>
            <S.FlexContainer>
                <Text variant="subtitle2">API</Text>
                <IconButton
                    size="medium"
                    iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                    onClick={() => setIsExpanded(!isExpanded)}
                />
            </S.FlexContainer>
            {isExpanded && (
                <S.ApisContainer>
                    <Text pointer link variant="body2">
                        capability-api.dashboard.FDMSHOWCASEAPP
                    </Text>
                    <Text pointer link variant="body2">
                        capability-api.dashboard.FDMSHOWCASEAPP
                    </Text>
                </S.ApisContainer>
            )}
        </S.Container>
    );
};
