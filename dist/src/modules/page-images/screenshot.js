"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeScreenshot = exports.nodeHtmlToImage = void 0;
const handlebars_1 = require("handlebars");
const puppeteer_cluster_1 = require("puppeteer-cluster");
function isEmpty(val) {
    return val == null || !Object.keys(val).length;
}
class Screenshot {
    constructor(params) {
        if (!params || !params.html) {
            throw Error('You must provide an html property.');
        }
        const { html, encoding, transparent = false, output, content, selector = 'body', quality = 80, type = 'png', } = params;
        this.html = html;
        this.encoding = encoding;
        this.transparent = transparent;
        this.type = type;
        this.output = output;
        this.content = isEmpty(content) ? undefined : content;
        this.selector = selector;
        this.quality = type === 'jpeg' ? quality : undefined;
    }
    setHTML(html) {
        if (!html) {
            throw Error('You must provide an html property.');
        }
        this.html = html;
    }
    setBuffer(buffer) {
        this.buffer = buffer;
    }
}
async function nodeHtmlToImage(options) {
    const { html, encoding, transparent, content, output, selector, type, quality, puppeteerArgs = {}, puppeteer = undefined, } = options;
    const cluster = await puppeteer_cluster_1.Cluster.launch({
        concurrency: puppeteer_cluster_1.Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
        puppeteerOptions: Object.assign(Object.assign({}, puppeteerArgs), { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }),
        puppeteer: puppeteer,
    });
    const shouldBatch = Array.isArray(content);
    const contents = shouldBatch ? content : [Object.assign(Object.assign({}, content), { output, selector })];
    try {
        const screenshots = await Promise.all(contents.map((content) => {
            const { output, selector: contentSelector } = content, pageContent = __rest(content, ["output", "selector"]);
            return cluster.execute({
                html,
                encoding,
                transparent,
                output,
                content: pageContent,
                selector: contentSelector ? contentSelector : selector,
                type,
                quality,
            }, async ({ page, data }) => {
                const screenshot = await makeScreenshot(page, Object.assign(Object.assign({}, options), { screenshot: new Screenshot(data) }));
                return screenshot;
            });
        }));
        await cluster.idle();
        await cluster.close();
        return shouldBatch
            ? screenshots.map(({ buffer }) => buffer)
            : screenshots[0].buffer;
    }
    catch (err) {
        console.error(err);
        await cluster.close();
        throw new Error(err);
    }
}
exports.nodeHtmlToImage = nodeHtmlToImage;
async function makeScreenshot(page, { screenshot, beforeScreenshot, waitUntil = 'networkidle0', handlebarsHelpers, }) {
    const hasHelpers = handlebarsHelpers && typeof handlebarsHelpers === 'object';
    if (hasHelpers) {
        if (Object.values(handlebarsHelpers).every((h) => typeof h === 'function')) {
            handlebars_1.default.registerHelper(handlebarsHelpers);
        }
        else {
            throw Error('Some helper is not a valid function');
        }
    }
    if ((screenshot === null || screenshot === void 0 ? void 0 : screenshot.content) || hasHelpers) {
        const template = (0, handlebars_1.compile)(screenshot.html);
        screenshot.setHTML(template(screenshot.content));
    }
    await page.setContent(screenshot.html, { waitUntil });
    const element = await page.$(screenshot.selector);
    if (!element) {
        throw Error('No element matches selector: ' + screenshot.selector);
    }
    if (isFunction(beforeScreenshot)) {
        await beforeScreenshot(page);
    }
    const buffer = await element.screenshot({
        path: screenshot.output,
        type: screenshot.type,
        omitBackground: screenshot.transparent,
        encoding: screenshot.encoding,
        quality: screenshot.quality,
    });
    screenshot.setBuffer(buffer);
    return screenshot;
}
exports.makeScreenshot = makeScreenshot;
function isFunction(f) {
    return f && typeof f === 'function';
}
//# sourceMappingURL=screenshot.js.map