import { componentNames } from '../../../purchase/enums/componentNames.enum';
export declare class CmsPurchaseDto {
    id: number;
    currency: string;
    name: string;
    type: string;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
    DynamicZone: DynamicZoneDto[];
}
export declare class DynamicZoneDto {
    component: componentNames;
    qtyToSell: number | null;
    premium: boolean;
    startDate: string;
    endDate: string;
    tokens: {
        [key: string]: number;
    };
    allowedMonthsNumber: number | null;
    id: number;
    pricePerPeriod: number | null;
    totalAmount: number | null;
    pricePerMonth: number | null;
    Discount: number | null;
    description?: string;
    tokensOptions: TokensOptionsDto[];
}
export declare class TokensOptionsDto {
    id: number;
    tokens: number | null;
    price: number | null;
}
