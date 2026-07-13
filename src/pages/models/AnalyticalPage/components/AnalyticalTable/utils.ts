import { IFitnessFunctionsAggregationResult } from 'api/product/types';

import { formatCellText } from './components/FitnessFunctionLabel/utils';
import { IRowItem, RowItems } from './types';

const escapeXml = (value: string) =>
    value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');

const downloadXlsSpreadsheetML = (
    fileName: string,
    sheetName: string,
    data: Array<Array<string | number>>,
) => {
    const workbookXml = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Worksheet ss:Name="${escapeXml(sheetName)}">
  <Table>
${data
    .map(
        (row) => `   <Row>
${row
    .map((cell) => {
        const isNumber = typeof cell === 'number' && Number.isFinite(cell);
        const type = isNumber ? 'Number' : 'String';
        const text = isNumber ? String(cell) : escapeXml(String(cell ?? ''));
        return `    <Cell><Data ss:Type="${type}">${text}</Data></Cell>`;
    })
    .join('\n')}
   </Row>`,
    )
    .join('\n')}
  </Table>
 </Worksheet>
</Workbook>`;

    // BOM помогает Excel (особенно Windows) корректно распознать UTF-8.
    const bom = '\uFEFF';
    const blob = new Blob([bom, workbookXml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
};

export const exportAnalyticalTableToExcel = ({
    fitnessFunctionsData,
    rows,
}: {
    fitnessFunctionsData: IFitnessFunctionsAggregationResult;
    rows: IRowItem[];
}) => {
    const header: Array<string> = [
        'Блок / Продукт',
        ...fitnessFunctionsData.fitnessFunctionEnum.map((ff) => `${ff.code} ${ff.description}`),
    ];

    const body: Array<Array<string | number>> = rows.map((item) => {
        const domain = fitnessFunctionsData.domain[item.domainIndex];

        if (item.type === RowItems.DOMAIN) {
            const name = domain.name;
            const cells = fitnessFunctionsData.fitnessFunctionEnum.map((fitnessFunction) => {
                const products = domain.product;
                const productsWithFF = products.filter((product) =>
                    product.fitnessFunctions.find((ff) => ff.ff_id === fitnessFunction.id),
                );

                const checkedProducts = productsWithFF.filter((product) => {
                    const productFF = product.fitnessFunctions.find(
                        (ff) => ff.ff_id === fitnessFunction.id,
                    );
                    return Boolean(productFF && productFF.is_check);
                });

                // Логика экспорта должна совпадать с `FitnessFunctionProgressBar`.
                // В UI процент считается относительно ВСЕХ продуктов домена.
                const percent = (checkedProducts.length / products.length) * 100;
                const percentText = `${percent.toFixed()}%`;

                return `${percentText} (всего: ${products.length}, с ФФ: ${productsWithFF.length}, пройденных: ${checkedProducts.length})`;
            });

            return [name, ...cells];
        }

        const product = domain.product[item.productIndex];
        const name = product?.name ? `  ${product.name}` : '';

        const cells = fitnessFunctionsData.fitnessFunctionEnum.map((fitnessFunction) => {
            const productFF = product?.fitnessFunctions.find(
                (ff) => ff.ff_id === fitnessFunction.id,
            );
            if (!productFF) return '';
            return formatCellText(productFF);
        });

        return [name, ...cells];
    });

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const HH = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    const fileName = `fitness-functions-report-${yyyy}-${mm}-${dd}_${HH}-${min}-${ss}.xls`;
    downloadXlsSpreadsheetML(fileName, 'Аналитика', [header, ...body]);
};
