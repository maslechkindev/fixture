/// <reference types="node" />
import { Page, PuppeteerLifeCycleEvent, PuppeteerNodeLaunchOptions } from 'puppeteer';
declare class Screenshot {
    output: string;
    content: Content;
    selector: string;
    html: string;
    quality?: number;
    buffer?: Buffer | string;
    type?: ImageType;
    encoding?: Encoding;
    transparent?: boolean;
    constructor(params: ScreenshotParams);
    setHTML(html: string): void;
    setBuffer(buffer: Buffer | string): void;
}
export declare type Content = Array<{
    output: string;
    selector?: string;
}> | Record<string, any>;
export declare type Encoding = 'base64' | 'binary';
export declare type ImageType = 'png' | 'jpeg';
export interface ScreenshotParams {
    html: string;
    encoding?: Encoding;
    transparent?: boolean;
    type?: ImageType;
    quality?: number;
    selector?: string;
    content?: Content;
    output?: string;
}
export interface Options extends ScreenshotParams {
    puppeteerArgs?: PuppeteerNodeLaunchOptions;
    puppeteer?: any;
    waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
    beforeScreenshot?: (page: Page) => void;
}
interface MakeScreenshotParams {
    screenshot: Screenshot;
    waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
    beforeScreenshot?: (page: Page) => void;
    handlebarsHelpers?: {
        [helpers: string]: (...args: any[]) => any;
    };
}
export declare function nodeHtmlToImage(options: Options): Promise<string | Buffer | (string | Buffer)[]>;
export declare function makeScreenshot(page: Page, { screenshot, beforeScreenshot, waitUntil, handlebarsHelpers, }: MakeScreenshotParams): Promise<Screenshot>;
export {};
