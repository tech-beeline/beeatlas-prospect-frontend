import { ITech } from 'api/technologies/types';

export const filterFileText = (fileText: string, tech: ITech) => {
    return fileText
        .split('\n')
        .filter(
            (str, i) =>
                !(i === 1 && str.includes(tech.label)) && !(i === 2 && str.includes('Статус:')),
        )
        .join('\n');
};
