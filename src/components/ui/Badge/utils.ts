import type { BadgeSemantic } from './types';

export const getBadgeSemanticClass = (semantic: BadgeSemantic): string =>
    semantic === 'danger' ? 'error' : semantic;
