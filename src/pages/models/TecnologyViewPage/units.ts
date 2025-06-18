import { Tooltip } from 'react-tooltip';
import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    position: relative;

    width: 100%;

    padding: 32px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const BreadcrumbContainer = styled.div`
    display: flex;
    gap: 12px;
`;

export const SpaceBetweenContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const ExpandableContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
`;

export const AppsTitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const TooltipContainer = styled(Tooltip)<{ largePadding?: boolean }>`
    max-width: 300px;
    width: max-content;
    padding: ${({ largePadding }) => (largePadding ? '16px' : '4px 8px')};

    background-color: var(--color-background-inverse);
    color: var(--color-text-active-inverse);

    border-radius: ${({ largePadding }) =>
        largePadding ? 'var(--size-border-radius-x8)' : 'var(--size-border-radius-x4)'};

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);
    text-align: start;
    white-space: pre-line;

    user-select: none;

    z-index: 30;
`;

export const ConfluenceContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 300px;

    background-color: var(--color-status-neutral-background);

    border-radius: var(--size-border-radius-x6);
`;

export const BoldSpan = styled.span`
    font-weight: 500;
`;
