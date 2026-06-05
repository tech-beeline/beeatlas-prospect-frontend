import type { ReactNode } from 'react';

import {
    ARCHIVE_MIME_NAME_LIST,
    EXCEL_MIME_NAME_LIST,
    POWERPOINT_MIME_NAME_LIST,
    WORD_MIME_NAME_LIST,
} from './const';
import { FileIcons } from './FileIcons';

export const classNames = (
    ...args: Array<string | Record<string, boolean> | undefined | false>
): string =>
    args
        .flatMap((arg) => {
            if (!arg) {
                return [];
            }

            if (typeof arg === 'string') {
                return [arg];
            }

            return Object.entries(arg)
                .filter(([, value]) => value)
                .map(([key]) => key);
        })
        .join(' ');

export const mapFileIcon = (type?: string): ReactNode => {
    if (type) {
        if (type.startsWith('image/')) {
            return FileIcons.ImageMedium({});
        }

        if (type.startsWith('video/')) {
            return FileIcons.VideoMedium({});
        }

        if (type.startsWith('audio/')) {
            return FileIcons.SoundMedium({});
        }

        if (type === 'text/csv') {
            return FileIcons.TableMedium({});
        }

        if (type.startsWith('text/')) {
            return FileIcons.TextMedium({});
        }

        if (type.startsWith('application/')) {
            if (type === 'application/pdf') {
                return FileIcons.PdfMedium({});
            }

            for (const wordType of WORD_MIME_NAME_LIST) {
                if (type.includes(wordType)) {
                    return FileIcons.TextMedium({});
                }
            }

            for (const sheetType of EXCEL_MIME_NAME_LIST) {
                if (type.includes(sheetType)) {
                    return FileIcons.TableMedium({});
                }
            }

            for (const presentationType of POWERPOINT_MIME_NAME_LIST) {
                if (type.includes(presentationType)) {
                    return FileIcons.PresentationMedium({});
                }
            }

            if (ARCHIVE_MIME_NAME_LIST.includes(type as typeof ARCHIVE_MIME_NAME_LIST[number])) {
                return FileIcons.ArchiveMedium({});
            }
        }
    }

    return FileIcons.OtherMedium({});
};
