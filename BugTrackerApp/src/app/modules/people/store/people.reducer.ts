import { createReducer, on } from '@ngrx/store';
import { PeopleActions } from './index';
import { PeopleState } from './people-state.model';

let defaultState: PeopleState = {
  people: [],
  person: null,
  error: null,
};

export const peopleReducer = createReducer(
  defaultState,
  on(
    PeopleActions.getPeople,
    (state, _): PeopleState => ({
      ...state,
      person: null,
      error: null,
    })
  ),
  on(PeopleActions.onGetPeople, (state, action): PeopleState => {
    return {
      ...state,
      people: [...action.people],
    };
  }),
  on(
    PeopleActions.setPerson,
    (state, action): PeopleState => ({
      ...state,
      person: action.person == null ? null : { ...action.person },
    })
  ),
  on(PeopleActions.setError, (state, action): PeopleState => {
    return {
      ...state,
      error: action.errorResponse.error,
    };
  })
);
