import { TokensRepository } from './tokens.repository';
export declare class TokensService {
    private readonly tokensRepository;
    constructor(tokensRepository: TokensRepository);
    add(userId: string, token: string): Promise<void>;
    update(userId: string, newToken: string, oldToken: string): Promise<void>;
    remove(userId: string, token: string): Promise<void>;
    getUserTokens(userId: string, tokensToOmit?: Array<string>): Promise<Array<string>>;
}
