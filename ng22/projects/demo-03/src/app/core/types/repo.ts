import { Observable } from "rxjs";

export interface Repo<T extends { id: string | number }> {
    getAll(): Observable<T[]>;
    getById(id: T['id']): Observable<T>; // Throw error if not found
    add(item: Omit<T, 'id'>): Observable<T>;
    update(id: T['id'], item: Partial<Omit<T, 'id'>>): Observable<T>; // Throw error if not found
    delete(id: T['id']): Observable<void>; // Throw error if not found
}

