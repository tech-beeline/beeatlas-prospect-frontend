import { IBIData, IBIForm } from 'api/bi/types';
import { FormValues } from 'pages/CJPage/components/BIForm/form';

export const formValuesToData = (formValues: FormValues): Partial<IBIForm> => ({
    name: formValues.name,
    communal: formValues.communal,
    descr: formValues.descr,
    statusId: formValues.status,
    participants: formValues.participants.map((participant) => ({
        descr: participant.descr,
        participant: participant.participant,
        value: participant.value,
    })),
    feelings: formValues.feelings,
    clientScenario: formValues.clientScenario,
    scenario: [{ url: formValues.flowLink, descr: '' }],
    ucsReaction: formValues.ucsReaction,
    channel: formValues.channels.map(() => ({ name: 'Web-site' })),
    document: formValues.document.map((document) => ({ descr: '', url: document.value })),
    mockupLink: formValues.mockup.map((mockup) => ({ descr: '', url: mockup.value })),
    productId: '1',
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
    channels: data.channel.map(() => ({ value: 1 })),
    ucsReaction: data.ucsReaction,
    participants: data.participants.map((participant) => ({
        // descr: participant.descr,
        // value: participant.value,
        descr: '',
        value: '',
        participant: Number(participant.id),
    })),
    document: data.document.map((document) => ({ value: document.url, description: '' })),
    mockup: data.mockupLink.map((mockup) => ({ value: mockup.url, description: '' })),
    flowLink: data.flowLink[0]?.url,
});
