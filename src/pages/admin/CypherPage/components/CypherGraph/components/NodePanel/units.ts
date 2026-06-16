import styled from '@emotion/styled';

export const Panel = styled.aside<{ width: number }>`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-self: stretch;
    gap: var(--size-spacing-x6);

    width: ${({ width }) => width}px;
    max-width: 100%;
    height: 100%;
    min-height: 0;

    overflow-x: auto;

    background: var(--color-background-base);
    border: 1px solid var(--color-border);
    border-radius: var(--size-border-radius-x6);

    padding: var(--size-spacing-x5) var(--size-spacing-x4);
`;

export const HeaderBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--size-spacing-x2);
`;

export const HeaderTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--size-spacing-x3);
`;

export const TypeRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    line-height: 1.25;
    color: var(--color-text-primary);
`;

export const TypeDot = styled.span`
    width: 10px;
    height: 10px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--node-type-color);
`;

export const Body = styled.div<{ empty?: boolean }>`
    flex: 1;
    min-height: 0;

    ${({ empty }) =>
        empty
            ? `
        display: flex;
        align-items: center;
        justify-content: center;
    `
            : `
        display: flex;
        flex-direction: column;
        gap: var(--size-spacing-x6);
    `}
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 140px) minmax(0, 1fr);
    gap: var(--size-spacing-x6);
    align-items: start;
`;
