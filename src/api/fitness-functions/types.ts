export interface IFitnessFunctionData {
    id: number;
    code: string;
    description: string;
    applicability: string | null;
    auxiliary_check: boolean;
    status: string;
    script: string | null;
    method: string | null;
    method_synchronous: boolean;
}

export interface IFitnessFunctionForm {
    description: string;
    applicability?: string | null;
    auxiliary_check?: string | null;
    script?: string | null;
    script_file?: File;
    method?: string | null;
    method_synchronous?: string | null;
}

export interface IRunFitnessFunctionResult {
    code: string;
    app: string;
    success: boolean;
    message: string;
    check_result: {
        details?: {
            check: boolean;
            [key: string]: string | boolean;
        }[];
        pending?: boolean;
        callId?: string;
    };
    status: string;
}

export interface IProductFitnessFunctions {
    id: number;
    product_code: string;
    ff_id: number;
    ff_code: string;
    ff_description: string;
    status: string;
    is_check: boolean;
    create_date: string;
    details:
        | {
              check: boolean;
              [key: string]: string | boolean;
          }[]
        | null;
    countDetail: number;
    successDetail: number;
}
export interface IProductFitnessFunctionsCompleteData {
    product_code: string;
    results: IProductFitnessFunctions[];
}
