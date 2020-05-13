export type Id<T extends {id: number | string}> = T['id'];

export interface Unsaved {
  unsaved?: UnsavedChanges;
}

export type UnsavedChanges = 'add' | 'edit' | 'remove';
