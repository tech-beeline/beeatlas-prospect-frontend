export const classNames = (...values: Array<string | false | null | undefined>) =>
    values.filter(Boolean).join(' ');

export const scrollToStep = (stepElem: Element, inline: ScrollLogicalPosition = 'start') => {
    stepElem.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
        inline,
    });
};
