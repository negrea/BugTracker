import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PeopleState } from './people-state.model';

export const selectPeopleState =
  createFeatureSelector<PeopleState>('peopleState');

export const selectPeople = createSelector(
  selectPeopleState,
  (state: PeopleState) => state.people
);

export const selectPerson = createSelector(
  selectPeopleState,
  (state: PeopleState) => state.person
);

export const selectError = createSelector(
  selectPeopleState,
  (state: PeopleState) => state.error
);
