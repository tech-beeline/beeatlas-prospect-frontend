import React, { FC } from 'react';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { Banner, Button, IconButton, TextArea, TextField } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { IPublishSideblockProps } from './types';
import * as S from './units';

export const PublishSideblock: FC<IPublishSideblockProps> = ({
    isOpen,
    isPending,
    ownerName,
    pageName,
    parentUrl,
    pat,
    sourceUrl,
    businessDescription,
    errorMessage,
    onClose,
    onPublish,
    onPageNameChange,
    onParentUrlChange,
    onPatChange,
}) => (
    <SideBlock large hasBackdrop isOpen={isOpen} onClose={onClose}>
        <S.Layout>
            <S.Content>
                <S.Header>
                    <div>
                        <Text variant="h5">Публикация в Confluence</Text>
                        <Text inactive variant="body3">
                            Опубликовать HLD-отчёт как дочернюю страницу Confluence.
                        </Text>
                    </div>
                    <IconButton
                        aria-label="Закрыть публикацию"
                        iconName={Icons.Close}
                        size="large"
                        onClick={onClose}
                    />
                </S.Header>
                {errorMessage && (
                    <Banner color="error" iconName={Icons.WarningCircled} title={errorMessage} />
                )}
                <TextField fullWidth disabled label="Автор проведения оценки" value={ownerName} />
                <TextField
                    fullWidth
                    label="Название страницы*"
                    value={pageName}
                    onChange={(event) => onPageNameChange(event.target.value)}
                />
                <TextField
                    fullWidth
                    label="URL родительской страницы*"
                    value={parentUrl}
                    onChange={(event) => onParentUrlChange(event.target.value)}
                />
                <TextField
                    fullWidth
                    type="password"
                    label="Персональный токен доступа (PAT)*"
                    value={pat}
                    onChange={(event) => onPatChange(event.target.value)}
                />
                <TextField
                    fullWidth
                    disabled
                    label="Ссылка на бизнес-постановку в Confluence"
                    value={sourceUrl}
                />
                <TextArea
                    fullWidth
                    disabled
                    label="Бизнес-постановка"
                    rows={5}
                    value={businessDescription}
                />
            </S.Content>
            <S.Footer>
                <Button fullWidth size="medium" variant="outlined" onClick={onClose}>
                    Закрыть
                </Button>
                <Button
                    fullWidth
                    disabled={isPending || !pageName.trim() || !parentUrl.trim() || !pat.trim()}
                    size="medium"
                    variant="contained"
                    onClick={onPublish}
                >
                    Опубликовать
                </Button>
            </S.Footer>
        </S.Layout>
    </SideBlock>
);
