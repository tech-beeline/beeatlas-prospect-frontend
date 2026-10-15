import styled from '@emotion/styled';

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    flex: 1;
    min-height: 0;
`;

export const Source = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;

    padding: 12px 16px;

    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

export const NotFoundContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    flex: 1;
`;

export const ImplementationFilters = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
`;
