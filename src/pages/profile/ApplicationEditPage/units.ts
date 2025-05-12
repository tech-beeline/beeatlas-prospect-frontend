import { Tooltip } from 'react-tooltip';
import styled from '@emotion/styled';

import { TextArea } from 'components/form';

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

export const TextAreaStyled = styled(TextArea)`
    width: 100% !important;
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;

    width: 100%;
`;

export const RelativeContainer = styled.div`
    position: relative;
`;

export const IconContainer = styled.div`
    position: absolute;

    top: 14px;
    right: -36px;

    cursor: pointer;
`;

export const TooltipContainer = styled(Tooltip)`
    display: flex;
    flex-direction: column;

    max-width: 360px;
    width: max-content;
    padding: 16px;

    background-color: var(--color-border-focus);
    color: var(--color-text-active-inverse);

    border-radius: var(--size-border-radius-x8);

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);
    text-align: start;
    white-space: pre-line;

    user-select: none;

    z-index: 30;

    opacity: 1;

    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
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
