import React, { FC, useEffect, useState } from 'react';

import { Text } from 'components/core';
import { NotFoundBlock } from 'components/other';
import { IconButton } from 'components/ui';
import { ButtonGroup, Icon, Progress, ToolbarItem } from 'components/ui';

import { useGetBIPlantUML, useGetBISequenceDiagram } from 'api/queries/bi';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { DisplayOptions, downloadDiagramFile, getTcKey, isEmptySvg } from './const';
import { IDiagramView } from './types';
import * as S from './units';

export const DiagramView: FC<IDiagramView> = ({ relation, onClose }) => {
    const [displayOption, setDisplayOption] = useState(DisplayOptions.DIAGRAM);
    const showSnackbar = useSnackbarStore((store) => store.showSnackbar);
    const [svgUrl, setSvgUrl] = useState<string>();
    const tcKey = getTcKey(relation.tcCode);
    const productAliasUpper = relation.productAlias.toUpperCase();
    const {
        data: plantUmlData,
        isFetching: isLoadingCreatePluntUML,
        isError: isPlantUmlError,
        refetch: refetchPlantUml,
    } = useGetBIPlantUML({
        productAlias: productAliasUpper,
        TCCode: tcKey,
    });

    const {
        data: diagramData,
        isFetching: isLoadingCreateDiagram,
        isError: isDiagramError,
        refetch: refetchDiagram,
    } = useGetBISequenceDiagram({
        productAlias: productAliasUpper,
        TCCode: tcKey,
    });

    const isLoading = isLoadingCreatePluntUML || isLoadingCreateDiagram;
    const rawError = displayOption === DisplayOptions.DIAGRAM ? isDiagramError : isPlantUmlError;

    const isSvgEmpty = displayOption === DisplayOptions.DIAGRAM && isEmptySvg(diagramData);

    const isError = rawError || isSvgEmpty;

    const res: string | undefined =
        displayOption === DisplayOptions.DIAGRAM ? diagramData : plantUmlData;

    const handleRefresh = () => {
        if (displayOption === DisplayOptions.DIAGRAM) {
            refetchDiagram();
        } else {
            refetchPlantUml();
        }
    };

    const handleCopy = () => {
        if (displayOption === DisplayOptions.TEXT && plantUmlData) {
            navigator.clipboard.writeText(plantUmlData).then(() => {
                showSnackbar({ message: 'PlantUML скопирован' });
            });
        }
    };

    const handleDownload = () => {
        if (!res) return;

        if (displayOption === DisplayOptions.DIAGRAM) {
            downloadDiagramFile(`${relation?.operation}-sequence-diagram`, res, 'svg');
        } else {
            downloadDiagramFile(`${relation?.operation}-plantuml`, res, 'puml');
        }
    };

    const isDisabled = isError || !res || res === '' || isLoading;

    useEffect(() => {
        if (displayOption === DisplayOptions.DIAGRAM && res) {
            const blob = new Blob([res], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            setSvgUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setSvgUrl(undefined);
        }
    }, [res, displayOption]);
    return (
        <>
            <S.ModalTitleWrapper>
                <Text variant="subtitle1">Диаграмма последовательности</Text>
                <S.ButtonsWrapper gap="16">
                    <ButtonGroup
                        alwaysSelected
                        selectedOption={{ id: displayOption }}
                        options={[
                            {
                                startIcon: <Icon iconName={Icons.GraphDown} />,
                                id: DisplayOptions.DIAGRAM,
                                label: 'Диаграмма',
                            },
                            {
                                startIcon: <Icon iconName={Icons.Page} />,
                                id: DisplayOptions.TEXT,
                                label: 'PlantUML',
                            },
                        ]}
                        type="secondary"
                        onChange={(option) => setDisplayOption(option.id as DisplayOptions)}
                        size="small"
                    />
                    <IconButton iconName={Icons.Close} size="medium" onClick={onClose} />
                </S.ButtonsWrapper>
            </S.ModalTitleWrapper>
            <S.ButtonsWrapperRow>
                <ToolbarItem
                    icon={{
                        iconName: Icons.Download,
                    }}
                    label="Скачать"
                    onClick={handleDownload}
                    disabled={isDisabled}
                />
                {displayOption === DisplayOptions.TEXT && (
                    <ToolbarItem
                        icon={{
                            iconName: Icons.Copy,
                        }}
                        label="Копировать"
                        onClick={handleCopy}
                        disabled={isDisabled}
                    />
                )}
                <ToolbarItem
                    icon={{
                        iconName: Icons.Refresh,
                    }}
                    label="Обновить"
                    onClick={handleRefresh}
                />
            </S.ButtonsWrapperRow>
            <S.Content center={isDisabled}>
                {isLoading ? (
                    <S.BoxContainer>
                        <Progress shape="circle" cycled />
                        <Text variant="subtitle2">Загрузка данных</Text>
                    </S.BoxContainer>
                ) : !isError && res ? (
                    displayOption === DisplayOptions.DIAGRAM && !isSvgEmpty ? (
                        <S.ImgStyled src={svgUrl} alt="Sequence diagram" />
                    ) : (
                        <Text variant="body2">
                            <S.PreWrapper>{res}</S.PreWrapper>
                        </Text>
                    )
                ) : (
                    <S.BoxContainer>
                        <NotFoundBlock
                            title="Ошибка загрузки данных"
                            text="Обновите запрос"
                            buttonText="Обновить"
                            buttonProps={{
                                startIcon: <Icon iconName={Icons.Refresh} size="medium" />,
                                onClick: handleRefresh,
                                size: 'medium',
                            }}
                        />
                    </S.BoxContainer>
                )}
            </S.Content>
        </>
    );
};
