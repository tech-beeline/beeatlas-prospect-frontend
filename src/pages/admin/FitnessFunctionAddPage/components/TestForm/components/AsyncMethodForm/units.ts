import styled from '@emotion/styled';

import { Text } from 'components/core';
import { ProgressButton } from 'components/ui';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const SubtitleContainer = styled.div`
    margin-top: -8px;
    margin-bottom: -8px;
`;

export const AppContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

export const GrowContainer = styled.div`
    flex-grow: 1;
`;

export const OptionContent = styled.div`
    min-width: 0;
`;

export const OptionText = styled(Text)`
    display: block;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;
`;

export const PendingContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const PendingData = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    padding: 12px 0px;
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
