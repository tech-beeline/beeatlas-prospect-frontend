// узнать про готовые компоненты
// import { button } from '@beeline/design-tokens/js/tokens';
import styled from '@emotion/styled';

// export const Button = styled.button`
//     border-radius: ${button.borderRadius};
// `;

export const Title = styled.h1`
    font-weight: 500;
    font-size: 100px;
    line-height: 110px;
`;

export const H1 = styled.h1`
    font-weight: 500;
    font-size: 54px;
    line-height: 66px;

    margin-top: 120px;
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

    overflow-x: auto;
`;

export const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;

    width: 100%;
    padding-top: 40px;
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

    width: 600px;
    margin: 16px 0 24px;
`;
