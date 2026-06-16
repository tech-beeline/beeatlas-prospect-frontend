import styled from '@emotion/styled';

import { Text } from 'components/core';

export const LoadingContent = styled.div`
    padding: 12px 16px;
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
