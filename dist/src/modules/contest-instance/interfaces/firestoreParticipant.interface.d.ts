export interface FirestoreParticipant {
    userId: string;
    username: string;
    lowercaseUsername: string;
    avatar: string;
    registrationTime: number;
    bankrollBalance: string;
    totalBalance: string;
    isExcluded: boolean;
}
