import styled from '@emotion/styled';

export const ActionsRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;

    padding: 8px 16px;

    border-bottom: 1px solid var(--color-divider);
`;

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const CustomButton = styled.button<{ disabled?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;

    height: 40px;
    padding: 8px 12px;

    border-radius: var(--size-border-radius-x6);

    color: ${({ disabled }) =>
        disabled ? 'var(--color-text-disabled)' : 'var(--color-text-active)'};

    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};

    user-select: none;

    &:hover {
        background-color: var(--color-background-base-hover);
    }

    &:active {
        background-color: var(--color-background-base-focused);
    }

    span {
        color: ${({ disabled }) =>
            disabled ? 'var(--color-text-disabled)' : 'var(--color-text-inactive)'};
    }
`;
