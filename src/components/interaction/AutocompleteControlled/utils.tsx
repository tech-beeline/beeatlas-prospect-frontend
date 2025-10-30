import React from 'react';

export const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <span>
            {parts.map((part) =>
                part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part,
            )}
        </span>
    );
};
