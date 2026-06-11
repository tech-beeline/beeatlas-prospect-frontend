import React, { forwardRef } from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { Button } from '../Button';

import { BannerProps } from './types';
import * as S from './units';
import { useResolvedBannerType } from './utils';

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
    (
        { title, type = 'horizontal', color = 'info', actions, onClose, iconName, className },
        ref,
    ) => {
        const resolvedType = useResolvedBannerType(type);

        return (
            <S.StyledBanner
                ref={ref}
                role="banner"
                data-testid="Banner"
                className={[
                    'banner',
                    'banner-container',
                    `banner__type-${resolvedType}`,
                    `banner__color-${color}`,
                    onClose ? 'banner__close-button' : '',
                    className,
                ]
                    .filter(Boolean)
                    .join(' ')}
                $color={color}
                $type={resolvedType}
                $hasCloseButton={Boolean(onClose)}
            >
                <S.BannerTitle className="banner-title">
                    <S.BannerTitleText className="banner-title-text">
                        {iconName && (
                            <S.BannerIcon
                                className="banner-title-icon beeline-icons"
                                translate="no"
                            >
                                {iconName}
                            </S.BannerIcon>
                        )}
                        {title}
                    </S.BannerTitleText>
                </S.BannerTitle>

                {actions && (
                    <S.BannerActions className="banner-actions banner-button-container">
                        {actions.map(({ startIcon, label, onClick, variant }) => (
                            <S.BannerActionButton key={label} className="banner-button">
                                <Button
                                    startIcon={startIcon}
                                    size="small"
                                    variant={variant ?? 'overlay'}
                                    onClick={onClick}
                                >
                                    {label}
                                </Button>
                            </S.BannerActionButton>
                        ))}
                    </S.BannerActions>
                )}

                {onClose && (
                    <S.CloseButton
                        type="button"
                        className="icon-button-close icon-close"
                        onClick={onClose}
                        aria-label="Закрыть баннер"
                    >
                        <S.CloseIcon className="beeline-icons" translate="no">
                            {Icons.Close}
                        </S.CloseIcon>
                    </S.CloseButton>
                )}
            </S.StyledBanner>
        );
    },
);

Banner.displayName = 'Banner';
