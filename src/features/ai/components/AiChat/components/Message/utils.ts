import dayjs from 'dayjs';

import { SplitSentenceResult } from './types';

export const formatSentTime = (sentAt: string) => dayjs(sentAt).format('HH:mm');

export const formatElapsedTime = (sentAt: string) => {
    const elapsedSeconds = Math.max(0, dayjs().diff(dayjs(sentAt), 'second'));
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const splitFirstSentence = (text: string): SplitSentenceResult => {
    const dotIndex = text.indexOf('.');

    if (dotIndex === -1) {
        return { firstSentence: text, rest: '' };
    }

    return {
        firstSentence: text.slice(0, dotIndex + 1),
        rest: text.slice(dotIndex + 1).trim(),
    };
};
