import styled from '@emotion/styled';

import { BorderContainer } from 'components/containers';

import { BoldText, GrayText } from 'styles/units';

// TODO: сделать у боди бэкграунд темы
export const PageWrapper = styled.div`
    height: max-content;
    padding: 8px 180px 72px;

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
    display: flex;
    align-items: center;
    gap: 16px;

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-h3);
    line-height: var(--font-line-height-h3);

    width: max-content;
    margin: 0 0 12px;

    transition: color 0.25s ease-out;

    cursor: pointer;
    /* 
    & > * {
        transition: color 0.25s ease-out;
    } */

    /* &:hover > *,
    &:hover {
        color: var(--color-text-link);
    } */
`;

export const H4 = styled.h4`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h4);
    line-height: var(--font-line-height-h4);
    letter-spacing: var(--font-letter-spacing-body3);

    margin-bottom: 32px;
`;

export const H4Styled = styled(H4)`
    margin: 56px 0 26px;
`;

export const SubTitle = styled(GrayText)`
    max-width: 784px;
    margin-bottom: 56px;

    font-weight: var(--font-weight-medium);
`;

export const GraySecondText = styled(BoldText)`
    font-weight: var(--font-weight-regular);

    color: var(--color-text-inactive);
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

    color: var(--color-text-link);

    cursor: pointer;
`;
