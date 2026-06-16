import { ISystemE2E } from 'api/product/types';

export const reduceE2EData = (data: ISystemE2E[] | undefined) =>
    data
        ? Object.entries(
              data.reduce((acc, currentE2e) => {
                  if (acc[currentE2e.e2e]) {
                      acc[currentE2e.e2e].push({
                          operation: currentE2e.operation,
                          clients: currentE2e.client,
                      });
                  } else {
                      acc = {
                          ...acc,
                          [currentE2e.e2e]: [
                              { operation: currentE2e.operation, clients: currentE2e.client },
                          ],
                      };
                  }
                  return acc;
              }, {} as Record<string, { operation: string; clients: string[] }[]>),
          ).map((entry) => ({ name: entry[0], operations: entry[1] }))
        : undefined;
