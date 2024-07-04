import { Icon } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const Link = styled.a`
    color: var(--color-text-link);

    cursor: pointer;

    :hover > span:nth-child(1) {
        text-decoration: underline;
    }

    :hover > span:nth-child(2) {
        display: inline;
    }
`;

export const IconOuter = styled(Icon)`
    display: none;

    margin-left: 8px;
    vertical-align: middle;

    color: var(--color-text-link);
`;
