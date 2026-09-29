import {
    IApplyProjectUsecaseImport,
    IProjectUsecase,
    IProjectUsecaseApplication,
    IProjectUsecaseImportHistoryItem,
    IProjectUsecaseImportOptions,
    IProjectUsecaseImportResult,
    IProjectUsecaseListItem,
    IProjectUsecaseScenarioStep,
    ISaveProjectUsecaseResolution,
    IStartProjectUsecaseImport,
    ProjectUsecaseApplicationStatus,
    ProjectUsecaseCallStatus,
    ProjectUsecaseImportMode,
    ProjectUsecaseImportStatus,
    ProjectUsecaseResolutionType,
    ProjectUsecaseSource,
    ProjectUsecaseStatus,
} from './types';

const wait = (timeout = 500) => new Promise((resolve) => window.setTimeout(resolve, timeout));

const USECASE_NAMES = [
    'Онлайн заказ: создание заказа CJ-0042',
    'Онлайн заказ: подтверждение заказа CJ-0042',
    'Онлайн заказ: изменение заказа CJ-0042',
];

let usecases: IProjectUsecaseListItem[] = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    projectId: 1,
    name: USECASE_NAMES[index % USECASE_NAMES.length],
    code: `UC-${String(index + 1).padStart(3, '0')}`,
    source: ProjectUsecaseSource.MANUAL_IMPORT,
    status: ProjectUsecaseStatus.PUBLISHED,
    updatedDate: '2026-08-18T14:56:00',
}));

const MOCK_PLANT_UML = `@startuml
actor Пользователь as user
participant "app" as app
participant "ext_gateway" as ext_gateway
participant "cart_service" as cart_service
participant "order_service" as order_service
user -> app: Оформить заказ
app -> ext_gateway: authorize_user
app -> cart_service: get_cart
app -> order_service: create_order
@enduml`;

const importOptions: Omit<IProjectUsecaseImportOptions, 'scenarios'> = {
    biSteps: [
        { id: 1, value: 'Онлайн заказ: выбор и оплата → Пользователь оформляет заказ' },
        { id: 2, value: 'Онлайн заказ: подтверждение → Система подтверждает заказ' },
    ],
    applications: [
        {
            id: 1,
            value: 'beetlas',
            mnemonic: 'beetlas',
            containers: [
                {
                    id: 11,
                    value: 'Сервис бонусов',
                    interfaces: [
                        { id: 111, value: 'Loyalty API', code: 'loyalty_api.loyalty.loy' },
                        { id: 112, value: 'Bonus REST API', code: 'bonus_api.v1' },
                    ],
                },
            ],
        },
        {
            id: 2,
            value: 'mobileapp',
            mnemonic: 'mobileapp',
            containers: [
                {
                    id: 21,
                    value: 'Мобильный backend',
                    interfaces: [{ id: 211, value: 'Mobile API', code: 'mobile_api.v1' }],
                },
            ],
        },
    ],
    protocols: [
        { id: 1, value: 'REST' },
        { id: 2, value: 'gRPC' },
        { id: 3, value: 'Kafka' },
    ],
};

const createScenarioSteps = (): IProjectUsecaseScenarioStep[] =>
    Array.from({ length: 5 }, (_, index) => ({
        id: index + 1,
        code: `P-${String(index + 1).padStart(2, '0')}`,
        caller: 'app — ext_gateway',
        callee: 'authorize_user',
        action: 'Пользователь вводит логин и пароль',
        call: {
            id: 1,
            code: 'GET /api/v1/users/me',
            name: 'GET /api/v1/users/me',
            productAlias: '1',
        },
        technicalCapability: {
            id: 1,
            code: 'TC 123456',
            name: 'Возможность авторизации пользователя',
        },
        dynamic: { id: 1, code: 'SEQ-88', name: 'SEQ-88', plantUml: MOCK_PLANT_UML },
        status: ProjectUsecaseCallStatus.CONFIRMED,
    }));

