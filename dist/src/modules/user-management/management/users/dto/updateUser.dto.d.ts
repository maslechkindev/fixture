import { User } from 'interfaces/user.interface';
export declare class UpdateUserDto {
    user: Partial<User>;
}
export declare class UpdateUserResponseDto {
    success: boolean;
    updatedUser: Partial<User>;
}
export declare class WrappedUpdateUserResponseDto {
    data: UpdateUserResponseDto;
}
