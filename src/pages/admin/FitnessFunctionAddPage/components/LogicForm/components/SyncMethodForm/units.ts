import styled from '@emotion/styled';

import { ProgressButton } from 'components/ui';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    margin-top: 8px;

    padding-bottom: 32px;
`;

export const ProgressButtonStyled = styled(ProgressButton)<{ showProgress: boolean }>`
    .dsb-button-progress__svg {
        display: ${({ showProgress }) => (showProgress ? 'block' : 'none')};
    }
`;
