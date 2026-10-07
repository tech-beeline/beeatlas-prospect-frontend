export enum ParticipationView {
    E2E = 'E2E',
    USE_CASE = 'USE_CASE',
}

export const PARTICIPATION_VIEW_OPTIONS = [
    { id: ParticipationView.E2E, label: 'Шаги E2E-сценариев' },
    { id: ParticipationView.USE_CASE, label: 'Use Case' },
];

export const SEARCH_PLACEHOLDERS: Record<ParticipationView, string> = {
    [ParticipationView.E2E]: 'Сценарий, метод или техническая возможность',
    [ParticipationView.USE_CASE]: 'Use Case, метод или техническая возможность',
};
