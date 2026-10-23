import styled from '@emotion/styled';

export const Card = styled.div`
    &:not(:last-child) {
        border-bottom: 1px solid var(--color-divider);
    }
`;

export const Header = styled.button<{ expanded: boolean }>`
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
`;

export const Title = styled.div`
    flex: 1;
    min-width: 0;
    font-weight: var(--font-weight-medium);
`;

export const Content = styled.div`
    padding: 16px;
    border-top: 1px solid var(--color-divider);
`;

export const Fields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const Value = styled.div`
    overflow-wrap: anywhere;
`;

export const Actions = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;
    padding-top: 12px;
    border-top: 1px solid var(--color-divider);
`;
