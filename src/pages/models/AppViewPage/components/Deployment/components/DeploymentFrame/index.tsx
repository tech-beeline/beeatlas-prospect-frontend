import React from 'react';

import { C4_COLORS } from '../../../Diagrams/types';
import {
    BOX_ADDRESS,
    BOX_HEADER,
    BOX_TOGGLE_SLOT,
    boxHeaderLineY,
    DIMMED_OPACITY,
    INSTANCE_W,
    nameLinesWidth,
} from '../../const';
import type { CardLinkRole, IDeploymentBox } from '../../types';
import { boxSurface, collapseCountsText, iconById } from '../../utils';
import { DeploymentCard } from '../DeploymentCard';
import { NodeIcon } from '../NodeIcon';

import * as S from './units';

/** Метка типа в заголовке рамки и её цвет — те же, что в движке диаграмм. */
const headerOf = (kind: IDeploymentBox['kind']): { label: string; color: string } =>
    kind === 'environment'
        ? { label: BOX_HEADER.labels.environment, color: C4_COLORS.Environment }
        : { label: BOX_HEADER.labels.node, color: C4_COLORS.DeploymentNode };

interface IDeploymentFrameProps {
    box: IDeploymentBox;
    selected: string | null;
    dimmed: ReadonlySet<string>;
    roles: ReadonlyMap<string, CardLinkRole>;
    shapeColor?: string;
    /** id фильтра тени карточек: он объявлен один раз на полотне (`DeploymentCanvas`). */
    shadowId: string;
    onSelect: (id: string) => void;
    onToggle: (id: string) => void;
}

/**
 * Рамка узла развёртывания (или окружения над его корнями) — перенесена из прототипа
 * (`experiments/beeline-diagrams/src/components/DeploymentDiagram.tsx`): заголовок
 * с меткой типа, именем в одну-две строки и иконкой технологии, полоса адреса,
 * знак схлопывания со счётчиками, а внутри — вложенные рамки и карточки.
 */
