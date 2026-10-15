import styled from '@emotion/styled';

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    flex: 1;
    min-height: 0;
`;

export const Source = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;

    padding: 12px 16px;

    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

export const SourceItem = styled.div`
    display: flex;
    gap: 8px;
`;

export const ImplementationFilters = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
`;
