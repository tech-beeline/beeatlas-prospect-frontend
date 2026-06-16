import styled from '@emotion/styled';

export const PanelShell = styled.div<{ width: number }>`
    position: relative;
    flex-shrink: 0;
    align-self: stretch;
    width: ${({ width }) => width}px;
    max-width: 100%;
    height: 100%;
    min-height: 0;
`;

export const BorderCollapseHit = styled.div<{ side: 'left' | 'right' }>`
    position: absolute;
    top: 20%;
    z-index: 2;
    line-height: 0;
    ${({ side }) =>
        side === 'right'
            ? `
        left: 0;
        transform: translate(-50%, -50%);
    `
            : `
        left: 100%;
        transform: translateY(-50%);
    `}
`;

export const SidePanel = styled.div`
    width: 100%;
    height: 100%;
    min-height: 0;
    border-right: 1px solid var(--color-divider);

    display: flex;
    flex-direction: column;
    padding: var(--size-spacing-x2);
    gap: var(--size-spacing-x4);
`;

export const PanelCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--size-spacing-x3);

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);

    padding: var(--size-spacing-x2);
`;

export const TypeList = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--size-spacing-x2);
`;

export const NodesWrap = styled.div`
    display: flex;
    flex-direction: column;

    min-height: 0;
    flex: 1;
    overflow: auto;
    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);

    padding: var(--size-spacing-x2);
`;

export const NodeButton = styled.button<{ selected: boolean }>`
    text-align: left;
    padding: var(--size-spacing-x2) var(--size-spacing-x3);

    border: none;
    border-bottom: 1px solid var(--color-divider);
    background: ${({ selected }) =>
        selected ? 'var(--color-background-base-hover)' : 'transparent'};
    cursor: pointer;
`;
