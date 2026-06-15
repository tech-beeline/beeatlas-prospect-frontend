import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

import type { Icons } from 'styles/design-tokens/js/iconfont/icons';

import type { FileState, FileUploaderListItemAction } from '../FileUploaderListItem/types';

export type { FileState, FileUploaderListItemAction } from '../FileUploaderListItem/types';

export interface FileUploaderFile extends File {
    id?: string | number | symbol;
    state?: FileState;
    iconName?: Icons;
    helperText?: string;
    percent?: number;
    loaded?: string;
    actions?: FileUploaderListItemAction[] | ReactNode;
}

export interface FileUploaderProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'title' | 'type'> {
    /** Заголовок */
    title?: ReactNode;
    /** Дополнительный текст, описывает расширения файлов, максимальный объём загружаемых файлов */
    subTitle?: ReactNode;
    /** Вспомогательный текст */
    helperText?: string;
    /** Название гиперссылки */
    linkName?: string;
    /** Заголовок при перемещении файлов в границы компонента */
    dragOverTitle?: ReactNode;
    /** Признак, возможность загружать более одного файла за один раз */
    multiple?: boolean;
    /** Событие повторной загрузки файла */
    onRefresh?: (fileName: FileUploaderFile) => void;
    /** Событие удаления файла */
    onRemove?: (fileName: FileUploaderFile) => void;
    /** Перечень загруженных файлов */
    fileList?: FileList | FileUploaderFile[] | null;
    /** Скрыть список загруженных файлов */
    hideFileList?: boolean;
    /** Признак заблокирован / разблокирован */
    disabled?: boolean;
    /** Признак ошибка / нет ошибки */
    error?: boolean;
    /** Разрешенные типы файлов */
    accept?: string;
    /** Последовательное добавление файлов (работает только при включенном multiple) */
    sequentially?: boolean;
}

export interface FileUploaderTitleProps {
    title?: ReactNode;
    subTitle?: ReactNode;
    dragOver: boolean;
    linkName?: string;
    dragOverTitle?: ReactNode;
}

export interface FileUploaderListProps extends HTMLAttributes<HTMLDivElement> {
    files: FileUploaderFile[];
    onRemove?: (file: FileUploaderFile) => void;
    onRefresh?: (file: FileUploaderFile) => void;
}
