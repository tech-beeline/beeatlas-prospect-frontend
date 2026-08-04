import styled from '@emotion/styled';

export const NotificationCard = styled.div<{ isExport?: boolean; unread?: boolean }>`
    padding: ${({ isExport }) => (isExport ? '24px 24px 12px 24px' : '24px')};

    background-color: ${({ unread }) =>
        unread ? 'var(--color-background-base-selected)' : 'var(--color-background-base)'};

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-divider);
    }

    cursor: ${({ unread }) => (unread ? 'pointer' : 'default')};

    &:hover {
        background-color: var(--color-background-base-hover);
    }

    &:active {
        background-color: var(--color-background-base-focused);
    }
`;

export const CardContainer = styled.div`
    display: flex;
    gap: 16px;
`;

export const AvatarContainer = styled.div`
    position: relative;
`;

export const Indicator = styled.div`
    position: absolute;
    top: 0;
    left: -8px;

    height: 8px;
    width: 8px;
    border-radius: 50%;

    background-color: var(--color-text-link);
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    margin-top: 12px;
`;

export const BoldText = styled.span`
    font-weight: 500;
`;