const createApplications = (): IProjectUsecaseApplication[] =>
    ['mobileapp', 'ext_gateway', 'cart_service', 'pricing_service', 'order_service'].map(
        (mnemonic, index) => ({
            id: index + 1,
            mnemonic,
            name: `Приложение ${mnemonic}`,
            type: 'Приложение',
            status:
                index === 1
                    ? ProjectUsecaseApplicationStatus.UNRECOGNIZED
                    : ProjectUsecaseApplicationStatus.RECOGNIZED,
        }),
    );

const details = new Map<number, IProjectUsecase>();
const results = new Map<number, IProjectUsecaseImportResult>();
let nextImportId = 1;
let nextUsecaseId = usecases.length + 1;
let nextHistoryId = 123123456;

const cloneResult = (result: IProjectUsecaseImportResult): IProjectUsecaseImportResult => ({
    ...result,
    summary: { ...result.summary },
    participants: result.participants.map((item) => ({ ...item })),
    mappedParts: result.mappedParts.map((item) => ({
        ...item,
        call: { ...item.call },
        technicalCapability: { ...item.technicalCapability },
        dynamic: { ...item.dynamic },
    })),
    unmappedParts: result.unmappedParts.map((item) => ({
        ...item,
        resolution: item.resolution ? { ...item.resolution } : null,
    })),
});

const updateSummary = (result: IProjectUsecaseImportResult) => {
    result.summary = {
        confirmed: result.mappedParts.filter(
            ({ status }) => status === ProjectUsecaseCallStatus.CONFIRMED,
        ).length,
        unresolved: result.unmappedParts.filter(({ resolution }) => !resolution).length,
        planned: result.unmappedParts.filter(({ resolution }) => resolution).length,
    };
};

const toDetails = (usecase: IProjectUsecaseListItem): IProjectUsecase =>
    details.get(usecase.id) ?? {
        ...usecase,
        projectName: 'Архитектурный проект',
        cjRelation: {
            cj: { id: 1, code: 'CJ.01.01.01', name: 'Название CJ' },
            callerApplication: { id: 1, code: 'STEP 123456', name: 'Название приложения' },
        },
        scenarioSteps: createScenarioSteps(),
        applications: createApplications(),
    };

const history: IProjectUsecaseImportHistoryItem[] = [
    ProjectUsecaseImportStatus.APPLIED,
    ProjectUsecaseImportStatus.ERROR,
    ProjectUsecaseImportStatus.CANCELLED,
].map((status) => ({
    id: nextHistoryId++,
    usecaseId: 1,
    date: '2026-08-18T14:56:00',
    source: ProjectUsecaseSource.MANUAL_IMPORT,
    status,
}));

export const getProjectUsecases = async (projectId: string | number) => {
    if (!projectId) return [];
    return usecases;
};

export const getProjectUsecase = async (
    id: number | string,
): Promise<IProjectUsecase | undefined> => {
    const usecase = usecases.find((item) => String(item.id) === String(id));
    return usecase ? toDetails(usecase) : undefined;
};

export const getProjectUsecaseHistory = async (usecaseId: number | string) =>
    history
        .filter((item) => String(item.usecaseId) === String(usecaseId))
        .map((item) => ({ ...item }));

export const getProjectUsecaseImportOptions = async (
    projectId: number,
): Promise<IProjectUsecaseImportOptions> => {
    await wait(150);
    return {
        ...importOptions,
        scenarios: usecases
            .filter((item) => item.projectId === projectId || projectId > 0)
            .map((item) => ({ id: item.id, value: item.name })),
    };
};

