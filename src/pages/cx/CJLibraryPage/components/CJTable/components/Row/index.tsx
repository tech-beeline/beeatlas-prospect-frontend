import { FC } from 'react';
import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { ClampedText, DropdownMenuControlled } from 'components/interaction';
import { Badge, Skeleton } from 'components/ui';

import { useDeleteCJMutation } from 'api/queries/cj';
import { useGetAllProductsQuery } from 'api/queries/product';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { IRow } from './types';
import * as S from './units';

export const Row: FC<IRow> = ({ cj, showShadow = false, isActive = false, onMenuToggle }) => {
    const navigate = useNavigate();
    const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery();
    const productIdStr = String(cj.productId ?? cj.id_product ?? cj.idProductExt);
    const currentProduct = productsData?.find((product) => String(product.id) === productIdStr);

    const { mutateAsync: deleteCj } = useDeleteCJMutation();

    const handleCJClick = (id?: number) => {
        navigate(
            {
                pathname: `${R.CX_PATH}${R.CJ_PATH}${R.VIEW_PATH}`,
                search: id ? createSearchParams({ id: String(id) }).toString() : '',
            },
            {
                state: {
                    from: window.location.pathname,
                },
            },
        );
    };

    return (
        <S.RowStyled key={cj.id} isActive={isActive}>
            <S.LabelTh showShadow={showShadow} isActive={isActive}>
                <S.SpanLinkStyled onClick={() => handleCJClick(cj.id)}>
                    <ClampedText
                        text={cj.name}
                        tooltipId={`cj-name-${cj.id}`}
                        noArrow
                        place="top"
                        offset={8}
                    />
                </S.SpanLinkStyled>
            </S.LabelTh>
            <S.TdId>{cj.uniqueIdent}</S.TdId>
            <S.TableDataStyled>
                <ClampedText
                    text={formatNullableString(cj.userPortrait ?? cj.user_portrait)}
                    tooltipId={`bi-descr-${cj.id}`}
                    noArrow
                    place="top"
                    offset={8}
                />
            </S.TableDataStyled>
            <S.TableDataStyled>
                {isLoadingProducts || !productsData ? (
                    <Skeleton height={10} radius={4} />
                ) : currentProduct ? (
                    <S.SpanLinkStyled
                        onClick={() =>
                            window.open(
                                `${R.MODELS_PATH}${R.APPS_PATH}${
                                    R.VIEW_PATH
                                }?cmdb=${encodeURIComponent(currentProduct.alias)}`,
                            )
                        }
                    >
                        <ClampedText
                            text={formatNullableString(currentProduct.name)}
                            tooltipId={`bi-product-${cj.id}`}
                            noArrow
                            place="top"
                            offset={8}
                        />
                    </S.SpanLinkStyled>
                ) : (
                    <>{formatNullableString(null)}</>
                )}
            </S.TableDataStyled>
            {/* <S.TableDataStyled>
                <TooltipContainer text="lol" tooltipId={`cj-channel-${cj.id}`} />
            </S.TableDataStyled>
            <S.TableDataStyled>{'—'}</S.TableDataStyled> */}
            <S.TableDataStyled>
                <Badge type="secondary" semantic={cj.draft ? 'neutral' : 'success'}>
                    {cj.draft ? 'Черновик' : 'Опубликован'}
                </Badge>
            </S.TableDataStyled>
            <S.TableDataStyled>
                <Badge type="secondary" semantic={cj.bpmn ? 'warning' : 'info'}>
                    {cj.bpmn ? 'BPMN' : 'BEEATLAS'}
                </Badge>
            </S.TableDataStyled>
            {window.FEATURE_FLAGS.FLAG_IS_PROD === false && (
                <S.TableDataStyled>
                    {cj.dashboardLink ? (
                        <Badge type="secondary" semantic="teal">
                            GRAFANA
                        </Badge>
                    ) : (
                        formatNullableString(null)
                    )}
                </S.TableDataStyled>
            )}
            <S.TdDate>{dayjs(cj.lastModifiedDate).format('DD.MM.YYYY')}</S.TdDate>
            <S.ActionCell showShadow={showShadow} isActive={isActive}>
                <DropdownMenuControlled
                    id={String(cj.id)}
                    items={[
                        [
                            {
                                title: 'Редактировать',
                                icon: Icons.Edit,
                                onClick: () => handleCJClick(cj.id),
                            },
                        ],
                        [
                            {
                                title: 'Удалить',
                                icon: Icons.Delete,
                                onClick: () => deleteCj(String(cj.id)),
                                dangerous: true,
                            },
                        ],
                    ]}
                    onOpen={() => onMenuToggle?.(cj.id)}
                    onClose={() => onMenuToggle?.(null)}
                />
            </S.ActionCell>
        </S.RowStyled>
    );
};
