import { Typography } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const TypographyStyled = styled(Typography)<{
    inactive?: boolean;
    link?: boolean;
    pointer?: boolean;
}>`
    color: ${({ inactive, link }) =>
        link ? 'var(--color-text-link)' : inactive ? 'var(--color-text-inactive)' : 'inherit'};
    cursor: ${({ pointer }) => (pointer ? 'pointer' : '')};
`;
