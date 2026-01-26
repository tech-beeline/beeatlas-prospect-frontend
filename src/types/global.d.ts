export type FeatureFlags = {
    FLAG_IS_DEMO_STAND: boolean;
    FLAG_IS_FUNC: boolean;
    FLAG_AUTHENTIK_URL: string;
    FLAG_API_URL: string;
};
declare global {
    interface Window {
        FEATURE_FLAGS: FeatureFlags;
    }
}
