import React, { useRef, useState } from 'react';
import { Button, Icon, TextField } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { Nullable } from 'types/common';

// import { BaseIcon } from 'components/core';
import { useMountEffect } from 'hooks';
import { useOutsideClick } from 'hooks/useOutsideClick';
import { theme } from 'styles';

import { SideBlock } from '../SideBlock';

// import { ReactComponent as CrossSVG } from 'images/cross-icon.svg';
import * as S from './units';

interface Fruit {
    Атрибут: string;
    Атрибут1: string;
    Атрибут2: string;
    Атрибут3: string;
    Атрибут4: string;
    Атрибут5: string;
    Атрибут6: string;
    Атрибут7: string;
    Атрибут8: string;
    Атрибут9: string;
    Атрибут10: string;
    Атрибут11: string;
    Атрибут12: string;
    Атрибут13: string;
    Атрибут14: string;
    Атрибут15: string;
    color?: string;
    columnName: string;
}

const data: Fruit[] = [
    {
        Атрибут: 'Тестовая строка',
        Атрибут1: 'Тестовая строка 1',
        Атрибут2: 'Тестовая строка 2',
        Атрибут3: 'Тестовая строка 3',
        Атрибут4: 'Тестовая строка 4',
        Атрибут5: 'Тестовая строка 5',
        Атрибут6: 'Тестовая строка ',
        Атрибут7: 'Тестовая строка',
        Атрибут8: 'Тестовая строка',
        Атрибут9: 'Тестовая строка',
        Атрибут10: 'Тестовая строка',
        Атрибут11: 'Тестовая строка',
        Атрибут12: 'Тестовая строка',
        Атрибут13: 'Тестовая строка',
        Атрибут14: 'Тестовая строка',
        Атрибут15: 'Тестовая строка',
        columnName: 'Название шага',
    },
    {
        Атрибут: 'Тестовая строка',
        Атрибут1: 'Тестовая строка 1',
        Атрибут2: 'Тестовая строка 2',
        Атрибут3: 'Тестовая строка 3',
        Атрибут4: 'Тестовая строка 4',
        Атрибут5: 'Тестовая строка 5',
        Атрибут6: 'Тестовая строка',
        Атрибут7: 'Тестовая строка',
        Атрибут8: 'Тестовая строка',
        Атрибут9: 'Тестовая строка',
        Атрибут10: 'Тестовая строка',
        Атрибут11: 'Тестовая строка',
        Атрибут12: 'Тестовая строка',
        Атрибут13: 'Тестовая строка',
        Атрибут14: 'Тестовая строка',
        Атрибут15: 'Тестовая строка',
        columnName: 'Название шага',
    },
    {
        Атрибут: 'Тестовая строка',
        Атрибут1: 'Тестовая строка 1',
        Атрибут2: 'Тестовая строка 2',
        Атрибут3: 'Тестовая строка 3',
        Атрибут4: 'Тестовая строка 4',
        Атрибут5: 'Тестовая строка 5',
        Атрибут6: 'Тестовая строка',
        Атрибут7: 'Тестовая строка',
        Атрибут8: 'Тестовая строка',
        Атрибут9: 'Тестовая строка',
        Атрибут10: 'Тестовая строка',
        Атрибут11: 'Тестовая строка',
        Атрибут12: 'Тестовая строка',
        Атрибут13: 'Тестовая строка',
        Атрибут14: 'Тестовая строка',
        Атрибут15: 'Тестовая строка',
        columnName: 'Название шага',
    },
    {
        Атрибут: 'Тестовая строка',
        Атрибут1: 'Тестовая строка 1',
        Атрибут2: 'Тестовая строка 2',
        Атрибут3: 'Тестовая строка 3',
        Атрибут4: 'Тестовая строка 4',
        Атрибут5: 'Тестовая строка 5',
        Атрибут6: 'Тестовая строка',
        Атрибут7: 'Тестовая строка',
        Атрибут8: 'Тестовая строка',
        Атрибут9: 'Тестовая строка',
        Атрибут10: 'Тестовая строка',
        Атрибут11: 'Тестовая строка',
        Атрибут12: 'Тестовая строка',
        Атрибут13: 'Тестовая строка',
        Атрибут14: 'Тестовая строка',
        Атрибут15: 'Тестовая строка',
        columnName: 'Название шага',
    },
    {
        Атрибут: 'Тестовая строка',
        Атрибут1: 'Тестовая строка 1',
        Атрибут2: 'Тестовая строка 2',
        Атрибут3: 'Тестовая строка 3',
        Атрибут4: 'Тестовая строка 4',
        Атрибут5: 'Тестовая строка 5',
        Атрибут6: 'Тестовая строка',
        Атрибут7: 'Тестовая строка',
        Атрибут8: 'Тестовая строка',
        Атрибут9: 'Тестовая строка',
        Атрибут10: 'Тестовая строка',
        Атрибут11: 'Тестовая строка',
        Атрибут12: 'Тестовая строка',
        Атрибут13: 'Тестовая строка',
        Атрибут14: 'Тестовая строка',
        Атрибут15: 'Тестовая строка',
        columnName: 'Название шага',
    },
    {
        Атрибут: 'Тестовая строка',
        Атрибут1: 'Тестовая строка 1',
        Атрибут2: 'Тестовая строка 2',
        Атрибут3: 'Тестовая строка 3',
        Атрибут4: 'Тестовая строка 4',
        Атрибут5: 'Тестовая строка 5',
        Атрибут6: 'Тестовая строка',
        Атрибут7: 'Тестовая строка',
        Атрибут8: 'Тестовая строка',
        Атрибут9: 'Тестовая строка',
        Атрибут10: 'Тестовая строка',
        Атрибут11: 'Тестовая строка',
        Атрибут12: 'Тестовая строка',
        Атрибут13: 'Тестовая строка',
        Атрибут14: 'Тестовая строка',
        Атрибут15: 'Тестовая строка',
        columnName: 'Название шага',
    },
];

