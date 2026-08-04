import styled from '@emotion/styled';

import { Icon } from 'components/ui';
import { Typography } from 'components/ui/Typography';

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

    border-radius: var(--size-border-radius-circle);
`;

export const SecondName = styled(Typography)`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
    letter-spacing: var(--font-letter-spacing-body3);
`;

export const FirstName = styled(SecondName)``;

export const Description = styled(Typography)`
    white-space: pre-line;

    padding-left: 52px;
`;

export const IconStyled = styled(Icon)`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    font-size: var(--font-size-h5);

    border-radius: var(--size-border-radius-circle);
`;
