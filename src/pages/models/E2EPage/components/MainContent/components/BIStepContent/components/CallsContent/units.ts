import styled from '@emotion/styled';

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
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
