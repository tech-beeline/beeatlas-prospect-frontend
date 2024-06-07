import { Skeleton } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const SubscriptionCard = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    padding: 24px 16px;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-divider);
    }
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
