import { css } from '@emotion/react';
import styled from '@emotion/styled';

import type { StyledTypographyProps, TypographyVariant } from './types';

const baseStyles = css`
    margin: 0;
    padding: 0;
    color: var(--color-text-active);
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-style: normal;
`;

const headingFamilyStyles = css`
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const variantStylesMap: Record<TypographyVariant, ReturnType<typeof css>> = {
    h1: css`
        ${headingFamilyStyles}
        font-size: var(--font-size-h1, 54px);
        font-weight: var(--font-weight-h1, 500);
        line-height: var(--font-line-height-h1, 66px);
        letter-spacing: var(--font-letter-spacing-h1, 0.3px);
    `,
    h2: css`
        ${headingFamilyStyles}
        font-size: var(--font-size-h2, 44px);
        font-weight: var(--font-weight-h2, 500);
        line-height: var(--font-line-height-h2, 56px);
        letter-spacing: var(--font-letter-spacing-h2, 0.3px);
    `,
    h3: css`
        ${headingFamilyStyles}
        font-size: var(--font-size-h3, 34px);
        font-weight: var(--font-weight-h3, 500);
        line-height: var(--font-line-height-h3, 44px);
        letter-spacing: var(--font-letter-spacing-h3, 0.3px);
    `,
    h4: css`
        ${headingFamilyStyles}
        font-size: var(--font-size-h4, 26px);
        font-weight: var(--font-weight-h4, 500);
        line-height: var(--font-line-height-h4, 32px);
        letter-spacing: var(--font-letter-spacing-h4, 0.2px);
    `,
    h5: css`
        ${headingFamilyStyles}
        font-size: var(--font-size-h5, 20px);
        font-weight: var(--font-weight-h5, 500);
        line-height: var(--font-line-height-h5, 24px);
        letter-spacing: var(--font-letter-spacing-h5, 0.2px);
    `,
    h6: css`
        ${headingFamilyStyles}
        font-size: var(--font-size-h6, 17px);
        font-weight: var(--font-weight-h6, 500);
        line-height: var(--font-line-height-h6, 22px);
        letter-spacing: var(--font-letter-spacing-h6, 0.2px);
    `,
    body1: css`
        font-size: var(--font-size-body1, 19px);
        font-weight: var(--font-weight-body1, 400);
        line-height: var(--font-line-height-body1, 24px);
        letter-spacing: var(--font-letter-spacing-body1, 0.2px);
    `,
    body2: css`
        font-size: var(--font-size-body2, 17px);
        font-weight: var(--font-weight-body2, 400);
        line-height: var(--font-line-height-body2, 22px);
        letter-spacing: var(--font-letter-spacing-body2, 0.2px);
    `,
    body3: css`
        font-size: var(--font-size-body3, 15px);
        font-weight: var(--font-weight-body3, 400);
        line-height: var(--font-line-height-body3, 18px);
        letter-spacing: var(--font-letter-spacing-body3, 0.2px);
    `,
    subtitle1: css`
        font-size: var(--font-size-subtitle1, 19px);
        font-weight: var(--font-weight-subtitle1, 500);
        line-height: var(--font-line-height-subtitle1, 24px);
        letter-spacing: var(--font-letter-spacing-subtitle1, 0.2px);
    `,
    subtitle2: css`
        font-size: var(--font-size-subtitle2, 17px);
        font-weight: var(--font-weight-subtitle2, 500);
        line-height: var(--font-line-height-subtitle2, 22px);
        letter-spacing: var(--font-letter-spacing-subtitle2, 0.2px);
    `,
    subtitle3: css`
        font-size: var(--font-size-subtitle3, 15px);
        font-weight: var(--font-weight-subtitle3, 500);
        line-height: var(--font-line-height-subtitle3, 20px);
        letter-spacing: var(--font-letter-spacing-subtitle3, 0.2px);
    `,
    caption: css`
        font-size: var(--font-size-caption, 13px);
        font-weight: var(--font-weight-caption, 400);
        line-height: var(--font-line-height-caption, 16px);
        letter-spacing: var(--font-letter-spacing-caption, 0.2px);
        color: var(--color-text-inactive);
    `,
    overline: css`
        font-size: var(--font-size-overline, 10px);
        font-weight: var(--font-weight-overline, 700);
        line-height: var(--font-line-height-overline, 16px);
        letter-spacing: var(--font-letter-spacing-overline, 1.2px);
        color: var(--color-text-inactive);
        text-transform: uppercase;
    `,
    productName: css`
        font-size: var(--font-size-product-name, 25px);
        font-weight: var(--font-weight-product-name, 500);
        line-height: var(--font-line-height-product-name, 28px);
        letter-spacing: var(--font-letter-spacing-product-name, 0);
    `,
    nativeLink: css`
        color: var(--color-text-link);
        text-decoration: none;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    `,
    routedLink: css`
        color: var(--color-text-link);
        text-decoration: none;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    `,
    contextualLink: css`
        color: var(--color-text-active);
        text-decoration: none;
        border-bottom: 2px dashed var(--color-text-active);
        cursor: pointer;
    `,
};

const getLinkStateStyles = ({
    $variant,
    $linkState,
}: Pick<StyledTypographyProps, '$variant' | '$linkState'>) => {
    if (
        !$linkState ||
        ($variant !== 'nativeLink' && $variant !== 'routedLink' && $variant !== 'contextualLink')
    ) {
        return null;
    }

    if ($variant === 'contextualLink' && $linkState === 'disabled') {
        return css`
            color: var(--color-text-disabled);
            border-color: var(--color-text-disabled);
        `;
    }

    if ($linkState === 'enabled') {
        return css`
            color: var(--color-text-link) !important;
        `;
    }

    if ($linkState === 'disabled') {
        return css`
            color: var(--color-text-disabled) !important;
            cursor: default;
        `;
    }

    if ($linkState === 'visited') {
        return css`
            color: var(--color-text-link-visited);

            &:visited {
                color: var(--color-text-link-visited);
            }
        `;
    }

    return null;
};

export const StyledTypography = styled.span<StyledTypographyProps>`
    ${baseStyles}
    ${({ $variant }) => variantStylesMap[$variant]}

    ${({ $ellipsis }) =>
        $ellipsis &&
        css`
            overflow: hidden;
            text-overflow: ellipsis;
        `}

    ${({ $inactive }) =>
        $inactive &&
        css`
            color: var(--color-text-inactive);
        `}

    ${getLinkStateStyles}
`;
