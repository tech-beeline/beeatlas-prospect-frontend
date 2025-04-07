import styled from '@emotion/styled';

export const NotificationCard = styled.div<{ unread?: boolean }>`
    padding: 24px;

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

export const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;

    width: 100%;
`;

export const LineBreak = styled.div`
    line-break: anywhere;
`;

export const BoldText = styled.span`
    font-weight: 500;
`;

export const LinkContainer = styled.div`
    margin-top: 24px;
    padding: 0px;

    font-weight: var(--font-weight-subtitle3);
    font-size: var(--font-size-subtitle3);
    line-height: var(--font-line-height-subtitle3);
`;
