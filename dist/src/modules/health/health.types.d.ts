import systeminformation from 'systeminformation';
export declare type HealthData = {
    cpu: systeminformation.Systeminformation.CurrentLoadData;
    memory: systeminformation.Systeminformation.MemData;
    heapUsed: number;
    pool: {
        used: number;
        free: number;
        pendingCreates: number;
        pendingAcquires: number;
        pendingDestroys: number;
        pendingValidations: number;
        numUsed: number;
        numFree: number;
        numPendingAcquires: number;
        numPendingCreates: number;
    };
};
