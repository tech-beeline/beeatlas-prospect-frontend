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

export const SideMenu = styled.div`
    width: 256px;
    height: 100vh;
    padding-top: 24px;

    border-right: 1px solid red;
`;

export const ContentWrapper = styled.div`
    height: 100vh;
    width: 100%;
    padding: 32px 52px;
`;

export const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const CardStyled = styled(Card)`
    margin-top: 24px;
`;
