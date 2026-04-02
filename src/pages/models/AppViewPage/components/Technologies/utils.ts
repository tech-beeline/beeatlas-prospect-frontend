import { RingStatus } from './const';
import { TechProductWithTech } from './types';

export function filterProductTechnologies(
    items: TechProductWithTech[],
    ringName: string,
    criticalOnly: boolean,
): TechProductWithTech[] {
    return items.filter((p) => {
        const tech = p.tech;

        if (ringName !== RingStatus.ALL && tech.ring.name !== ringName) {
            return false;
        }

        if (criticalOnly && !tech.isCritical) {
            return false;
        }

        return true;
    });
}