export const startProjectUsecaseImport = async (
    input: IStartProjectUsecaseImport,
): Promise<IProjectUsecaseImportResult> => {
    await wait();
    const importId = nextImportId++;
    const unmappedParts: IProjectUsecaseImportResult['unmappedParts'] = [
        {
            id: 101,
            code: 'P-06',
            caller: 'order_service',
            callee: 'loyalty_service',
            action: 'apply_bonus_points',
            reason: 'Система «loyalty_service» не найдена в ландшафте BeeAtlas',
            resolution: null,
        },
        {
            id: 102,
            code: 'P-07',
            caller: 'loyalty_service',
            callee: 'notification_service',
            action: 'send_bonus_notification',
            reason: 'Интерфейс notification_service не удалось сопоставить автоматически',
            resolution: null,
        },
    ];
    const result: IProjectUsecaseImportResult = {
        id: importId,
        projectId: input.projectId,
        mode: input.mode,
        name:
            input.mode === ProjectUsecaseImportMode.NEW
                ? input.name
                : usecases.find(({ id }) => id === input.usecaseId)?.name ?? input.name,
        usecaseId: input.usecaseId,
        biStepId: input.biStepId,
        plantUml: input.plantUml || MOCK_PLANT_UML,
        summary: { confirmed: 0, unresolved: 0, planned: 0 },
        participants: createApplications(),
        mappedParts: createScenarioSteps(),
        unmappedParts,
    };
    updateSummary(result);
    results.set(importId, result);
    return cloneResult(result);
};

export const saveProjectUsecaseResolution = async ({
    importId,
    partId,
    resolution,
}: ISaveProjectUsecaseResolution): Promise<IProjectUsecaseImportResult> => {
    await wait(250);
    const result = results.get(importId);
    const part = result?.unmappedParts.find(({ id }) => id === partId);
    if (!result || !part) throw new Error('Часть сценария не найдена.');
    part.resolution = resolution;
    updateSummary(result);
    return cloneResult(result);
};

export const applyProjectUsecaseImport = async ({
    importId,
}: IApplyProjectUsecaseImport): Promise<IProjectUsecase> => {
    await wait(350);
    const result = results.get(importId);
    if (!result || result.unmappedParts.some(({ resolution }) => !resolution)) {
        throw new Error('Сохраните решения для всех несмаппированных частей сценария.');
    }
    const existing = result.usecaseId
        ? usecases.find(({ id }) => id === result.usecaseId)
        : undefined;
    const id = existing?.id ?? nextUsecaseId++;
    const item: IProjectUsecaseListItem = {
        id,
        projectId: result.projectId,
        name: result.name,
        code: existing?.code ?? `UC-${String(id).padStart(3, '0')}`,
        source: ProjectUsecaseSource.MANUAL_IMPORT,
        status: ProjectUsecaseStatus.PUBLISHED,
        updatedDate: new Date().toISOString(),
    };
    usecases = existing
        ? usecases.map((value) => (value.id === id ? item : value))
        : [item, ...usecases];
    const plannedParts = result.unmappedParts.map((part) => {
        const application = importOptions.applications.find(
            ({ id: applicationId }) => applicationId === part.resolution?.applicationId,
        );
        const resolution = part.resolution;
        const code =
            resolution?.type === ProjectUsecaseResolutionType.NEW
                ? resolution.interfaceCode
                : resolution
                ? application?.containers
                      .find(({ id: containerId }) => containerId === resolution.containerId)
                      ?.interfaces.find(
                          ({ id: interfaceId }) => interfaceId === resolution.interfaceId,
                      )?.code ?? 'Интерфейс'
                : 'Интерфейс';
        return {
            id: part.id,
            code: part.code,
            caller: part.caller,
            callee: part.callee,
            action: part.action,
            call: { id: part.id, code, name: code, productAlias: application?.mnemonic ?? '' },
            technicalCapability: { id: part.id, code: 'TC PLANNED', name: 'Планируемая ТС' },
            dynamic: {
                id: part.id,
                code: `SEQ-${part.id}`,
                name: `SEQ-${part.id}`,
                plantUml: result.plantUml,
            },
            status: ProjectUsecaseCallStatus.PLANNED,
        };
    });
    const usecase: IProjectUsecase = {
        ...toDetails(item),
        ...item,
        scenarioSteps: [...result.mappedParts, ...plannedParts],
        applications: result.participants,
    };
    details.set(id, usecase);
    history.unshift({
        id: nextHistoryId++,
        usecaseId: id,
        date: item.updatedDate,
        source: ProjectUsecaseSource.MANUAL_IMPORT,
        status: ProjectUsecaseImportStatus.APPLIED,
    });
    return usecase;
};
