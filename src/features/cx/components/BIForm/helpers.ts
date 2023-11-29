import { IBIData, IBIForm } from 'api/bi/types';

import { FormValues } from './form';

export const formValuesToData = (formValues: FormValues): Partial<IBIForm> => ({
    name: formValues.name,
    communal: formValues.communal,
    descr: formValues.descr,
    status: { id: formValues.status },
    participants: formValues.participants.map((participant) => ({
        descr: participant.descr,
        id: participant.participant,
        value: participant.value,
    })),
    feeling: { id: formValues.feelings },
    clientScenario: formValues.clientScenario,
    flowLink: [{ url: formValues.flowLink, descr: '' }],
    ucsReaction: formValues.ucsReaction,
    channel: formValues.channels.map((channel) => ({ id: channel.value })),
    document: formValues.document
        .filter((document) => document.value)
        .map((document) => ({
            descr: document.description,
            url: document.value,
        })),
    mockupLink: formValues.mockup
        .filter((mockup) => mockup.value)
        .map((mockup) => ({
            descr: mockup.description,
            url: mockup.value,
        })),
});

export const dataToFormValues = (data: IBIData): FormValues => ({
    id: data.id,
    name: data.name,
    identificator: data.uniqueIdent,
    communal: data.communal,
    descr: data.descr,
    type: data.target ? 0 : 1,
    status: data.status.id,
    feelings: data.feelings.id,
    clientScenario: data.clientScenario,
    channels: data.channel.map((channel) => ({ value: channel.id })),
    ucsReaction: data.ucsReaction,
    participants: data.participants.map((participant) => ({
        descr: participant.descr,
        value: participant.value,
        participant: Number(participant.participant.id),
    })),
    document: data.document.map((document) => ({ value: document.url, description: '' })),
    mockup: data.mockupLink.map((mockup) => ({ value: mockup.url, description: '' })),
    flowLink: data.flowLink[0]?.url,
});
