import { Button } from '@beeline/lk-ui';
import styled from '@emotion/styled';

import { BorderContainer } from 'components/containers';

import { theme } from 'styles';

export const BorderContainerStyled = styled(BorderContainer)`
    flex-direction: column;

    max-width: 528px;
    min-height: 296px;
`;

export const Title = styled.h5`
    font-weight: 500;
    font-size: 19px;
    line-height: 24px;

    margin-bottom: 16px;
`;

export const Text = styled.p`
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: 0.2px;
    white-space: pre-line;

    color: ${theme.colors.textInactive};
`;

export const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 4px;
`;

export const ButtonStyled = styled(Button)`
    width: max-content;
`;
