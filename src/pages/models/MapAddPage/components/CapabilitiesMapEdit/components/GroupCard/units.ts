import styled from '@emotion/styled';

import { InlineEdit } from 'components/ui';

export const GroupCard = styled.div<{ isOver: boolean; selected: boolean; hasSubgroups: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 16px;

    min-width: 310px;
    max-width: 310px;

    height: fit-content;

    padding: ${({ selected }) => (selected ? '15px' : '16px')};

    border-radius: 12px;

    background-color: ${({ isOver, hasSubgroups }) =>
        isOver
            ? 'var(--color-background-base-dragged)'
            : hasSubgroups
            ? 'var(--color-status-neutral-background)'
            : 'var(--color-background-base)'};

    border: ${({ isOver, selected }) =>
        selected
            ? '2px solid var(--color-background-brand)'
            : isOver
            ? '1px dashed var(--color-status-info)'
            : '1px solid var(--color-border)'};

    cursor: pointer;
`;

export const SubgroupCard = styled.div<{ isOver: boolean; selected: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 16px;

    height: fit-content;

    padding: ${({ selected }) => (selected ? '15px' : '16px')};

    border-radius: 12px;

    background-color: ${({ isOver }) =>
        isOver ? 'var(--color-background-base-dragged)' : 'var(--color-background-base)'};

    border: ${({ isOver, selected }) =>
        selected
            ? '2px solid var(--color-background-brand)'
            : isOver
            ? '1px dashed var(--color-status-info)'
            : '1px solid var(--color-border)'};

    cursor: pointer;
`;

export const CapabilityCard = styled.div<{ isOver: boolean; selected: boolean }>`
    padding: ${({ selected }) => (selected ? '15px' : '16px')};

    border-radius: 12px;

    background-color: ${({ isOver }) =>
        isOver ? 'var(--color-background-base-dragged)' : 'var(--color-background-base)'};

    border: ${({ isOver, selected }) =>
        selected
            ? '2px solid var(--color-background-brand)'
            : isOver
            ? '1px dashed var(--color-status-info)'
            : '1px solid var(--color-border)'};
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
`;

export const InlineEditStyled = styled(InlineEdit)`
    &.dsb_card {
        padding: 0;
    }

    top: 0;
`;
