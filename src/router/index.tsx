import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import { Header, Menu, MenuModels, MenuPersonalArea } from 'components/core';

import {
    AppInfoPage,
    ArchCommPage,
    CalendarPage,
    ConsultationPage,
    DataBasePage,
    FDMPage,
    FDMResultPage,
    HowToPage,
    MainPage,
    ModelsPage,
    PersonalArea,
    ProductsPage,
    SearchPage,
    ServicesPage,
    TechPolicyPage,
    TechRadarPage,
    TemplatesPage,
} from 'pages';
import * as ROUTER from 'router/const';
import { Theme, theme } from 'styles';

import * as C from './const';
import { RouteAdapter } from './utils';

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
        <Theme>
            <Header {...{ isPersonalArea }} />

            <QueryParamProvider ReactRouterRoute={RouteAdapter}>
                <Routes>
                    <Route path={C.MAIN_PAGE_PATH} element={<MainPage />} />

                    <Route path={C.APP_INFO_PAGE_PATH} element={<AppInfoPage />} />

                    <Route
                        path={C.PERSONAL_AREA_PATH}
                        element={
                            <div
                                style={{
                                    height: '100vh',
                                    paddingLeft: '256px',
                                    backgroundColor: theme.colors.backgroundLow,
                                }}
                            >
                                <MenuPersonalArea />
                                <PersonalArea />
                            </div>
                        }
                    />

                    <Route
                        path={C.MODELS_PATH}
                        element={
                            <div
                                style={{
                                    backgroundColor: theme.colors.backgroundLow,
                                }}
                            >
                                <MenuModels />
                                <ModelsPage />
                            </div>
                        }
                    />
                    <Route
                        path={`${C.MODELS_PATH}${C.SEARCH_PATH}`}
                        element={
                            <div
                                style={{
                                    backgroundColor: theme.colors.backgroundLow,
                                }}
                            >
                                <MenuModels />
                                <SearchPage />
                            </div>
                        }
                    />
                    <Route
                        path={`${C.MODELS_PATH}${C.FDM_PATH}`}
                        element={
                            <div
                                style={{
                                    overflow: 'hidden',
                                    height: '100%',
                                    backgroundColor: theme.colors.backgroundLow,
                                }}
                            >
                                <MenuModels />
                                <FDMPage />
                            </div>
                        }
                    />
                    <Route
                        path={`${C.MODELS_PATH}${C.TECH_RADAR_PATH}`}
                        element={
                            <div
                                style={{
                                    // overflow: 'hidden',
                                    height: '100%',
                                    backgroundColor: theme.colors.backgroundLow,
                                }}
                            >
                                <MenuModels />
                                <TechRadarPage />
                            </div>
                        }
                    />
                    <Route
                        path={`${C.MODELS_PATH}${C.FDM_PATH}${C.FDM_RESULT_ID_PATH}`}
                        element={
                            <div
                                style={{
                                    backgroundColor: theme.colors.backgroundLow,
                                }}
                            >
                                <MenuModels />
                                <FDMResultPage />
                            </div>
                        }
                    />

                    <Route
                        path={C.DATA_BASE_PATH}
                        element={
                            <div
                                style={{
                                    height: '100vh',
                                    paddingLeft: '256px',
                                    backgroundColor: theme.colors.backgroundLow,
                                }}
                            >
                                <Menu />
                                <DataBasePage />
                            </div>
                        }
                    />
                    <Route
                        path={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}`}
                        element={
                            <div
                                style={{
                                    height: '100vh',
                                    paddingLeft: '256px',
                                    backgroundColor: theme.colors.backgroundLow,
                                }}
                            >
                                <Menu />
                                <ArchCommPage />
                            </div>
                        }
                    />
                    <Route
                        path={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}${C.ARCH_HOW_TO_PATH}`}
                        element={
                            <div
                                style={{
                                    height: '100vh',
                                    paddingLeft: '256px',
                                    backgroundColor: theme.colors.backgroundLow,
                                }}
                            >
                                <Menu />
                                <HowToPage />
                            </div>
                        }
                    />
                    <Route
                        path={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}${C.ARCH_CALENDAR_PATH}`}
                        element={
                            <div
                                style={{
                                    height: '100vh',
                                    paddingLeft: '256px',
                                    backgroundColor: theme.colors.backgroundLow,
                                }}
                            >
                                <Menu />
                                <CalendarPage />
                            </div>
                        }
                    />
                    <Route
                        path={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}${C.ARCH_TEMPLATES_PATH}`}
                        element={
                            <div
                                style={{
                                    height: '100vh',
                                    paddingLeft: '256px',
                                    backgroundColor: theme.colors.backgroundLow,
                                }}
                            >
                                <Menu />
                                <TemplatesPage />
                            </div>
                        }
                    />

                    <Route
                        path={`${C.DATA_BASE_PATH}${C.TECH_POLICY_PATH}`}
                        element={
                            <div
                                style={{
                                    height: '100vh',
                                    paddingLeft: '256px',
                                    backgroundColor: theme.colors.backgroundLow,
                                }}
                            >
                                <Menu />
                                <TechPolicyPage />
                            </div>
                        }
                    />

                    <Route
                        path={`${C.DATA_BASE_PATH}${C.SERVICES_PATH}`}
                        element={
                            <div
                                style={{
                                    height: '100vh',
                                    paddingLeft: '256px',
                                    backgroundColor: theme.colors.backgroundLow,
                                }}
                            >
                                <Menu />
                                <ServicesPage />
                            </div>
                        }
                    />
                    <Route
                        path={`${C.DATA_BASE_PATH}${C.SERVICES_PATH}${C.CONSULTATION_PATH}`}
                        element={<ConsultationPage />}
                    />

                    <Route path={C.PRODUCTS_PATH} element={<ProductsPage />} />
                </Routes>
            </QueryParamProvider>
        </Theme>
    );
};
