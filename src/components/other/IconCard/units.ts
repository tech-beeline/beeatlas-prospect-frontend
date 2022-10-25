import styled from '@emotion/styled';

import { BorderContainer } from 'components/containers';

import { theme } from 'styles';

export const BorderContainerStyled = styled(BorderContainer)`
    display: flex;
    flex-direction: column;
    gap: 12px;

    max-width: 528px;
`;

export const Title = styled.h5`
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
`;

export const Text = styled.p`
    font-weight: 400;
    font-size: 19px;
    line-height: 24px;
    letter-spacing: 0.2px;
`;

export const ButtonWrapper = styled.div`
    width: max-content;
    margin-left: auto;
`;

export const DeadlineBlock = styled.div``;

export const DeadlineTitle = styled.p`
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: 0.2px;

    color: ${theme.colors.textInactive};
`;

export const FlexBottomWrapper = styled.div`
    display: flex;
    align-items: center;

    height: 64px;
`;
