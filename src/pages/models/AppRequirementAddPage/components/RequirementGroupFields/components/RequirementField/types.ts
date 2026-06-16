interface RequirementOption {
    id: number;
    value: string;
}

export interface IRequirementField {
    groupIndex: number;
    requirementIndex: number;
    requirementOptions: RequirementOption[];
    isLoadingChapters: boolean;
    isFirstRequirementRow: boolean;
    canDeleteRequirement: boolean;
    onAddRequirement: () => void;
    onDeleteRequirement: () => void;
}
