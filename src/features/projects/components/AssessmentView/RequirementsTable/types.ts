export interface IRequirementTableProps {
    requirements: IRequirementTableItem[];
    emptyText: string;
    titleHeader?: string;
    descriptionHeader?: string;
    selectedRequirementIds?: Array<IRequirementTableItem['id']>;
    onRequirementSelectionChange?: (id: IRequirementTableItem['id'], checked: boolean) => void;
    onAllRequirementsSelectionChange?: (
        ids: Array<IRequirementTableItem['id']>,
        checked: boolean,
    ) => void;
}

export interface IRequirementTableItem {
    id: number | string;
    title: string;
    code?: string;
    description: string;
}

export interface IRequirementTableRowProps {
    requirement: IRequirementTableItem;
    selected?: boolean;
    onSelectionChange?: (id: IRequirementTableItem['id'], checked: boolean) => void;
}
