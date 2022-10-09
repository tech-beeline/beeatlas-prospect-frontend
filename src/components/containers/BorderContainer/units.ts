import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    width: 100%;
    max-height: max-content;
    padding: 24px;

    border: 1px solid ${theme.colors.divider};
    border-radius: ${theme.borderRadius};
`;
