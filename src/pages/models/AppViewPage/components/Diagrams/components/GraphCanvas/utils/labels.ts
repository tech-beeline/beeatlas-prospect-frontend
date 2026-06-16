import { KNOWN } from '../const';

export function getMainLabel(labels: string[]): string {
    return labels.find((l) => KNOWN.includes(l)) || labels[0] || 'unknown';
}

export function getLabelDisplay(label: string): string {
    const map: Record<string, string> = {
        SoftwareSystem: 'SYSTEM',
        Container: 'CONTAINER',
        Component: 'COMPONENT',
        DeploymentNode: 'DEPLOY_NODE',
        Environment: 'ENV',
        ContainerInstance: 'INSTANCE',
        InfrastructureNode: 'INFRA',
    };
    return map[label] || label.toUpperCase();
}

export function isNameTruncated(full: string, maxChars: number): boolean {
    return full.length > maxChars;
}
