import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Icon } from 'components/ui';

export const Row = styled.tr<{ isHidden?: boolean }>`
    width: 100%;
    max-height: 52px;
    background-color: var(--color-background-base);

    color: ${({ isHidden }) => isHidden && '#a9a9a9'};
`;

export const Td = styled.td<{
    isClickable?: boolean;
    borderRight?: boolean;
    noBottomBorder?: boolean;
    locked?: boolean;
    isEditing?: boolean;
    hoverable?: boolean;
    alignTop?: boolean;
    isBIScenarion?: boolean;
}>`
    min-width: 320px;
    height: 52px;
    padding: ${({ locked, isEditing }) => (locked ? '0' : isEditing ? '0' : '18px 16px')};

    background-color: var(--color-background-base);

    border-bottom: ${({ noBottomBorder }) =>
        noBottomBorder ? 'none' : '1px solid var(--color-divider)'};

    border-right: ${({ borderRight }) => (borderRight ? '1px solid var(--color-divider)' : 'none')};

    white-space: pre-wrap;

    ${({ alignTop }) => (alignTop ? 'vertical-align: top;' : '')}

    &:first-of-type {
        position: sticky;
        left: 0;

        min-width: 185px;
        padding: 10px 16px;
    }

    &:last-of-type {
        padding-right: ${({ locked, isEditing }) => (locked ? '' : isEditing ? '' : '24px')};
    }

    &:hover {
        ${({ locked, isEditing, hoverable }) =>
            !locked &&
            !isEditing &&
            hoverable &&
            css`
                outline: 1px solid black;
                outline-offset: -1px;
            `}
    }

    pointer-events: ${({ isClickable }) => (isClickable === false ? 'none' : 'all')};

    ${({ isBIScenarion }) =>
        isBIScenarion &&
        css`
            > div > td {
                border-right: none;
            }
        `}

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

export const LabelTd = styled(Td)<{ showShadow: boolean }>`
    z-index: 2;

    ${({ showShadow }) => (showShadow ? 'box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);' : '')}

    :hover span {
        display: inline;
    }

    :active {
        background-color: var(--color-background-base);
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
    width: 24px;
    height: 24px;
`;

export const IconStyled = styled(Icon)`
    color: var(--color-text-link);
`;

export const NamesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    height: 100%;
`;
