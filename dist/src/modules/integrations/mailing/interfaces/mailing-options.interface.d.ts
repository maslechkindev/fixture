export interface MailingModuleOptions {
    sendGrid: {
        apiKey: string;
        from: {
            email: string;
            name: string;
        };
    };
    ethereal: {
        user: string;
        pass: string;
    };
}
export interface MailData {
    to: string;
    subject: string;
    html: string;
    dynamicTemplateData: {
        [key: string]: string;
    };
    templateId: string;
}
