import React, { FC, useState } from 'react';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Banner, Button, FileUploader } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { FileItem } from './components';
import { IImportCriteriasSideblock } from './types';
import * as S from './units';

export const ImportCriteriasSideblock: FC<IImportCriteriasSideblock> = ({ isOpen, onClose }) => {
    const [fileList, setFileList] = useState<File[]>([]);

    const handleClose = () => {
        setFileList([]);
        onClose();
    };

    return (
        <SideBlock hasBackdrop large isOpen={isOpen} onClose={handleClose}>
            <S.SideblockContainer>
                <S.ContentContainer>
                    <S.TitleContainer>
                        <Text variant="h5">Импорт значений критериев</Text>
                        <IconButton iconName={Icons.Close} size="large" onClick={handleClose} />
                    </S.TitleContainer>

                    <Banner
                        iconName={Icons.InfoCircled}
                        color="info"
                        title="После того как вы добавите файл, процесс загрузки можно будет отследить в разделе «Импорт файлов»"
                    />

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
