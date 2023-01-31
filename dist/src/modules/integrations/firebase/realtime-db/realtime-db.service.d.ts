import { FirebaseAdminService } from '../admin/firebase-admin.service';
export declare class RealtimeDbService {
    private firebaseAdminService;
    constructor(firebaseAdminService: FirebaseAdminService);
    get realtimeDb(): import("firebase-admin").database.Database;
    get(path: string): Promise<any>;
    set(path: string, value: string | number): Promise<any>;
    push(path: string, value: Record<string, unknown>): Promise<import("@firebase/database-types").Reference>;
}
