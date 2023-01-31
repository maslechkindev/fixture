export declare enum ResponseCode {
    NONE = "NONE",
    USER_EXISTS = "USER_EXISTS",
    GET_CODE = "GET_CODE",
    GET_CODE_EMAIL = "GET_CODE_EMAIL"
}
export declare class TokenVerificationGetDTO {
    code: ResponseCode;
}
export declare class WrappedTokenVerificationGetDTO {
    data: TokenVerificationGetDTO;
}
