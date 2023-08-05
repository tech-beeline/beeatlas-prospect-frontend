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

    border-radius: var(--size-border-radius-circle);
`;

export const SecondName = styled.p`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-body2);
    line-height: 22px;
    letter-spacing: var(--font-letter-spacing-body3);
`;

export const FirstName = styled(SecondName)`
    /* margin-bottom: 17px; */
`;

export const Description = styled.p`
    font-weight: 410;
    font-size: var(--font-size-caption);
    line-height: 16px;
    letter-spacing: var(--font-letter-spacing-body3);

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

    font-size: var(--font-size-h5);

    border-radius: var(--size-border-radius-circle);
`;
