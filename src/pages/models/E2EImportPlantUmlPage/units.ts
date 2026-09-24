import styled from '@emotion/styled';

import { Table as UITable } from 'components/ui';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: var(--app-height);
    min-height: 0;
    min-width: 0;
    overflow: hidden;
    color: var(--color-text-active);
    background-color: var(--color-background-base);
`;

export const Header = styled.header`
    display: flex;
    flex: 0 0 64px;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 12px 24px;
    border-bottom: 1px solid var(--color-divider);
`;

export const Subheader = styled.div`
    display: flex;
    flex: 0 0 56px;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--color-divider);
    width: 100%;
`;

export const LoadingContainer = styled.div`
    display: flex;
    flex: 1;
    min-height: 0;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    text-align: center;
`;

export const StateContainer = styled.div`
    display: flex;
    width: min(910px, calc(100% - 48px));
    margin: 32px auto;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
`;

export const FailureScrollArea = styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;

export const FailureContent = styled.div`
    display: flex;
    width: min(910px, calc(100% - 48px));
    margin: 32px auto 48px;
    flex-direction: column;
    gap: 32px;
`;

export const FailureSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const Table = styled(UITable)`
    width: 100%;
`;

export const FailureFooter = styled.footer`
    display: flex;
    flex: 0 0 80px;
    align-items: center;
    justify-content: center;
    padding: 16px 24px;
    border-top: 1px solid var(--color-divider);
`;

export const FailureButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    max-width: 910px;
    align-items: center;
`;
