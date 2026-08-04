import { CapabilityOriginOptions } from '../../const';

export interface ITechCapabilityCard {
    tc: {
        origin: CapabilityOriginOptions;
        code: string;
        description: string;
        id: number;
        name: string;
    };
    cmdb: string;
}
