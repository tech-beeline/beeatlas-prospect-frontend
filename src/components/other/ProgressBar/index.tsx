import React, { FC } from 'react';

import { IProgressBar } from './types';
import * as S from './units';

export const ProgressBar: FC<IProgressBar> = ({ currentProgress, maxProgress }) => {
    return (
        <S.ProgressBase className="ProgressBase">
            <S.ProgressLine className="ProgressLine" {...{ currentProgress, maxProgress }} />
        </S.ProgressBase>
    );
};
