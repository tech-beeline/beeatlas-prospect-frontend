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
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h2);
    line-height: var(--font-line-height-h2);
`;

export const TitleSecond = styled.h4`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h4);
    line-height: var(--font-line-height-h4);
`;

export const Description = styled.p`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body1);
    line-height: var(--font-line-height-body1);

    margin-top: 12px;

    color: ${theme.colors.textInactive};
`;
