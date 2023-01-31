import firebase from 'firebase-admin';
import { ContestInstance } from 'interfaces/db/tables';
export interface FirestoreContestInstanceUpdate extends Partial<Pick<ContestInstance, 'instanceName' | 'instanceNumber' | 'status' | 'leavingAllowed' | 'endTime'>> {
    currentParticipants: firebase.firestore.FieldValue;
}
