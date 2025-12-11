import styled from '@emotion/styled';

export const ScenarioTd = styled.td`
    height: 100%;
    width: 100%;
    border-bottom: 1px solid var(--color-divider);
    border-right: 1px solid var(--color-divider);
`;

export const ScenarionTdWrapper = styled.div<{ expanded?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    padding: 6px 16px;
    height: 100%;
    width: 100%;
    background-color: ${({ expanded }) =>
        expanded ? 'var(--color-background-base-selected)' : ''};
    border-bottom: 1px solid var(--color-divider);
`;

export const ScenationTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const ScenarioContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 405px;
    padding: 24px 16px 12px 36px;
    border-left: 4px solid var(--color-background-brand);
    gap: 24px;
    overflow-y: auto;
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
