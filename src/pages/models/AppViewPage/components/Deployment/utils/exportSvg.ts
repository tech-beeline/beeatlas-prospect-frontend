/**
 * Выгрузка диаграммы развёртывания в SVG-файл.
 *
 * Строка собирается из раскладки, а не снимается с живого DOM: у элементов на экране
 * вся краска приходит из Emotion-классов и CSS-переменных, и `cloneNode` дал бы файл
 * без стилей. Сборка из модели даёт самодостаточный файл, а цвета берутся из тех же
 * токенов, что и на экране, — поэтому тема в файл попадает та, в которой диаграмма
 * сейчас открыта.
 *
 * Приём и имена функций — как в движке диаграмм (`GraphCanvas/utils/svg`), чтобы
 * выгрузка выглядела частью проекта, а не отдельным решением.
 */
import { C4_COLORS } from '../../Diagrams/types';
import {
    BOX_ADDRESS,
    BOX_HEADER,
    BOX_TOGGLE_SLOT,
    boxHeaderLineY,
    CARD_BADGE,
    CARD_RADIUS,
    CARD_STROKE,
    CARD_TEXT,
    cardTextChars,
    cardTextX,
    fitLabel,
    INSTANCE_W,
    NAME_ALONE_Y,
    NAME_FONT,
    NAME_PAIR_Y,
    nameLinesWidth,
    SUBTITLE_FONT,
    SUBTITLE_Y,
    URL_Y,
} from '../const';
import type { IDeploymentBox, IDeploymentCard, IDeploymentLayout } from '../types';

import { collapseCountsText } from './plural';
import { iconById } from './tech-icons';

/** Отступ вокруг диаграммы в файле: рамке нельзя липнуть к краю картинки. */
export const EXPORT_PAD = 24;

/**
 * Краски файла: значения токенов портала, снятые с `body` в момент выгрузки.
 * Отдельного списка цветов нет намеренно — иначе светлая и тёмная темы разъехались бы
 * с токенами при первой же правке дизайн-системы.
 */
export interface IDeploymentExportPalette {
    canvasBg: string;
    frameFill: string;
    environmentFill: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
    fontFamily: string;
}

/** Запасные значения на случай, если токен не объявлен: файл не должен быть пустым. */
const TOKEN_FALLBACK: Record<string, string> = {
    '--color-background-base': '#FFFFFF',
    '--color-background-secondary': '#FDFDFD',
    '--color-border': '#D0D0D0',
    '--color-text-active': '#000000',
    '--color-text-inactive': '#888888',
};

/** Значение токена с `body`: тема портала включается классом именно на нём. */
const token = (styles: CSSStyleDeclaration, name: string): string =>
    styles.getPropertyValue(name).trim() || TOKEN_FALLBACK[name] || '';

