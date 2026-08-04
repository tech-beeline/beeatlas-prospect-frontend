import styled from '@emotion/styled';

import { ProgressButton } from 'components/ui';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;

    min-height: var(--app-height);

    color: var(--color-text-active);
    background-color: var(--color-background-base);
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    height: 64px;
    padding: 20px 24px;

    border-bottom: 1px solid var(--color-divider);
`;

export const Form = styled.form`
    display: flex;
    flex: 1;
    flex-direction: column;

    min-height: 0;
`;

export const Content = styled.div`
    position: relative;

    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--size-spacing-x6);

    width: 100%;
    min-height: 0;

    padding: 32px 265px;

    overflow-y: auto;
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;

    flex: 1;
    gap: var(--size-spacing-x8);

    width: 100%;
`;

export const FullWidthContainer = styled.div`
    width: 100%;
`;

export const Footer = styled.div`
    display: flex;
    align-items: center;

    width: 100%;

    padding: 0 256px;

    background-color: var(--color-background-base);
    border-top: 1px solid var(--color-divider);
`;

export const FooterContent = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    width: 100%;
    padding: 16px 0;
`;

export const AutocompleteRow = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ProgressButtonStyled = styled(ProgressButton)<{ error: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    & > span {
        opacity: 1;
    }

    & > div {
        position: ${({ error }) => (error ? 'static' : 'absolute')};
        & > span {
            color: var(--color-status-error) !important;
        }
    }

    ${({ error }) => (error ? 'background-color: var(--color-status-error-background);' : '')}

    &:hover {
        ${({ error }) =>
            error
                ? 'background-color: color-mix(in srgb, var(--color-status-error) 14%, transparent) !important;'
                : ''}
    }
`;
