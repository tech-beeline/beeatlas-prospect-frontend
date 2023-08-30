import React, { FC } from 'react';

import * as T from './types';

export const QuadrantTitles: FC<T.IQuadrantTitles> = ({ isZoomed }) => {
    return (
        <>
            <defs>
                <path id="text1" d="M -42 -18 A 30 22 0 1 1 61 0"></path>
                <path id="text2" d="M 23 -40 A 30 25 0 1 1 -30 27"></path>
                <path id="text3" d="M -45.5 14 C -21 75 35 13 10 125"></path>
                <path id="text4" d="M 31 36 A 30 22 0 0 0 -60 -20"></path>
            </defs>

            {!isZoomed && (
                <text
                    fontSize="2.5"
                    fill={'var(--color-text-disabled)'}
                    letterSpacing="0.3"
                    style={{ userSelect: 'none' }}
                >
                    <textPath href="#text1">Фреймворки и инструменты</textPath>
                    <textPath href="#text2">Платформа и инфраструктура</textPath>
                    <textPath href="#text3">Языки</textPath>
                    <textPath href="#text4">Управление данными</textPath>
                </text>
            )}
        </>
    );
};
