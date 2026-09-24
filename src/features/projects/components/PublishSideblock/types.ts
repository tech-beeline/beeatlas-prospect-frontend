export interface IPublishSideblockProps {
    isOpen: boolean;
    isPending: boolean;
    ownerName: string;
    pageName: string;
    parentUrl: string;
    pat: string;
    sourceUrl: string;
    businessDescription: string;
    errorMessage?: string;
    onClose: () => void;
    onPublish: () => void;
    onPageNameChange: (value: string) => void;
    onParentUrlChange: (value: string) => void;
    onPatChange: (value: string) => void;
}
