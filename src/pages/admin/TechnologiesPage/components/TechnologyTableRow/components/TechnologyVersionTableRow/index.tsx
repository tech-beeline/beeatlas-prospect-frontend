import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { TooltipContainer } from 'components/interaction';
import { IconButton } from 'components/ui';
import { Label, TableData, TableRow } from 'components/ui';

import { useDeleteTechnologyVersionMutation } from 'api/queries/technologies';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { ITechnologyVersionTableRow } from './types';
import * as S from './units';

export const TechnologyVersionTableRow: FC<ITechnologyVersionTableRow> = ({
    version,
    technology,
}) => {
    const navigate = useNavigate();

    const showSnackbar = useSnackbarStore((store) => store.showSnackbar);

    const { mutateAsync: deleteVersion } = useDeleteTechnologyVersionMutation();

    const handleDeleteButtonClick = async () => {
        await deleteVersion({ techId: technology.id, versionId: version.id });

        showSnackbar({ message: 'Версия удалена' });
    };

    return (
        <TableRow>
            <TableData>{version.versionStart}</TableData>
            <TableData>{version.versionEnd}</TableData>
            <TableData>{version.ring.name}</TableData>
            <S.TableDataFullWidth>
                {dayjs(version.createdDate).format('DD.MM.YYYY')}
            </S.TableDataFullWidth>
            <TableData>
                {version.deletedDate && <Label title="Версия удалена" type="error" />}
            </TableData>
            <S.TableDataButtons>
                <S.ButtonsContainer>
                    <IconButton
                        iconName={Icons.Edit}
                        disabled={!!technology.deletedDate}
                        size="medium"
                        onClick={() =>
                            navigate(
                                `${R.ADMIN_PATH}${R.TECHNOLOGIES_PATH}${R.VERSIONS_PATH}${R.ADD_PATH}?technologyId=${technology.id}&versionId=${version.id}`,
                            )
                        }
                        data-tooltip-id={`${technology.id}-${version.id}-edit`}
                    />
                    <IconButton
                        iconName={Icons.Delete}
                        disabled={!!technology.deletedDate}
                        onClick={handleDeleteButtonClick}
                        size="medium"
                        data-tooltip-id={`${technology.id}-${version.id}-delete`}
                    />
                </S.ButtonsContainer>
                <TooltipContainer
                    noArrow
                    // @ts-ignore Ошибка в .d.ts
                    place="top-end"
                    offset={8}
                    id={`${technology.id}-${version.id}-edit`}
                >
                    {!!technology.deletedDate
                        ? 'Сначала восстановите технологию'
                        : 'Редактировать версию'}
                </TooltipContainer>
                <TooltipContainer
                    noArrow
                    // @ts-ignore Ошибка в .d.ts
                    place="top-end"
                    offset={8}
                    id={`${technology.id}-${version.id}-delete`}
                >
                    {!!technology.deletedDate
                        ? 'Сначала восстановите технологию'
                        : 'Удалить версию'}
                </TooltipContainer>
            </S.TableDataButtons>
        </TableRow>
    );
};
