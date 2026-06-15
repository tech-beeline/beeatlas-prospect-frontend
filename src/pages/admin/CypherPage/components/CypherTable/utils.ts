import type { ICypherDiagram, ICypherRecordValue, ICypherRelationship } from 'api/graph/types';
import { formatNullableString } from 'utils/formatters';

const COLS: (keyof ICypherDiagram)[] = ['m', 'r', 'n'];

export const getColumns = (data: ICypherDiagram[]): (keyof ICypherDiagram)[] =>
    data.length === 0 ? [] : COLS.filter((key) => data.some((row) => row[key] !== undefined));

export const formatCellValue = (val: ICypherRecordValue | undefined): string => {
    if (val == null) return '-';

    if ('labels' in val && Array.isArray(val.labels)) {
        const p = val.properties;
        return formatNullableString(p.name?.trim());
    }

    const r = val as ICypherRelationship;
    const tech = r.properties.technology?.trim();
    return tech ? `${r.type} · ${tech}` : r.type;
};
