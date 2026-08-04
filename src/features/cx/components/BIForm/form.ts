import { array, boolean, number, object, string } from 'yup';

type ParticipantValues = {
    participant: number;
    descr: string;
    value: string;
};

type LinkValues = {
    value: string;
    description: string;
};

export type FormValues = {
    id: number;
    name: string;
    identificator: string;
    communal: boolean;
    descr: string;
    type: number;
    status: number;
    clientScenario: string;
    flowLink: string;
    ucsReaction: string;
    participants: ParticipantValues[];
    document: LinkValues[];
    mockup: LinkValues[];
    channels: number[];
    product: number;
    metrics: string;
};

export const validationSchema = object().shape({
    id: number().defined().default(0),
    name: string().trim().required('Заполните название'),
    communal: boolean().defined().default(false),
    identificator: string().defined().default(''),
    descr: string().defined().default(''),
    type: number().defined().default(0),
    status: number().defined().default(0),
    clientScenario: string().defined().default(''),
    flowLink: string().defined().default(''),
    ucsReaction: string().defined().default(''),
    participants: array()
        .of(
            object({
                participant: number().defined().default(0),
                descr: string().defined().default(''),
                value: string().defined().default(''),
            }),
        )
        .ensure()
        .default([]),
    document: array()
        .of(
            object({
                value: string()
                    .trim()
                    .test(
                        'url-or-empty',
                        'Укажите корректную ссылку',
                        (value) => !value || /^https?:\/\/.+/.test(value),
                    )
                    .defined()
                    .default(''),
                description: string().defined().default(''),
            }),
        )
        .ensure()
        .default([]),
    mockup: array()
        .of(
            object({
                value: string().defined().default(''),
                description: string().defined().default(''),
            }),
        )
        .ensure()
        .default([]),
    channels: array().of(number().defined()).ensure().default([]),
    product: number().defined().default(0),
    metrics: string().defined().default(''),
});
