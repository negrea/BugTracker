import { createReducer, on } from '@ngrx/store';
import { BugsState } from './bugs-state.model';
import { BugsActions } from './index';

const defaultState: BugsState = {
  bugs: [],
  bug: null,
  people: [],
  error: null,
};

export const bugsReducer = createReducer(
  defaultState,
  on(
    BugsActions.init,
    BugsActions.createBug,
    (state, _): BugsState => ({
      ...state,
      error: null,
    })
  ),
  on(BugsActions.onGetBugs, (state, action): BugsState => {
    return {
      ...state,
      bugs: [...action.bugs],
    };
  }),
  on(BugsActions.onGetPeople, (state, action): BugsState => {
    return {
      ...state,
      people: [...action.people],
    };
  }),
  on(BugsActions.setBug, (state, action): BugsState => {
    return {
      ...state,
      bug: action.bug == null ? null : { ...action.bug },
    };
  }),
  on(
    BugsActions.setError,
    (state, action): BugsState => ({
      ...state,
      error: action.errorResponse.error,
    })
  )
);
