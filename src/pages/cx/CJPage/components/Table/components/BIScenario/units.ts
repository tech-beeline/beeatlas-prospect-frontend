import styled from '@emotion/styled';

export const ScenarioCard = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid var(--color-divider);
    border-radius: 12px;
    background-color: var(--color-background-base);
`;

export const ScenarioHeader = styled.button<{ expanded: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 16px;
    color: inherit;
    font: inherit;
    text-align: left;
    border: 0;
    background-color: ${({ expanded }) =>
        expanded ? 'var(--color-background-base-selected)' : 'var(--color-background-base)'};
    cursor: pointer;

    &:disabled {
        cursor: default;
    }
`;

export const Title = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    gap: 2px;
`;

export const ScenarioContent = styled.div`
    border-top: 1px solid var(--color-divider);
    display: flex;
    flex-direction: column;
    padding: 12px;
    gap: 16px;
`;
