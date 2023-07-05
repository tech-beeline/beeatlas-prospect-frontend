import styled from '@emotion/styled';

import { theme } from 'styles';

export const PageWrapper = styled.div`
    height: 100vh;

    background-color: ${theme.colors.backgroundLow};
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 64px;
    padding: 20px 24px;

    border-bottom: 1px solid ${theme.colors.divider};
`;

export const FlexSideContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const Name = styled.p`
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;

    color: ${theme.colors.textActive};
`;

export const Desription = styled.p`
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;

    color: ${theme.colors.textInactive};
`;

export const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    border: 1px solid ${theme.colors.divider};
    border-radius: 12px;

    cursor: pointer;
`;

export const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SideBlockTitle = styled.div`
    color: ${theme.colors.textActive};

    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
`;

export const TextFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: 100%;
    padding-top: 24px;
`;

export const ButtonContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;

    display: flex;
    justify-content: flex-end;
    gap: 10px;

    width: 100%;
    height: 96px;
    padding: 24px 16px;
`;
