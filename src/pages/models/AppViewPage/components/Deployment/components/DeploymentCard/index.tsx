import React, { useState } from 'react';

import { C4_COLORS } from '../../../Diagrams/types';
import {
    ACCENT_INSET,
    ACCENT_W,
    BOX_ADDRESS,
    BOX_HEADER,
    CARD_BADGE,
    CARD_NOTCH_R,
    CARD_RADIUS,
    CARD_SHAPE_STROKE,
    CARD_STROKE,
    CARD_STROKE_SELECTED,
    CARD_TEXT,
    cardBadgeWidth,
    cardTextChars,
    cardTextX,
    DIMMED_OPACITY,
    fitLabel,
    NAME_ALONE_Y,
    NAME_FONT,
    NAME_PAIR_Y,
    SUBTITLE_FONT,
    SUBTITLE_Y,
    URL_Y,
} from '../../const';
import type { CardLinkRole, IDeploymentCard } from '../../types';
import { iconById } from '../../utils';
import { NodeIcon } from '../NodeIcon';

import * as S from './units';

/** Тип элемента на диаграмме развёртывания показан карточкой, а не рамкой. */
const CARD_LABEL = 'ContainerInstance';
const CARD_TYPE_LABEL = 'INSTANCE';

interface IDeploymentCardProps {
    card: IDeploymentCard;
    x: number;
    y: number;
    width: number;
    height: number;
    selected: boolean;
    /** Приглушить: экземпляр не связан с выделенным. Именно `dimmed`, не `disabled`. */
    dimmed: boolean;
    /** Фигура связи с выделенной карточкой: выемка, выпуклость или обе. */
    role?: CardLinkRole;
    /** Цвет фигур — цвет выделенного элемента, а не свой. */
    shapeColor?: string;
    /** Заливка поверхности под карточкой: ею вырезается выемка. */
    surface: string;
    /** id фильтра тени карточек: объявлен один раз на полотне (`DeploymentCanvas`). */
    shadowId: string;
    onClick: () => void;
}

/**
 * Карточка экземпляра контейнера — перенесена из прототипа
 * (`experiments/beeline-diagrams/src/components/NodeCard.tsx`): скруглённая, с цветным
 * акцентом типа слева, иконкой технологии, до трёх строк текста, значком «×N»
 * и фигурами связи по краям.
 */
