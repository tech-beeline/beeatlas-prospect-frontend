import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import { Header, Menu, MenuCX, MenuModels, MenuPersonalArea } from 'components/core';

import {
    AddRollPage,
    AppInfoPage,
    ArchCommPage,
    BIAddPage,
    BILibraryPage,
    BIViewPage,
    CalendarPage,
    CJLibraryPage,
    CJPage,
    ConsultationPage,
    CXPage,
    DataBasePage,
    FDMPage,
    FDMResultPage,
    HowToPage,
    MainPage,
    ModelsPage,
    NotFoundPage,
    PersonalArea,
    ProductsPage,
    RollSettingsPage,
    SearchPage,
    ServicesPage,
    TechPolicyPage,
    TechRadarPage,
    TemplatesPage,
} from 'pages';
import * as ROUTER from 'router/const';

import * as C from './const';
import * as S from './units';
import { RouteAdapter } from './utils';

const PATHS_WITHOUT_HEADER = [
    `${ROUTER.CX_PATH}${ROUTER.CJ_PATH}${ROUTER.ADD_PATH}`,
    `${ROUTER.CX_PATH}${ROUTER.BI_PATH}${ROUTER.VIEW_PATH}`,
    `${ROUTER.CX_PATH}${ROUTER.BI_PATH}${ROUTER.ADD_PATH}`,
];

