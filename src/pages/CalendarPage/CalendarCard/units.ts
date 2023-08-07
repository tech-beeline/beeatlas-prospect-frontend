import styled from '@emotion/styled';

import { BadgeName } from 'components/containers';

export const Date = styled.p`
    margin-bottom: 16px;

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);
    letter-spacing: var(--font-letter-spacing-body3);

    color: var(--color-text-inactive);
`;

export const Title = styled.h4`
    margin-bottom: 8px;

    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h4);
    line-height: var(--font-line-height-h4);
    letter-spacing: var(--font-letter-spacing-body3);
`;

export const SubTitle = styled(Date)`
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
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
