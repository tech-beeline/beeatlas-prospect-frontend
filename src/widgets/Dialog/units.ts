import styled from '@emotion/styled';

import { Dialog, DialogContent } from 'components/ui';

export const DialogStyled = styled(Dialog)`
    z-index: 103;
`;

export const DialogContentStyled = styled(DialogContent)<{ large: boolean; showFooter: boolean }>`
    color: var(--color-text-active);

    white-space: pre-line;

    min-width: 560px;

    ${({ large }) => (large ? 'max-height: unset;' : '')}
    ${({ large }) => (large ? 'width: unset;' : '')}

    & > div:last-of-type {
        display: ${({ showFooter }) => (showFooter ? 'flex' : 'none')};
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;
`;
