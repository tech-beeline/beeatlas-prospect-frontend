import styled from '@emotion/styled';

export const Toolbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    border-bottom: 1px solid var(--color-divider);

    padding: var(--size-spacing-x2);
`;

export const ToolbarGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
`;
