import styled from '@emotion/styled';

import { Accordion } from 'components/interaction';

import { H1 } from 'styles/units';

import callback from './images/callback.png';
import general from './images/general.png';

export const PageWrapper = styled.div`
    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const GeneralBlock = styled.div`
    padding: 60px 96px 0 96px;

    background-image: url(${general});
    background-size: 653px 588px;
    background-repeat: no-repeat;
    /* background-position: 112% 100%; */
    background-position: 894px 65px;
`;

export const Title = styled.h1`
    width: 832px;

    font-weight: var(--font-weight-medium);
    font-size: 80px;
    line-height: 90px;

    color: var(--color-text-active);
    background-color: var(--button-background-color);
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
    display: grid;
    grid-auto-columns: minmax(130px, 1fr);
    grid-auto-flow: column;
    gap: 16px;

    max-width: 100%;
    margin-top: 60px;
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

    background-color: ${'var(--color-status-info-background)'};
    color: var(--color-text-active);

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
