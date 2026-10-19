import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { IBIData, IStepsScenarion } from 'api/bi/types';
import { IProjectUsecaseSummaryDto } from 'api/usecase';

import { UsecaseImportFormValues } from '../../form';

export interface IDataStepProps {
    isEditing: boolean;
    form: UseFormReturn<UsecaseImportFormValues>;
    usecases: IProjectUsecaseSummaryDto[];
    businessInteractions: IBIData[];
    isUsecasesLoading: boolean;
    isBusinessInteractionsLoading: boolean;
    isUsecasesError: boolean;
    isBusinessInteractionsError: boolean;
    isFormDisabled: boolean;
    isSubmitting: boolean;
    canSubmit: boolean;
    submitError: { message: string; activeRunId?: number } | null;
    onOpenActiveRun: (runId: number) => void;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export type BIStepOptionValue = Pick<IStepsScenarion, 'name' | 'uniqueIdent'> & { biName: string };
