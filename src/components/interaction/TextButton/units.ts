import styled from '@emotion/styled';

import { theme } from 'styles';

export const TextButton = styled.button`
    width: fit-content;

    font-size: ${theme.text.small.fontSize};
    line-height: ${theme.text.small.lineHeight};
    text-decoration: underline;

    color: inherit;

    transition: color 0.2s ease-in-out;

    &:hover {
        color: ${theme.colors.primary};
    }
`;
