import { UsersService } from './users.service';
import { AccountConfirmationService } from 'modules/user-management/auth/user-activity-links/account-confirmation/account-confirmation.service';
import { GetUsersDto, GetUsersResponseDto } from './dto/getUsers.dto';
import { GetUserDto, GetUserResponseDto } from './dto/getUser.dto';
import { UpdateUserDto, UpdateUserResponseDto } from './dto/updateUser.dto';
import { BanUserDto, BanUserResponseDto } from './dto/banUser.dto';
import { SetPremiumTermsDto, SetPremiumTermsResponseDto } from './dto/setPremiumTerms.dto';
import { GetUserTransactionsResponseDto } from './dto/getUserTransactions.dto';
import { ReplenishBalanceDto, ReplenishBalanceResponseDto } from './dto/replenishBalance.dto';
import { GetUsernameStatisticsResponseDto } from './dto/getUsernameStatistics.dto';
import { QueryParamsDTO } from './dto/queryParams.dto';
import { FiltersDto } from './dto/filters.dto';
import { GetHomeLinkRequestDto } from './dto/getHomeLink.dto';
import { MailingService } from 'modules/integrations/mailing';
export declare class UsersController {
    private usersService;
    private accountConfirmationService;
    private mailingClient;
    constructor(usersService: UsersService, accountConfirmationService: AccountConfirmationService, mailingClient: MailingService);
    getUsers(params: GetUsersDto): Promise<GetUsersResponseDto>;
    getUser(params: GetUserDto): Promise<GetUserResponseDto>;
    updateUser(body: UpdateUserDto): Promise<UpdateUserResponseDto>;
    updatePremiumTerms(body: SetPremiumTermsDto): Promise<SetPremiumTermsResponseDto>;
    banUser(body: BanUserDto): Promise<BanUserResponseDto>;
    getUserTransactions(params: QueryParamsDTO, userId: string, filters: FiltersDto): Promise<GetUserTransactionsResponseDto>;
    manualReplenishUserBalance(body: ReplenishBalanceDto): Promise<ReplenishBalanceResponseDto>;
    usernameStatistics(): Promise<GetUsernameStatisticsResponseDto>;
    getUserDynamicHomeLinkWithPromoCode(query: GetHomeLinkRequestDto): Promise<{
        link: string;
    }>;
}
