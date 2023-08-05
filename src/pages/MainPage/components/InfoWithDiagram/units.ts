import styled from '@emotion/styled';

import { theme } from 'styles';

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 294px;

    text-align: center;
`;

export const Diagram = styled.img`
    width: 180px;
    height: 239px;

    margin-bottom: 40px;
`;

export const TitleFirst = styled.h2`
    font-weight: 500;
    font-size: var(--font-size-h2);
    line-height: 56px;
`;

export const TitleSecond = styled.h4`
    font-weight: 500;
    font-size: var(--font-size-h4);
    line-height: 32px;
`;

export const Description = styled.p`
    font-weight: 500;
    font-size: var(--font-size-body1);
    line-height: 24px;

    margin-top: 12px;

    color: ${theme.colors.textInactive};
`;
