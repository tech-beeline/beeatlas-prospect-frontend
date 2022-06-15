import styled from '@emotion/styled';

import { theme } from 'styles';

import { IProgressBar } from './types';

export const ProgressBase = styled.div`
    width: 100%;
    height: 4px;

    background-color: ${theme.colors.backgroundGray};
    border-radius: 8px;
`;

export const ProgressLine = styled.div<IProgressBar>`
    width: ${({ maxProgress = 100, currentProgress }) =>
        `${100 / (maxProgress / currentProgress)}%`};
    height: 4px;

    background: linear-gradient(
        88.87deg,
        #feca48 -2.46%,
        #ff7d5d 20.58%,
        #b732a2 49.09%,
        #621a9f 80.89%,
        #030013 115.95%
    );

    border-radius: 8px;

    transition: width 1s linear;
`;
