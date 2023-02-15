import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BugsActions } from '.';
import { BugsService } from '../services/bugs.service';
import { PeopleService } from '../../people/services/people.service';

@Injectable()
export class BugsEffects {
  constructor(
    private _actions$: Actions,
    private _bugsService: BugsService,
    private _peopleService: PeopleService
  ) {}

  initBugs$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(BugsActions.init),
      map((_) => BugsActions.getBugs())
    );
  });

  getBugs$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(BugsActions.getBugs),
      switchMap((_) => {
        return this._bugsService.getBugs().pipe(
          map((bugs) => BugsActions.onGetBugs({ bugs })),
          catchError((errorResponse) =>
            of(BugsActions.setError({ errorResponse }))
          )
        );
      })
    );
  });

  initPeople$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(BugsActions.init),
      switchMap((_) => {
        return this._peopleService.getPeople().pipe(
          map((people) => BugsActions.onGetPeople({ people })),
          catchError((errorResponse) =>
            of(BugsActions.setError({ errorResponse }))
          )
        );
      })
    );
  });

  createBug$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(BugsActions.createBug),
      switchMap((action) => {
        return this._bugsService.createBug(action.bug).pipe(
          map((_) => BugsActions.getBugs()),
          catchError((errorResponse) =>
            of(BugsActions.setError({ errorResponse }))
          )
        );
      })
    );
  });

  updateBug$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(BugsActions.updateBug),
      switchMap((action) => {
        return this._bugsService.updateBug(action.bug).pipe(
          map((_) => BugsActions.getBugs()),
          catchError((errorResponse) =>
            of(BugsActions.setError({ errorResponse }))
          )
        );
      })
    );
  });
}
