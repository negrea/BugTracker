import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BugsState } from './bugs-state.model';

export const selectBugsState = createFeatureSelector<BugsState>('bugsState');

export const selectBugs = createSelector(
  selectBugsState,
  (state: BugsState) => state.bugs
);

export const selectBug = createSelector(
  selectBugsState,
  (state: BugsState) => state.bug
);
export const selectPeople = createSelector(
  selectBugsState,
  (state: BugsState) => state.people
);

export const selectError = createSelector(
  selectBugsState,
  (state: BugsState) => state.error
);
