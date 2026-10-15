import { TextareaChipsProps } from 'components/ui/TextareaChips/types';

export interface FormTextareaChipsProps
    extends Omit<TextareaChipsProps, 'value' | 'onChange' | 'onBlur'> {
    name: string;
}