export const NavigationRouter = () => {
    const [isPersonalArea, setIsPersonalArea] = useState(false);

    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        if (location.pathname?.includes(ROUTER.PERSONAL_AREA_PATH)) {
            setIsPersonalArea(true);
        } else {
            setIsPersonalArea(false);
        }
    }, [location]);

    return (
        <>
            {!PATHS_WITHOUT_HEADER.some((path) => location.pathname?.includes(path)) && (
                <Header {...{ isPersonalArea }} />
            )}

            <QueryParamProvider ReactRouterRoute={RouteAdapter}>
                <Routes>
                    <Route path={C.MAIN_PAGE_PATH} element={<MainPage />} />

                    <Route path={C.APP_INFO_PAGE_PATH} element={<AppInfoPage />} />

                    <Route
                        path={C.PERSONAL_AREA_PATH}
                        element={
                            <S.RouteWrapperStyle>
                                <MenuPersonalArea />

                                <PersonalArea />
                            </S.RouteWrapperStyle>
                        }
                    />

                    <Route
                        path={`${C.PERSONAL_AREA_PATH}${C.ROLL_SETTINGS_PATH}`}
                        element={
                            <S.RouteWrapperStyle>
                                <MenuPersonalArea />

                                <RollSettingsPage />
                            </S.RouteWrapperStyle>
                        }
                    />

                    <Route
                        path={`${C.PERSONAL_AREA_PATH}${C.ROLL_SETTINGS_PATH}${C.ADD_PATH}`}
                        element={
                            <S.RouteWrapperStyle>
                                <MenuPersonalArea />

                                <AddRollPage />
                            </S.RouteWrapperStyle>
                        }
                    />

                    <Route
                        path={C.MODELS_PATH}
                        element={
                            <S.RouteWrapperOnlyBackgroundStyle>
                                <MenuModels />

                                <ModelsPage />
                            </S.RouteWrapperOnlyBackgroundStyle>
                        }
                    />

                    <Route
                        path={`${C.MODELS_PATH}${C.SEARCH_PATH}`}
                        element={
                            <S.RouteWrapperOnlyBackgroundStyle>
                                <MenuModels />

                                <SearchPage />
                            </S.RouteWrapperOnlyBackgroundStyle>
                        }
                    />

                    <Route
                        path={`${C.MODELS_PATH}${C.FDM_PATH}`}
                        element={
                            <S.RouteWrapperOnlyBackgroundStyle>
                                <MenuModels />

                                <FDMPage />
                            </S.RouteWrapperOnlyBackgroundStyle>
                        }
                    />

                    <Route
                        path={`${C.MODELS_PATH}${C.TECH_RADAR_PATH}`}
                        element={
                            <S.RouteWrapperOnlyBackgroundStyled>
                                <MenuModels />

                                <TechRadarPage />
                            </S.RouteWrapperOnlyBackgroundStyled>
                        }
                    />

                    <Route
                        path={`${C.MODELS_PATH}${C.FDM_PATH}${C.FDM_RESULT_ID_PATH}`}
                        element={
                            <S.RouteWrapperOnlyBackgroundStyle>
                                <MenuModels />

                                <FDMResultPage />
                            </S.RouteWrapperOnlyBackgroundStyle>
                        }
                    />

                    <Route
                        path={C.DATA_BASE_PATH}
                        element={
                            <S.RouteWrapperStyle>
                                <Menu />

                                <DataBasePage />
                            </S.RouteWrapperStyle>
                        }
                    />

                    <Route
                        path={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}`}
                        element={
                            <S.RouteWrapperStyle>
                                <Menu />

                                <ArchCommPage />
                            </S.RouteWrapperStyle>
                        }
                    />

                    <Route
                        path={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}${C.ARCH_HOW_TO_PATH}`}
                        element={
                            <S.RouteWrapperStyle>
                                <Menu />

                                <HowToPage />
                            </S.RouteWrapperStyle>
                        }
                    />

                    <Route
                        path={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}${C.ARCH_CALENDAR_PATH}`}
                        element={
                            <S.RouteWrapperStyle>
                                <Menu />

                                <CalendarPage />
                            </S.RouteWrapperStyle>
                        }
                    />

                    <Route
                        path={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}${C.ARCH_TEMPLATES_PATH}`}
                        element={
                            <S.RouteWrapperStyle>
                                <Menu />

                                <TemplatesPage />
                            </S.RouteWrapperStyle>
                        }
                    />

                    <Route
                        path={`${C.DATA_BASE_PATH}${C.TECH_POLICY_PATH}`}
                        element={
                            <S.RouteWrapperStyle>
                                <Menu />

                                <TechPolicyPage />
                            </S.RouteWrapperStyle>
                        }
                    />

                    <Route
                        path={`${C.DATA_BASE_PATH}${C.SERVICES_PATH}`}
                        element={
                            <S.RouteWrapperStyle>
                                <Menu />

                                <ServicesPage />
                            </S.RouteWrapperStyle>
                        }
                    />
                    <Route
                        path={`${C.DATA_BASE_PATH}${C.SERVICES_PATH}${C.CONSULTATION_PATH}`}
                        element={<ConsultationPage />}
                    />

                    <Route path={C.PRODUCTS_PATH} element={<ProductsPage />} />

                    <Route
                        path={C.CX_PATH}
                        element={
                            <S.RouteWrapperOnlyBackgroundStyle>
                                <MenuCX />

                                <CXPage />
                            </S.RouteWrapperOnlyBackgroundStyle>
                        }
                    />

                    <Route
                        path={`${C.CX_PATH}${C.CJ_PATH}`}
                        element={
                            <S.RouteWrapperOnlyBackgroundStyled>
                                <MenuCX />

                                <CJLibraryPage />
                            </S.RouteWrapperOnlyBackgroundStyled>
                        }
                    />

                    <Route path={`${C.CX_PATH}${C.CJ_PATH}${C.ADD_PATH}`} element={<CJPage />} />

                    <Route
                        path={`${C.CX_PATH}${C.BI_PATH}`}
                        element={
                            <S.RouteWrapperOnlyBackgroundStyled>
                                <MenuCX />

                                <BILibraryPage />
                            </S.RouteWrapperOnlyBackgroundStyled>
                        }
                    />

                    <Route
                        path={`${C.CX_PATH}${C.BI_PATH}${C.VIEW_PATH}`}
                        element={<BIViewPage />}
                    />

                    <Route path={`${C.CX_PATH}${C.BI_PATH}${C.ADD_PATH}`} element={<BIAddPage />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </QueryParamProvider>
        </>
    );
};