export const DeploymentFrame = ({
    box,
    selected,
    dimmed,
    roles,
    shapeColor,
    shadowId,
    onSelect,
    onToggle,
}: IDeploymentFrameProps) => {
    const isSelected = selected === box.id;
    const isDimmed = dimmed.has(box.id);
    const { label, color } = headerOf(box.kind);
    const lines = box.nameLines.length;

    // Иконка технологии встаёт после имени, а не перед ним: имя во всех рамках
    // начинается с одной x, поэтому выравнивание текста по колонке не разъезжается.
    // Рисуется ли она — решено раскладкой по ширине рамки.
    const iconSize = BOX_HEADER.icon.size;
    const icons = box.technologies
        .slice(0, box.headerIconCount)
        .map((technology) => iconById(technology.id))
        .filter((icon): icon is NonNullable<typeof icon> => icon !== undefined);

    const nameX = box.x + box.nameX;
    const labelX = box.x + BOX_HEADER.padX + (box.collapsible ? BOX_TOGGLE_SLOT : 0);
    const iconsX = nameX + nameLinesWidth(box.nameLines) + BOX_HEADER.gap;
    const Body = box.kind === 'environment' ? S.EnvironmentBody : S.FrameBody;

    return (
        <g>
            {/*
                Приглушается только своя обвязка: вложенные рамки и карточки стоят
                снаружи этой группы и решают про себя сами. Внутрь их пускать нельзя —
                opacity группы умножается, и активная вложенная рамка внутри погашенной
                светилась бы вчетверо слабее погашенной же.
            */}
            <g opacity={isDimmed ? DIMMED_OPACITY : 1}>
                <Body
                    x={box.x}
                    y={box.y}
                    width={box.width}
                    height={box.height}
                    // Клик по рамке не должен всплывать до полотна: там он снимает
                    // выделение, а выделить рамку — и есть его смысл.
                    onClick={(event) => {
                        event.stopPropagation();
                        onSelect(box.id);
                    }}
                    stroke={isSelected ? color : undefined}
                    strokeWidth={isSelected ? 2 : undefined}
                    style={{ cursor: 'pointer' }}
                />
                <S.HeaderDivider
                    x1={box.x}
                    y1={box.y + box.headerH}
                    x2={box.x + box.width}
                    y2={box.y + box.headerH}
                />
                <S.TypeLabel
                    x={labelX}
                    y={box.y + boxHeaderLineY(lines, 0)}
                    style={{ fill: color }}
                >
                    {label}
                </S.TypeLabel>
                {box.nameLines.map((line, index) => (
                    <S.FrameName
                        key={line + index}
                        x={nameX}
                        y={box.y + boxHeaderLineY(lines, index)}
                    >
                        {/* Полное имя — в подсказке: обрезка не должна прятать данные. */}
                        {index === 0 && <title>{box.name}</title>}
                        {line}
                    </S.FrameName>
                ))}
                {icons.length > 0 && (
                    <g>
                        <title>
                            {box.technologies.map((technology) => technology.label).join(', ')}
                        </title>
                        {icons.map((icon, index) => (
                            <NodeIcon
                                key={icon.id}
                                icon={icon}
                                x={iconsX + index * (iconSize + BOX_HEADER.icon.gap)}
                                y={box.y + (box.headerH - iconSize) / 2}
                                size={iconSize}
                            />
                        ))}
                    </g>
                )}
                {/* Адрес узла — строкой под заголовком. Полоса есть у каждой рамки,
                    и у узла без адреса она пустая: так рамки одной колонки одной
                    высоты. Поэтому здесь проверяется строка, а не полоса. */}
                {box.addressShort !== '' && (
                    <S.AddressLine x={box.x + BOX_ADDRESS.padX} y={box.y + box.headerH + 12}>
                        {/* Полная строка — в подсказке. */}
                        <title>{box.addresses.join(' · ')}</title>
                        {box.addressShort}
                    </S.AddressLine>
                )}
                {/* Строка счётчиков схлопнутого узла — на месте, которое занимало бы
                    содержимое: между полосой адреса и нижним краем рамки. */}
                {box.collapsed && (
                    <S.CountsLine
                        data-collapse="counts"
                        x={box.x + BOX_ADDRESS.padX}
                        y={box.y + box.headerH + box.addressBand + 18}
                    >
                        {collapseCountsText(box.nestedNodes, box.nestedContainers)}
                    </S.CountsLine>
                )}
                {/*
                    Значок схлопывания — в левом верхнем углу заголовка, перед меткой
                    типа. Нарисован ПОСЛЕ рамки, иначе рамка перехватывала бы клик,
                    и с двумя stopPropagation: без них клик по значку выделил бы рамку
                    и скопировал её адрес, а нажатие начало бы панорамирование.
                */}
                {box.collapsible && (
                    <g
                        data-collapse="toggle"
                        onClick={(event) => {
                            event.stopPropagation();
                            onToggle(box.id);
                        }}
                        onMouseDown={(event) => event.stopPropagation()}
                        style={{ cursor: 'pointer' }}
                    >
                        <title>{box.collapsed ? 'Развернуть узел' : 'Свернуть узел'}</title>
                        {/* Прозрачная площадка попадания: сам глиф 12 px, целиться
                            в него неудобно. */}
                        <rect
                            data-collapse="hit"
                            x={box.x + BOX_HEADER.padX - 3}
                            y={box.y + (box.headerH - BOX_HEADER.toggle.size) / 2 - 3}
                            width={BOX_HEADER.toggle.size + 6}
                            height={BOX_HEADER.toggle.size + 6}
                            fill="transparent"
                        />
                        <S.ToggleGlyph
                            data-collapse="glyph"
                            x={box.x + BOX_HEADER.padX + BOX_HEADER.toggle.size / 2}
                            y={box.y + boxHeaderLineY(lines, 0)}
                            textAnchor="middle"
                            style={{ fill: color }}
                        >
                            {box.collapsed ? '+' : '−'}
                        </S.ToggleGlyph>
                    </g>
                )}
            </g>

            {box.children.map((child) => (
                <DeploymentFrame
                    key={child.id}
                    box={child}
                    selected={selected}
                    dimmed={dimmed}
                    roles={roles}
                    shapeColor={shapeColor}
                    shadowId={shadowId}
                    onSelect={onSelect}
                    onToggle={onToggle}
                />
            ))}

            {box.instances.map((instance) => {
                const offset = box.instanceOffsets.find((item) => item.id === instance.id);
                if (!offset) return null;
                return (
                    <DeploymentCard
                        key={instance.id}
                        card={instance}
                        x={offset.x}
                        y={offset.y}
                        width={INSTANCE_W}
                        height={box.cardH}
                        selected={selected === instance.id}
                        dimmed={dimmed.has(instance.id)}
                        role={roles.get(instance.id)}
                        shapeColor={shapeColor}
                        shadowId={shadowId}
                        surface={boxSurface(box.kind)}
                        onClick={() => onSelect(instance.id)}
                    />
                );
            })}
        </g>
    );
};
