import React, { FC, useState } from 'react';
import { Button, FileUploader, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';

import { IImportSideblock } from './types';
import * as S from './units';

export const ImportSideblock: FC<IImportSideblock> = ({ isOpen, onClose }) => {
    const [fileList, setFileList] = useState<FileList | null>(null);

    console.log(fileList);

    const handleClose = () => {
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
                    <FileUploader
                        multiple
                        sequentially
                        subTitle="xlsx до 100 мб"
                        onChange={(event) => setFileList(event.target.files)}
                        fileList={fileList}
                    />
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
