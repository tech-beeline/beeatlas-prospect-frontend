import { HelperPositionType } from '@beeline/design-system-react/types/components/TextField/TextField.types';

export interface ITextField {
    name: string;
    label: string;
    id?: string;
    maxLength?: number;
    disabled?: boolean;
    fullWidth?: boolean;
    helperPosition?: HelperPositionType;
}
