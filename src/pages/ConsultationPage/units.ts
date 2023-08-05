import styled from '@emotion/styled';

import { BorderContainer } from 'components/containers';

import { theme } from 'styles';

// TODO: сделать у боди бэкграунд темы
export const PageWrapper = styled.div`
    height: max-content;
    padding: 72px 180px;

    background-color: ${theme.colors.backgroundLow};
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
    line-height: 66px;

    margin-top: 120px;

    background-color: var(--button-background-color);
`;

export const H2 = styled.h2`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h2);
    line-height: 56px;
`;

export const H3 = styled.h3`
    display: flex;
    align-items: center;
    gap: 16px;

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-h3);
    line-height: 44px;

    width: max-content;
    margin: 40px 0 12px;

    transition: color 0.25s ease-out;

    cursor: pointer;
    /* 
    & > * {
        transition: color 0.25s ease-out;
    } */

    /* &:hover > *,
    &:hover {
        color: ${theme.colors.textLink};
    } */
`;

export const H4 = styled.h4`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h4);
    line-height: 32px;
    letter-spacing: var(--font-letter-spacing-body3);

    margin-bottom: 32px;
`;

export const GrayText = styled.p`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body2);
    line-height: 22px;
    letter-spacing: var(--font-letter-spacing-body3);

    color: ${theme.colors.textInactive};
`;

export const SubTitle = styled(GrayText)`
    max-width: 784px;
    margin-bottom: 56px;

    font-weight: var(--font-weight-medium);
`;

export const BoldTitle = styled.h5`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);

    margin-bottom: 8px;
`;

// export const BoldText = styled.p`
//     font-weight: var(--font-weight-regular);
//     font-size: var(--font-size-body2);
//     line-height: 22px;
//     letter-spacing: var(--font-letter-spacing-body3);
// `;

export const BoldText = styled.p`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body1);
    line-height: 24px;
`;

export const GraySecondText = styled(BoldText)`
    font-weight: var(--font-weight-regular);

    color: ${theme.colors.textInactive};
`;

export const AdaptiveCardContainer = styled.div`
    display: flex;
    gap: 24px;

    margin-bottom: 24px;

    @media only screen and (max-width: 1100px) {
        flex-direction: column;
    }
`;

export const FlexBottomContainer = styled.div`
    display: flex;
    gap: 25px;

    margin-top: 26px;
`;

export const EmailLink = styled.a`
    text-decoration: none;
    margin-left: 6px;

    color: ${theme.colors.textLink};

    cursor: pointer;
`;