export const readDeploymentExportPalette = (): IDeploymentExportPalette => {
    const styles = getComputedStyle(document.body);

    return {
        canvasBg: token(styles, '--color-background-base'),
        frameFill: token(styles, '--color-background-secondary'),
        environmentFill: token(styles, '--color-background-base'),
        border: token(styles, '--color-border'),
        textPrimary: token(styles, '--color-text-active'),
        textSecondary: token(styles, '--color-text-inactive'),
        // В файл идёт обычная строка шрифтов: CSS-переменной портала там уже нет.
        fontFamily: token(styles, '--font-family-code').replace(/["']/g, '') || 'monospace',
    };
};

const escapeXml = (value: string): string =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

const round = (value: number): number => Math.round(value * 100) / 100;

/** Текст с базовой линией и кеглем — общая заготовка для всех надписей файла. */
const text = (
    value: string,
    x: number,
    y: number,
    size: number,
    fill: string,
    extra = '',
): string =>
    `<text x="${round(x)}" y="${round(y)}" font-size="${size}" fill="${fill}"${extra}>${escapeXml(
        value,
    )}</text>`;

/** Иконка технологии — тот же путь, что рисует `NodeIcon`, но с явной заливкой. */
const icon = (
    technologyId: string,
    x: number,
    y: number,
    size: number,
    mutedColor: string,
): string => {
    const techIcon = iconById(technologyId);
    if (!techIcon) return '';

    const fill = techIcon.hex === 'currentColor' ? mutedColor : techIcon.hex;

    return `<path d="${techIcon.path}" transform="translate(${round(x)} ${round(y)}) scale(${round(
        size / techIcon.grid,
    )})" fill="${fill}"/>`;
};

/**
 * Тень карточек — тот же фильтр, что на полотне: одна тень на файл, а не фильтр
 * на карточку. id фиксированный: полотно в файле одно.
 */
const CARD_SHADOW_ID = 'deployment-card-shadow';

const defs = (): string =>
    `<defs><filter id="${CARD_SHADOW_ID}" x="-20%" y="-20%" width="140%" height="150%">` +
    '<feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#0F172A" flood-opacity="0.1"/>' +
    '</filter></defs>';

/** Рамка узла или окружения: тело, разделитель заголовка, заголовок, адрес, счётчики. */
const renderBoxSvg = (
    parts: string[],
    box: IDeploymentBox,
    palette: IDeploymentExportPalette,
): void => {
    const lines = box.nameLines.length;
    const color = C4_COLORS[box.kind === 'environment' ? 'Environment' : 'DeploymentNode'];
    const fill = box.kind === 'environment' ? palette.environmentFill : palette.frameFill;
    const label =
        box.kind === 'environment' ? BOX_HEADER.labels.environment : BOX_HEADER.labels.node;
    const labelX = box.x + BOX_HEADER.padX + (box.collapsible ? BOX_TOGGLE_SLOT : 0);
    const nameX = box.x + box.nameX;
    const iconSize = BOX_HEADER.icon.size;
    const iconsX = nameX + nameLinesWidth(box.nameLines) + BOX_HEADER.gap;

    parts.push(
        `<rect x="${round(box.x)}" y="${round(box.y)}" width="${round(box.width)}" height="${round(
            box.height,
        )}" fill="${fill}" stroke="${palette.border}" stroke-width="1.5" stroke-dasharray="8 6"/>`,
    );
    parts.push(
        `<line x1="${round(box.x)}" y1="${round(box.y + box.headerH)}" x2="${round(
            box.x + box.width,
        )}" y2="${round(box.y + box.headerH)}" stroke="${palette.border}" stroke-width="1"/>`,
    );

    parts.push(
        text(
            label,
            labelX,
            box.y + boxHeaderLineY(lines, 0),
            BOX_HEADER.font,
            color,
            ' font-weight="bold"',
        ),
    );
    box.nameLines.forEach((line, index) => {
        parts.push(
            text(
                line,
                nameX,
                box.y + boxHeaderLineY(lines, index),
                BOX_HEADER.font,
                palette.textPrimary,
            ),
        );
    });

    box.technologies.slice(0, box.headerIconCount).forEach((technology, index) => {
        parts.push(
            icon(
                technology.id,
                iconsX + index * (iconSize + BOX_HEADER.icon.gap),
                box.y + (box.headerH - iconSize) / 2,
                iconSize,
                palette.textSecondary,
            ),
        );
    });

    if (box.addressShort !== '') {
        parts.push(
            text(
                box.addressShort,
                box.x + BOX_ADDRESS.padX,
                box.y + box.headerH + 12,
                BOX_ADDRESS.font,
                palette.textSecondary,
            ),
        );
    }

    if (box.collapsed) {
        parts.push(
            text(
                collapseCountsText(box.nestedNodes, box.nestedContainers),
                box.x + BOX_ADDRESS.padX,
                box.y + box.headerH + box.addressBand + 18,
                BOX_HEADER.font,
                palette.textSecondary,
            ),
        );
    }

    // Знак схлопывания — тем же глифом, что на экране: «−» развёрнут, «+» схлопнут.
    if (box.collapsible) {
        parts.push(
            text(
                box.collapsed ? '+' : '−',
                box.x + BOX_HEADER.padX + BOX_HEADER.toggle.size / 2,
                box.y + boxHeaderLineY(lines, 0),
                BOX_HEADER.font,
                color,
                ' font-weight="bold" text-anchor="middle"',
            ),
        );
    }
};

/** Карточка экземпляра: тело с тенью, акцент типа, иконка, до трёх строк и «×N». */
const renderCardSvg = (
    parts: string[],
    box: IDeploymentBox,
    instance: IDeploymentCard,
    offset: { x: number; y: number },
    palette: IDeploymentExportPalette,
): void => {
    const x = offset.x;
    const y = offset.y;
    const width = INSTANCE_W;
    const height = box.cardH;
    const color = C4_COLORS.ContainerInstance;
    const hasIconSlot = instance.icon !== undefined;
    const textX = x + cardTextX(hasIconSlot);
    // Имя карточки — имя контейнера: в графе у экземпляра оно вида
    // «API Gateway~APP.ContainerInstance» и в карточку не влезает.
    const name = instance.containerName ?? instance.name;
    const subtitle = instance.technology;
    const nameY = y + (subtitle ? NAME_PAIR_Y : NAME_ALONE_Y);
    const badge = instance.copies > 1 ? `×${instance.copies}` : '';
    const badgeReserve =
        badge === '' ? 0 : badge.length * CARD_BADGE.font * 0.6 + CARD_TEXT.iconGap;
    const iconSize = BOX_HEADER.icon.size;

    parts.push(
        `<rect x="${round(x)}" y="${round(
            y,
        )}" width="${width}" height="${height}" rx="${CARD_RADIUS}" fill="${
            palette.canvasBg
        }" stroke="${
            palette.border
        }" stroke-width="${CARD_STROKE}" filter="url(#${CARD_SHADOW_ID})"/>`,
    );
    // Цветной акцент типа: отступы 8 и ширина 3 — как у `CardAccent` на экране.
    parts.push(
        `<rect x="${round(x + 1)}" y="${round(y + 8)}" width="3" height="${
            height - 16
        }" rx="1.5" fill="${color}"/>`,
    );

    if (instance.icon) {
        parts.push(
            icon(
                instance.icon,
                x + CARD_TEXT.padX,
                nameY - iconSize + 3,
                iconSize,
                palette.textSecondary,
            ),
        );
    }

    parts.push(
        text(
            fitLabel(name, cardTextChars(width, hasIconSlot, NAME_FONT)),
            textX,
            nameY,
            NAME_FONT,
            palette.textPrimary,
            ' font-weight="600"',
        ),
    );

    if (subtitle) {
        parts.push(
            text(
                fitLabel(subtitle, cardTextChars(width, hasIconSlot, SUBTITLE_FONT, badgeReserve)),
                textX,
                y + SUBTITLE_Y,
                SUBTITLE_FONT,
                palette.textSecondary,
            ),
        );
    }

    if (instance.url) {
        parts.push(
            text(
                fitLabel(
                    instance.url,
                    cardTextChars(width, hasIconSlot, BOX_ADDRESS.font, badgeReserve),
                ),
                textX,
                y + URL_Y,
                BOX_ADDRESS.font,
                palette.textSecondary,
            ),
        );
    }

    if (badge !== '') {
        parts.push(
            text(
                badge,
                x + width - CARD_BADGE.inset,
                y + height - CARD_BADGE.baseline,
                CARD_BADGE.font,
                palette.textSecondary,
                ' text-anchor="end"',
            ),
        );
    }
};

/**
 * Вся диаграмма одной строкой: вложенные рамки и карточки в мировых координатах.
 *
 * Панорама и зум в файл не входят — они состояние экрана, а не диаграммы; по той же
 * причине не рисуются приглушение, фигуры связи и кольцо выделения: это ответ на
 * выделенную карточку, а не её место на диаграмме. Схлопнутое состояние, наоборот,
 * часть раскладки, поэтому попадает в файл как есть.
 */
export const buildDeploymentSvgString = (
    layout: IDeploymentLayout,
    palette: IDeploymentExportPalette,
): string => {
    const width = layout.width + EXPORT_PAD * 2;
    const height = layout.height + EXPORT_PAD * 2;
    const parts: string[] = [];

    parts.push(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${round(width)}" height="${round(
            height,
        )}" viewBox="0 0 ${round(width)} ${round(height)}" font-family="${escapeXml(
            palette.fontFamily,
        )}">`,
    );
    parts.push(defs());
    parts.push(`<rect width="100%" height="100%" fill="${palette.canvasBg}"/>`);
    parts.push(`<g transform="translate(${EXPORT_PAD} ${EXPORT_PAD})">`);

    // Порядок отрисовки — обход в глубину: родитель раньше детей, иначе карточки
    // внутренней рамки оказались бы под заливкой внешней.
    const walk = (box: IDeploymentBox): void => {
        renderBoxSvg(parts, box, palette);
        box.children.forEach(walk);
        box.instances.forEach((instance) => {
            const offset = box.instanceOffsets.find((item) => item.id === instance.id);
            if (offset) renderCardSvg(parts, box, instance, offset, palette);
        });
    };
    layout.boxes.forEach(walk);

    parts.push('</g>');
    parts.push('</svg>');

    return parts.join('\n');
};

/**
 * Имя файла: продукт и окружение в нём — иначе выгрузки разных продуктов в одной
 * папке не различить. Всё, что не буква, цифра, точка, дефис и подчёркивание, заменяется
 * дефисом: имя уходит в заголовок `download`, и пробелы с кириллицей в нём читаются
 * браузерами по-разному.
 */
export const deploymentSvgFileName = (product: string, environment: string | null): string => {
    const slug = (value: string): string =>
        value
            .trim()
            .replace(/[^A-Za-z0-9._-]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .toLowerCase();

    return ['deployment', slug(product), environment ? slug(environment) : 'all']
        .filter(Boolean)
        .join('-')
        .concat('.svg');
};

/** Сохранение готовой строки в файл — как в движке диаграмм (`useGraphCanvasExports`). */
export const downloadSvgFile = (svg: string, fileName: string): void => {
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
};
