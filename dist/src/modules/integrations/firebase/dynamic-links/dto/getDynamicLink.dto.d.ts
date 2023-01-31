export declare class DynamicLinksResponseDto {
    shortLink: string;
}
export declare class DynamicLinksBodyDto {
    link: string;
    socialTitle?: string;
    socialDescription?: string;
    socialImageLink?: string;
}
export declare class WrappedGetDynamicLinksResponseDto {
    data: DynamicLinksResponseDto;
}
