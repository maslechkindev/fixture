export default interface AppleIdData {
    sub: string;
    email: string;
    email_verified?: string;
    is_private_email?: string | boolean;
}
