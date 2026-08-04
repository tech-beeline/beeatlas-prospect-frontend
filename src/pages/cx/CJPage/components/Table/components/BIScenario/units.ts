import styled from '@emotion/styled';

import { IconButton } from 'components/ui';

export const ScenarioTd = styled.div<{ last?: boolean }>`
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    height: fit-content;
    min-width: 320px;
    padding: 0;

    flex: 1;

    border-bottom: ${({ last }) => (last ? 'none' : '1px solid var(--color-divider)')};
    /* border-left: 1px solid var(--color-divider); */
    /* border-right: 1px solid var(--color-divider); */
`;

export const ScenarionTdWrapper = styled.div<{ expanded?: boolean; last?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
    padding: 6px 16px;
    height: 100%;
    width: 100%;
    /* border-bottom: ${({ expanded, last }) =>
        expanded
            ? '1px solid var(--color-divider)'
            : last
            ? 'none'
            : '1px solid var(--color-divider)'}; */
    background-color: ${({ expanded }) =>
        expanded ? 'var(--color-background-base-selected)' : ''};

    flex: ${({ expanded }) => (expanded ? 0 : 1)};
`;

export const ScenationTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const ScenarionWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    justify-content: space-between;
`;

export const ScenarioContentWrapper = styled.div<{ last: boolean }>`
    display: flex;
    flex-direction: column;
    /* max-height: 405px; */
    /* max-height: fit-content; */
    padding: 24px 16px 12px 36px;
    border-left: 4px solid var(--color-background-brand);
    gap: 24px;
    overflow-y: auto;
    /* ${({ last }) => (last ? '' : 'border-bottom: 1px solid var(--color-divider);')} */

    flex: 1;
`;

export const SLAWrapper = styled.div`
    border: 1px solid rgba(25, 28, 52, 0.18);
    border-radius: 12px;
    padding: 13px 16px;
`;

export const TitleWrapper = styled.div`
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

export const IconButtonStyled = styled(IconButton)<{ expanded: boolean }>`
    transform: ${({ expanded }) => `rotate(${expanded ? -180 : 0}deg)`};

    transition: all 0.25s;
`;

export const BICallsContainer = styled.div`
    border: 1px solid var(--color-divider);
    border-radius: 12px;

    overflow: hidden;
`;

export const CallsWrapper = styled(FlexWrapper)`
    :not(:last-of-type) {
        border-bottom: 1px solid var(--color-divider);
    }
`;

export const CallsTitleWrapper = styled(TitleWrapper)<{ expanded?: boolean }>`
    padding: 12px 16px;
    border-bottom: ${({ expanded }) => (expanded ? '1px solid var(--color-divider)' : 'none')};
    background-color: ${({ expanded }) =>
        expanded ? 'var(--color-background-base-selected)' : ''};
`;

export const CallsContent = styled.div`
    padding: 12px 16px;
`;

export const ButtonsWrapper = styled.div<{ gap?: string }>`
    display: flex;
    gap: ${({ gap }) => (gap ? `${gap}px` : '')};
    align-items: center;
`;

export const ButtonsWrapperRow = styled(ButtonsWrapper)`
    flex-direction: row-reverse;

    padding: 8px 16px;

    border-bottom: 1px solid var(--color-border);
`;
