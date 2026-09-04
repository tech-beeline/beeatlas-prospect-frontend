import styled from '@emotion/styled';

import { Table as UITable } from 'components/ui';

export const ScrollArea = styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    scroll-behavior: smooth;
`;

export const Layout = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1000px) 256px;
    gap: 24px;
    justify-content: center;
    width: 100%;
    padding: 32px 24px 48px;

    @media (max-width: 900px) {
        grid-template-columns: minmax(0, 1fr);
    }
`;

export const Content = styled.div`
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 32px;
`;

export const Stats = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const StatCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px;
    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

export const StatValue = styled.div`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);
`;

export const ResultSection = styled.section`
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 16px;
    scroll-margin-top: 24px;
`;

export const Chips = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const Table = styled(UITable)`
    width: 100%;
`;

export const EntityName = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const Alias = styled.span`
    display: block;
    margin-top: 2px;
    color: var(--color-text-inactive);
    font-size: var(--font-size-caption);
`;

export const CallValue = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const NoticeList = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

export const NoticeItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;

    & + & {
        border-top: 1px solid var(--color-divider);
    }
`;

export const NoticeText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    span {
        color: var(--color-text-inactive);
        font-size: var(--font-size-caption);
    }
`;

export const Navigation = styled.aside`
    position: sticky;
    top: 0;
    align-self: start;

    @media (max-width: 900px) {
        display: none;
    }
`;
