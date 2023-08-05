import styled from '@emotion/styled';

import { Accordion } from 'components/interaction';

import { theme } from 'styles';

import callback from './images/callback.png';
import general from './images/general.png';

export const PageWrapper = styled.div`
    background-color: ${theme.colors.backgroundLow};
    color: ${theme.colors.textActive};
`;

export const GeneralBlock = styled.div`
    padding: 124px 96px 0 96px;

    background-image: url(${general});
    background-size: 653px 588px;
    background-repeat: no-repeat;
    /* background-position: 112% 100%; */
    background-position: 894px 129px;
`;

export const Title = styled.h1`
    width: 832px;

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
    margin: 40px 0;
`;

export const CardsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;

    width: 100%;
    margin-top: 16px;
    /* для скролбара внизу */
    padding-bottom: 16px;

    overflow-x: auto;
`;

export const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;

    width: 100%;
    padding-top: 60px;
`;

export const CallbackWrapper = styled.div`
    position: relative;
    height: 422px;

    &::before {
        display: block;

        content: '';

        position: absolute;
        top: -15px;
        right: 100px;

        background-image: url(${callback});
        background-size: 445px 411px;

        height: 411px;
        width: 445px;
    }
`;

export const CallbackContainer = styled.div`
    height: 306px;
    padding: 48px;
    margin: 120px 0;

    background-color: ${theme.colors.info};
    color: ${theme.colors.textActive};

    border-radius: var(--size-border-radius-x12);
`;

export const H1ForCallbackStyled = styled(H1)`
    margin: 0;
`;

export const Text = styled.p`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body1);
    line-height: var(--font-line-height-body1);

    width: 50%;
    margin: 16px 0 24px;
`;

export const AccordionStyled = styled(Accordion)`
    margin-top: 60px;
`;
