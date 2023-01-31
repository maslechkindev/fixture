import { JobQueueService } from '../../ancillary/job-queue/job-queue.service';
import { JobWithDoneCallback } from 'pg-boss';
import { TransactionManager } from '../../ancillary/transaction-manager/transaction-manager.service';
import { ContestInstanceStatus } from '../enums/contestInstanceStatus.enum';
import { BalanceService } from '../../balance/balance.service';
import { DeleteContestInstanceService } from '../delete/delete.service';
import { CancelContestInstanceRepository } from './cancel.repository';
import { ContestInstanceParticipantsRepository } from '../contest-instance-participants/contest-instance-participants.repository';
import { ContestInstanceParticipantsService } from '../contest-instance-participants/contest-instance-participants.service';
import { FirestoreService } from '../../integrations/firebase/firestore/firestore.service';
import { TemplateGeneratorParamsType } from 'modules/fixture/types/templateGeneratorType';
export declare class CancelContestInstanceService {
    private readonly contestInstanceParticipantsRepository;
    private readonly contestInstanceParticipantsService;
    private readonly cancelRepository;
    private readonly jobQueueService;
    private readonly transactionManager;
    private readonly balanceService;
    private readonly deleteContestInstanceService;
    private readonly firestoreService;
    private readonly logger;
    constructor(contestInstanceParticipantsRepository: ContestInstanceParticipantsRepository, contestInstanceParticipantsService: ContestInstanceParticipantsService, cancelRepository: CancelContestInstanceRepository, jobQueueService: JobQueueService, transactionManager: TransactionManager, balanceService: BalanceService, deleteContestInstanceService: DeleteContestInstanceService, firestoreService: FirestoreService);
    cancellationHandler: (job: JobWithDoneCallback<{
        meta: {
            instanceId: string;
            contestId: string;
            contestName: string;
            uniqueKey: string;
            fixtureName: string;
        };
    }, void>) => Promise<void>;
    isInstanceCancel: (contestInstance: {
        contestId: string;
        contestName: string;
        instanceId: string;
        minParticipants: number;
        status: ContestInstanceStatus;
        currentParticipants: number;
        cancellationTime: number;
        fixtureName: string;
    }) => Promise<void>;
    runCancellationJob: (contestInstance: {
        cancellationTime: number;
        contestId: string;
        contestName: string;
        instanceId: string;
        fixtureName: string;
    }) => Promise<void>;
    cancelContest: (contestInstance: {
        contestId: string;
        instanceId: string;
    }, forcedCancel: boolean, fixtureName: string, templateGenerator?: (params: TemplateGeneratorParamsType) => string, entryFee?: number | string) => Promise<boolean>;
    mapError(err: unknown): void;
}
