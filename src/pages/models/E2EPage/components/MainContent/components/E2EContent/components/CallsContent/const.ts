export enum CallsView {
    SEQUENCE = 'SEQUENCE',
    DIAGRAM = 'DIAGRAM',
    HISTORY = 'HISTORY',
}

export const CHIPS = [
    { value: CallsView.SEQUENCE, label: 'Последовательность вызовов' },
    { value: CallsView.DIAGRAM, label: 'Диаграмма последовательности вызовов' },
    { value: CallsView.HISTORY, label: 'История загрузок' },
];
