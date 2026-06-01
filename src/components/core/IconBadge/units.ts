import styled from '@emotion/styled';

import type { IconBadgeColors } from './const';

export const Root = styled.span<IconBadgeColors>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    padding: 4px;
    border-radius: 50%;

    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${({ color }) => color};

    .beeline-icons {
        color: ${({ color }) => color};
    }
`;
