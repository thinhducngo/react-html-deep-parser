type Undefinedtable<T> = T | undefined;

interface Dictionary<T> {
    [key: string]: Undefinedtable<T>;
}

interface BindEvent {
    selector: string;
    event: {
        [name: string]: Function;
    };
}
