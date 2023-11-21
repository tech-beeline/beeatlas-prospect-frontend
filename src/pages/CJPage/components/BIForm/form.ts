import { array, boolean, number, object, string } from 'yup';

type ParticipantValues = {
    participant: number;
    descr: string;
    value: string;
};

// type EnterValues = {
//     enter: number;
//     exit: number;
// };

type ChannelValues = {
    value: number;
};

type LinkValues = {
    value: string;
};

export type FormValues = {
    id: number;
    name: string;
    identificator: string;
    communal: boolean;
    descr: string;
    type: number;
    status: number;
    feelings: number;
    clientScenario: string;
    flowLink: string;
    ucsReaction: string;
    participants: ParticipantValues[];
    // enters: EnterValues[];
    document: LinkValues[];
    mockup: LinkValues[];
    channels: ChannelValues[];
};

export const validationSchema = object().shape({
    id: number().default(0),
    name: string().required('Заполните название'),
    communal: boolean().default(false),
    identificator: string().default(''),
    descr: string().required('Заполните описание'),
    type: number().default(0),
    status: number().default(0),
    feelings: number().default(2),
    clientScenario: string().required('Заполните сценарий'),
    flowLink: string().default('').url('Укажите корректную ссылку'),
    ucsReaction: string().required('Заполните описание реакции'),
    participants: array()
        .of(
            object().shape({
                participant: number().default(0),
                descr: string().default('').required('Заполните описание'),
                value: string().default(''),
            }),
        )
        .default([]),
    // enters: array()
    //     .of(
    //         object().shape({
    //             enter: number().default(0),
    //             exit: number().default(0),
    //         }),
    //     )
    //     .default([]),
    document: array()
        .of(object().shape({ value: string().default('').url('Укажите корректную ссылку') }))
        .default([]),
    mockup: array()
        .of(object().shape({ value: string().default('').url('Укажите корректную ссылку') }))
        .default([]),
    channels: array()
        .of(object().shape({ value: number().default(0) }))
        .default([]),
});
