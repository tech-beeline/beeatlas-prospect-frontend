import { IBIData, IBIForm } from 'api/bi/types';
import { FormValues } from 'pages/CJPage/components/BIForm/form';

export const formValuesToData = (formValues: FormValues): IBIForm => ({
    channelId: formValues.channel,
    clientScenario: formValues.clientScenario,
    communal: formValues.communal,
    descr: formValues.descr,
    name: formValues.name,
    productId: '1',
    statusId: formValues.status,
    type: formValues.type,
    uniqueIdent: '123',
    ucsReaction: formValues.ucsReaction,
});

export const dataToFormValues = (data: IBIData): FormValues => ({
    id: data.id,
    name: data.name,
    identificator: data.uniqueIdent,
    communal: data.communal,
    descr: data.descr,
    type: data.type,
    status: data.statusId,
    feelings: 4,
    clientScenario: data.clientScenario,
    channel: data.channelId,
    ucsReaction: data.ucsReaction,
    participants: [{ participant: 0, descr: '', value: '' }],
    document: '',
    mockup: '',
    flowLink: '',
});
