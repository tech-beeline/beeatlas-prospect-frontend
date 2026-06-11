import styled from '@emotion/styled';

import { Skeleton } from 'components/ui';

export const SubscriptionCard = styled.div<{ isSelected?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    padding: 24px 16px;

    background-color: ${({ isSelected }) =>
        isSelected ? 'var(--color-background-base-focused)' : 'var(--color-background-base)'};

    overflow: hidden;

    :not(:last-child) {
        border-bottom: 1px solid var(--color-divider);
    }

    /* > button {
        display: none;
    }

    :hover > button {
        display: flex;
    } */
`;

export const ContentContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const Body3 = styled.div`
    font-weight: var(--font-weight-body3);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    color: var(--color-text-inactive);
`;

export const AvatarSkeleton = styled(Skeleton)`
    min-width: 40px;
    max-width: 40px;
`;
