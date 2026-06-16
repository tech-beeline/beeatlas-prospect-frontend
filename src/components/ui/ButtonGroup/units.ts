import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { StyledButtonGroupProps } from './types';

const borderRadiusStyles = css`
    & > button:not(:first-child):not(:last-child) {
        border-radius: 0;
    }

    & > button:first-child {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
    }

    & > button:last-child {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
    }

    & > button:only-child {
        border-radius: 12px;
    }
`;

const primaryTypeStyles = css`
    & > button.active {
        cursor: default;
    }
`;

const iconStyles = css`
    & > button > div {
        height: 20px;
        width: 20px;

        .dsb_icon,
        .beeline-icons {
            color: currentColor !important;
            width: 20px !important;
            height: 20px !important;
            font-size: 20px !important;
            line-height: 20px !important;
        }
    }
`;

const secondaryTypeStyles = css`
    & > button.active {
        background-color: var(--color-border);
        border: 1px solid var(--color-border);
        cursor: default;

        &:not(:disabled):hover {
            background-color: var(--color-background-base-selected);
            border: 1px solid var(--color-border);
        }

        &:not(:disabled):focus-visible {
            background-color: var(--color-background-base-selected);
            border-color: var(--color-border-focused);
        }

        &:not(:disabled):hover:active {
            background-color: var(--color-background-base-selected);
            border: 1px solid var(--color-border);
        }
    }
`;

export const Root = styled.div<StyledButtonGroupProps>`
    display: flex;
    ${borderRadiusStyles}
    ${iconStyles}

    ${({ $type }) => ($type === 'primary' ? primaryTypeStyles : secondaryTypeStyles)}
`;
