import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import {
    Header,
    MenuCX,
    MenuDatabase,
    MenuModels,
    MenuPersonalArea,
    MenuProfile,
    TopBanner,
} from 'components/core';
import { FeedbackButton } from 'components/interaction';

import { useGetMyRolesQuery } from 'api/queries/profile';
import {
    AdminAppsPage,
    AnalyticalPage,
    AppAddPage,
    ApplicationEditPage,
    ApplicationsPage,
    ApplicationsReviewPage,
    ApplicationViewPage,
    AppRequirementAddPage,
    AppsDashboardPage,
    AppsPage,
    AppViewArchitecrurePage,
    AppViewPage,
    ArchCommPage,
    BCAddPage,
    BIAddPage,
    BILibraryPage,
    BIViewPage,
    BPMNViewPage,
    CapabilitiesPage,
    CapabilityAddPage,
    CJAddPage,
    CJLibraryPage,
    CJPage,
    ConsultationPage,
    CreateLifeSituationsPage,
    CreateNFRsPage,
    CriteriasPage,
    CXPage,
    CypherPage,
    DataBasePage,
    E2EDashboardPage,
    E2EPage,
    ExportPage,
    FDMHistoryPage,
    FDMPage,
    FileImportPage,
    FitnessFunctionAddPage,
    FitnessFunctionsPage,
    HowToPage,
    ImpactPage,
    ImportedDataPage,
    LifeSituationsPage,
    MapAddPage,
    MapPage,
    ModelsPage,
    NotFoundPage,
    NotificationsPage,
    PackagePage,
    PatternAddPage,
    PatternsPage,
    PatternViewPage,
    PersonalMapPage,
    RoleAddPage,
    RolesPage,
    RulesPage,
    SearchPage,
    ServicesPage,
    SubscriptionsPage,
    TechnologiesPage,
    TechnologyAddPage,
    TechnologyVersionAddPage,
    TechnologyViewPage,
    TechPolicyPage,
    TechRadarPage,
    TemplatesPage,
    UsersPage,
} from 'pages';

import * as R from './const';
import * as S from './units';
import { withAdminRole } from './utils';

const PATHS_WITHOUT_HEADER = [
    `${R.CX_PATH}${R.CJ_PATH}${R.ADD_PATH}`,
    `${R.CX_PATH}${R.CJ_PATH}${R.VIEW_PATH}`,
    `${R.CX_PATH}${R.BI_PATH}${R.VIEW_PATH}`,
    `${R.CX_PATH}${R.BI_PATH}${R.ADD_PATH}`,
    `${R.CX_PATH}${R.CJ_PATH}${R.BPMN_PATH}`,
    `${R.MODELS_PATH}${R.MAP_PATH}${R.ADD_PATH}`,
    `${R.PROFILE_PATH}${R.APPLICATIONS_PATH}${R.VIEW_PATH}`,
    `${R.PROFILE_PATH}${R.REVIEW_PATH}${R.VIEW_PATH}`,
    `${R.PROFILE_PATH}${R.APPLICATIONS_PATH}${R.EDIT_PATH}`,
    `${R.PROFILE_PATH}${R.REVIEW_PATH}${R.EDIT_PATH}`,
    `${R.MODELS_PATH}${R.FDM_PATH}${R.ADD_PATH}`,
    `${R.MODELS_PATH}${R.PATTERNS_PATH}${R.ADD_PATH}`,
    `${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}${R.ADD_PATH}`,
    `${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}${R.NFR_PATH}${R.ADD_PATH}`,
    `${R.MODELS_PATH}${R.APPS_PATH}${R.REQUIREMENT_PATH}${R.ADD_PATH}`,
];

const PATHS_WITHOUT_FEEDBACK = [
    `${R.ADMIN_PATH}`,
    `${R.PROFILE_PATH}${R.REVIEW_PATH}${R.VIEW_PATH}`,
    `${R.PROFILE_PATH}${R.REVIEW_PATH}${R.EDIT_PATH}`,
    `${R.PROFILE_PATH}${R.APPLICATIONS_PATH}${R.VIEW_PATH}`,
    `${R.PROFILE_PATH}${R.APPLICATIONS_PATH}${R.EDIT_PATH}`,
    `${R.CX_PATH}${R.BI_PATH}${R.ADD_PATH}`,
    `${R.MODELS_PATH}${R.FDM_PATH}${R.ADD_PATH}`,
    `${R.MODELS_PATH}${R.ANALYTICAL_REPORT_PATH}`,
    `${R.MODELS_PATH}${R.APPS_PATH}${R.REQUIREMENT_PATH}${R.ADD_PATH}`,
];

