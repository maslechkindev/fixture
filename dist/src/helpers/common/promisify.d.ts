export default function <Type>(fn: (cb: (value: Type | PromiseLike<Type>) => void) => Type): Promise<Type>;