const SideBlockNameContent = ({ setOpen, renameColumn }: any) => {
    const [nameValue, setNameValue] = useState('');

    const onSaveHandler = () => {
        setOpen(false);

        setNameValue('');

        renameColumn(nameValue);
    };

    return (
        <>
            <S.FlexWrapper>
                <S.SideBlockTitle>Название шага</S.SideBlockTitle>

                <Icon
                    iconName={Icons.Close}
                    onClick={() => setOpen(false)}
                    style={{ cursor: 'pointer' }}
                />
            </S.FlexWrapper>

            <S.TextFieldContainer>
                <TextField
                    value={nameValue}
                    onChange={({ target: { value } }) => setNameValue(value)}
                    label="Название"
                    fullWidth
                />
            </S.TextFieldContainer>

            <S.ButtonContainer>
                <Button onClick={() => setOpen(false)}>Отменить</Button>

                <Button variant="contained" onClick={onSaveHandler}>
                    Сохранить
                </Button>
            </S.ButtonContainer>
        </>
    );
};

export const Table = () => {
    const [tableData, setTableData] = useState<Fruit[]>([]);

    const [isMenuOpen, setMenuOpen] = useState(false);
    const [openMenuIndex, setOpenMenuIndex] = useState(0);
    const [isAddStepMenu, setAddStepMenu] = useState(false);
    const [isMoveMenu, setMoveMenu] = useState(false);

    const [hiddenRows, setHiddenRows] = useState<number[]>([]);
    const [isHiddenRowsVisible, setHiddenRowsVisible] = useState(false);
    const [hoveredRowIndex, setHoveredRowIndex] = useState<Nullable<number>>(null);
    const [renameIndex, setRenameIndex] = useState<Nullable<number>>(null);

    const [isOpenSideBlockName, setOpenSideBlockName] = useState(false);

    const menuRef = useRef(null);
    const menuButtonRef = useRef(null);

    // const toggleRowVisibility = (rowIndex: number) => {
    //     if (hiddenRows.includes(rowIndex)) {
    //         setHiddenRows(hiddenRows.filter((row) => row !== rowIndex));
    //     } else {
    //         setHiddenRows([...hiddenRows, rowIndex]);
    //     }
    // };

    // const showAllRows = () => {
    //     setHiddenRows([]);
    // };

    // useEffect(() => {
    //     console.log(hiddenRows);
    // }, [hiddenRows]);

    const hideMenuHandler = () => {
        setMenuOpen(false);
        setAddStepMenu(false);
        setMoveMenu(false);
    };

    useOutsideClick(menuRef, isMenuOpen, hideMenuHandler, menuButtonRef);

    const columns = [
        'Атрибут',
        'Атрибут1',
        'Атрибут2',
        'Атрибут3',
        'Атрибут4',
        'Атрибут5',
        'Атрибут6',
        'Атрибут7',
        'Атрибут8',
        'Атрибут9',
        'Атрибут10',
        'Атрибут11',
        'Атрибут12',
        'Атрибут13',
        'Атрибут14',
        'Атрибут15',
    ];

    const colors = [
        theme.colors.lemon,
        theme.colors.backgroundSuccess,
        theme.colors.magenta,
        theme.colors.teal,
    ];

    const addColors = (data: any[], colors: any[]) => {
        const colorCount = colors.length;

        const newData = data.map((item, index) => {
            const colorIndex = index % colorCount;
            const color = colors[colorIndex];

            return {
                ...item,
                color: color,
            };
        });

        setTableData(newData as any);
    };

    useMountEffect(() => {
        addColors(data, colors);
    });

    const openMenuHandler = (index: number) => {
        setOpenMenuIndex(index);

        isMenuOpen && index === openMenuIndex ? hideMenuHandler() : setMenuOpen(true);
    };

    const changePositionOfColumn = (index: number, isRight?: boolean) => {
        const copyOfData = [...tableData];
        const temp = copyOfData[index];

        if (isRight) {
            copyOfData[index] = copyOfData[index + 1];
            copyOfData[index + 1] = temp;
        } else {
            copyOfData[index] = copyOfData[index - 1];
            copyOfData[index - 1] = temp;
        }

        setTableData(copyOfData);

        hideMenuHandler();
    };

    const removeColumn = (indexForRemove: number) => {
        setTableData(tableData.filter((_, index) => index !== indexForRemove));

        hideMenuHandler();
    };

    const addNewColumn = (index: number) => {
        let excludedСolors: any = [];

        if (index === 0 && tableData.length > 1) {
            excludedСolors = [tableData[index].color, tableData[index + 1].color];
        } else if (index === tableData.length && tableData.length > 1) {
            excludedСolors = [tableData[index - 2].color, tableData[index - 1].color];
        } else if (tableData.length > 1) {
            excludedСolors = [tableData[index].color, tableData[index - 1].color];
        } else {
            excludedСolors = [tableData[0].color];
        }

        const availableСolors = colors.filter((color) => !excludedСolors.includes(color));

        const newColumn: Fruit = {
            Атрибут: '',
            Атрибут1: '',
            Атрибут2: '',
            Атрибут3: '',
            Атрибут4: '',
            Атрибут5: '',
            Атрибут6: '',
            Атрибут7: '',
            Атрибут8: '',
            Атрибут9: '',
            Атрибут10: '',
            Атрибут11: '',
            Атрибут12: '',
            Атрибут13: '',
            Атрибут14: '',
            Атрибут15: '',
            color: availableСolors[Math.floor(Math.random() * availableСolors.length)],
            columnName: 'Название шага',
        };

        const copyOfData = [...tableData];

        if (index === 0) {
            copyOfData.unshift(newColumn);
        } else if (index === tableData.length - 1) {
            copyOfData.push(newColumn);
        } else {
            copyOfData.splice(index, 0, newColumn);
        }

        setTableData(copyOfData);

        hideMenuHandler();
    };

    const renameColumn = (name: string) => {
        setTableData(
            tableData.map((item, index) =>
                index === renameIndex ? { ...item, columnName: name } : item,
            ),
        );
    };

    return (
        <S.PageWrapper>
            <S.TableWrapper>
                <S.Table>
                    <S.Thead>
                        <S.Row>
                            <S.Th></S.Th>

                            {tableData.map((row: any, rowIndex) => (
                                <S.Th key={rowIndex} backgroundColor={row.color}>
                                    <S.FlexWrapper>
                                        <p>{row.columnName}</p>

                                        <Icon
                                            iconName={Icons.MoreVert}
                                            style={{ cursor: 'pointer' }}
                                            ref={menuButtonRef}
                                            onClick={() => {
                                                openMenuHandler(rowIndex);

                                                setAddStepMenu(false);
                                                setMoveMenu(false);
                                            }}
                                        />

                                        {isMenuOpen && openMenuIndex === rowIndex && (
                                            <S.MenuBlock ref={menuRef}>
                                                {isAddStepMenu ? (
                                                    <>
                                                        <S.MenuItem
                                                            onClick={() => addNewColumn(rowIndex)}
                                                        >
                                                            <Icon iconName={Icons.AddColumnLeft} />

                                                            <S.MenuItemText>
                                                                Добавить шаг до
                                                            </S.MenuItemText>
                                                        </S.MenuItem>

                                                        <S.MenuItem
                                                            onClick={() =>
                                                                addNewColumn(rowIndex + 1)
                                                            }
                                                        >
                                                            <Icon iconName={Icons.AddColumnRight} />

                                                            <S.MenuItemText>
                                                                Добавить шаг после
                                                            </S.MenuItemText>
                                                        </S.MenuItem>
                                                    </>
                                                ) : isMoveMenu ? (
                                                    <>
                                                        {rowIndex !== 0 && (
                                                            <S.MenuItem
                                                                onClick={() =>
                                                                    changePositionOfColumn(rowIndex)
                                                                }
                                                            >
                                                                <Icon iconName={Icons.ArrowLeft} />

                                                                <S.MenuItemText>
                                                                    Переместить шаг влево
                                                                </S.MenuItemText>
                                                            </S.MenuItem>
                                                        )}

                                                        {rowIndex !== tableData.length - 1 && (
                                                            <S.MenuItem
                                                                onClick={() =>
                                                                    changePositionOfColumn(
                                                                        rowIndex,
                                                                        true,
                                                                    )
                                                                }
                                                            >
                                                                <Icon iconName={Icons.ArrowRight} />

                                                                <S.MenuItemText>
                                                                    Переместить шаг вправо
                                                                </S.MenuItemText>
                                                            </S.MenuItem>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        <S.MenuItem
                                                            onClick={() => {
                                                                setOpenSideBlockName(true);
                                                                setRenameIndex(rowIndex);
                                                                hideMenuHandler();
                                                            }}
                                                        >
                                                            <Icon iconName={Icons.Edit} />

                                                            <S.MenuItemText>
                                                                Изменить название
                                                            </S.MenuItemText>
                                                        </S.MenuItem>

                                                        <S.MenuItem>
                                                            <Icon iconName={Icons.Add} />

                                                            <S.MenuItemText>
                                                                Добавить BI
                                                            </S.MenuItemText>
                                                        </S.MenuItem>

                                                        <S.MenuItem
                                                            onClick={() => setAddStepMenu(true)}
                                                            style={{
                                                                justifyContent: 'space-between',
                                                            }}
                                                        >
                                                            <S.MenuItemText>
                                                                Добавить шаг
                                                            </S.MenuItemText>

                                                            <Icon iconName={Icons.NavArrowRight} />
                                                        </S.MenuItem>

                                                        <S.MenuItem
                                                            onClick={() => setMoveMenu(true)}
                                                            style={{
                                                                justifyContent: 'space-between',
                                                            }}
                                                        >
                                                            <S.MenuItemText>
                                                                Переместить
                                                            </S.MenuItemText>

                                                            <Icon iconName={Icons.NavArrowRight} />
                                                        </S.MenuItem>

                                                        {tableData.length > 1 && (
                                                            <>
                                                                <S.MenuDivider />

                                                                <S.MenuItem
                                                                    onClick={() =>
                                                                        removeColumn(rowIndex)
                                                                    }
                                                                >
                                                                    {/* заменить на нужную */}
                                                                    {/* <CrossSVG /> */}

                                                                    <S.MenuItemRemoveText>
                                                                        Удалить шаг
                                                                    </S.MenuItemRemoveText>
                                                                </S.MenuItem>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </S.MenuBlock>
                                        )}
                                    </S.FlexWrapper>
                                </S.Th>
                            ))}
                        </S.Row>
                    </S.Thead>

                    <S.Tbody>
                        {columns.map((column, columnIndex) =>
                            !hiddenRows.includes(columnIndex) ? (
                                <S.Row key={columnIndex}>
                                    <S.Td
                                        onClick={() => setHiddenRows([...hiddenRows, columnIndex])}
                                        onMouseMove={() => setHoveredRowIndex(columnIndex)}
                                        onMouseLeave={() => setHoveredRowIndex(null)}
                                        isClickable
                                    >
                                        <S.AlignItemsCenterWrapper>
                                            {column}

                                            {hoveredRowIndex === columnIndex && (
                                                <S.IconStyled iconName={Icons.EyeOff} />
                                            )}
                                        </S.AlignItemsCenterWrapper>
                                    </S.Td>

                                    {tableData.map((row, rowIndex) => (
                                        <S.Td key={rowIndex}>{row[column as keyof Fruit]}</S.Td>
                                    ))}
                                </S.Row>
                            ) : (
                                isHiddenRowsVisible && (
                                    <S.Row key={columnIndex} isHidden>
                                        <S.Td
                                            onClick={() =>
                                                setHiddenRows(
                                                    hiddenRows.filter(
                                                        (item) => item !== columnIndex,
                                                    ),
                                                )
                                            }
                                            isClickable
                                        >
                                            <S.AlignItemsCenterWrapper>
                                                {column}

                                                <S.IconStyled iconName={Icons.Eye} />
                                            </S.AlignItemsCenterWrapper>
                                        </S.Td>

                                        {tableData.map((row, rowIndex) => (
                                            <S.Td key={rowIndex}>{row[column as keyof Fruit]}</S.Td>
                                        ))}
                                    </S.Row>
                                )
                            ),
                        )}

                        <S.Row>
                            <S.Td>
                                <S.HideOrShowButton
                                    onClick={() => setHiddenRowsVisible(!isHiddenRowsVisible)}
                                >
                                    {isHiddenRowsVisible ? 'Скрыть' : 'Показать скрытые'}

                                    {isHiddenRowsVisible ? (
                                        <S.IconStyled iconName={Icons.EyeOff} />
                                    ) : (
                                        <S.IconStyled iconName={Icons.Eye} />
                                    )}
                                </S.HideOrShowButton>
                            </S.Td>

                            <S.Td colSpan={columns.length - 1}></S.Td>
                        </S.Row>
                    </S.Tbody>
                </S.Table>
            </S.TableWrapper>
            {/* <S.HideOrShowButton onClick={() => setHiddenRowsVisible(!isHiddenRowsVisible)}>
                {isHiddenRowsVisible ? 'Скрыть' : 'Показать скрытые'}

                {isHiddenRowsVisible ? (
                    <S.IconStyled iconName={Icons.EyeOff} />
                ) : (
                    <S.IconStyled iconName={Icons.Eye} />
                )}
            </S.HideOrShowButton> */}

            <SideBlock isOpen={isOpenSideBlockName} setOpen={setOpenSideBlockName}>
                <SideBlockNameContent setOpen={setOpenSideBlockName} {...{ renameColumn }} />
            </SideBlock>
        </S.PageWrapper>
    );
};
