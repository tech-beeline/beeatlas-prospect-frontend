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
    padding: 32px 52px;
`;

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    width: 100%;

    margin-top: 24px;

    @media only screen and (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

export const CardStyled = styled(Card)`
    min-width: 300px;
`;
