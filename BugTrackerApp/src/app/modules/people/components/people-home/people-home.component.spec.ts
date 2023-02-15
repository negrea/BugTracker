import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { PeopleHomeComponent } from './people-home.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PeopleState } from '../../store/people-state.model';
import {
  createPerson,
  getPeople,
  setPerson,
  updatePerson,
} from '../../store/people.actions';
import { FormMode } from 'src/app/modules/shared-forms/models/form-mode.model';
import { PeopleTableComponent } from '../people-table/people-table.component';
import {
  selectError,
  selectPeople,
  selectPerson,
} from '../../store/people.selectors';
import { By } from '@angular/platform-browser';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonFormComponent } from '../person-form/person-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('PeopleHomeComponent', () => {
  const initialState: PeopleState = {
    people: [],
    person: null,
    error: null,
  };

  let store: MockStore<PeopleState>;
  let service: NgbModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PeopleHomeComponent,
        PeopleTableComponent,
        PersonFormComponent,
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectPeople,
              value: [
                {
                  id: '1',
                  firstName: 'Test',
                  lastName: 'User',
                },
              ],
            },
            {
              selector: selectPerson,
              value: {
                id: '1',
                firstName: 'Test',
                lastName: 'User',
              },
            },
          ],
        }),
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
      imports: [NgbModule, ReactiveFormsModule],
    }).compileComponents();

    store = TestBed.inject(MockStore<PeopleState>);
    service = TestBed.inject(NgbModal);
  });

  it('should create the PeopleHomeComponent', () => {
    const fixture = TestBed.createComponent(PeopleHomeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should bind people to the PeopleTableComponent', () => {
    const fixture = TestBed.createComponent(PeopleHomeComponent);
    const peopleTable: PeopleTableComponent = fixture.debugElement.query(
      By.directive(PeopleTableComponent)
    ).componentInstance;

    expect(peopleTable.people).toEqual([
      {
        id: '1',
        firstName: 'Test',
        lastName: 'User',
      },
    ]);
  });

  it('should select people data from the store', () => {
    const storeDispatch = spyOn(store, 'select').and.callThrough();

    TestBed.createComponent(PeopleHomeComponent);

    expect(storeDispatch).toHaveBeenCalledTimes(3);
    expect(storeDispatch).toHaveBeenCalledWith(selectPeople);
    expect(storeDispatch).toHaveBeenCalledWith(selectPerson);
    expect(storeDispatch).toHaveBeenCalledWith(selectError);
  });

  it(`should dispatch ${getPeople.type} OnInit`, () => {
    const storeDispatch = spyOn(store, 'dispatch').and.callThrough();

    TestBed.createComponent(PeopleHomeComponent);

    expect(storeDispatch).toHaveBeenCalledTimes(1);
    expect(storeDispatch).toHaveBeenCalledWith(getPeople());
  });

  it(`should dispatch ${setPerson.type} onAddPerson and open the PersonFormComponent as a modal`, () => {
    const storeDispatch = spyOn(store, 'dispatch').and.callThrough();
    const serviceOpen = spyOn(service, 'open').and.callThrough();

    const fixture = TestBed.createComponent(PeopleHomeComponent);
    const addPersonBtn = fixture.debugElement.query(By.css('#add-person'));
    addPersonBtn.triggerEventHandler('click');

    expect(storeDispatch).toHaveBeenCalledTimes(2);
    expect(storeDispatch).toHaveBeenCalledWith(setPerson({ person: null }));
    // Ideally we want to test that it was called with the correct TemplateRef
    expect(serviceOpen).toHaveBeenCalledTimes(1);
  });

  it(`should dispatch ${setPerson.type} onClickPerson and open the PersonFormComponent as a modal`, () => {
    const person = { id: '1', firstName: 'Test', lastName: 'Person' };
    const storeDispatch = spyOn(store, 'dispatch').and.callThrough();
    const serviceOpen = spyOn(service, 'open').and.callThrough();

    const fixture = TestBed.createComponent(PeopleHomeComponent);
    const peopleTable = fixture.debugElement.query(
      By.directive(PeopleTableComponent)
    );
    peopleTable.triggerEventHandler('clickPerson', person);

    expect(storeDispatch).toHaveBeenCalledTimes(2);
    expect(storeDispatch).toHaveBeenCalledWith(setPerson({ person }));
    // Ideally we want to test that it was called with the correct TemplateRef
    expect(serviceOpen).toHaveBeenCalledTimes(1);
  });

  it(`should dispatch ${createPerson.type} onSubmitPersonForm when FormMode is Create`, () => {
    const person = { id: '1', firstName: 'Test', lastName: 'Person' };
    const storeDispatch = spyOn(store, 'dispatch').and.callThrough();

    const fixture = TestBed.createComponent(PeopleHomeComponent);
    const component = fixture.componentInstance;
    component.onAddPerson();
    component.onSubmitPersonForm({
      value: person,
      mode: FormMode.Create,
    });

    expect(storeDispatch).toHaveBeenCalledTimes(3);
    expect(storeDispatch).toHaveBeenCalledWith(createPerson({ person }));
  });

  it(`should dispatch ${updatePerson.type} onSubmitPersonForm when FormMode is Update`, () => {
    const storeDispatch = spyOn(store, 'dispatch').and.callThrough();
    const person = { id: '1', firstName: 'Test', lastName: 'Person' };

    const component =
      TestBed.createComponent(PeopleHomeComponent).componentInstance;
    component.onAddPerson();
    component.onSubmitPersonForm({
      value: person,
      mode: FormMode.Update,
    });

    expect(storeDispatch).toHaveBeenCalledTimes(3);
    expect(storeDispatch).toHaveBeenCalledWith(updatePerson({ person }));
  });
});
