import { IDashboardVersionRun, IDashboardVersionStatus } from 'api/staging-sequence/types';

export const toDashboardVersionStatus = ({
    status,
    context,
    dashboard_version: version,
}: IDashboardVersionRun): IDashboardVersionStatus => ({
    id: version.id,
    uid: version.uid,
    name: version.name,
    version: version.version,
    template_id: version.template_id,
    status: status ?? version.status,
    created: version.created,
    creator: version.creator ?? '',
    note: version.note ?? context?.message ?? '',
    sourceUid: context?.uid ?? null,
    url: version.url ?? null,
});
