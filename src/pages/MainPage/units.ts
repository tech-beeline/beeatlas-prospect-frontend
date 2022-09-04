// узнать про готовые компоненты
// import { button } from '@beeline/design-tokens/js/tokens';
import styled from '@emotion/styled';

import { Accordion } from 'components/interaction';

import callback from './images/callback.png';
import general from './images/general.png';

// export const Button = styled.button`
//     border-radius: ${button.borderRadius};
// `;

export const GeneralBlock = styled.div`
    padding: 60px 96px 0 96px;

    background-image: url(${general});
    background-size: 653px 588px;
    background-repeat: no-repeat;
    background-position: 112% 100%;
    background-color: var(--color-background-base);
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
    font-weight: 400;
    font-size: 34px;
    line-height: 44px;

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

    background-color: #e3f2ff;

    border-radius: 24px;
`;

export const H1ForCallbackStyled = styled(H1)`
    margin: 0;
`;

export const Text = styled.p`
    font-weight: 400;
    font-size: 19px;
    line-height: 24px;

    width: 50%;
    margin: 16px 0 24px;
`;

export const AccordionStyled = styled(Accordion)`
    margin-top: 60px;
`;
