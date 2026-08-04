import React, { FC, useEffect, useRef, useState } from 'react';

import { TablePagination } from 'components/ui';

import { Row } from './components/Row';
import { ICJTable } from './types';
import * as S from './units';

export const CJTable: FC<ICJTable> = ({ data }) => {
    const [countPage, setCountPage] = useState(1);
    const [itemsCountOnPage, setItemsCountOnPage] = useState(10);
    const [activeRowId, setActiveRowId] = useState<number | null>(null);
    const [showShadow, setShowShadow] = useState(false);
    const handleMenuToggle = (rowId: number | null) => {
        setActiveRowId(rowId);
    };
    const containerRef = useRef<HTMLDivElement>(null);

    const startIndex = (countPage - 1) * itemsCountOnPage;
    const endIndex = countPage * itemsCountOnPage;
    const displayedCJ = data.slice(startIndex, endIndex);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateShadow = () => {
            setShowShadow(container.scrollWidth > container.clientWidth);
        };

        updateShadow();

        const observer = new ResizeObserver(updateShadow);
        observer.observe(container);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <S.OverflowContainer>
            <S.CJTableContainer ref={containerRef}>
                <S.TableStyled>
                    <S.Thead>
                        <S.Row>
                            <S.LabelTh showShadow={showShadow}>Название</S.LabelTh>
                            <S.ThID>ID</S.ThID>
                            <S.Th>Портрет пользователя</S.Th>
                            <S.Th>Приложение</S.Th>
                            {/* <S.Th>Каналы</S.Th>
                            <S.Th>Теги</S.Th> */}
                            <S.Th>Статус</S.Th>
                            <S.Th>Формат</S.Th>
                            {window.FEATURE_FLAGS.FLAG_IS_PROD === false && (
                                <S.Th>Дашборд grafana</S.Th>
                            )}
                            <S.ThDate>Дата изменения</S.ThDate>
                            <S.LastTh showShadow={showShadow} right>
                                <S.BorderDiv />
                            </S.LastTh>
                        </S.Row>
                    </S.Thead>
                    <S.Tbody>
                        {displayedCJ.map((cj) => (
                            <Row
                                key={cj.id}
                                cj={cj}
                                showShadow={showShadow}
                                isActive={activeRowId === cj.id}
                                onMenuToggle={handleMenuToggle}
                            />
                        ))}
                        <S.Row>
                            <S.TdPagination colSpan={10} alignRight>
                                <TablePagination
                                    onUserActions={(e) => {
                                        setCountPage(e.page);
                                        setItemsCountOnPage(e.rowsPerPage);
                                    }}
                                    page={countPage}
                                    rowsCount={data.length}
                                    rowsPerPage={itemsCountOnPage}
                                    rowsPerPageOptions={[10, 25, 50]}
                                    showFirstAndLastButtons
                                />
                            </S.TdPagination>
                        </S.Row>
                    </S.Tbody>
                </S.TableStyled>
            </S.CJTableContainer>
        </S.OverflowContainer>
    );
};
