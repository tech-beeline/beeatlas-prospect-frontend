import styled from '@emotion/styled';

import { Text } from 'components/core';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const TextFieldsContainer = styled.div`
    display: flex;
    gap: 24px;
`;

export const GrowContainer = styled.div`
    flex: 1;
`;

export const RadioBlockContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const CaptionTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const RadiosContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 12px 0px;
`;

export const ApplicabilityContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    margin-top: 8px;

    padding-bottom: 32px;
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
