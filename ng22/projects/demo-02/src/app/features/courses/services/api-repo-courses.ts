import { inject, Service } from '@angular/core';
import { Repo } from '../../../core/types/repo';
import { Course } from '../types/course';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Service()
export class ApiRepoCourses implements Repo<Course> {

  readonly #http = inject(HttpClient);
  
  readonly #apiUrl = environment.apiUrl + '/courses';


  fetchData() {
    fetch(this.#apiUrl)      
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
  }

  postData(course: Omit<Course, 'id'>) {
    fetch(this.#apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => console.log('Course added:', data))
    .catch(error => console.error('Error adding course:', error));
  }


  getAll(): Observable<Course[]> {
    return this.#http.get<Course[]>(this.#apiUrl);
  }
  getById(id: string): Observable<Course> {
    const url = `${this.#apiUrl}/${id}`;
    return this.#http.get<Course>(url);
  }

  add(item: Omit<Course, 'id'>): Observable<Course> {
    return this.#http.post<Course>(this.#apiUrl, item);
  }
  update(id: string, item: Partial<Omit<Course, 'id'>>): Observable<Course> {
    const url = `${this.#apiUrl}/${id}`;
    return this.#http.put<Course>(url, item);
  }
  delete(id: string): Observable<void> {
    const url = `${this.#apiUrl}/${id}`;
    return this.#http.delete<Course>(url).pipe(
      map(() => undefined) // Transform the response to void
    );
  }
}


