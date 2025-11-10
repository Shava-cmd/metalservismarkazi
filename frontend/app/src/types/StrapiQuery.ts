import type { IHasMeta } from "./IHasMeta";

export interface StrapiQueryMany<T> extends IHasMeta {
  data: T[];
}

export interface StrapiQueryOne<T> extends IHasMeta {
  data: T;
}