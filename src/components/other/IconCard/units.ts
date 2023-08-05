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
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: 28px;
`;

export const Text = styled.p`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body1);
    line-height: 24px;
    letter-spacing: 0.2px;
`;

export const ButtonWrapper = styled.div`
    width: max-content;
    margin-left: auto;
`;

export const DeadlineBlock = styled.div``;

export const DeadlineTitle = styled.p`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body3);
    line-height: 18px;
    letter-spacing: 0.2px;

    color: ${theme.colors.textInactive};
`;

export const FlexBottomWrapper = styled.div`
    display: flex;
    align-items: center;

    height: 64px;
`;
