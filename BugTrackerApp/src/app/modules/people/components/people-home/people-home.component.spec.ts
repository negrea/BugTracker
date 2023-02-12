import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { PeopleHomeComponent } from './people-home.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PeopleState } from '../../store/people-state.model';
import { Store } from '@ngrx/store';
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
import { PersonFormComponent } from '../person-form/person-form.component';
import {
  NgbActiveModal,
  NgbModal,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';

describe('PeopleHomeComponent', () => {
  const initialState: PeopleState = {
    people: [],
    person: null,
    error: null,
  };

  let store: MockStore<PeopleState>;
  let service: NgbModal;
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [PeopleHomeComponent, PeopleTableComponent],
  //     providers: [
  //       provideMockStore({ initialState }),
  //       { provide: ComponentFixtureAutoDetect, useValue: true },
  //     ],
  //   }).compileComponents();

  //   store = TestBed.inject(MockStore<PeopleState>);
  // });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleHomeComponent, PeopleTableComponent],
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
      imports: [NgbModule],
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

  // it('should bind person to the PersonFormComponent when selected', () => {
  //   spyOn(service, 'open').and.callThrough();
  //   const person = { id: '1', firstName: 'Test', lastName: 'Person' };
  //   // const myModal = service.open(PersonFormComponent);
  //   const fixture = TestBed.createComponent(PeopleHomeComponent);
  //   const peopleHome = fixture.componentInstance;
  //   peopleHome.onClickPerson(person);

  //   expect(service.open).toHaveBeenCalled();

  //   const personForm = fixture.debugElement.query(
  //     By.directive(PersonFormComponent)
  //   ).componentInstance;

  //   expect(personForm.person).toEqual({
  //     id: '1',
  //     firstName: 'Test',
  //     lastName: 'User',
  //   });
  // });

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

  it(`should dispatch ${setPerson.type} onClickPerson`, () => {
    const storeDispatch = spyOn(store, 'dispatch').and.callThrough();
    const person = { id: '1', firstName: 'Test', lastName: 'Person' };

    // const component =
    //   TestBed.createComponent(PeopleHomeComponent).componentInstance;
    // component.onClickPerson(person);

    const fixture = TestBed.createComponent(PeopleHomeComponent);
    const peopleTable = fixture.debugElement.query(
      By.directive(PeopleTableComponent)
    );
    peopleTable.triggerEventHandler('clickPerson', person);

    expect(storeDispatch).toHaveBeenCalledTimes(2);
    expect(storeDispatch).toHaveBeenCalledWith(setPerson({ person }));
  });

  it(`should dispatch ${setPerson.type} onAddPerson`, () => {
    const storeDispatch = spyOn(store, 'dispatch').and.callThrough();

    const component =
      TestBed.createComponent(PeopleHomeComponent).componentInstance;
    component.onAddPerson();

    expect(storeDispatch).toHaveBeenCalledTimes(2);
    expect(storeDispatch).toHaveBeenCalledWith(setPerson({ person: null }));
  });

  it(`should dispatch ${createPerson.type} onSubmitPersonForm when FormMode is Create`, () => {
    const storeDispatch = spyOn(store, 'dispatch').and.callThrough();
    const person = { id: '1', firstName: 'Test', lastName: 'Person' };

    const component =
      TestBed.createComponent(PeopleHomeComponent).componentInstance;
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
