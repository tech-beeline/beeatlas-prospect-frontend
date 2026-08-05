import styled from '@emotion/styled';

export const HISTORY_MENU_WIDTH = 200;
export const HISTORY_MENU_MAX_HEIGHT = 600;

export const Container = styled.div`
    position: relative;
    height: 24px;
`;

export const MenuBlock = styled.div`
    position: fixed;

    display: flex;
    flex-direction: column;
    gap: 16px;

    width: ${HISTORY_MENU_WIDTH}px;
    max-height: ${HISTORY_MENU_MAX_HEIGHT}px;
    padding: 16px;
    overflow-y: auto;

    background-color: var(--color-background-medium);
    border-radius: var(--size-border-radius-x6);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);

    z-index: 1100;
`;

export const HistorySection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const HistorySectionTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-left: 12px;
`;

export const HistoryItem = styled.div<{ selected: boolean }>`
    padding: 12px;
    border-radius: 12px;
    cursor: pointer;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    background-color: ${({ selected }) =>
        selected ? 'var(--color-background-base-selected)' : 'var(--color-background-base)'};

    &:hover {
        background: var(--color-control-background);
    }
`;
