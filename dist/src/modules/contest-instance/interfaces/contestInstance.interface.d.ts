export interface ContestInstance {
    instanceName: string;
    status: string;
    instanceNumber: number;
    currentParticipants: number;
    leavingAllowed?: boolean;
}
