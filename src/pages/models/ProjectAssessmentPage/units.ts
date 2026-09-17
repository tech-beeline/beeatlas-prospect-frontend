import styled from '@emotion/styled';

export const PageHeader = styled.header`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const HeaderRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
`;

export const TitleGroup = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
`;

export const Actions = styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 12px;
`;

export const LoadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    width: 100%;
    min-width: 760px;
    padding: 32px;
`;

export const NotFoundPage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    min-height: 100%;
    padding: 32px;

    background-color: var(--color-background-base);
`;
