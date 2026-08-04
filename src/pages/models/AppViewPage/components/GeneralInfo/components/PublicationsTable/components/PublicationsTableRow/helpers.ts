export interface IProcessStatusInput {
    isError: boolean;
    isDone: boolean;
}

export type ProcessStatusResult = {
    title: string;
    type: 'error' | 'success' | 'info';
};

export const getProcessStatus = (status: IProcessStatusInput): ProcessStatusResult => {
    if (status.isError) {
        return { title: 'Ошибка', type: 'error' };
    }

    if (status.isDone) {
        return { title: 'Завершено', type: 'success' };
    }

    return { title: 'В процессе', type: 'info' };
};
