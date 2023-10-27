import { create } from 'zustand';

import { Step } from 'pages/CJPage/mocks';

export interface CJ {
    id: number;
    name: string;
    draft: boolean;
    descr: string;
    steps: Step[];
}

interface IMockCJStore {
    cjs: CJ[];

    getAllCjs: () => CJ[];
    getCjById: (id: number) => CJ | undefined;

    createCj: (data: Omit<CJ, 'id'>) => void;
    updateCj: (id: number, data: CJ) => void;

    deleteCj: (id: number) => void;
}

const INITIAL_CJS: CJ[] = [
    {
        id: 1,
        name: 'Название CJ 1',
        draft: false,
        descr: 'Описание артефакта (для BI), для CJ — описание портрета пользователя или целевой аудитории. Максимум 3 строки.',
        steps: [],
    },
    {
        id: 2,
        name: 'Название CJ 2',
        draft: true,
        descr: 'Описание артефакта (для BI), для CJ — описание портрета пользователя или целевой аудитории. Максимум 3 строки.',
        steps: [],
    },
    {
        id: 3,
        name: 'Название CJ 3',
        draft: false,
        descr: 'Описание артефакта (для BI), для CJ — описание портрета пользователя или целевой аудитории. Максимум 3 строки.',
        steps: [],
    },
];

export const useMockCJtore = create<IMockCJStore>()((set, get) => ({
    cjs: INITIAL_CJS,

    getAllCjs: () => get().cjs,

    getCjById: (id) => get().cjs.find((cj) => cj.id === id),

    createCj: (data) => {
        set({ cjs: [...get().cjs, { ...data, id: get().cjs.length + 1 }] });
    },

    updateCj: (id, data) => {
        set({ cjs: get().cjs.map((cj) => (cj.id === id ? data : cj)) });
    },

    deleteCj: (id) => {
        set({ cjs: get().cjs.filter((cj) => cj.id !== id) });
    },
}));
