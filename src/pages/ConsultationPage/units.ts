import styled from '@emotion/styled';

import { BorderContainer } from 'components/containers';

import { theme } from 'styles';

// TODO: сделать у боди бэкграунд темы
export const PageWrapper = styled.div`
    height: 100vh;
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
    font-weight: 500;
    font-size: 100px;
    line-height: 110px;

    color: var(--color-text-active);
    background-color: var(--button-background-color);
`;

export const H1 = styled.h1`
    font-weight: 500;
    font-size: 54px;
    line-height: 66px;

    margin-top: 120px;

    background-color: var(--button-background-color);
`;

export const H2 = styled.h2`
    font-weight: 500;
    font-size: 44px;
    line-height: 56px;
`;

export const H3 = styled.h3`
    display: flex;
    align-items: center;
    gap: 16px;

    font-weight: 400;
    font-size: 34px;
    line-height: 44px;

    width: 798px;
    margin: 40px 0 12px;

    cursor: pointer;
`;

export const H4 = styled.h4`
    font-weight: 500;
    font-size: 26px;
    line-height: 32px;
    letter-spacing: 0.2px;

    margin-bottom: 32px;
`;

export const GrayText = styled.p`
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: 0.2px;

    color: ${theme.colors.textInactive};
`;

export const SubTitle = styled(GrayText)`
    max-width: 784px;
    margin-bottom: 56px;

    font-weight: 500;
`;

export const BoldTitle = styled.h5`
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;

    margin-bottom: 8px;
`;

// export const BoldText = styled.p`
//     font-weight: 400;
//     font-size: 17px;
//     line-height: 22px;
//     letter-spacing: 0.2px;
// `;

export const AdaptiveCardContainer = styled.div`
    display: flex;
    gap: 24px;

    margin-bottom: 24px;

    @media only screen and (max-width: 1100px) {
        flex-direction: column;
    }
`;
