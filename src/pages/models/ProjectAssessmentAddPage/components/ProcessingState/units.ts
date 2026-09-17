import styled from '@emotion/styled';

import { Card as CardBase } from 'components/ui';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;

    margin-top: 32px;
`;

export const Card = styled(CardBase)`
    &.dsb_card {
        display: flex;
        flex-direction: column;
        gap: 24px;

        max-width: 676px;
        width: 100%;
        padding: 24px;

        border: 1px solid var(--color-divider);
    }
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const Metrics = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
`;

export const Metric = styled.div`
    display: flex;
    flex-direction: column;
    padding: 6px 16px;

    background: var(--color-control-background);
    border-radius: 12px;
`;
