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

    white-space: pre-wrap;

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

export const OnlyTd = styled(Td)`
    position: relative;

    transition: 0.25s all;

    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

    z-index: 1;

    &:hover {
        box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    }
`;

export const LabelTd = styled(Td)`
    z-index: 2;
    /* @TODO: Здесь не подходит rgba цвет из-за прозрачности */
    /* background-color: var(--color-button-plain-background-hover); */
    background-color: #edf4fd;

    :hover span {
        display: inline;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;

    color: var(--color-text-active);
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
`;

export const IconContainer = styled.div`
    width: 20px;
    height: 20px;
`;

export const IconStyled = styled(Icon)`
    color: var(--color-text-link);
`;
