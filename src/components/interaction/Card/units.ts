import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { theme } from 'styles';

import card1 from './images/card-1.png';
import card2 from './images/card-2.png';
import card3 from './images/card-3.png';

export const Title = styled.h2<{ withImage: boolean }>`
    ${({ withImage }) =>
        withImage
            ? css`
                  font-weight: 500;
                  font-size: 44px;
                  line-height: 56px;
              `
            : css`
                  font-weight: 500;
                  font-size: 26px;
                  line-height: 32px;
              `}

    margin-bottom: 16px;

    &::after {
        content: '→';
        position: absolute;
        top: 35px;

        width: 20px;
        height: 20px;
        margin-left: 8px;

        opacity: 0;

        transition: all 0.25s ease-out;
    }

    &:hover {
        color: ${theme.colors.textLink};

        &::after {
            transform: translateX(24px);

            opacity: 1;
        }
    }

    cursor: pointer;

    transition: all 0.25s ease-out;
`;

export const Card = styled.div<any>`
    position: relative;

    min-width: ${({ withImage }) => (withImage ? '612px' : '500px')};
    width: ${({ withImage }) => (withImage ? '612px' : '500px')};
    height: ${({ withImage }) => (withImage ? '300px' : '193px')};
    padding: 32px;
    margin-right: 24px;

    border-radius: ${theme.borderRadius};

    color: ${theme.colors.textActive};
    background-color: ${({ colorType }) =>
        colorType === 'green'
            ? theme.colors.lemon
            : colorType === 'pink'
            ? theme.colors.magenta
            : colorType === 'blue'
            ? theme.colors.teal
            : 'gray'};

    transition: all 0.25s ease-out;

    cursor: ${({ withImage }) => !withImage && 'pointer'};

    &:hover {
        border-radius: 24px;

        /* ${Title} {
            color: ${theme.colors.textLink};

            &::after {
                transform: translateX(24px);

                opacity: 1;
            }
        } */
    }

    &::before {
        position: absolute;
        top: -61px;
        right: -25px;

        content: ${({ colorType, withImage }) =>
            withImage &&
            (colorType === 'green'
                ? `url(${card1})`
                : colorType === 'pink'
                ? `url(${card2})`
                : colorType === 'blue'
                ? `url(${card3})`
                : 'null')};
    }
`;

export const Text = styled.p<{ withImage: boolean }>`
    display: inline-block;

    width: ${({ withImage }) => (withImage ? '340px' : '100%')};

    font-weight: 400;
    font-size: 19px;
    line-height: 24px;
    letter-spacing: 0.2px;

    ${({ withImage }) =>
        !withImage &&
        css`
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            line-clamp: 4;
            -webkit-box-orient: vertical;
        `}
`;
