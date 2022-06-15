import styled from '@emotion/styled';

import { theme } from 'styles';

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ErrorTitle = styled.p`
    font-size: ${theme.text.normal.fontSize};
    line-height: ${theme.text.normal.lineHeight};
    font-weight: 700;
`;

export const ErrorDescription = styled.p`
    font-size: ${theme.text.small.fontSize};
    line-height: ${theme.text.small.lineHeight};
`;

export const ErrorIcon = styled.img`
    height: 120px;
    width: 120px;
`;
