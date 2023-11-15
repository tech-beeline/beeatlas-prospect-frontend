import annoyed from './images/annoyed.svg';
import excited from './images/excited.svg';
import happy from './images/happy.svg';
import normal from './images/normal.svg';
import sad from './images/sad.svg';

import { FeelingTypes } from './types';

export const typeToIconMap = {
    [FeelingTypes.SAD]: sad,
    [FeelingTypes.ANNOYED]: annoyed,
    [FeelingTypes.NORMAL]: normal,
    [FeelingTypes.HAPPY]: happy,
    [FeelingTypes.EXCITED]: excited,
};

export const typeToNameMap = {
    [FeelingTypes.SAD]: 'раздражен',
    [FeelingTypes.ANNOYED]: 'огорчён',
    [FeelingTypes.NORMAL]: 'нейтрален',
    [FeelingTypes.HAPPY]: 'удовлетворен',
    [FeelingTypes.EXCITED]: 'доволен',
};

export const typeToBackgroundColorMap = {
    [FeelingTypes.SAD]: 'var(--color-status-error-background)',
    [FeelingTypes.ANNOYED]: 'var(--color-status-warning-background)',
    [FeelingTypes.NORMAL]: 'var(--color-status-neutral-background)',
    [FeelingTypes.HAPPY]: 'var(--color-status-info-background)',
    [FeelingTypes.EXCITED]: 'var(--color-status-success-background)',
};
