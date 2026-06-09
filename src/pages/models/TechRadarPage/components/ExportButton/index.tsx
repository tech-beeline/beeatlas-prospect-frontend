import React, { useRef, useState } from 'react';

import { Button, Icon } from 'components/ui';

import { ExportVariant } from 'api/file-export/types';
import { useCreateExportMutation } from 'api/queries/file-export';
import { useOutsideClick } from 'hooks/useOutsideClick';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import * as S from './units';

export const ExportButton = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [isExportButtonDisabled, setIsExportButtonDisabled] = useState(false);

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const buttonRef = useRef<HTMLButtonElement>(null);

    useOutsideClick(dropdownRef, showMenu, setShowMenu, buttonRef);

    const { mutateAsync: createExport } = useCreateExportMutation();

    const handleExportRegistryClick = async () => {
        window.location.href = `/templates/tech/export_zokii.xlsx`;

        setShowMenu(false);
    };

    const handleExportTechClick = async () => {
        createExport(ExportVariant.TECH);

        showSnackbar({
            message:
                'Ваш файл находится в процессе обработки. Как только экспорт будет завершен, вы получите уведомление. Проверить статус обработки можно в личном кабинете в разделе Экспорт файлов',
        });
        setShowMenu(false);

        setIsExportButtonDisabled(true);
        setTimeout(() => {
            setIsExportButtonDisabled(false);
        }, 5 * 1000);
    };

    return (
        <S.Container>
            <Button
                ref={buttonRef}
                onClick={() => setShowMenu(!showMenu)}
                size="small"
                startIcon={<Icon iconName={Icons.ShareIos} />}
                disabled={isExportButtonDisabled}
            >
                Экспорт
            </Button>
            {showMenu && (
                <S.Dropdown ref={dropdownRef}>
                    <S.DropdownItem onClick={handleExportRegistryClick}>Реестр КИИ</S.DropdownItem>
                    <S.DropdownItem onClick={handleExportTechClick}>
                        Список технологий
                    </S.DropdownItem>
                </S.Dropdown>
            )}
        </S.Container>
    );
};
