import { Dialog, DialogContent } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const DialogStyled = styled(Dialog)`
    z-index: 100;
`;

export const DialogContentStyled = styled(DialogContent)`
    color: var(--color-text-active);

    white-space: pre-line;

    min-width: 560px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;
`;
