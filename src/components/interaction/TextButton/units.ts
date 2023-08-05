import styled from '@emotion/styled';

import { theme } from 'styles';

export const TextButton = styled.button`
    width: fit-content;

    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
    text-decoration: underline;

    color: inherit;

    transition: color 0.25s ease-out;

    &:hover {
        color: ${theme.colors.primary};
    }
`;
