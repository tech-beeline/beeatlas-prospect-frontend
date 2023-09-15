import React, { FC } from 'react';

import excited from './images/excited.svg';
import happy from './images/happy.svg';
import normal from './images/normal.svg';
import sad from './images/sad.svg';
import slightlySad from './images/slightly_sad.svg';

import { FeelingTypes, IIconFeeling } from './types';
import * as S from './units';

const typeToIconMap = {
    [FeelingTypes.SAD]: sad,
    [FeelingTypes.SLIGHTLY_SAD]: slightlySad,
    [FeelingTypes.NORMAL]: normal,
    [FeelingTypes.HAPPY]: happy,
    [FeelingTypes.EXCITED]: excited,
};

const typeToBackgroundColorMap = {
    [FeelingTypes.SAD]: 'var(--color-status-error-background)',
    [FeelingTypes.SLIGHTLY_SAD]: 'var(--color-status-warning-background)',
    [FeelingTypes.NORMAL]: 'var(--color-status-neutral-background)',
    [FeelingTypes.HAPPY]: 'var(--color-status-info-background)',
    [FeelingTypes.EXCITED]: 'var(--color-status-success-background)',
};

export const IconFeeling: FC<IIconFeeling> = ({ type, onClick, isActive = false }) => {
    return (
        <S.Container
            onClick={onClick}
            isActive={isActive}
            style={{ backgroundColor: typeToBackgroundColorMap[type] }}
        >
            <img src={typeToIconMap[type]} />
        </S.Container>
    );
};

export { FeelingTypes } from './types';
