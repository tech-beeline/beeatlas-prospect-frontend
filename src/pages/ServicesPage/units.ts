import styled from '@emotion/styled';

import { BorderContainer } from 'components/containers';

import { theme } from 'styles';

// TODO: сделать у боди бэкграунд темы
export const PageWrapper = styled.div`
    height: 100vh;
    padding: 72px 52px;

    background-color: var(--color-background-base);
    color: ${theme.colors.textActive};
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

export const Title = styled.h1`
    font-weight: var(--font-weight-medium);
    font-size: 100px;
    line-height: 110px;

    color: var(--color-text-active);
    background-color: var(--button-background-color);
`;

export const H1 = styled.h1`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h1);
    line-height: var(--font-line-height-h1);

    margin-top: 120px;

    background-color: var(--button-background-color);
`;

export const H2 = styled.h2`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h2);
    line-height: var(--font-line-height-h2);
`;

export const H3 = styled.h3`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-h3);
    line-height: var(--font-line-height-h3);

    width: 798px;
    margin: 40px 0 32px;
`;

export const H4 = styled.h4`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h4);
    line-height: var(--font-line-height-h4);

    letter-spacing: var(--font-letter-spacing-body3);
`;

export const GrayText = styled.p`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body1);
    line-height: var(--font-line-height-body1);

    color: ${theme.colors.textInactive};
`;

export const SubTitle = styled(GrayText)`
    font-weight: var(--font-weight-medium);
`;

export const BoldTitle = styled.h5`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);

    margin-bottom: 8px;
`;

export const BoldText = styled.p`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
    letter-spacing: var(--font-letter-spacing-body3);
`;

export const FlexContainer = styled.div`
    display: flex;
    gap: 24px;

    @media only screen and (max-width: 1100px) {
        flex-direction: column;
    }
`;
