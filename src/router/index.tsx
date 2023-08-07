import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import { Header, Menu, MenuModels, MenuPersonalArea } from 'components/core';

import {
    AddRollPage,
    AppInfoPage,
    ArchCommPage,
    CalendarPage,
    CJPage,
    ConsultationPage,
    DataBasePage,
    FDMPage,
    FDMResultPage,
    HowToPage,
    MainPage,
    ModelsPage,
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
import { RouteAdapter } from './utils';
import { Theme } from 'styles';

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
            {!location.pathname?.includes(ROUTER.CJ_PATH) && <Header {...{ isPersonalArea }} />}

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
                                    backgroundColor: 'var(--color-background-base)',
                                }}
                            >
                                <MenuPersonalArea />
                                <PersonalArea />
                            </div>
                        }
                    />

                    <Route
                        path={`${C.PERSONAL_AREA_PATH}${C.ROLL_SETTINGS_PATH}`}
                        element={
                            <div
                                style={{
                                    height: '100vh',
                                    paddingLeft: '256px',
                                    backgroundColor: 'var(--color-background-base)',
                                }}
                            >
                                <MenuPersonalArea />
                                <RollSettingsPage />
                            </div>
                        }
                    />

                    <Route
                        path={`${C.PERSONAL_AREA_PATH}${C.ROLL_SETTINGS_PATH}${C.ADD_PATH}`}
                        element={
                            <div
                                style={{
                                    height: '100vh',
                                    paddingLeft: '256px',
                                    backgroundColor: 'var(--color-background-base)',
                                }}
                            >
                                <MenuPersonalArea />
                                <AddRollPage />
                            </div>
                        }
                    />

                    <Route
                        path={C.MODELS_PATH}
                        element={
                            <div
                                style={{
                                    backgroundColor: 'var(--color-background-base)',
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
                                    backgroundColor: 'var(--color-background-base)',
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
                                    backgroundColor: 'var(--color-background-base)',
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
                                    backgroundColor: 'var(--color-background-base)',
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
                                    backgroundColor: 'var(--color-background-base)',
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
                                    backgroundColor: 'var(--color-background-base)',
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
                                    backgroundColor: 'var(--color-background-base)',
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
                                    backgroundColor: 'var(--color-background-base)',
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
                                    backgroundColor: 'var(--color-background-base)',
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
                                    backgroundColor: 'var(--color-background-base)',
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
                                    backgroundColor: 'var(--color-background-base)',
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
                                    backgroundColor: 'var(--color-background-base)',
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

                    <Route path={C.CJ_PATH} element={<CJPage />} />
                </Routes>
            </QueryParamProvider>
        </Theme>
    );
};
