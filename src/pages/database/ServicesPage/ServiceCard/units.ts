import styled from '@emotion/styled';

import { BorderContainer } from 'components/containers';
import { Button } from 'components/ui';

export const BorderContainerStyled = styled(BorderContainer)`
    flex-direction: column;

    max-width: 528px;
    min-height: 296px;
`;

export const Title = styled.h5`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body1);
    line-height: var(--font-line-height-body1);

    margin-bottom: 16px;
`;

export const Text = styled.p`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
    letter-spacing: var(--font-letter-spacing-body3);
    white-space: pre-line;

    color: var(--color-text-inactive);
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
