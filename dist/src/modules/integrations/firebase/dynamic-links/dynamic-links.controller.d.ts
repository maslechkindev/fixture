import { FirebaseDynamicLinksService } from './index';
import { DynamicLinksBodyDto, DynamicLinksResponseDto } from './dto/getDynamicLink.dto';
export declare class DynamicLinksController {
    private firebaseDynamicLinksService;
    constructor(firebaseDynamicLinksService: FirebaseDynamicLinksService);
    generate({ link, socialTitle, socialDescription, socialImageLink, }: DynamicLinksBodyDto): Promise<DynamicLinksResponseDto>;
}
