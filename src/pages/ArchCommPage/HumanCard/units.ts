import { Icon } from '@beeline/lk-ui';
import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const Avatar = styled.img`
    width: 40px;
    height: 40px;

    border-radius: 50%;
`;

export const SecondName = styled.p`
    font-weight: 700;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: 0.2px;
`;

export const FirstName = styled(SecondName)`
    /* margin-bottom: 17px; */
`;

export const Description = styled.p`
    font-weight: 410;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.2px;

    white-space: pre-line;

    padding-left: 52px;

    color: ${theme.colors.textInactive};
`;

export const IconStyled = styled(Icon)`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    font-size: 20px;

    border-radius: 50%;
`;
