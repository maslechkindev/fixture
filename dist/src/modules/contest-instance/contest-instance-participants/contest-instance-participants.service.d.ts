import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { FirestoreService } from 'modules/integrations/firebase/firestore/firestore.service';
import { BetsSettlementDetails } from '../bets/interfaces/bets-settlement-details';
import { ContestInstanceParticipantsRepository } from './contest-instance-participants.repository';
import { UpdatedParticipantBalance } from './interfaces/updated-bankroll-balance.interface';
import { NotificationEnumType } from 'modules/integrations/firebase/messages/notifications/types';
import { NotificationsService } from 'modules/integrations/firebase/messages/notifications/notifications.service';
import { TokensService } from 'modules/integrations/firebase/messages/tokens/tokens.service';
import { User } from '../../../interfaces/user.interface';
import { TransactionManager } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { RealtimeDbService } from 'modules/integrations/firebase/realtime-db/realtime-db.service';
export declare class ContestInstanceParticipantsService {
    private readonly contestInstanceParticipantsRepository;
    private readonly firestoreService;
    private readonly notificationsService;
    private readonly tokensService;
    private readonly realtimeDbService;
    private readonly transactionManager;
    private readonly logger;
    constructor(contestInstanceParticipantsRepository: ContestInstanceParticipantsRepository, firestoreService: FirestoreService, notificationsService: NotificationsService, tokensService: TokensService, realtimeDbService: RealtimeDbService, transactionManager: TransactionManager);
    replenishBalanceFromBetsToSettle(txManager: TransactionManagerService, betsSettlementDetails: BetsSettlementDetails): Promise<UpdatedParticipantBalance[]>;
    getParticipantLeaderboard(txManager: TransactionManagerService, contestInstanceId: string, lastPlaceNumber: number): Promise<import("./interfaces/participant-leaderboard.interface").ParticipantLeaderboard>;
    updateBalanceInFirestore(updatedParticipantBalances: Array<UpdatedParticipantBalance>): Promise<void>;
    notifyUsersContestInstanceStatusChange(contestInstance: {
        contestId: string;
        instanceId: string;
        contestName: string;
    }, notificationName: NotificationEnumType): Promise<void>;
    notifyUsersContestForceBetStart(contest: {
        id: string;
        contestName: string;
    }, notificationName: NotificationEnumType): Promise<void>;
    getUserByPromoCode(promoCode: string): import("knex").Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: false;
        _keys: string;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: undefined;
    }>;
    isUserParticipant(instanceId: string, user: Pick<User, 'id'> | null): Promise<boolean>;
    excludeParticipant(instanceId: string, participantId: string, reasonOfExclude: string, contestId: string): Promise<{
        isExcluded: boolean;
        userId: string;
    }>;
    notifyUsersWin(marketLineId: string): Promise<void>;
    notifyUsersOutcomeChanged(marketLineId: string): Promise<void>;
    notifyUsersContestWasCanceledByAdmin(contestInstanceId: string, contestName: string, contestId: string): Promise<void>;
    viewParticipantBets(instanceId: string, participantId: string, page: string, size: string, orderBy: string, direction: string): Promise<{
        betsInfo: {
            betTime: string;
            betName: string;
        }[];
        fullCount: any;
    }>;
    changeUserNameInFireStore(userId: string, userName: string): Promise<void>;
    wasUserExcluded(userId: string, instanceId: string): Promise<boolean>;
    getFixtureAndContestNameByContestId(contestId: string): Promise<{
        fixtureName: string;
        contestName: string;
    }>;
}
