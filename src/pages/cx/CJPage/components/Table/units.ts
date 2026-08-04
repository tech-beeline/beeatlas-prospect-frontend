import { Tooltip } from 'react-tooltip';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { IconButton } from 'components/ui';
import { Icon } from 'components/ui';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
`;

export const TableWrapper = styled.div`
    position: relative;

    display: flex;

    width: 100%;
    max-height: calc(var(--app-height) - 64px);

    color: var(--color-text-active);

    overflow: auto;
`;

export const Table = styled.table`
    border-spacing: 0;
    background-color: transparent;

    /* border-collapse: collapse; */

    td {
        margin: 0;
    }
`;

export const Thead = styled.thead`
    position: sticky;
    top: 0;

    width: 100%;

    text-align: left;

    z-index: 3;
`;

export const Tbody = styled.tbody`
    width: 100%;
`;

export const Row = styled.tr<{ isHidden?: boolean }>`
    width: 100%;

    background-color: var(--color-background-base);

    color: ${({ isHidden }) => isHidden && '#a9a9a9'};
`;

export const Th = styled.th<{ backgroundColor?: string }>`
    min-width: 320px;
    height: 56px;
    padding: 18px 16px;

    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    background-color: ${({ backgroundColor }) =>
        !!backgroundColor ? `${backgroundColor}` : `var(--color-background-base)`};

    border-bottom: 1px solid var(--color-divider);

    &:first-of-type {
        position: sticky;
        left: 0;

        min-width: 185px;
        /* padding: 0 24px; */

        z-index: 10;
    }

    &:last-of-type {
        padding-right: 24px;
    }
`;

export const Td = styled.td<{
    isClickable?: boolean;
    borderRight?: boolean;
    noBottomBorder?: boolean;
    backgroundColor?: string;
}>`
    min-width: 320px;
    height: 52px;
    padding: 18px 16px;

    background-color: ${({ backgroundColor }) =>
        !!backgroundColor ? `${backgroundColor}` : `var(--color-background-base)`};

    border-bottom: ${({ noBottomBorder }) =>
        noBottomBorder ? 'none' : '1px solid var(--color-divider)'};

    border-right: ${({ borderRight }) => (borderRight ? '1px solid var(--color-divider)' : 'none')};

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

    pointer-events: ${({ isClickable }) => (isClickable === false ? 'none' : 'all')};

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

export const LabelTh = styled(Th)<{ showShadow: boolean }>`
    ${({ showShadow }) => (showShadow ? 'box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);' : '')}
`;

export const FlexWrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const TooltipStyled = styled(Tooltip)`
    position: fixed;

    width: max-content;
    padding: 4px 8px;

    background-color: var(--color-background-inverse);
    color: var(--color-text-active-inverse);

    border-radius: 8px;

    font-weight: var(--font-weight-caption);
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);

    z-index: 100;
`;

export const CollapseIcon = styled(IconButton)`
    color: var(--color-text-inactive);

    cursor: pointer;

    :hover {
        color: var(--color-text-active);
    }
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

    :hover > span {
        display: inline;
    }
`;

export const TableActionButton = styled.button`
    position: sticky;
    left: 0;
    top: 0;

    display: flex;
    align-items: center;
    gap: 8px;

    padding: 10px 16px;

    width: max-content;

    color: var(--color-text-link);

    background-color: var(--color-background-base);

    border: none;

    cursor: pointer;
`;

export const IconStyled = styled(Icon)`
    color: var(--color-text-link);
`;

export const SideBlockTitle = styled.div`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);
`;

export const TextFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: 100%;
    padding-top: 24px;
`;

export const ButtonContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;

    display: flex;
    justify-content: flex-end;
    gap: 10px;

    width: 100%;
    height: 96px;
    padding: 24px 16px;
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LinkStyled = styled.span`
    cursor: pointer;
    color: var(--color-text-link);
`;
