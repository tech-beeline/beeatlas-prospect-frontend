import React, { useMemo } from 'react';

import type { AnimatedProgressProps } from './types';
import * as S from './units';
import { buildAnimatedPairsData, classNames } from './utils';

export const AnimatedProgress = ({ className, ...props }: AnimatedProgressProps) => {
    const pairsData = useMemo(() => buildAnimatedPairsData(), []);

    return (
        <S.AnimatedProgressRoot
            data-testid="AnimatedProgress"
            className={classNames('dsb-progress-animated', className)}
            {...props}
            role="progressbar"
        >
            {pairsData.map((data, index) => (
                <S.AnimatedProgressPair
                    key={index}
                    className="dsb-progress-animated__pair"
                    style={{
                        animationDelay: `${data.animationDelay}ms`,
                        opacity: data.opacity,
                        zIndex: data.zIndex,
                    }}
                >
                    <S.AnimatedProgressCircle className="dsb-progress-animated__circle" />
                    <S.AnimatedProgressCircle className="dsb-progress-animated__circle" />
                </S.AnimatedProgressPair>
            ))}
        </S.AnimatedProgressRoot>
    );
};

AnimatedProgress.displayName = 'AnimatedProgress';
