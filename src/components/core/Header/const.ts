import * as R from 'router/const';

export enum TabVariants {
    MODELS = 'MODELS',
    BASE = 'BASE',
    CX = 'CX',
}

export const TABS = [
    { id: TabVariants.MODELS, name: 'Модели', url: R.MODELS_PATH },
    { id: TabVariants.BASE, name: 'База знаний', url: R.DATA_BASE_PATH },
    { id: TabVariants.CX, name: 'Поддержка Cx', url: R.CX_PATH },
];
