import styled from '@emotion/styled';

import { Table as UITable } from 'components/ui';

export const Form = styled.form`
    display: flex;
    flex: 1;
    min-height: 0;
    flex-direction: column;
`;

export const ScrollArea = styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;

export const Content = styled.div`
    display: flex;
    width: min(910px, calc(100% - 48px));
    margin: 32px auto 48px;
    flex-direction: column;
    gap: 32px;
`;

export const ResultSection = styled.section`
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 16px;
`;

export const Summary = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    padding: 24px;
    border: 1px solid var(--color-divider);
    border-radius: 12px;

    & > div {
        display: flex;
        min-width: 0;
        flex-direction: column;
        gap: 4px;
    }
`;

export const Table = styled(UITable)`
    width: 100%;
`;

export const MatchDetails = styled.div`
    display: flex;
    min-width: 180px;
    flex-direction: column;
    gap: 4px;
`;

export const Footer = styled.footer`
    display: flex;
    flex: 0 0 80px;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 16px 24px;
    border-top: 1px solid var(--color-divider);
`;

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;

    width: 100%;
    max-width: 910px;
`;
