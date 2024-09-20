import { Typography } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const TypographyStyled = styled(Typography)<{ inactive?: boolean }>`
    color: ${({ inactive }) =>
        inactive ? 'var(--color-text-inactive)' : 'var(--color-text-active)'};
`;
