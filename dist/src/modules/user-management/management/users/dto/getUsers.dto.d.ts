import { User } from 'interfaces/user.interface';
export declare class GetUsersDto {
    page: number;
    size: number;
    direction: string;
    orderBy: string;
    search: string;
}
export declare class GetUsersResponseDto {
    users: Array<Partial<User>>;
    count: number;
}
export declare class WrappedGetUsersResponseDto {
    data: GetUsersResponseDto;
}
