import { Divider, Icon } from '@beeline/design-system-react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

// import { ReactComponent as CrossSVG } from 'images/cross-icon.svg';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
`;

export const TableWrapper = styled.div`
    position: relative;

    display: flex;

    width: 100%;
    max-height: calc(100vh - 64px);

    color: var(--color-text-active);

    overflow: auto;

    &::-webkit-scrollbar-thumb {
        background-color: #b6b7bf;

        border-radius: var(--size-border-radius-x8);
    }

    &::-webkit-scrollbar {
        height: 8px;
        width: 8px;
    }
`;

export const Table = styled.table`
    border-spacing: 0;
    background-color: transparent;

    td {
        margin: 0;
    }
`;

export const Thead = styled.thead`
    position: sticky;
    top: 0;

    width: 100%;

    text-align: left;

    z-index: 1;
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

// -----------------------------------------------------------

export const FlexWrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const MenuBlock = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;

    transform: translateY(100%);

    flex-direction: column;

    padding: 8px 0px;
    width: 280px;

    background-color: var(--color-background-base);

    border-radius: var(--size-border-radius-x6);

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);
`;

export const MenuItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    padding: 12px 16px;

    transition: background-color 0.25s ease-in-out;

    cursor: pointer;

    @media (hover: hover) {
        &:hover {
            background-color: var(--color-background-base-hover);
        }
    }
`;

export const MenuItemText = styled.div`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
`;

export const MenuItemRemoveText = styled(MenuItemText)`
    color: var(--color-border-error);
`;

export const MenuDivider = styled(Divider)`
    width: 100%;
    margin: 8px 0;
`;

export const AlignItemsCenterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    width: 100%;
`;

export const HideOrShowButton = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    width: max-content;

    color: var(--color-text-link);

    /* background: none; */

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

export const MenuItemStyled = styled(MenuItem)`
    justify-content: space-between;
`;
