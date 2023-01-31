import { FirestoreService } from 'modules/integrations/firebase/firestore/firestore.service';
import { JobQueueService } from '../../ancillary/job-queue/job-queue.service';
import { JobWithDoneCallback } from 'pg-boss';
import { DeleteContestInstanceRepository } from './delete.repository';
import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
export declare class DeleteContestInstanceService {
    private readonly firestoreService;
    private readonly jobQueueService;
    private readonly deleteRepository;
    constructor(firestoreService: FirestoreService, jobQueueService: JobQueueService, deleteRepository: DeleteContestInstanceRepository);
    deleteHandler: (job: JobWithDoneCallback<{
        meta: {
            instanceId: string;
            contestId: string;
        };
    }, void>) => Promise<void>;
    runJobForDeleteInstance: (instanceId: string, contestId: string, trx: TransactionManagerService | null) => Promise<void>;
    createDeleteTimeISO: () => string;
}
