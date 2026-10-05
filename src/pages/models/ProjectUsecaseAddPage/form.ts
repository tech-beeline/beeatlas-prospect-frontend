import * as yup from 'yup';

import { ProjectUsecaseImportMode } from 'api/usecase';

export interface UsecaseImportFormValues {
    mode: ProjectUsecaseImportMode;
    name: string;
    usecaseId: number | null;
    biStepCode: string | null;
    plantUml: string;
    file: File | null;
}

export const validationSchema = yup
    .object({
        mode: yup.mixed<ProjectUsecaseImportMode>().required(),
        name: yup.string().when('mode', {
            is: ProjectUsecaseImportMode.NEW,
            then: (schema) => schema.trim().required('Укажите название сценария'),
            otherwise: (schema) => schema.default(''),
        }),
        usecaseId: yup
            .number()
            .nullable()
            .when('mode', {
                is: ProjectUsecaseImportMode.EXISTING,
                then: (schema) => schema.required('Выберите существующий сценарий'),
                otherwise: (schema) => schema.nullable(),
            }),
        biStepCode: yup.string().nullable().default(null),
        plantUml: yup.string().default(''),
        file: yup
            .mixed<File>()
            .nullable()
            .test(
                'format',
                'Выберите файл в формате .puml',
                (file) => !file || /\.puml$/i.test(file.name),
            )
            .default(null),
    })
    .test('source', 'Добавьте PlantUML текстом или Markdown-файлом', (values) =>
        Boolean(values?.plantUml.trim() || values?.file),
    );
