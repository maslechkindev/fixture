import { ProfileRepository } from './profile.repository';
export declare class ProfileService {
    private profileRepository;
    constructor(profileRepository: ProfileRepository);
    getUserById(userId: string): Promise<import("../../../interfaces/user.interface").User>;
}
