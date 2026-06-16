import type { FileUploaderFile } from './types';

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

export const normalizeFileList = (
    fileList?: FileList | FileUploaderFile[] | null,
): FileUploaderFile[] => (fileList ? [...fileList] : []);

export const setInputFiles = (
    input: HTMLInputElement | null,
    fileList: FileUploaderFile[],
): void => {
    if (!input) {
        return;
    }

    if (fileList.length > 0) {
        const dt = new DataTransfer();

        for (const file of fileList) {
            dt.items.add(new File([file], file.name));
        }

        input.files = dt.files;
    } else {
        input.files = null;
    }
};
