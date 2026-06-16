import styled from '@emotion/styled';

import type { StyledBreadcrumbsItemProps } from './types';

export const Nav = styled.nav`
    &[class*='dsb-breadcrumbs'] {
        display: block;
    }
`;

export const List = styled.ul`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin: 0;
`;

export const Item = styled.li`
    list-style: none;
`;

export const Separator = styled.li`
    list-style: none;
    height: 18px;
    margin: 0 4px;
    display: flex;
    align-items: center;
`;

export const SeparatorIcon = styled.span`
    &.dsb-breadcrumbs__separator-icon {
        display: flex;
        align-items: center;
        font-style: normal;
        font-weight: normal;
        mix-blend-mode: normal;
        line-height: 18px;
        color: var(--color-text-active);
    }
`;

export const Dots = styled.button`
    &.dsb-breadcrumbs__dots {
        cursor: pointer;
        border: none;
        background: transparent;
        padding: 0;
        margin: 0;
        font-size: var(--font-size-body3);
        line-height: var(--font-line-height-body3);
        letter-spacing: var(--font-letter-spacing-body3);
        color: var(--color-text-active);
        font-family: inherit;
    }
`;

export const ItemBuiltin = styled.a<StyledBreadcrumbsItemProps>`
    &.dsb-breadcrumbs__item-builtin {
        padding: 0 4px !important;
        text-decoration: none !important;
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0;
        font-size: var(--font-size-body3);
        line-height: var(--font-line-height-body3);
        letter-spacing: var(--font-letter-spacing-body3);
        font-weight: var(--font-weight-regular);
        color: ${({ $currentPage }) =>
            $currentPage ? 'var(--color-text-inactive)' : 'var(--color-text-link)'};
        cursor: ${({ $currentPage }) => ($currentPage ? 'default' : 'pointer')};

        &:hover {
            background: ${({ $currentPage }) =>
                $currentPage
                    ? 'var(--color-background-base-hover)'
                    : 'var(--color-button-plain-background-hover)'};
            text-decoration: ${({ $currentPage }) =>
                $currentPage ? 'none' : 'underline'} !important;
        }

        &:active {
            background: ${({ $currentPage }) =>
                $currentPage
                    ? 'var(--color-background-base-pressed)'
                    : 'var(--color-button-plain-background-pressed)'};
        }

        &:focus {
            outline: 1px var(--color-border-focused);
        }
    }
`;

export const ItemBuiltinSpan = styled.span<StyledBreadcrumbsItemProps>`
    &.dsb-breadcrumbs__item-builtin {
        padding: 0 4px !important;
        text-decoration: none !important;
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0;
        font-size: var(--font-size-body3);
        line-height: var(--font-line-height-body3);
        letter-spacing: var(--font-letter-spacing-body3);
        font-weight: var(--font-weight-regular);
        color: ${({ $currentPage }) =>
            $currentPage ? 'var(--color-text-inactive)' : 'var(--color-text-link)'};
        cursor: ${({ $currentPage }) => ($currentPage ? 'default' : 'pointer')};

        &:hover {
            background: ${({ $currentPage }) =>
                $currentPage
                    ? 'var(--color-background-base-hover)'
                    : 'var(--color-button-plain-background-hover)'};
        }

        &:active {
            background: ${({ $currentPage }) =>
                $currentPage
                    ? 'var(--color-background-base-pressed)'
                    : 'var(--color-button-plain-background-pressed)'};
        }

        &:focus {
            outline: 1px var(--color-border-focused);
        }
    }
`;

export const MenuIcon = styled.span`
    display: inline-flex;
    align-items: center;
    margin-left: 2px;
    color: var(--color-text-link);
`;
