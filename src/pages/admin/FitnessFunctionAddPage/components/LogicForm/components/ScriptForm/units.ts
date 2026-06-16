import styled from '@emotion/styled';

import { ProgressButton } from 'components/ui';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const ChipsContainer = styled.div`
    display: flex;
    gap: 8px;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const CodeTextContainer = styled.div`
    padding: 16px;

    white-space: pre-wrap;

    border-radius: var(--size-border-radius-x6);

    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
`;

export const FileNameContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
`;

export const FileMetadataContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    max-width: 100%;

    overflow: hidden;
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
