export interface ModuleInterface {
    hot: {
        accept: () => void;
        dispose: (cb: () => Promise<void>) => void;
    };
}
