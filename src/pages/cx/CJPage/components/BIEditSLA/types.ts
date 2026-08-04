export interface IBIEditSLA {
    isOpen: boolean;
    onClose: () => void;
    slaId: string;
    data: { rps: number | null; errorRate: number | null; latency: number | null };
}
