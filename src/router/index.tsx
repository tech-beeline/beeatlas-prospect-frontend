import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import {
    Header,
    MenuCX,
    MenuDatabase,
    MenuModels,
    MenuPersonalArea,
    MenuProfile,
} from 'components/core';

import {
    AddRollPage,
    AppInfoPage,
    ArchCommPage,
    BIAddPage,
    BILibraryPage,
    BIViewPage,
    CapabilitiesPage,
    CapabilityAddPage,
    CJLibraryPage,
    CJPage,
    ConsultationPage,
    CXPage,
    DataBasePage,
    FDMPage,
    HowToPage,
    MainPage,
    ModelsPage,
    NotFoundPage,
    NotificationsPage,
    PersonalArea,
    RollSettingsPage,
    SearchPage,
    ServicesPage,
    SubscriptionsPage,
    TechnologiesPage,
    TechnologyAddPage,
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

        if (
            location.pathname?.includes(ROUTER.PERSONAL_AREA_PATH) ||
            location.pathname?.includes(ROUTER.TECHNOLOGIES_PATH) ||
            location.pathname?.includes(ROUTER.IMPORTED_DATA_PATH) ||
            location.pathname?.includes(ROUTER.CAPABILITIES_PATH)
        ) {
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
                    <Route
                        path={C.MAIN_PAGE_PATH}
                        element={
                            <S.RouteWithDrawer>
                                <S.ContentWrapper>
                                    <MainPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route path={C.APP_INFO_PAGE_PATH} element={<AppInfoPage />} />

                    <Route
                        path={C.PERSONAL_AREA_PATH}
                        element={
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <PersonalArea />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    {/* <Route
                        path={C.IMPORTED_DATA_PATH}
                        element={
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <ImportedDataPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    /> */}

                    {/* <Route
                        path={`${C.IMPORTED_DATA_PATH}${C.PACKAGE_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <PackagePage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    /> */}

                    <Route
                        path={C.TECHNOLOGIES_PATH}
                        element={
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <TechnologiesPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${C.TECHNOLOGIES_PATH}${C.ADD_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <TechnologyAddPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={C.CAPABILITIES_PATH}
                        element={
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <CapabilitiesPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${C.CAPABILITIES_PATH}${C.ADD_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <CapabilityAddPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${C.PERSONAL_AREA_PATH}${C.ROLL_SETTINGS_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <RollSettingsPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${C.PERSONAL_AREA_PATH}${C.ROLL_SETTINGS_PATH}${C.ADD_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <AddRollPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={C.MODELS_PATH}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <ModelsPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${C.MODELS_PATH}${C.SEARCH_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <SearchPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${C.MODELS_PATH}${C.FDM_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <FDMPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${C.MODELS_PATH}${C.TECH_RADAR_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper hideXOverflow>
                                    <TechRadarPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${C.MODELS_PATH}${C.APPS_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <S.IFrameStyled src="https://dashboard-prod-eafdmmart.apps.yd-m3-k21.vimpelcom.ru/systems" />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${C.MODELS_PATH}${C.E2E_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <S.IFrameStyled src="https://dashboard-prod-eafdmmart.apps.yd-m3-k21.vimpelcom.ru/e2e/processes" />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={C.DATA_BASE_PATH}
                        element={
                            <S.RouteWithDrawer>
                                <MenuDatabase />
                                <S.ContentWrapper>
                                    <DataBasePage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuDatabase />
                                <S.ContentWrapper>
                                    <ArchCommPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}${C.ARCH_HOW_TO_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuDatabase />
                                <S.ContentWrapper>
                                    <HowToPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}${C.ARCH_TEMPLATES_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuDatabase />
                                <S.ContentWrapper>
                                    <TemplatesPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${C.DATA_BASE_PATH}${C.TECH_POLICY_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuDatabase />
                                <S.ContentWrapper>
                                    <TechPolicyPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${C.DATA_BASE_PATH}${C.SERVICES_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuDatabase />
                                <S.ContentWrapper>
                                    <ServicesPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />
                    <Route
                        path={`${C.DATA_BASE_PATH}${C.SERVICES_PATH}${C.CONSULTATION_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <S.ContentWrapper>
                                    <ConsultationPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={C.CX_PATH}
                        element={
                            <S.RouteWithDrawer>
                                <MenuCX />
                                <S.ContentWrapper>
                                    <CXPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${C.CX_PATH}${C.CJ_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuCX />
                                <S.ContentWrapper>
                                    <CJLibraryPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route path={`${C.CX_PATH}${C.CJ_PATH}${C.ADD_PATH}`} element={<CJPage />} />

                    <Route
                        path={`${C.CX_PATH}${C.BI_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuCX />
                                <S.ContentWrapper>
                                    <BILibraryPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${C.CX_PATH}${C.BI_PATH}${C.VIEW_PATH}`}
                        element={<BIViewPage />}
                    />

                    <Route path={`${C.CX_PATH}${C.BI_PATH}${C.ADD_PATH}`} element={<BIAddPage />} />

                    <Route
                        path={`${C.NOTIFICATIONS_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <S.ContentWrapper>
                                    <NotificationsPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    {/* <Route
                        path={`${C.PROFILE_PATH}${C.INFO_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuProfile />
                                <S.ContentWrapper>
                                    <InDevelopmentPage title="Профиль" />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    /> */}

                    <Route
                        path={`${C.PROFILE_PATH}${C.SUBSCRIPTIONS_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuProfile />
                                <S.ContentWrapper>
                                    <SubscriptionsPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    {/* <Route
                        path={`${C.PROFILE_PATH}${C.APPLICATIONS_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuProfile />
                                <S.ContentWrapper>
                                    <InDevelopmentPage title="Мои заявки" />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    /> */}

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </QueryParamProvider>
        </>
    );
};
