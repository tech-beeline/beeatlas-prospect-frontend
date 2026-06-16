import { array, number, object, ObjectSchema } from 'yup';

// export const NONE_OPTION_ID = -1;

export type RequirementRow = {
    requirementId: number | null;
};

export type RequirementGroup = {
    situationId: number | null;
    requirements: RequirementRow[];
};

export type FormValues = {
    groups: RequirementGroup[];
};

export const createRequirement = (): RequirementRow => ({
    requirementId: null,
});

export const createGroup = (): RequirementGroup => ({
    situationId: null,
    requirements: [createRequirement()],
});

export const getValidationSchema = (): ObjectSchema<FormValues> =>
    object({
        groups: array()
            .of(
                object({
                    situationId: number().nullable().defined(),
                    requirements: array()
                        .of(
                            object({
                                requirementId: number().nullable().defined(),
                            }),
                        )
                        .min(1)
                        .defined(),
                }),
            )
            .min(1)
            .defined(),
    });
