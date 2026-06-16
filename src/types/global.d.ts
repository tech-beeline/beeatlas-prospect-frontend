export type FeatureFlags = {
    FLAG_IS_PROD: boolean;
    FLAG_IS_DEMO_STAND: boolean;
    FLAG_AUTHENTIK_URL: string;
    FLAG_API_URL: string;
    FLAG_DOC_SERVICE_URL: string;
    FLAG_WEBIDE_URL: string;
    FLAG_AUTHENTIK_CLIENT_ID: string;
    FLAG_EAUTH_URL: string;
    FLAG_TEMPLATE_URL: string;
    FLAG_DASHBOARD_URL: string;
};
declare global {
    interface Window {
        FEATURE_FLAGS: FeatureFlags;
    }
}
