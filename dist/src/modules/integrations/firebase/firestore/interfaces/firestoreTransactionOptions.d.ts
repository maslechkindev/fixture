import firebase from 'firebase-admin';
export interface FirestoreTransactionOptions {
    writeBatch: firebase.firestore.WriteBatch;
}
