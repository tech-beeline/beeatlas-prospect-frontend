import React, { FC, useMemo } from 'react';

import { Text } from 'components/core';
import {
    Banner,
    Button,
    ProgressButton,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IValidationResultForm } from './types';
import * as S from './units';

export const ValidationResultForm: FC<IValidationResultForm> = ({
    result,
    isSaving,
    isDeclining,
    actionError,
    onCancel,
    onSave,
    onRetryAction,
}) => {
    const requests = useMemo(
        () => [...result.requests].sort((left, right) => left.order - right.order),
        [result.requests],
    );
    const isActionPending = isSaving || isDeclining;

    return (
        <S.Form
            onSubmit={(event) => {
                event.preventDefault();
                void onSave();
            }}
        >
            <S.ScrollArea>
                <S.Content>
                    <Banner
                        color="success"
                        iconName={Icons.Check}
                        title="PlantUML обработан. Проверьте результат перед сохранением"
                    />

                    {actionError && (
                        <Banner
                            color="error"
                            iconName={Icons.WarningCircled}
                            title={actionError}
                            actions={[{ label: 'Повторить', onClick: () => void onRetryAction() }]}
                        />
                    )}

                    <S.ResultSection>
                        <Text variant="subtitle1">Шаг E2E-сценария</Text>
                        <S.Summary>
                            <div>
                                <Text inactive variant="body3">
                                    Название
                                </Text>
                                <Text variant="body2">{result.e2e.name}</Text>
                            </div>
                            <div>
                                <Text inactive variant="body3">
                                    Код шага BI
                                </Text>
                                <Text variant="body2">{result.e2e.biStepCode}</Text>
                            </div>
                        </S.Summary>
                    </S.ResultSection>

                    <S.ResultSection>
                        <Text variant="subtitle1">Системы-участники</Text>
                        <S.Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderData>Alias</TableHeaderData>
                                    <TableHeaderData>Название</TableHeaderData>
                                    <TableHeaderData>Тип</TableHeaderData>
                                    <TableHeaderData>Статус</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {result.participants.map((participant) => (
                                    <TableRow key={participant.alias}>
                                        <TableData>{participant.alias}</TableData>
                                        <TableData>
                                            {participant.productName ??
                                                participant.productAlias ??
                                                '—'}
                                        </TableData>
                                        <TableData>{participant.kind ?? '—'}</TableData>
                                        <TableData>
                                            {participant.resolved ? 'Распознана' : 'Не распознана'}
                                        </TableData>
                                    </TableRow>
                                ))}
                                {result.participants.length === 0 && (
                                    <TableRow>
                                        <TableData colSpan={4}>Участники не найдены</TableData>
                                    </TableRow>
                                )}
                            </TableBody>
                        </S.Table>
                    </S.ResultSection>

                    <S.ResultSection>
                        <Text variant="subtitle1">Методы</Text>
                        <S.Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderData>№</TableHeaderData>
                                    <TableHeaderData>Связь</TableHeaderData>
                                    <TableHeaderData>Вызов</TableHeaderData>
                                    <TableHeaderData>Сопоставленный метод</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {requests.map((request) => {
                                    const match = request.match;
                                    const hasMatch = match && match.status === 'matched';
                                    const skipped = match && match.status === 'skipped';

                                    return (
                                        <TableRow
                                            key={`${request.order}-${request.fromAlias}-${request.toAlias}`}
                                        >
                                            <TableData>{request.order}</TableData>
                                            <TableData>
                                                {request.fromAlias} → {request.toAlias}
                                            </TableData>
                                            <TableData>
                                                {request.unknown
                                                    ? request.label
                                                    : `${request.type ?? ''} ${
                                                          request.path ?? ''
                                                      }`.trim() || request.label}
                                            </TableData>
                                            <TableData>
                                                {hasMatch ? (
                                                    <S.MatchDetails>
                                                        <Text variant="body3">
                                                            {`${match.operationType ?? ''} ${
                                                                match.operationName ?? ''
                                                            }`.trim() || 'Метод сопоставлен'}
                                                        </Text>
                                                        {match.interfaceName && (
                                                            <Text inactive variant="caption">
                                                                {match.interfaceName}
                                                            </Text>
                                                        )}
                                                        {(match.containerName ||
                                                            match.productName) && (
                                                            <Text inactive variant="caption">
                                                                {[
                                                                    match.containerName,
                                                                    match.productName,
                                                                ]
                                                                    .filter(Boolean)
                                                                    .join(' · ')}
                                                            </Text>
                                                        )}
                                                    </S.MatchDetails>
                                                ) : skipped ? (
                                                    'Метод не распознан'
                                                ) : (
                                                    'Метод не сопоставлен'
                                                )}
                                            </TableData>
                                        </TableRow>
                                    );
                                })}
                                {requests.length === 0 && (
                                    <TableRow>
                                        <TableData colSpan={4}>Методы не найдены</TableData>
                                    </TableRow>
                                )}
                            </TableBody>
                        </S.Table>
                    </S.ResultSection>
                </S.Content>
            </S.ScrollArea>

            <S.Footer>
                <S.ButtonsContainer>
                    <Button
                        type="button"
                        variant="outlined"
                        size="medium"
                        disabled={isActionPending}
                        onClick={() => void onCancel()}
                    >
                        Отменить
                    </Button>
                    <ProgressButton
                        type="submit"
                        variant="contained"
                        size="medium"
                        state={isSaving ? 'loading' : 'default'}
                        disabled={isActionPending}
                    >
                        Сохранить
                    </ProgressButton>
                </S.ButtonsContainer>
            </S.Footer>
        </S.Form>
    );
};
