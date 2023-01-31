import { Response as ResType } from 'express';
import { User as UserType } from '../../interfaces/user.interface';
import { PageImagesService } from './page-images.service';
export declare class PageImagesController {
    private readonly pageImagesService;
    constructor(pageImagesService: PageImagesService);
    contestInstanceLeaderboard(res: ResType, contestId: string, instanceId: string, userId: string, user: UserType): Promise<void>;
}
