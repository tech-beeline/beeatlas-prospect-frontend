import { Icon } from '@beeline/lk-ui';
import styled from '@emotion/styled';

import { theme } from 'styles';

export const BaseIcon = styled(Icon)`
    color: ${theme.colors.textInactive};

    user-select: none;
    cursor: pointer;
`;
