import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { theme } from 'styles';

export const OuterLink = styled.a`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    width: fit-content;

    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: 0.2px;
    text-decoration: none;

    color: ${theme.colors.textLink};

    transition: color 0.25s ease-out;

    cursor: pointer;

    &::after {
        content: '';

        position: absolute;
        bottom: 0;
        left: 0;

        width: 100%;
        height: 1px;

        background-color: ${theme.colors.textLink};

        transform: scaleX(0);
        transform-origin: bottom right;
        transition: transform 0.25s ease-in-out;
    }

    @media (hover: hover) {
        ${true &&
        css`
            &:hover::after {
                transform: scaleX(1);
                transform-origin: bottom left;
            }
        `}
    }
`;
