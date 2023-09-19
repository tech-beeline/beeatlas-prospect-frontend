import { Icon } from '@beeline/design-system-react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Row = styled.tr<{ isHidden?: boolean }>`
    width: 100%;

    background-color: var(--color-background-base);

    color: ${({ isHidden }) => isHidden && '#a9a9a9'};
`;

export const Td = styled.td<{ isClickable?: boolean }>`
    min-width: 320px;
    height: 52px;
    padding: 18px 16px;

    background-color: var(--color-background-base);

    border-bottom: 1px solid var(--color-divider);

    &:first-of-type {
        position: sticky;
        left: 0;

        min-width: 185px;
        padding: 10px 16px;
    }

    &:last-of-type {
        padding-right: 24px;
    }

    ${({ isClickable }) =>
        isClickable &&
        css`
            cursor: pointer;

            transition: color 0.25s ease-in-out;

            @media (hover: hover) {
                &:hover {
                    /* TODO: change */
                    color: #1976d2;
                }
            }
        `}
`;

export const AlignItemsCenterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    width: 100%;

    span {
        display: none;
    }

    :hover > div > span {
        display: inline;
    }
`;

export const IconContainer = styled.div`
    width: 20px;
    height: 20px;
`;

export const IconStyled = styled(Icon)`
    color: var(--color-text-link);
`;
