import { createAction, props } from '@ngrx/store';
import { Person } from '../../shared/models/person.model';

export const getPeople = createAction('[People] Get people');

export const onGetPeople = createAction(
  '[People] On get people',
  props<{
    people: Person[];
  }>()
);

export const createPerson = createAction(
  '[People] create person',
  props<{
    person: Person;
  }>()
);
export const updatePerson = createAction(
  '[People] update person',
  props<{
    person: Person;
  }>()
);

export const setPerson = createAction(
  '[People] set person',
  props<{
    person: Person;
  }>()
);

export const setError = createAction(
  '[People] set error',
  props<{
    errorResponse: any;
  }>()
);
