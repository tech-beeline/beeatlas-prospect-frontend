import React, { FC, useState } from 'react';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Button, FileUploader, Radio } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { FileItem } from './components';
import { FileTypes, RADIOS } from './const';
import { IImportSideblock } from './types';
import * as S from './units';

export const ImportSideblock: FC<IImportSideblock> = ({ isOpen, onClose }) => {
    const [fileList, setFileList] = useState<File[]>([]);
    const [fileType, setFileType] = useState<FileTypes>(FileTypes.BC);

    const handleClose = () => {
        setFileList([]);
        onClose();
    };

    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={handleClose}>
            <S.SideblockContainer>
                <S.ContentContainer>
                    <S.TitleContainer>
                        <Text variant="h5">Импорт файла</Text>
                        <IconButton iconName={Icons.Close} size="large" onClick={handleClose} />
                    </S.TitleContainer>
                    <Text variant="subtitle2">Тип файла</Text>
                    {RADIOS.map((item) => (
                        <Radio
                            key={item.value}
                            label={item.label}
                            checked={item.value === fileType}
                            onChange={() => setFileType(item.value)}
                        />
                    ))}
                    <FileUploader
                        key={String(isOpen)}
                        hideFileList
                        multiple
                        sequentially
                        subTitle="xlsx до 100 мб"
                        onChange={(event) =>
                            setFileList([...fileList, ...Array.from(event.target.files ?? [])])
                        }
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    />
                    {fileList.map((file, i) => (
                        <FileItem
                            key={file.name}
                            file={file}
                            fileType={fileType}
                            index={i}
                            onRemove={(index) =>
                                setFileList(fileList.filter((_, i) => i !== index))
                            }
                        />
                    ))}
                </S.ContentContainer>
                <S.ButtonsContainer>
                    <Button fullWidth size="medium" variant="contained" onClick={handleClose}>
                        Готово
                    </Button>
                </S.ButtonsContainer>
            </S.SideblockContainer>
        </SideBlock>
    );
};
