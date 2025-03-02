export type ElementOf<T> = T extends readonly (infer E)[] ? E : never;
