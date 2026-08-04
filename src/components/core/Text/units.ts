import styled from '@emotion/styled';

import { Typography } from 'components/ui/Typography';

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
