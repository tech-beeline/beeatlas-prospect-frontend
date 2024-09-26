import styled from '@emotion/styled';

import { Card } from 'components/interaction';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const ContentWrapper = styled.div`
    width: 100%;
    padding: 32px 68px;
`;

export const Description = styled.div`
    margin-top: 12px;

    font-weight: var(--font-weight-body1);
    font-size: var(--font-size-body1);
    line-height: var(--font-line-height-body1);
`;

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    width: 100%;

    margin-top: 24px;

    @media only screen and (max-width: 1100px) {
        grid-template-columns: 1fr;
    }
`;

export const CardStyled = styled(Card)`
    min-width: 450px;
`;
