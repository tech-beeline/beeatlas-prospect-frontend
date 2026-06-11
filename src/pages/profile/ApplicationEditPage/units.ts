import styled from '@emotion/styled';

import { TextArea, TextField } from 'components/form';
import { ProgressButton } from 'components/ui';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100vh;

    color: var(--color-text-active);
    background-color: var(--color-background-base);
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    width: 100%;
    height: 64px;
    padding: 20px 24px;

    border-bottom: 1px solid var(--color-divider);
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;

    flex: 1;

    width: 100%;

    overflow-y: scroll;

    padding-bottom: 32px;

    &::-webkit-scrollbar-thumb {
        background-color: var(--color-utilities-scroll-hover);

        border-radius: var(--size-border-radius-x8);
    }

    &::-webkit-scrollbar {
        width: 8px;
    }
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 32px 0px 0px;

    width: 100%;
    max-width: 910px;
`;

export const TextAreaStyled = styled(TextArea)`
    & > textarea {
        padding-right: 40px !important;
    }
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;

    width: 100%;
`;

export const ProgressButtonStyled = styled(ProgressButton)<{ showProgress: boolean }>`
    height: 48px;
    width: 264px;

    .dsb-button-progress__svg {
        display: ${({ showProgress }) => (showProgress ? 'block' : 'none')};
    }
`;

export const TextFieldStyled = styled(TextField)`
    & > div > input {
        padding-right: 48px !important;
    }
`;

export const RelativeContainer = styled.div`
    position: relative;

    flex: 1;
`;

export const IconContainer = styled.div`
    position: absolute;

    top: 15px;
    right: 16px;

    cursor: pointer;
`;

export const EmptyDiv = styled.div`
    min-height: 8px;
`;

export const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 90px;
    padding: 0px 32px;

    border-top: 1px solid var(--color-divider);
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    width: 100%;
    max-width: 910px;
`;
