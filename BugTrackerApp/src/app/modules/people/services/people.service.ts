import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from '../../shared/models/person.model';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  baseUrl = '/api/people-management';

  constructor(private _httpClient: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this._httpClient.get<Person[]>(`${this.baseUrl}/people`);
  }

  createPerson(person: Person): Observable<Person> {
    return this._httpClient.post<Person>(`${this.baseUrl}/people`, person);
  }

  updatePerson(person: Person): Observable<Person> {
    return this._httpClient.patch<Person>(`${this.baseUrl}/people`, person);
  }
}
