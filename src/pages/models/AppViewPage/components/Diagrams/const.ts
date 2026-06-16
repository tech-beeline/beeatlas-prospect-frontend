import { C4Label } from './types';

export const TAG_STORAGE_KEY = 'archmap-node-tags-v1';
export const PINNED_STORAGE_PREFIX = 'archmap-pinned-v1-';
export const LAYOUT_STORAGE_PREFIX = 'archmap-layout-v2-';
export const SHORTEST_PATH_MAX_HOPS = 120;
export const DIAGRAM_FOCUS_PARAM = 'node';

export const KNOWN_LABELS: C4Label[] = [
    'SoftwareSystem',
    'Container',
    'Component',
    'DeploymentNode',
    'Environment',
    'ContainerInstance',
    'InfrastructureNode',
];
