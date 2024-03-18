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
    display: flex;
    flex-wrap: wrap;
`;

export const CardStyled = styled(Card)`
    margin-top: 24px;
`;
