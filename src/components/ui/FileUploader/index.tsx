import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

import { FileUploaderList } from './FileUploaderList';
import { FileUploaderTitle } from './FileUploaderTitle';
import type { FileUploaderFile, FileUploaderProps } from './types';
import * as S from './units';
import { classNames, normalizeFileList, setInputFiles } from './utils';

export const FileUploader = forwardRef<HTMLInputElement, FileUploaderProps>(
    (
        {
            title = 'Перетащите сюда файлы или',
            dragOverTitle = 'Отпустите сюда файлы для загрузки',
            linkName = 'загрузите документы',
            subTitle,
            helperText,
            multiple = false,
            fileList,
            hideFileList = false,
            onChange,
            onRefresh,
            onRemove,
            onDrop,
            disabled = false,
            error = false,
            className,
            accept,
            sequentially = false,
            ...props
        },
        ref,
    ) => {
        const [files, setFiles] = useState<FileUploaderFile[]>([]);
        const [dragOver, setDragOver] = useState(false);
        const [inputKey, setInputKey] = useState(0);
        const inputRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

        useEffect(() => {
            const nextFiles = normalizeFileList(fileList);

            setFiles(nextFiles);
            setInputFiles(inputRef.current, nextFiles);
        }, [fileList]);

        const filesChange = () => {
            const inputObj = inputRef.current;

            if (!inputObj) {
                return;
            }

            const newFiles = inputObj.files;

            if (newFiles) {
                let newlist: FileUploaderFile[];

                if (sequentially && multiple) {
                    newlist = [...files, ...Array.from(newFiles)];
                } else {
                    newlist = [...Array.from(newFiles)];
                }

                setFiles(newlist);
            }
        };

        const handleDragLeave = () => {
            setDragOver(false);
        };

        const changeListener = useCallback(
            (event: Event) => {
                filesChange();
                handleDragLeave();
                onChange?.(event as unknown as React.ChangeEvent<HTMLInputElement>);
                setInputKey((prev) => prev + 1);
            },
            [onChange],
        );

        useEffect(() => {
            const inputObj = inputRef.current;

            if (inputObj) {
                inputObj.addEventListener('change', changeListener);
            }

            return () => {
                inputObj?.removeEventListener('change', changeListener);
            };
        }, [inputKey, changeListener]);

        const handleDragOver = () => {
            setDragOver(true);
        };

        const handleOnDrop = (event: React.DragEvent<HTMLInputElement>) => {
            if (!onDrop) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            filesChange();
            handleDragLeave();
            onDrop(event);
        };

        const refreshFile = (file: FileUploaderFile) => {
            onRefresh?.(file);
        };

        const removeFile = (file: FileUploaderFile) => {
            const newFiles = files.filter((f) => f.name !== file.name);

            setFiles(newFiles);

            const inputObj = inputRef.current;

            if (inputObj) {
                const dt = new DataTransfer();

                newFiles.forEach((f) => {
                    dt.items.add(f);
                });

                inputObj.files = dt.files;
            }

            onRemove?.(file);
        };

        return (
            <S.Wrapper
                data-testid="FileUploader"
                className={classNames(
                    'dsb_file-uploader-wrapper',
                    disabled && 'dsb_file-uploader-wrapper__disabled',
                    className,
                )}
            >
                <S.DropZone
                    className={classNames(
                        'dsb_file-uploader',
                        dragOver && 'dsb_file-uploader__drag-over',
                        error && 'dsb_file-uploader__error',
                    )}
                >
                    <FileUploaderTitle
                        title={title}
                        dragOver={dragOver}
                        subTitle={subTitle}
                        dragOverTitle={dragOverTitle}
                        linkName={linkName}
                    />
                    <input
                        {...props}
                        disabled={disabled}
                        type="file"
                        multiple={multiple}
                        ref={inputRef}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDragEnd={handleDragLeave}
                        onDrop={handleOnDrop}
                        className="dsb_file-uploader-input"
                        accept={accept}
                        aria-label={props['aria-label'] || linkName}
                        aria-describedby={helperText ? 'file-uploader-helper-text' : undefined}
                    />
                </S.DropZone>
                {helperText && (
                    <sup id="file-uploader-helper-text" className="dsb_file-uploader-helper-text">
                        {helperText}
                    </sup>
                )}
                {!hideFileList && (
                    <FileUploaderList files={files} onRemove={removeFile} onRefresh={refreshFile} />
                )}
            </S.Wrapper>
        );
    },
);

FileUploader.displayName = 'FileUploader';
