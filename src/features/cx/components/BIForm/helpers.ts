import { IBIData, IBIForm } from 'api/bi/types';

import { FormValues } from './form';

export const formValuesToData = (formValues: FormValues): Omit<IBIForm, 'draft'> => ({
    name: formValues.name,
    communal: formValues.communal,
    descr: formValues.descr,
    status: { id: formValues.status },
    target: formValues.type === 0,
    participants: formValues.participants.map((participant) => ({
        descr: participant.descr,
        idType: participant.participant,
        value: participant.value,
    })),
    clientScenario: formValues.clientScenario,
    flowLink: [{ url: formValues.flowLink, descr: '' }].filter((link) => link.url),
    ucsReaction: formValues.ucsReaction,
    channel:
        formValues.channels?.map((channelId) => ({
            id: channelId,
        })) || [],
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
    productId: String(formValues.product),
    metrics: formValues.metrics,
});

export const dataToFormValues = (data: IBIData): FormValues => ({
    id: data.id,
    name: data.name ?? '',
    identificator: data.uniqueIdent ?? '',
    communal: data.communal ?? false,
    descr: data.descr ?? '',
    type: data.target ? 0 : 1,
    status: data.status?.id ?? 3,
    clientScenario: data.clientScenario ?? '',
    channels: data.channel?.map((channel) => channel.id) ?? [],
    ucsReaction: data.ucsReaction ?? '',
    participants:
        data.participants.map((participant) => ({
            descr: participant.descr,
            value: participant.value,
            participant: Number(participant.participant.id),
        })) ?? [],
    document: data.document.length
        ? data.document.map((document) => ({
              value: document.url,
              description: document.descr,
          }))
        : [{ value: '', description: '' }],
    mockup: data.mockupLink.length
        ? data.mockupLink.map((mockup) => ({ value: mockup.url, description: mockup.descr }))
        : [{ value: '', description: '' }],
    flowLink: data.flowLink[0]?.url ?? '',
    product: Number(data.productId),
    metrics: data.metrics ?? '',
});
