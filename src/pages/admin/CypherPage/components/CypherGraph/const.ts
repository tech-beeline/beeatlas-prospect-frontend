export const GRAPH_MIN_WIDTH = 500;
export const PANEL_MIN_WIDTH = 320;
export const PANEL_MAX_WIDTH = 920;
export const PANEL_DEFAULT_WIDTH = 410;
export const PANEL_RESIZE_HANDLE_WIDTH = 2;

export const LINK_DISTANCE = 120;
export const LINK_STRENGTH = 0.15;

export const GRAPH_NODE_DEGREE_SIZE_CAP = 30;
export const ZOOM_DURATION = 400;

export const LABEL_COLORS = [
    '#3b82f6',
    '#10b981',
    '#eab308',
    '#ef4444',
    '#64748b',
    '#f59e0b',
    '#60a5fa',
    '#f97316',
    '#22c55e',
    '#dc2626',
] as const;

export const GRAPH_CANVAS_BACKGROUND = 'var(--color-background-base)';

export const GRAPH_LINK_COLOR_RESOLVED = {
    light: 'rgba(25, 28, 52, 0.12);',
    dark: 'rgba(255, 255, 255, 0.2)',
} as const;
