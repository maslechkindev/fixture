import firebase, { firestore } from 'firebase-admin';
import { FirebaseAdminService } from '../admin/firebase-admin.service';
import { FirestoreTransactionOptions } from './interfaces/firestoreTransactionOptions';
export declare class FirestoreService {
    private firebaseAdminService;
    constructor(firebaseAdminService: FirebaseAdminService);
    get firestore(): typeof firebase.firestore;
    increment(value?: number): firestore.FieldValue;
    decrement(value?: number): firestore.FieldValue;
    getDataByDocumentId(collection: string, documentId: string): Promise<firestore.DocumentData>;
    getCollectionIds(collection: string): Promise<Array<string>>;
    isCollectionEmpty(collection: string): Promise<boolean>;
    add(collection: string, value: firebase.firestore.DocumentData): Promise<firestore.DocumentReference<firestore.DocumentData>>;
    set(collection: string, doc: string, value: firebase.firestore.DocumentData): Promise<firestore.WriteResult>;
    delete(collection: string, doc: string): Promise<firestore.WriteResult>;
    mergeUpdate(collection: string, document: string, value: firebase.firestore.DocumentData): Promise<firestore.WriteResult>;
    addToArrayAt(collection: string, document: string, path: string, value: string): Promise<firestore.WriteResult>;
    update(collection: string, document: string, value: firestore.UpdateData): Promise<firestore.WriteResult>;
    initWriteBatch(): firestore.WriteBatch;
    transactionalSet(collection: string, document: string, value: firebase.firestore.DocumentData, transactionOptions: FirestoreTransactionOptions): firestore.WriteBatch;
    transactionalDelete(collection: string, document: string, transactionOptions: FirestoreTransactionOptions): firestore.WriteBatch;
    transactionalMergeUpdate(collection: string, document: string, value: firebase.firestore.DocumentData, transactionOptions: FirestoreTransactionOptions): firestore.WriteBatch;
    transactionalMergeUpdateWithIncrement(collection: string, document: string, key: string, value: firebase.firestore.DocumentData, transactionOptions: FirestoreTransactionOptions): firestore.WriteBatch;
}
