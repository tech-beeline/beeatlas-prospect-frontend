import React, { FC } from 'react';

import * as T from './types';

export const QuadrantTitles: FC<T.IQuadrantTitles> = ({ isZoomed }) => {
    return (
        <>
            <defs>
                <path id="text1" d="M -46 0 A 45 45 0 1 1 0 44"></path>
                <path id="text2" d="M 0 -46.5 A 45 45 0 1 1 0 46.5"></path>
                <path id="text3" d="M -47 0 A 45 45 0 0 0 0 47"></path>
                <path id="text4" d="M 0 47.5 A 45 45 0 0 0 0 -47.5"></path>
            </defs>

            {!isZoomed && (
                <text
                    fontSize="2.5"
                    fill={'var(--color-text-disabled)'}
                    letterSpacing="0.3"
                    style={{ userSelect: 'none' }}
                >
                    <textPath startOffset="7%" href="#text1">
                        Фреймворки и инструменты
                    </textPath>
                    <textPath startOffset="13%" href="#text2">
                        Платформа и инфраструктура
                    </textPath>
                    <textPath startOffset="45%" href="#text3">
                        Языки
                    </textPath>
                    <textPath startOffset="18%" href="#text4">
                        Управление данными
                    </textPath>
                </text>
            )}
        </>
    );
};
