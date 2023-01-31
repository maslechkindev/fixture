/// <reference types="node" />
import { GoogleCloudStorageService } from '../integrations/google-cloud-storage/google-cloud-storage.service';
import { ContestInstanceParticipantsService } from '../contest-instance/contest-instance-participants/contest-instance-participants.service';
import { ContestInstanceService } from '../contest-instance/contest-instance.service';
import { User as UserType } from '../../interfaces/user.interface';
export declare class PageImagesService {
    private readonly contestInstanceParticipantsService;
    private readonly contestInstanceService;
    private googleCloudStorageService;
    private readonly logger;
    constructor(contestInstanceParticipantsService: ContestInstanceParticipantsService, contestInstanceService: ContestInstanceService, googleCloudStorageService: GoogleCloudStorageService);
    generateLeaderboardImage(user: UserType, contestId: string, instanceId: string, userId: string): Promise<Buffer>;
}