export const DeploymentCard = ({
    card,
    x,
    y,
    width,
    height,
    selected,
    dimmed,
    role,
    shapeColor,
    surface,
    shadowId,
    onClick,
}: IDeploymentCardProps) => {
    const [hovered, setHovered] = useState(false);
    const color = C4_COLORS[CARD_LABEL] ?? C4_COLORS.Container;
    const iconSize = BOX_HEADER.icon.size;
    const cy = y + height / 2;

    // Цвет обводки карточки и выпуклости: свой, а на наведении — цвет типа. У выемки
    // цвет особый (`shapeColor`): она отвечает на вопрос «кто её зовёт» и красится
    // цветом выделенного.
    const strokeHex = hovered || selected ? color : 'var(--color-border)';
    const strokeWidth = selected ? CARD_STROKE_SELECTED : CARD_STROKE;

    const icon = card.icon ? iconById(card.icon) : undefined;
    const hasIconSlot = card.icon !== undefined;
    const textX = x + cardTextX(hasIconSlot);
    // Имя карточки — имя контейнера (в графе у экземпляра оно вида
    // «API Gateway~APP.ContainerInstance» и в карточку не влезает); полное имя
    // остаётся в подсказке.
    const name = card.containerName ?? card.name;
    const subtitle = card.technology;
    const nameY = y + (subtitle ? NAME_PAIR_Y : NAME_ALONE_Y);

    const badge = card.copies > 1 ? `×${card.copies}` : '';
    const badgeReserve = cardBadgeWidth(badge);

    const nameChars = cardTextChars(width, hasIconSlot, NAME_FONT);
    const subtitleChars = cardTextChars(width, hasIconSlot, SUBTITLE_FONT, badgeReserve);
    const urlChars = cardTextChars(width, hasIconSlot, BOX_ADDRESS.font, badgeReserve);

    const hint = `${CARD_TYPE_LABEL} · ${name}${subtitle ? ` — ${subtitle}` : ''}${
        card.url ? ` · ${card.url}` : ''
    }`;

    return (
        <g
            // Клик по карточке не должен всплывать до полотна: там он снимает
            // выделение, а поставить его — и есть смысл этого клика.
            onClick={(event) => {
                event.stopPropagation();
                onClick();
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            // Прозрачность на внешней группе гасит разом кольцо, заливку и тексты.
            opacity={dimmed ? DIMMED_OPACITY : 1}
            style={{ cursor: 'pointer' }}
        >
            {selected && (
                <g>
                    <S.SelectionHalo
                        x={x - 6}
                        y={y - 6}
                        width={width + 12}
                        height={height + 12}
                        rx={CARD_RADIUS + 6}
                        stroke={color}
                        strokeWidth={6}
                    />
                    <S.SelectionRing
                        x={x - 4}
                        y={y - 4}
                        width={width + 8}
                        height={height + 8}
                        rx={CARD_RADIUS + 4}
                        stroke={color}
                    />
                </g>
            )}
            <S.CardBody
                x={x}
                y={y}
                width={width}
                height={height}
                rx={CARD_RADIUS}
                stroke={strokeHex}
                strokeWidth={strokeWidth}
                filter={`url(#${shadowId})`}
            />
            {/* Цветной акцент типа — короткая скруглённая полоса, а не во всю высоту. */}
            <S.CardAccent
                x={x + 1}
                y={y + ACCENT_INSET}
                width={ACCENT_W}
                height={height - ACCENT_INSET * 2}
                rx={ACCENT_W / 2}
                style={{ fill: color }}
            />
            {icon && <NodeIcon icon={icon} x={x + CARD_TEXT.padX} y={nameY - iconSize + 3} />}
            <g>
                <title>{hint}</title>
                <S.CardName x={textX} y={nameY}>
                    {fitLabel(name, nameChars)}
                </S.CardName>
                {subtitle && (
                    <S.CardSubtitle x={textX} y={y + SUBTITLE_Y}>
                        {fitLabel(subtitle, subtitleChars)}
                    </S.CardSubtitle>
                )}
                {card.url && (
                    <S.CardUrl x={textX} y={y + URL_Y}>
                        {fitLabel(card.url, urlChars)}
                    </S.CardUrl>
                )}
            </g>
            {badge && (
                <S.CardBadge
                    x={x + width - CARD_BADGE.inset}
                    y={y + height - CARD_BADGE.baseline}
                    textAnchor="end"
                    data-badge="copies"
                >
                    {badge}
                </S.CardBadge>
            )}
            {/*
                Фигуры связи — последними детьми карточки: выемка вырезает то, что
                нарисовано до неё (заливку карточки, её рамку и акцент типа), и до
                содержимого не достаёт: вырез кончается на x + CARD_NOTCH_R, а текст
                начинается с x + CARD_TEXT.padX — ровно поэтому отступ и выведен
                из вылета фигуры. Порядок внутри пары обязателен: сначала вырез,
                потом стенка, иначе стенка лишится внутренней половины штриха.
            */}
            {(role === 'socket' || role === 'both') && (
                <>
                    <circle
                        cx={x}
                        cy={cy}
                        r={CARD_NOTCH_R}
                        style={{ fill: surface }}
                        pointerEvents="none"
                        data-role="socket"
                    />
                    <path
                        d={`M ${x},${
                            cy - CARD_NOTCH_R
                        } A ${CARD_NOTCH_R} ${CARD_NOTCH_R} 0 0 1 ${x},${cy + CARD_NOTCH_R}`}
                        fill="none"
                        stroke={shapeColor ?? strokeHex}
                        strokeWidth={CARD_SHAPE_STROKE}
                        pointerEvents="none"
                        data-role="socket"
                    />
                </>
            )}
            {/*
                Выпуклость — правый полудиск, и собирается она в три приёма: замкнутый
                контур рисует хорду, а хорда ложится ровно на правое ребро карточки —
                внутри полусферы оставалась бы вертикальная линия. Полоска слева
                от хорды закрашивает ребро карточки под выпуклостью, полудиск без
                штриха — материал и метка фигуры (по габариту его узнаёт живая
                проверка), а дуга идёт последней и без замыкания: заливку и клик
                несёт полудиск, ей остаётся обводка.
            */}
            {(role === 'bump' || role === 'both') && (
                <>
                    <path
                        d={`M ${x + width - strokeWidth},${cy - CARD_NOTCH_R} L ${x + width},${
                            cy - CARD_NOTCH_R
                        } L ${x + width},${cy + CARD_NOTCH_R} L ${x + width - strokeWidth},${
                            cy + CARD_NOTCH_R
                        } Z`}
                        style={{ fill: 'var(--color-background-base)' }}
                        stroke="none"
                    />
                    <path
                        d={`M ${x + width},${
                            cy - CARD_NOTCH_R
                        } A ${CARD_NOTCH_R} ${CARD_NOTCH_R} 0 0 1 ${x + width},${
                            cy + CARD_NOTCH_R
                        } Z`}
                        style={{ fill: 'var(--color-background-base)' }}
                        stroke="none"
                        data-role="bump"
                    />
                    <path
                        d={`M ${x + width},${
                            cy - CARD_NOTCH_R
                        } A ${CARD_NOTCH_R} ${CARD_NOTCH_R} 0 0 1 ${x + width},${
                            cy + CARD_NOTCH_R
                        }`}
                        fill="none"
                        stroke={strokeHex}
                        strokeWidth={CARD_SHAPE_STROKE}
                        pointerEvents="none"
                    />
                </>
            )}
        </g>
    );
};
