import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import { Text } from 'components/core';
import { type Option, Autocomplete } from 'components/ui';

import { IBIData, IStepsScenarion } from 'api/bi/types';
import { useGetBusinessInteractionsQuery } from 'api/queries/bi';

import { IBIStepCodeFields } from './types';

type BIOptionValue = Pick<IBIData, 'name' | 'uniqueIdent'>;
type BIStepOptionValue = IStepsScenarion & { biId: number };

const matchesSearch = (values: string[], search: string) => {
    const normalizedSearch = search.trim().toLocaleLowerCase('ru');

    return values.some((value) => value.toLocaleLowerCase('ru').includes(normalizedSearch));
};

export const BIStepCodeFields: FC<IBIStepCodeFields> = ({
    value,
    onChange,
    biId,
    biCode,
    disabled,
}) => {
    const [selectedBIId, setSelectedBIId] = useState<number | null>(null);
    const [biSearch, setBISearch] = useState('');
    const [biStepSearch, setBIStepSearch] = useState('');
    const initializedBIRelationRef = useRef<string | null>(null);

    const { data = [], isLoading } = useGetBusinessInteractionsQuery();
    const availableBIs = useMemo(() => data.filter((bi) => bi.biSteps.length > 0), [data]);

    useEffect(() => {
        const biRelationKey = biId != null || biCode ? `${biId ?? ''}:${biCode ?? ''}` : null;
        const relatedBI = availableBIs.find(
            (bi) => (biId != null && bi.id === biId) || (biCode && bi.uniqueIdent === biCode),
        );

        if (relatedBI && initializedBIRelationRef.current !== biRelationKey) {
            initializedBIRelationRef.current = biRelationKey;
            setSelectedBIId(relatedBI.id);
            return;
        }

        if (!value) return;

        const selectedBI = availableBIs.find((bi) =>
            bi.biSteps.some((biStep) => biStep.uniqueIdent === value),
        );

        if (selectedBI) {
            setSelectedBIId(selectedBI.id);
        }
    }, [availableBIs, biCode, biId, value]);

    const selectedBI = availableBIs.find((bi) => bi.id === selectedBIId) ?? null;

    const biOptions = useMemo<Option<BIOptionValue>[]>(
        () =>
            availableBIs
                .filter((bi) => matchesSearch([bi.name, bi.uniqueIdent], biSearch))
                .map((bi) => ({
                    id: bi.id,
                    value: { name: bi.name, uniqueIdent: bi.uniqueIdent },
                })),
        [availableBIs, biSearch],
    );

    const biStepOptions = useMemo<Option<BIStepOptionValue>[]>(
        () =>
            (selectedBI ? [selectedBI] : availableBIs).flatMap((bi) =>
                bi.biSteps
                    .filter((biStep) =>
                        matchesSearch([biStep.name, biStep.uniqueIdent], biStepSearch),
                    )
                    .map((biStep) => ({
                        id: biStep.id,
                        value: { ...biStep, biId: bi.id },
                    })),
            ),
        [availableBIs, biStepSearch, selectedBI],
    );

    const selectedBIOption = selectedBI
        ? {
              id: selectedBI.id,
              value: { name: selectedBI.name, uniqueIdent: selectedBI.uniqueIdent },
          }
        : null;
    const selectedBIStepOption =
        biStepOptions.find((option) => option.value.uniqueIdent === value) ?? null;

    const clearBI = () => {
        setSelectedBIId(null);
        setBIStepSearch('');
        onChange('');
    };

    return (
        <>
            <Autocomplete
                fullWidth
                disabled={disabled || isLoading}
                label="Название BI"
                loading={isLoading}
                noOptionsContents="BI не найдены"
                options={biOptions}
                renderValue={(option) => option.value.name}
                type="select"
                value={selectedBIOption}
                makeOption={(option) => (
                    <div>
                        <Text variant="body2">{option.value.name}</Text>
                        <Text inactive variant="body3">
                            {option.value.uniqueIdent}
                        </Text>
                    </div>
                )}
                onChange={(option) => {
                    setSelectedBIId(Number(option.id));
                    setBISearch('');
                    setBIStepSearch('');
                    onChange('');
                }}
                onInputChange={(search) => {
                    setBISearch(search);
                    clearBI();
                }}
                onInputClear={() => {
                    setBISearch('');
                    clearBI();
                }}
            />
            <Autocomplete
                key={selectedBIId ?? 'empty-bi'}
                fullWidth
                disabled={disabled || isLoading}
                label="Код сценария BI step*"
                noOptionsContents="Шаги BI не найдены"
                options={biStepOptions}
                renderValue={(option) => option.value.name}
                type="select"
                value={selectedBIStepOption}
                makeOption={(option) => (
                    <div>
                        <Text variant="body2">{option.value.name}</Text>
                        <Text inactive variant="body3">
                            {option.value.uniqueIdent}
                        </Text>
                    </div>
                )}
                onChange={(option) => {
                    setSelectedBIId(option.value.biId);
                    setBIStepSearch('');
                    onChange(option.value.uniqueIdent);
                }}
                onInputChange={(search) => {
                    setBIStepSearch(search);
                    onChange('');
                }}
                onInputClear={() => {
                    setBIStepSearch('');
                    onChange('');
                }}
            />
        </>
    );
};
