import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BugForm } from '../models/bug-form.model';
import { Bug } from '../models/bug.model';

@Injectable()
export class BugsService {
  baseUrl = '/api/bugs-management';

  constructor(private _httpClient: HttpClient) {}

  getBugs(): Observable<Bug[]> {
    return this._httpClient.get<Bug[]>(`${this.baseUrl}/bugs`);
  }

  createBug(bugForm: BugForm): Observable<Bug> {
    return this._httpClient.post<Bug>(`${this.baseUrl}/bugs`, bugForm);
  }

  updateBug(bugForm: BugForm): Observable<Bug> {
    return this._httpClient.patch<Bug>(`${this.baseUrl}/bugs`, bugForm);
  }
}
