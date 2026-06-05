import styled from '@emotion/styled';

import { Icon } from 'components/ui';

export const Link = styled.a<{ light?: boolean; visited?: boolean }>`
    color: ${({ light, visited }) =>
        visited ? 'var(--color-text-link-visited)' : light ? '#5cb5ff' : 'var(--color-text-link)'};

    cursor: pointer;

    :hover > #title {
        text-decoration: underline;
    }

    :hover > #icon {
        display: inline;
    }
`;

export const IconOuter = styled(Icon)<{ showIconPermanently: boolean; iconLeft: boolean }>`
    display: ${({ showIconPermanently }) => (showIconPermanently ? 'inline' : 'none')};

    margin-left: ${({ iconLeft }) => (iconLeft ? '0' : '8px')};
    margin-right: ${({ iconLeft }) => (iconLeft ? '8px' : '0')};
    vertical-align: middle;

    color: var(--color-text-link);
`;
