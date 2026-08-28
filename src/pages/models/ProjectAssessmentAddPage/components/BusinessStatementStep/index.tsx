import React, { ChangeEvent, FC } from 'react';

import { Text } from 'components/core';
import { Banner, TextArea, TextField } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { StepFooter } from '../StepFooter';

import { IBusinessStatementStepProps } from './types';
import * as S from './units';

export const BusinessStatementStep: FC<IBusinessStatementStepProps> = ({
    savedData,
    setSavedData,
    onNext,
}) => {
    const updateField =
        (field: 'confluenceUrl' | 'confluencePat' | 'businessDescription') =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = event.target.value;
            setSavedData((currentData) => ({ ...currentData, [field]: value }));
        };

    const hasImportedSource =
        Boolean(savedData.rawText) &&
        savedData.sourceSignature ===
            JSON.stringify([savedData.confluenceUrl, savedData.businessDescription]);
    const hasText = Boolean(savedData.businessDescription.trim());
    const hasConfluenceAccess = Boolean(
        savedData.confluenceUrl.trim() && savedData.confluencePat.trim(),
    );
    const isTextDisabled = Boolean(
        savedData.confluenceUrl.trim() || savedData.confluencePat.trim(),
    );

    return (
        <S.StepLayout>
            <S.StepScroll>
                <S.NarrowContent>
                    <Banner
                        title="Для добавления данных доступно два варианта: вставка текста или добавление ссылки"
                        color="info"
                        iconName={Icons.InfoCircled}
                    />
                    <S.BlockContainer>
                        <Text variant="subtitle1">Добавить ссылку на бизнес-постановку</Text>
                        <TextField
                            fullWidth
                            disabled={hasText}
                            label="Ссылка на бизнес-постановку в Confluence"
                            value={savedData.confluenceUrl}
                            onChange={updateField('confluenceUrl')}
                        />
                        <S.MarginContainer>
                            <TextField
                                fullWidth
                                disabled={hasText}
                                label="Персональный токен доступа (PAT)"
                                type="password"
                                value={savedData.confluencePat}
                                onChange={updateField('confluencePat')}
                            />
                        </S.MarginContainer>
                    </S.BlockContainer>
                    <S.BlockContainer>
                        <Text variant="subtitle1">Вставить бизнес-постановку текстом</Text>
                        <TextArea
                            fullWidth
                            disabled={isTextDisabled}
                            label="Бизнес-постановка"
                            rows={5}
                            value={savedData.businessDescription}
                            onChange={updateField('businessDescription')}
                        />
                    </S.BlockContainer>
                </S.NarrowContent>
            </S.StepScroll>
            <StepFooter
                nextDisabled={!hasText && !hasConfluenceAccess && !hasImportedSource}
                nextText="Выявить требования"
                onNext={onNext}
            />
        </S.StepLayout>
    );
};
