export declare class DebugTokenResponseDTO {
    app_id: string;
    type: string;
    application: string;
    data_access_expires_at: number;
    expires_at: number;
    is_valid: boolean;
    scopes: string[];
    granular_scopes: Array<{
        scope: string;
        target_ids: string[];
    }>;
    user_id: string;
}
