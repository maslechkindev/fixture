import { DynamicZoneDto } from 'modules/integrations/cms/dto/purchase.dto';
export declare class buyPurchaseDto {
    id: number;
    Name: string;
    Currency: string;
    type: string;
    isVisible: boolean;
    createad_at: string;
    updated_at: string;
    DynamicZone: DynamicZoneDto[];
}
