import { ContestInstanceParticipant } from 'interfaces/db/tables';
export declare type ParticipantLeaderboard = ParticipantLeaderboardItem[];
export interface ParticipantLeaderboardItem extends Pick<ContestInstanceParticipant, 'userId'> {
    place: number;
}
