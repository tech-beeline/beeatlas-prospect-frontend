import styled from '@emotion/styled';

import { Card } from 'components/interaction';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const SideMenu = styled.div`
    width: 256px;
    height: 100vh;
    padding-top: 24px;

    border-right: 1px solid red;
`;

export const ContentWrapper = styled.div`
    width: 100%;
    padding: 32px 68px;
`;

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    width: 100%;

    margin-top: 24px;

    @media only screen and (max-width: 1390px) {
        grid-template-columns: 1fr;
    }
`;

export const CardStyled = styled(Card)`
    min-width: 400px;
`;
