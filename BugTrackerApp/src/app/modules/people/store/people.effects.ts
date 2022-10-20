import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PeopleActions } from '.';
import { PeopleService } from '../services/people.service';

@Injectable()
export class PeopleEffects {
  constructor(
    private actions$: Actions,
    private peopleService: PeopleService
  ) {}

  getPeople$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PeopleActions.getPeople),
      switchMap((_) => {
        return this.peopleService.getPeople().pipe(
          map((people) => PeopleActions.onGetPeople({ people })),
          catchError((errorResponse) =>
            of(PeopleActions.setError({ errorResponse }))
          )
        );
      })
    );
  });

  createPerson$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PeopleActions.createPerson),
      switchMap((action) => {
        return this.peopleService.createPerson(action.person).pipe(
          map((_) => PeopleActions.getPeople()),
          catchError((errorResponse) =>
            of(PeopleActions.setError({ errorResponse }))
          )
        );
      })
    );
  });

  updatePerson$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PeopleActions.updatePerson),
      switchMap((action) => {
        return this.peopleService.updatePerson(action.person).pipe(
          map((_) => PeopleActions.getPeople()),
          catchError((errorResponse) =>
            of(PeopleActions.setError({ errorResponse }))
          )
        );
      })
    );
  });
}
