import React, { FC, Fragment } from 'react';
import { useFormContext } from 'react-hook-form';
import { Icon, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Select } from 'components/form';

import { FormValues } from 'pages/CJPage/components/BIForm/form';

import * as S from '../../../units';

import { IChannelField } from './types';

export const ChannelField: FC<IChannelField> = ({
    index,
    options,
    fieldsLength,
    alreadySelected,
    add,
    remove,
    fullscreen = false,
}) => {
    const { watch } = useFormContext<FormValues>();

    const channel = watch(`channels.${index}`);

    const filteredOptions = options
        .filter((option) => channel.value === option.id || !alreadySelected.includes(option.id))
        .map((option) => ({ id: option.id, value: option.name }));

    const NameContainer = fullscreen ? S.FieldsFlexContainer : Fragment;

    return (
        <>
            {!fullscreen && (
                <S.FlexContainer>
                    <S.SubTitleSmall>Канал {index + 1}</S.SubTitleSmall>
                    {fieldsLength > 1 && (
                        <IconButton
                            iconName={Icons.Delete}
                            size="large"
                            onClick={() => remove(index)}
                        />
                    )}
                </S.FlexContainer>
            )}
            <S.ChannelsContainer marginTop={fullscreen}>
                <NameContainer>
                    <S.GrowContainer>
                        <Select
                            name={`channels.${index}.value`}
                            label="Канал*"
                            options={filteredOptions}
                        />
                    </S.GrowContainer>

                    {fullscreen && index === 0 && (
                        <S.ButtonStyled
                            disabled={fieldsLength >= options.length}
                            onClick={add}
                            type="button"
                        >
                            <Icon iconName={Icons.Add} size="large" />
                        </S.ButtonStyled>
                    )}
                    {fullscreen && index !== 0 && (
                        <S.ButtonStyled onClick={() => remove(index)} type="button">
                            <Icon iconName={Icons.Delete} size="large" />
                        </S.ButtonStyled>
                    )}
                </NameContainer>
            </S.ChannelsContainer>
        </>
    );
};
