import { Tooltip } from 'react-tooltip';
import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100vh;

    color: var(--color-text-active);
    background-color: var(--color-background-base);
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    width: 100%;
    height: 64px;
    padding: 20px 24px;

    border-bottom: 1px solid var(--color-divider);
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;

    flex: 1;

    width: 100%;

    overflow-y: scroll;

    padding-bottom: 32px;

    &::-webkit-scrollbar-thumb {
        background-color: var(--color-utilities-scroll-hover);

        border-radius: var(--size-border-radius-x8);
    }

    &::-webkit-scrollbar {
        width: 8px;
    }
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 32px 0px 0px;

    width: 100%;
    max-width: 910px;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const MetadataContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
`;

export const CommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;

    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

export const EmptyDiv = styled.div`
    min-height: 8px;
`;

export const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 90px;
    padding: 0px 32px;

    border-top: 1px solid var(--color-divider);
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    width: 100%;
    max-width: 910px;
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
