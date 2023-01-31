import { HttpService } from '@nestjs/axios';
import { CmsPurchaseDto } from './dto/purchase.dto';
import { CmsContestDto } from './dto/contest.dto';
import { MarketTypeForFirestoreDto } from './dto/marketGroups.dto';
export declare class CmsService {
    private httpService;
    constructor(httpService: HttpService);
    private logger;
    getRealMoneyState(defaultValueInFailureCase?: boolean): Promise<boolean>;
    getBalanceLongState(defaultValueInFailureCase?: boolean): Promise<boolean>;
    getPurchaseById(id: number): Promise<CmsPurchaseDto>;
    getMarketTypesByMarketGroupId(marketGroupId: number): Promise<MarketTypeForFirestoreDto[]>;
    getContestTemplates(templateId: string, contestType: string): Promise<Array<{
        contestTemplate: CmsContestDto;
        originalData: unknown;
    }>>;
    getContestTemplateById(id: string, contestType: string): Promise<{
        contestTemplate: CmsContestDto;
        originalData: unknown;
    }>;
    getContestTemplateByCmsId(templateCmsId: number): Promise<{
        contestTemplate: CmsContestDto;
        originalData: unknown;
    }>;
    getCmsOrder(): Promise<{
        [key: string]: {
            periodName: string;
            periodId: string;
            count: number;
            contestInstances: [];
            contests?: Array<{
                id: number;
            }>;
        };
    }>;
    isMarketTypeInContestTemplateFetch(cmsContestTemplateId: number, typeId: string, period: number): Promise<{
        exists: boolean;
    }>;
    isPublishedPurchase(purchaseCardId: number): Promise<boolean>;
}
