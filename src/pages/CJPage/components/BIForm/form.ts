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
    document: string;
    mockup: string;
    channel: number;
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
    clientScenario: string().default(''),
    flowLink: string().default('').url('Укажите корректную ссылку'),
    ucsReaction: string().default(''),
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
    document: string().default('').url('Укажите корректную ссылку'),
    mockup: string().default('').url('Укажите корректную ссылку'),
    channel: number().default(0),
});
