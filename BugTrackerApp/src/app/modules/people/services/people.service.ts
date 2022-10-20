import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from '../../shared-people/models/person.model';
import { CorePeopleService } from '../../shared-people/services/core-people.service';

@Injectable()
export class PeopleService extends CorePeopleService {
  constructor(_httpClient: HttpClient) {
    super(_httpClient);
  }

  createPerson(person: Person): Observable<Person> {
    return this._httpClient.post<Person>(`${this.baseUrl}/people`, person);
  }

  updatePerson(person: Person): Observable<Person> {
    return this._httpClient.patch<Person>(`${this.baseUrl}/people`, person);
  }
}
