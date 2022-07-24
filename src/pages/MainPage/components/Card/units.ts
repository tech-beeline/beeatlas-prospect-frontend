import styled from '@emotion/styled';

import pic from './images/pic.png';

export const CardContainer = styled.div`
    margin-top: 61px;
`;

export const Card = styled.div<any>`
    position: relative;

    min-width: 612px;
    height: 300px;
    padding: 32px;

    border-radius: 12px;

    background-color: ${({ colorType }) =>
        colorType === 'pink'
            ? '#FAE4F7'
            : colorType === 'green'
            ? '#E1F5F0'
            : colorType === 'yellow'
            ? '#FFF7D7'
            : 'gray'};

    &::before {
        position: absolute;
        top: -61px;
        right: 19px;

        content: url(${pic});
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
