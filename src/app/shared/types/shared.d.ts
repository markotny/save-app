export type Id<T extends {id: number | string}> = T['id'];

export interface Unsaved {
  unsaved?: UnsavedChanges;
}

export type UnsavedChanges = 'add' | 'edit' | 'remove';

export type Replace<T, O, N> = {
  [K in keyof T]: T[K] extends Array<infer A> ? (A extends O ? N[] : A[]) : T[K] extends O ? N : T[K];
};

export type Extend<T, O, N> = {
  [K in keyof T]: T[K] extends Array<infer A> ? (A extends O ? (O & N)[] : A[]) : T[K] extends O ? O & N : T[K];
};
