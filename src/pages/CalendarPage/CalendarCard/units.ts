import styled from '@emotion/styled';

import { BadgeName } from 'components/containers';

import { theme } from 'styles';

export const Date = styled.p`
    margin-bottom: 16px;

    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.2px;

    color: ${theme.colors.textInactive};
`;

export const Title = styled.h4`
    margin-bottom: 8px;

    font-weight: 500;
    font-size: 26px;
    line-height: 32px;
    letter-spacing: 0.2px;
`;

export const SubTitle = styled(Date)`
    font-size: 15px;
    line-height: 18px;
`;

export const BadgeNameStyled = styled(BadgeName)`
    margin-top: 64px;
`;

export const LinkContainer = styled.div`
    display: flex;
    gap: 12px;

    margin-top: 24px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
