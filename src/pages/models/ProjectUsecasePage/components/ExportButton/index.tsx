import React, { FC, useRef, useState } from 'react';

import { IconButton } from 'components/ui';

import { useGetProjectUsecasePlantUmlQuery } from 'api/queries/usecase';
import { useOutsideClick } from 'hooks/useOutsideClick';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { downloadTextFile } from 'utils/helpers';
import { useSnackbarStore } from 'widgets/Snackbar';

import { ExportButtonProps } from './types';
import * as S from './units';
import { exportMarkdown } from './utils';

export const ExportButton: FC<ExportButtonProps> = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    useOutsideClick(dropdownRef, showMenu, setShowMenu, buttonRef);

    const plantUmlQuery = useGetProjectUsecasePlantUmlQuery(props.usecase.code, false);
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const handleExport = async (format: 'md' | 'puml') => {
        try {
            const content =
                format === 'md'
                    ? exportMarkdown(props)
                    : (await plantUmlQuery.refetch({ throwOnError: true })).data;
            if (content === undefined) throw new Error('PlantUML недоступен');
            const name = (props.usecase.code || `usecase-${props.usecase.id}`).replace(
                /[<>:"/\\|?*\u0000-\u001f]/g,
                '_',
            );
            downloadTextFile(`${name}.${format}`, content);
            setShowMenu(false);
        } catch (error) {
            showSnackbar({
                message:
                    error instanceof Error ? error.message : 'Не удалось скачать PlantUML-файл',
                showCloseButton: true,
            });
        }
    };

    return (
        <S.Container>
            <IconButton
                ref={buttonRef}
                iconName={Icons.ShareIos}
                variant="outlined"
                size="medium"
                aria-label="Экспорт"
                title="Экспорт"
                aria-expanded={showMenu}
                aria-haspopup="menu"
                onClick={() => setShowMenu(!showMenu)}
                onKeyDown={(event) => event.key === 'Escape' && setShowMenu(false)}
            />
            {showMenu && (
                <S.Dropdown
                    ref={dropdownRef}
                    role="menu"
                    onKeyDown={(event) => event.key === 'Escape' && setShowMenu(false)}
                >
                    <S.DropdownItem
                        role="menuitem"
                        disabled={plantUmlQuery.isFetching}
                        onClick={() => void handleExport('puml')}
                    >
                        Экспорт в PUML
                    </S.DropdownItem>
                    <S.DropdownItem
                        role="menuitem"
                        disabled={plantUmlQuery.isFetching}
                        onClick={() => void handleExport('md')}
                    >
                        Экспорт в Markdown
                    </S.DropdownItem>
                </S.Dropdown>
            )}
        </S.Container>
    );
};
