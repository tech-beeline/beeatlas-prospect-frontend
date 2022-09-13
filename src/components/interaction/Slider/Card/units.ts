import styled from '@emotion/styled';

import { theme } from 'styles';

import card1 from './images/card-1.png';
import card2 from './images/card-2.png';
import card3 from './images/card-3.png';

export const CardContainer = styled.div`
    margin-top: 61px;
`;

export const Card = styled.div<any>`
    position: relative;

    min-width: 612px;
    height: 300px;
    padding: 32px;
    margin-right: 24px;

    border-radius: 12px;

    color: ${theme.colors.textActiveNoTheme};
    background-color: ${({ colorType }) =>
        colorType === 'green'
            ? '#E1F5F0;'
            : colorType === 'pink'
            ? '#FAE4F7'
            : colorType === 'blue'
            ? '#E0F7FB;'
            : 'gray'};

    &::before {
        position: absolute;
        top: -61px;
        right: -25px;

        content: ${({ colorType }) =>
            colorType === 'green'
                ? `url(${card1})`
                : colorType === 'pink'
                ? `url(${card2})`
                : colorType === 'blue'
                ? `url(${card3})`
                : 'null'};
    }
`;

export const Title = styled.h2`
    font-weight: 500;
    font-size: 44px;
    line-height: 56px;

    margin-bottom: 16px;
`;

export const Text = styled.p`
    width: 340px;

    font-weight: 400;
    font-size: 19px;
    line-height: 24px;
    /* or 126% */

    letter-spacing: 0.2px;
`;
