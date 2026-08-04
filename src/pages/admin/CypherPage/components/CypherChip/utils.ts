import { CHIP_LABEL_MAX } from './const';

export const textLabel = (text: string) =>
    text.length > CHIP_LABEL_MAX ? `${text.slice(0, CHIP_LABEL_MAX)} …` : text;

export const isTextLabelTruncated = (text: string) => text.length > CHIP_LABEL_MAX;
