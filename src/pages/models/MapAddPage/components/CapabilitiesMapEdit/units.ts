import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    width: calc(100vw - 395px);
    height: calc(100vh - 64px);
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;

    padding: 24px 32px 0px;

    margin-bottom: 24px;
`;

export const GroupContainer = styled.div`
    display: flex;
    gap: 24px;

    padding: 0px 32px 24px;

    flex: 1;

    overflow: auto;
`;

export const DropdownArea = styled.div<{ isOver: boolean; column?: boolean }>`
    /* position: sticky;
    top: 0; */

    display: flex;
    align-items: center;
    justify-content: center;

    min-width: ${({ column }) => (column ? '310px' : '')};
    max-width: ${({ column }) => (column ? '310px' : '')};

    flex: 1;

    background-color: ${({ isOver }) =>
        isOver ? 'var(--color-background-base-dragged)' : '--color-background-base'};

    border-radius: 12px;

    border: 1px dashed
        ${({ isOver }) => (isOver ? 'var(--color-status-info)' : 'var(--color-border)')};
`;
