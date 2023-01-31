import { DynamicZoneDto } from 'modules/integrations/cms/dto/purchase.dto';
export declare class purchaseOrderItem {
    id: number;
    Name: string;
    Currency: string;
    type: string;
    isVisible: boolean;
    created_at: string;
    updated_at: string;
    DynamicZone: DynamicZoneDto[];
}
