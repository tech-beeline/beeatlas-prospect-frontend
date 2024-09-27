import styled from '@emotion/styled';

import { BorderContainer } from 'components/containers';

import { GrayText } from 'styles/units';

export const PageWrapper = styled.div`
    padding: 8px 52px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 50%;
`;

export const BorderContainerStyled = styled(BorderContainer)`
    flex-direction: column;
    gap: 32px;
`;

export const H3 = styled.h3`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-h3);
    line-height: var(--font-line-height-h3);

    width: 798px;
    margin: 40px 0 32px;
`;

export const SubTitle = styled(GrayText)`
    font-weight: var(--font-weight-medium);
`;

export const FlexContainer = styled.div`
    display: flex;
    gap: 24px;

    @media only screen and (max-width: 1100px) {
        flex-direction: column;
    }
`;
