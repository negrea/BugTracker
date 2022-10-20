import { createAction, props } from '@ngrx/store';
import { Person } from '../../shared-people/models/person.model';
import { BugForm } from '../models/bug-form.model';
import { Bug } from '../models/bug.model';

export const init = createAction('[Bugs] Init');

export const getBugs = createAction('[Bugs] Get bugs');

export const onGetBugs = createAction(
  '[Bugs] On get bugs',
  props<{
    bugs: Bug[];
  }>()
);

export const getPeople = createAction('[Bugs] Get people');

export const onGetPeople = createAction(
  '[Bugs] On get people',
  props<{
    people: Person[];
  }>()
);

export const createBug = createAction(
  '[Bugs] create bug',
  props<{
    bug: BugForm;
  }>()
);

export const updateBug = createAction(
  '[Bugs] update bug',
  props<{
    bug: BugForm;
  }>()
);

export const setBug = createAction(
  '[Bugs] set bug',
  props<{
    bug: Bug;
  }>()
);

export const setError = createAction(
  '[Bugs] set error',
  props<{
    errorResponse: any;
  }>()
);

export const clearError = createAction('[Bugs] clear error');
