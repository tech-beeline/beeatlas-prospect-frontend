import React, { type ReactNode, isValidElement } from 'react';

import { Typography } from '../Typography';

export const classNames = (...values: Array<string | false | null | undefined>) =>
    values.filter(Boolean).join(' ');

export const renderTitleContent = (title: string | ReactNode | undefined) => {
    if (!title) {
        return null;
    }

    if (typeof title === 'string') {
        return (
            <Typography variant="subtitle1" className="dsb_title-text">
                {title}
            </Typography>
        );
    }

    return <>{title}</>;
};

export const renderSubTitleContent = (subTitle: string | ReactNode | undefined) => {
    if (!subTitle) {
        return null;
    }

    if (isValidElement(subTitle)) {
        return subTitle;
    }

    return (
        <Typography variant="body3" className="dsb_subtitle-text">
            {subTitle}
        </Typography>
    );
};

export const renderDescriptionContent = (description: string | ReactNode | undefined) => {
    if (!description) {
        return null;
    }

    if (isValidElement(description)) {
        return description;
    }

    return (
        <Typography variant="body3" className="dsb_description-text">
            {description}
        </Typography>
    );
};
