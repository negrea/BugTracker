import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/modules/shared';
import { FormMode } from 'src/app/modules/shared/models/form-mode.model';
import { FormResult } from 'src/app/modules/shared/models/form-result.model';
import { Person } from 'src/app/modules/shared/models/person.model';

@Component({
  selector: 'person-form',
  templateUrl: './person-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonFormComponent implements OnInit, OnChanges {
  @Input() person: Person;

  @Output() submitForm = new EventEmitter<FormResult<Person>>();
  @Output() closeForm = new EventEmitter();

  personForm: FormGroup;
  private mode = FormMode.Create;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.personForm = this._formBuilder.group({
      id: [null],
      firstName: [null, [Validators.required, Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(50)]],
    });

    if (this.person) {
      FormUtils.CopyMatchingKeyValuesToFormControl<Person>(
        this.personForm,
        this.person
      );
    }
  }

  ngOnChanges() {
    if (this.person) {
      this.mode = FormMode.Update;
    }
  }

  onSubmit() {
    if (this.personForm.valid) {
      this.submitForm.emit({ value: this.personForm.value, mode: this.mode });
    }
  }

  onClose() {
    this.closeForm.emit();
  }
}
