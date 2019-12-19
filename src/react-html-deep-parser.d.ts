type Undefinedtable<T> = T | undefined;
interface Dictionary<T> {
    [key: string]: Undefinedtable<T>;
}