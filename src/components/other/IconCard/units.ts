import styled from '@emotion/styled';

import { BorderContainer } from 'components/containers';

export const BorderContainerStyled = styled(BorderContainer)`
    display: flex;
    flex-direction: column;
    gap: 12px;

    max-width: 528px;
`;

export const Title = styled.h5`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);
`;

export const Text = styled.p`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body1);
    line-height: var(--font-line-height-body1);
    letter-spacing: var(--font-letter-spacing-body3);
`;

export const ButtonWrapper = styled.div`
    width: max-content;
    margin-left: auto;
`;

export const DeadlineBlock = styled.div``;

export const DeadlineTitle = styled.p`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
    letter-spacing: var(--font-letter-spacing-body3);

    color: var(--color-text-inactive);
`;

export const FlexBottomWrapper = styled.div`
    display: flex;
    align-items: center;

    height: 64px;
`;
