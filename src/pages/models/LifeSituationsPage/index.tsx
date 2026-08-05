import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePageContext } from 'features/ai-context';
import { LIFE_SITUATIONS_PAGE } from 'features/ai-context/page-context';

import { useGetAllChaptersQuery } from 'api/queries/product';

import { MainContent, SideMenu } from './components';
import { IActiveItem, ILifeSituationsPage, ItemTypes } from './types';
import * as S from './units';

export const LifeSituationsPage: FC<ILifeSituationsPage> = ({ isAdmin }) => {
    const [activeItem, setActiveItem] = useState<IActiveItem | null>(null);

    const [searchParams] = useSearchParams();
    const chapterId = searchParams.get('chapterId');
    const nfrId = searchParams.get('nfrId');

    const { data, isFetching } = useGetAllChaptersQuery();

    useEffect(() => {
        if (!chapterId && !nfrId) {
            setActiveItem(null);
            return;
        }

        if (!data) {
            return;
        }

        const chapter = chapterId ? data.find((item) => item.id === Number(chapterId)) : null;
        const nfrFromChapter =
            chapter && nfrId ? chapter.nfr.find((item) => String(item.id) === String(nfrId)) : null;
        const nfrWithChapter = nfrId
            ? data
                  .map((item) => ({
                      chapter: item,
                      nfr: item.nfr.find((nfr) => String(nfr.id) === String(nfrId)),
                  }))
                  .find((item) => item.nfr)
            : null;

        if (chapterId && nfrId) {
            if (!chapter || !nfrFromChapter) {
                setActiveItem({ type: ItemTypes.ERROR });
                return;
            }

            setActiveItem({
                type: ItemTypes.NFR,
                id: Number(nfrId),
                chapterId: Number(chapterId),
                chapterData: chapter,
                nfrData: nfrFromChapter,
            });
            return;
        }

        if (chapterId) {
            if (!chapter) {
                setActiveItem({ type: ItemTypes.ERROR });
                return;
            }

            setActiveItem({
                type: ItemTypes.CHAPTER,
                id: Number(chapterId),
                chapterData: chapter,
            });
            return;
        }

        if (nfrId) {
            if (!nfrWithChapter || !nfrWithChapter.nfr) {
                setActiveItem({ type: ItemTypes.ERROR });
                return;
            }

            setActiveItem({
                type: ItemTypes.NFR,
                id: Number(nfrId),
                chapterId: nfrWithChapter.chapter.id,
                chapterData: nfrWithChapter.chapter,
                nfrData: nfrWithChapter.nfr,
            });
        }
    }, [chapterId, nfrId, data]);

    const entityType = useMemo(() => {
        if (!activeItem || activeItem.type === ItemTypes.ERROR) {
            return undefined;
        }

        return activeItem.type === ItemTypes.CHAPTER ? 'chapter' : 'nfr';
    }, [activeItem]);

    const entityId = useMemo(() => {
        if (!activeItem || activeItem.type === ItemTypes.ERROR) {
            return undefined;
        }

        return activeItem.id;
    }, [activeItem]);

    usePageContext({
        page: LIFE_SITUATIONS_PAGE,
        entityType,
        entityId,
        activeTab: entityType,
    });

    return (
        <S.PageWrapper>
            <SideMenu activeItem={activeItem} isAdmin={isAdmin} />
            <MainContent
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                isAdmin={isAdmin}
                isLoading={isFetching}
            />
        </S.PageWrapper>
    );
};
