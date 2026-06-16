import type { HTMLAttributes, ReactElement, Ref } from 'react';

export type TypographyVariant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'body3'
    | 'subtitle1'
    | 'subtitle2'
    | 'subtitle3'
    | 'caption'
    | 'overline'
    | 'productName'
    | 'nativeLink'
    | 'routedLink'
    | 'contextualLink';

export type TypographyLinkState = 'enabled' | 'disabled' | 'visited';

export type TypographyProps =
    | TypographyBaseProps
    | NativeLinkProps
    | RoutedLinkProps
    | ContextualLinkProps;

export interface TypographyBaseProps extends HTMLAttributes<HTMLElement> {
    variant?: TypographyVariant;
    ellipsis?: boolean;
    inactive?: boolean;
    ref?: Ref<HTMLElement>;
    dataTestId?: string;
}

export interface LinkBaseProps {
    linkState?: TypographyLinkState;
}

export interface NativeLinkProps extends TypographyBaseProps, LinkBaseProps {
    variant: 'nativeLink';
    href?: string;
}

export interface RoutedLinkProps extends TypographyBaseProps, LinkBaseProps {
    variant: 'routedLink';
    routingComponent: ReactElement;
}

export interface ContextualLinkProps extends TypographyBaseProps {
    variant: 'contextualLink';
    linkState?: 'enabled' | 'disabled';
    onHoverElement: ReactElement;
}

export interface StyledTypographyProps {
    $variant: TypographyVariant;
    $ellipsis: boolean;
    $inactive: boolean;
    $linkState?: TypographyLinkState;
}
