import styled from '@emotion/styled';

export const AlertContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 24px;

    border-radius: 12px;
    border: 1px solid var(--color-divider);
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    justify-content: space-between;
`;

export const Badge = styled.div<{ success: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 4px 12px;

    background-color: ${({ success }) =>
        success
            ? 'var(--color-status-success-background)'
            : 'var(--color-status-error-background)'};
    color: ${({ success }) =>
        success ? 'var(--color-status-success)' : 'var(--color-status-error)'};

    border-radius: 12px;
`;

export const MetadataContainer = styled.div`
    display: flex;
    gap: 16px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;
