import { ICompleteCJData } from 'api/cj/types';

interface IOrderSortable {
    order: number | null;
    orderTree: string | null;
}

const sortByOrder = <T extends IOrderSortable>(items: T[], bpmn: boolean): T[] =>
    [...items].sort((a, b) =>
        bpmn
            ? String(a.orderTree).localeCompare(String(b.orderTree))
            : (a.order ?? 0) - (b.order ?? 0),
    );

export const sortCompleteCJData = (data: ICompleteCJData): ICompleteCJData => ({
    ...data,
    steps: sortByOrder(data.steps, data.bpmn).map((step) => ({
        ...step,
        bi: sortByOrder(step.bi, data.bpmn).map((bi) => ({
            ...bi,
            biSteps: sortByOrder(bi.biSteps, data.bpmn),
        })),
    })),
});
