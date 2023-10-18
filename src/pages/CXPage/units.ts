import styled from '@emotion/styled';

import { Card } from 'components/interaction';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    height: 100vh;
    padding-top: 64px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const ContentWrapper = styled.div`
    width: 100%;
    padding: 32px 52px 0 108px;
`;

export const Description = styled.div`
    margin-top: 12px;

    font-weight: var(--font-weight-body1);
    font-size: var(--font-size-body1);
    line-height: var(--font-line-height-body1);
`;

export const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;

    @media only screen and (max-width: 960px) {
        flex-direction: column;
    }
`;

export const CardStyled = styled(Card)`
    width: 45%;
    min-width: 300px;
    margin-top: 24px;
`;
