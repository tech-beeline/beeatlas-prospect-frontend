import styled from '@emotion/styled';

export const PanelShell = styled.div<{ width: number }>`
    position: relative;
    flex-shrink: 0;
    align-self: stretch;
    width: ${({ width }) => width}px;
    max-width: 100%;
    min-width: 0;
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
        right: 100%;
        transform: translateY(-50%);
    `
            : `
        right: 0;
        transform: translate(50%, -50%);
    `}
`;

export const Panel = styled.aside`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-self: stretch;
    gap: var(--size-spacing-x6);

    width: 100%;
    max-width: 100%;
    height: 100%;
    min-height: 0;

    overflow-x: hidden;
    overflow-y: auto;

    background: var(--color-background-base);
    border-left: 1px solid var(--color-border);

    padding: var(--size-spacing-x5) var(--size-spacing-x4);
`;

export const HeaderBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--size-spacing-x2);
    min-width: 0;
    max-width: 100%;
`;

export const HeaderTop = styled.div`
    display: flex;
    align-items: flex-start;
    gap: var(--size-spacing-x3);
    min-width: 0;
    width: 100%;
`;

export const TitleStack = styled.div`
    min-width: 0;
    max-width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;

    & > * {
        white-space: normal;
        max-width: 100%;
    }
`;

export const TypeRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    max-width: 100%;

    color: var(--color-text-primary);
`;

export const TypeRowText = styled.div`
    flex: 1;
    min-width: 0;
    overflow-wrap: break-word;
    word-break: break-word;

    & > * {
        white-space: normal;
        max-width: 100%;
    }
`;

export const TypeDot = styled.span`
    width: 10px;
    height: 10px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--node-type-color);
`;

export const Body = styled.div<{ empty?: boolean }>`
    flex: ${({ empty }) => (empty ? 1 : '0 0 auto')};
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
    gap: var(--size-spacing-x8);
    min-width: 0;
    `}
`;

export const PropertiesBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--size-spacing-x4);

    width: 100%;
    min-width: 0;
    max-width: 100%;
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 140px) minmax(0, 1fr);
    gap: var(--size-spacing-x6);
    align-items: start;
    min-width: 0;
    max-width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;

    & > * {
        min-width: 0;
        white-space: normal;
        overflow-wrap: break-word;
        word-break: break-word;
    }
`;

export const ErrorRow = styled.div`
    padding: var(--size-spacing-x3);
    border: 1px solid var(--color-border);
    border-radius: var(--size-radius-x2);
    background: rgba(239, 68, 68, 0.08);
    color: var(--color-text-primary);
`;

export const TagsBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--size-spacing-x3);

    min-width: 0;
    max-width: 100%;
    padding: var(--size-spacing-x2);

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
`;

export const TagControls = styled.div`
    display: flex;
    gap: var(--size-spacing-x2);
    align-items: center;
    width: 100%;
    min-width: 0;
`;

export const TagFieldWrap = styled.div`
    flex: 1;
    min-width: 0;
`;

export const TagsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--size-spacing-x2);
    min-width: 0;
    max-width: 100%;
`;

export const TagChipDelete = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 2px;
    padding: 2px;
    cursor: pointer;
    border: none;
    border-radius: var(--size-radius-x1);
    background: transparent;
    color: inherit;

    &:focus-visible {
        outline: 2px solid var(--color-border-focus);
        outline-offset: 1px;
    }
`;

export const TagsEmpty = styled.div`
    padding-left: 140px;
`;
