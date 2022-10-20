import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable()
export class CorePeopleService {
  baseUrl = '/api/people-management';

  constructor(public _httpClient: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this._httpClient.get<Person[]>(`${this.baseUrl}/people`);
  }
}
