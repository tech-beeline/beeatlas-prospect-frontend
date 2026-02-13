import { Typography } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const TypographyStyled = styled(Typography)<{
    inactive?: boolean;
    link?: boolean;
    pointer?: boolean;
    visited?: boolean;
}>`
    color: ${({ inactive, link, visited }) =>
        visited
            ? 'var(--color-text-link-visited)'
            : link
            ? 'var(--color-text-link)'
            : inactive
            ? 'var(--color-text-inactive)'
            : 'inherit'};
    cursor: ${({ pointer }) => (pointer ? 'pointer' : '')};
`;
