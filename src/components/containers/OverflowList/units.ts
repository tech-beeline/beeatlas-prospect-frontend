import styled from '@emotion/styled';

import { ITEM_GAP_PX } from './const';

export const Root = styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;
`;

export const OffscreenMeasure = styled.div`
    position: absolute;
    left: -9999px;
    top: 0;
    z-index: -1;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: ${ITEM_GAP_PX}px;

    width: max-content;
    pointer-events: none;
    visibility: hidden;
`;

export const MeasureItemWrap = styled('span')`
    display: inline-flex;
`;

export const MeasureOverflowWrap = styled.span`
    display: inline-flex;
`;

export const ItemGroup = styled.span`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 0;
    min-width: 0;
`;

export const Comma = styled.span`
    display: inline;
`;

export const VisibleRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: ${ITEM_GAP_PX}px;
    overflow: hidden;
`;

export const OverflowLabel = styled.span`
    color: var(--color-text-link);
`;

export const OverflowTriggerButton = styled.button`
    display: inline;
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    line-height: inherit;
    cursor: pointer;
    color: var(--color-text-link);

    &:focus-visible {
        outline: 2px solid var(--color-border-focus);
        outline-offset: 2px;
        border-radius: 2px;
    }
`;