export const NavigationRouter = () => {
    const { data: rolesData, isLoading } = useGetMyRolesQuery();

    const isAdmin =
        rolesData?.some((role) => role.alias === 'ADMINISTRATOR' && role.deleted === false) ??
        false;

    const location = useLocation();

    const isAdminPanel = location.pathname?.includes(R.ADMIN_PATH);

    const hasHeader = !PATHS_WITHOUT_HEADER.some((path) => location.pathname?.includes(path));

    useEffect(() => {
        document.documentElement.style.setProperty('--header-height', hasHeader ? '64px' : '0px');
    }, [hasHeader]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [location]);

    return (
        <>
            <TopBanner />

            {hasHeader && (
                <>
                    <Header isAdminPanel={isAdminPanel} isAdmin={isAdmin} />
                </>
            )}
            {!PATHS_WITHOUT_FEEDBACK.some((path) => location.pathname?.includes(path)) &&
                !window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND && <FeedbackButton />}

            <S.AppContent>
                <Routes>
                    <Route
                        path={R.MAIN_PAGE_PATH}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <ModelsPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.USERS_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <UsersPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.CYPHER_REQUEST_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <CypherPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.USERS_PATH}${R.ROLES_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <RolesPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.USERS_PATH}${R.ROLES_PATH}${R.ADD_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <RoleAddPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.APPS_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <AdminAppsPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.APPS_PATH}${R.ADD_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <AppAddPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.CRITERIAS_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <CriteriasPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.FITNESS_FUNCTIONS_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <FitnessFunctionsPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.FITNESS_FUNCTIONS_PATH}${R.ADD_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <FitnessFunctionAddPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.FILE_IMPORT_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <FileImportPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.IMPORTED_DATA_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <ImportedDataPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.IMPORTED_DATA_PATH}${R.PACKAGE_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <PackagePage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.TECHNOLOGIES_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <TechnologiesPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.TECHNOLOGIES_PATH}${R.ADD_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <TechnologyAddPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.TECHNOLOGIES_PATH}${R.VERSIONS_PATH}${R.ADD_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <TechnologyVersionAddPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.CAPABILITIES_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <CapabilitiesPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.CAPABILITIES_PATH}${R.ADD_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <CapabilityAddPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    <Route
                        path={R.MODELS_PATH}
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
                        path={`${R.MODELS_PATH}${R.SEARCH_PATH}`}
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
                        path={`${R.MODELS_PATH}${R.FDM_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <FDMPage isAdmin={isAdmin} />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.FDM_PATH}${R.ADD_PATH}`}
                        element={<BCAddPage />}
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.FDM_PATH}${R.HISTORY_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <FDMHistoryPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}`}
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
                        path={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}${R.VIEW_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <TechnologyViewPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.MAP_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <MapPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.MAP_PATH}${R.PERSONAL_PATH}/:id`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <PersonalMapPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.MAP_PATH}${R.ADD_PATH}`}
                        element={<MapAddPage />}
                    />

                    {window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND === false && (
                        <Route
                            path={`${R.MODELS_PATH}${R.APPS_OLD_PATH}`}
                            element={
                                <S.RouteWithDrawer>
                                    <MenuModels />
                                    <S.ContentWrapper>
                                        <AppsDashboardPage
                                            isProd={window.FEATURE_FLAGS.FLAG_IS_PROD}
                                        />
                                    </S.ContentWrapper>
                                </S.RouteWithDrawer>
                            }
                        />
                    )}

                    <Route
                        path={`${R.MODELS_PATH}${R.APPS_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <AppsPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <AppViewPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}${R.ARCHITECTURE_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <AppViewArchitecrurePage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />
                    <Route
                        path={`${R.MODELS_PATH}${R.APPS_PATH}${R.REQUIREMENT_PATH}${R.ADD_PATH}`}
                        element={<AppRequirementAddPage />}
                    />

                    {window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND === false && (
                        <Route
                            path={`${R.MODELS_PATH}${R.E2E_OLD_PATH}`}
                            element={
                                <S.RouteWithDrawer>
                                    <MenuModels />
                                    <S.ContentWrapper>
                                        <E2EDashboardPage
                                            isProd={window.FEATURE_FLAGS.FLAG_IS_PROD}
                                        />
                                    </S.ContentWrapper>
                                </S.RouteWithDrawer>
                            }
                        />
                    )}

                    {window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND === false && (
                        <Route
                            path={`${R.MODELS_PATH}${R.E2E_PATH}`}
                            element={
                                <S.RouteWithDrawer>
                                    <MenuModels />
                                    <S.ContentWrapper>
                                        <E2EPage />
                                    </S.ContentWrapper>
                                </S.RouteWithDrawer>
                            }
                        />
                    )}

                    <Route
                        path={`${R.MODELS_PATH}${R.IMPACT_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <ImpactPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.ANALYTICAL_REPORT_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <AnalyticalPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <LifeSituationsPage isAdmin={isAdmin} />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    {withAdminRole({
                        path: `${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}${R.ADD_PATH}`,
                        element: <CreateLifeSituationsPage />,
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}${R.NFR_PATH}${R.ADD_PATH}`,
                        element: <CreateNFRsPage />,
                        isAdmin,
                        isLoading,
                    })}

                    <Route
                        path={`${R.MODELS_PATH}${R.PATTERNS_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <PatternsPage isAdmin={isAdmin} />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.RULES_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <S.ContentWrapper>
                                    <RulesPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    {withAdminRole({
                        path: `${R.MODELS_PATH}${R.PATTERNS_PATH}${R.ADD_PATH}`,
                        element: <PatternAddPage />,
                        isAdmin,
                        isLoading,
                    })}

                    <Route
                        path={`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.VIEW_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <PatternViewPage isAdmin={isAdmin} />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={R.DATA_BASE_PATH}
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
                        path={`${R.DATA_BASE_PATH}${R.ARCH_COMM_PATH}`}
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
                        path={`${R.DATA_BASE_PATH}${R.ARCH_COMM_PATH}${R.ARCH_HOW_TO_PATH}`}
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
                        path={`${R.DATA_BASE_PATH}${R.ARCH_COMM_PATH}${R.ARCH_TEMPLATES_PATH}`}
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
                        path={`${R.DATA_BASE_PATH}${R.TECH_POLICY_PATH}`}
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
                        path={`${R.DATA_BASE_PATH}${R.SERVICES_PATH}`}
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
                        path={`${R.DATA_BASE_PATH}${R.SERVICES_PATH}${R.CONSULTATION_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <S.ContentWrapper>
                                    <ConsultationPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={R.CX_PATH}
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
                        path={`${R.CX_PATH}${R.CJ_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuCX />
                                <S.ContentWrapper>
                                    <CJLibraryPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route path={`${R.CX_PATH}${R.CJ_PATH}${R.VIEW_PATH}`} element={<CJPage />} />
                    <Route path={`${R.CX_PATH}${R.CJ_PATH}${R.ADD_PATH}`} element={<CJAddPage />} />

                    <Route
                        path={`${R.CX_PATH}${R.BI_PATH}`}
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
                        path={`${R.CX_PATH}${R.BI_PATH}${R.VIEW_PATH}`}
                        element={<BIViewPage />}
                    />

                    <Route
                        path={`${R.CX_PATH}${R.CJ_PATH}${R.BPMN_PATH}`}
                        element={<BPMNViewPage />}
                    />
                    <Route path={`${R.CX_PATH}${R.BI_PATH}${R.ADD_PATH}`} element={<BIAddPage />} />

                    <Route
                        path={`${R.NOTIFICATIONS_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <S.ContentWrapper>
                                    <NotificationsPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    {/* <Route
                        path={`${R.PROFILE_PATH}${R.INFO_PATH}`}
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
                        path={`${R.PROFILE_PATH}${R.SUBSCRIPTIONS_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuProfile />
                                <S.ContentWrapper>
                                    <SubscriptionsPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.PROFILE_PATH}${R.EXPORT_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuProfile />
                                <S.ContentWrapper>
                                    <ExportPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.PROFILE_PATH}${R.APPLICATIONS_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuProfile />
                                <S.ContentWrapper>
                                    <ApplicationsPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.PROFILE_PATH}${R.APPLICATIONS_PATH}${R.VIEW_PATH}`}
                        element={<ApplicationViewPage />}
                    />

                    <Route
                        path={`${R.PROFILE_PATH}${R.APPLICATIONS_PATH}${R.EDIT_PATH}`}
                        element={<ApplicationEditPage />}
                    />

                    <Route
                        path={`${R.PROFILE_PATH}${R.REVIEW_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuProfile />
                                <S.ContentWrapper>
                                    <ApplicationsReviewPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.PROFILE_PATH}${R.REVIEW_PATH}${R.VIEW_PATH}`}
                        element={<ApplicationViewPage review />}
                    />

                    <Route
                        path={`${R.PROFILE_PATH}${R.REVIEW_PATH}${R.EDIT_PATH}`}
                        element={<ApplicationEditPage review />}
                    />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </S.AppContent>
        </>
    );
};
