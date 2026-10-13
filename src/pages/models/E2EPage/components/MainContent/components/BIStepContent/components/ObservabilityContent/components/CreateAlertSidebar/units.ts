import styled from '@emotion/styled';

import { ProgressButton } from 'components/ui';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: var(--app-height);
    min-height: 0;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;

    padding: 24px;
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Footer = styled.div`
    display: flex;
    gap: 16px;

    padding: 16px 24px 24px 24px;

    border-top: 1px solid var(--color-divider);
`;

export const ButtonContainer = styled.div`
    flex: 1;
`;

export const ProgressButtonStyled = styled(ProgressButton)<{ showProgress: boolean }>`
    .dsb-button-progress__svg {
        display: ${({ showProgress }) => (showProgress ? 'block' : 'none')};
    }
`;

export const MethodsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    margin-top: 12px;
    margin-right: -16px;

    padding-right: 16px;

    font-family: var(--font-family-code), monospace;
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);
    word-break: break-all;

    max-height: 350px;
    overflow-y: auto;
`;
