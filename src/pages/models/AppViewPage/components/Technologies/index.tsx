import React from 'react';
import { Divider, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { Link } from 'components/other';

import * as R from 'router/const';

import * as S from './units';

export const Technologies = () => {
    return (
        <S.Container>
            <S.Card>
                <S.TitleContainer>
                    <Text variant="subtitle2">Adopt</Text>
                    <IconButton
                        data-tooltip-id="adopt"
                        iconName={Icons.QuestionCircled}
                        size="medium"
                    />
                    <TooltipContainer
                        largePadding
                        id="adopt"
                        offset={8}
                        // @ts-ignore
                        place="bottom-start"
                        noArrow
                    >
                        Активно используем, применяем в продуктиве, обеспечиваем автоматизацию
                        в процессе сборки и поставки. Можем предоставить экспертную поддержку
                    </TooltipContainer>
                </S.TitleContainer>
                <Divider />
                <S.LinksContianer>
                    <Link url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=1`} title="draw.io" />
                    <Link url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=1`} title="Element" />
                    <Link url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=1`} title="Confluence" />
                    <Link url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=1`} title="Asimus" />
                    <Link url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=1`} title="PIXSO" />
                </S.LinksContianer>
            </S.Card>
            <S.Card>
                <S.TitleContainer>
                    <Text variant="subtitle2">Trial</Text>
                    <IconButton
                        data-tooltip-id="trial"
                        iconName={Icons.QuestionCircled}
                        size="medium"
                    />
                    <TooltipContainer
                        largePadding
                        id="trial"
                        offset={8}
                        // @ts-ignore
                        place="bottom-start"
                        noArrow
                    >
                        Одна или несколько команд использует данную технологию в продуктиве и
                        остальные команды могут применять в своих продуктах.
                    </TooltipContainer>
                </S.TitleContainer>
                <Divider />
                <S.LinksContianer>
                    <Link url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=1`} title="draw.io" />
                    <Link url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=1`} title="Element" />
                    <Link url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=1`} title="Confluence" />
                    <Link url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=1`} title="Asimus" />
                </S.LinksContianer>
            </S.Card>
            <S.Card>
                <S.TitleContainer>
                    <Text variant="subtitle2">Assess</Text>
                    <IconButton
                        data-tooltip-id="assess"
                        iconName={Icons.QuestionCircled}
                        size="medium"
                    />
                    <TooltipContainer
                        largePadding
                        id="assess"
                        offset={8}
                        // @ts-ignore
                        place="bottom-start"
                        noArrow
                    >
                        Детально изучаем, чтобы оценить, как применение элемента или технологии
                        повлияет на наш ИТ-ландшафт. В продуктиве пока не используем и экспертизой
                        технология не обеспечена.
                    </TooltipContainer>
                </S.TitleContainer>
                <Divider />
                <S.LinksContianer>
                    <Link url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=1`} title="draw.io" />
                    <Link url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=1`} title="Element" />
                    <Link url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=1`} title="Confluence" />
                </S.LinksContianer>
            </S.Card>
            <S.Card>
                <S.TitleContainer>
                    <Text variant="subtitle2">Hold</Text>
                    <IconButton
                        data-tooltip-id="hold"
                        iconName={Icons.QuestionCircled}
                        size="medium"
                    />
                    <TooltipContainer
                        largePadding
                        id="hold"
                        offset={8}
                        // @ts-ignore
                        place="bottom-start"
                        noArrow
                    >
                        При необходимости продолжаем использовать, но стараемся заменить
                        на альтернативные технологии. Не используем для новых продуктов.
                    </TooltipContainer>
                </S.TitleContainer>
                <Divider />
                <S.LinksContianer>
                    <Link url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=1`} title="draw.io" />
                </S.LinksContianer>
            </S.Card>
        </S.Container>
    );
};
