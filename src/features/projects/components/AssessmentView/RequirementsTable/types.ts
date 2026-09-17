export interface IRequirementTableProps {
    requirements: IRequirementTableItem[];
    emptyText: string;
    titleHeader?: string;
    descriptionHeader?: string;
}

export interface IRequirementTableItem {
    id: number | string;
    title: string;
    code?: string;
    description: string;
}

export interface IRequirementTableRowProps {
    requirement: IRequirementTableItem;
}
