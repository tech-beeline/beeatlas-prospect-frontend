import React, { forwardRef, useState } from 'react';

import { AvatarProps } from './types';
import * as S from './units';
import { handleAvatarKeyDown, normalizeAvatarIcon, resolveAvatarColor } from './utils';

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
    (
        {
            src,
            size = 'medium',
            letter,
            icon,
            type,
            variant = 'square',
            className,
            color,
            onClick,
            hoverToCircle = false,
            alt,
            ...props
        },
        ref,
    ) => {
        const [imageError, setImageError] = useState(false);
        const avatarColor = resolveAvatarColor({ color, type });
        const hasImage = Boolean(src && !imageError);
        const showLetter = Boolean(letter && size !== 'small' && !hasImage);
        const showIcon = Boolean(icon && !showLetter && !hasImage);

        const styledProps = {
            className: [
                'avatar',
                `avatar--${size}`,
                `avatar--${variant}`,
                `avatar--${avatarColor}`,
                onClick ? 'avatar--clickable' : '',
                hoverToCircle && variant === 'square' ? 'avatar--hover-to-circle' : '',
                className,
            ]
                .filter(Boolean)
                .join(' '),
            $size: size,
            $variant: variant,
            $color: avatarColor,
            $clickable: Boolean(onClick),
            $hoverToCircle: hoverToCircle,
        };

        let content = null;

        if (showIcon) {
            content = (
                <S.AvatarIcon className="avatar__icon">
                    {normalizeAvatarIcon(icon, size)}
                </S.AvatarIcon>
            );
        }

        if (showLetter) {
            content = <S.AvatarTitle className="avatar__title">{letter}</S.AvatarTitle>;
        }

        if (hasImage) {
            content = (
                <S.AvatarImage
                    className={`avatar__img avatar__img--${size} avatar__img--${variant}`}
                    src={src}
                    alt={alt}
                    $size={size}
                    $variant={variant}
                    onError={() => setImageError(true)}
                />
            );
        }

        return (
            <S.StyledAvatar
                {...styledProps}
                {...props}
                ref={ref}
                role={hasImage ? undefined : 'img'}
                aria-label={props['aria-label']}
                tabIndex={onClick ? 0 : undefined}
                onClick={onClick}
                onKeyDown={(event) => handleAvatarKeyDown(event, onClick)}
                data-testid="Avatar"
            >
                {content}
            </S.StyledAvatar>
        );
    },
);

Avatar.displayName = 'Avatar';
