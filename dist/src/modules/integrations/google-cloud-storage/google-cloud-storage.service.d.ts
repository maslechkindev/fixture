/// <reference types="node" />
declare class StorageFile {
    buffer: Buffer;
    metadata: Map<string, string>;
    contentType: string;
}
export declare class GoogleCloudStorageService {
    private readonly logger;
    private storage;
    private bucket;
    constructor();
    save(path: string, contentType: string, media: Buffer, metadata: {
        [key: string]: string;
    }[]): Promise<void>;
    get(path: string): Promise<StorageFile>;
}
export {};
