export interface IOpenQuestionListItem {
    id: number | string;
    code: string;
    text: string;
}

export interface IOpenQuestionsListProps {
    questions: IOpenQuestionListItem[];
    emptyText?: string;
}
