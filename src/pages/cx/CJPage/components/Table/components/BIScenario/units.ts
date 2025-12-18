import styled from '@emotion/styled';

export const ScenarioTd = styled.td`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 0;
`;

export const ScenarionTdWrapper = styled.div<{ expanded?: boolean; last: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    padding: 6px 16px;
    height: 100%;
    width: 100%;
    border-bottom: ${({ expanded, last }) =>
        expanded
            ? '1px solid var(--color-divider)'
            : last
            ? 'none'
            : '1px solid var(--color-divider)'};
    background-color: ${({ expanded }) =>
        expanded ? 'var(--color-background-base-selected)' : ''};
`;

export const ScenationTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const ScenarioContentWrapper = styled.div<{ last: boolean }>`
    display: flex;
    flex-direction: column;
    max-height: 405px;
    padding: 24px 16px 12px 36px;
    border-left: 4px solid var(--color-background-brand);
    border-right: 1px solid var(--color-divider);
    gap: 24px;
    overflow-y: auto;
    ${({ last }) => (last ? '' : 'border-bottom: 1px solid var(--color-divider);')}
`;

export const SLAWrapper = styled.div`
    border: 1px solid rgba(25, 28, 52, 0.18);
    border-radius: 12px;
    padding: 13px 16px;
`;

export const SLATitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SLAContent = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding: 12px 0;
`;

export const FlexWrapper = styled.div<{ gap?: string; maxwidth?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: ${({ gap }) => (gap ? `${gap}px` : '')};
    max-width: ${({ maxwidth }) => (maxwidth ? '264px' : '')};
`;
