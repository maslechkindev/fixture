import { AuthMiddlewareRepository } from './auth.repository';
export declare class AuthMiddlewareService {
    private authMiddlewareRepository;
    constructor(authMiddlewareRepository: AuthMiddlewareRepository);
    getUserById(userId: string): Promise<import("../../interfaces/user.interface").User>;
}
