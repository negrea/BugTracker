import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BugForm } from '../../models/bug-form.model';
import { Bug } from '../../models/bug.model';
import { FormMode } from '../../../shared-forms/models/form-mode.model';
import { Status } from '../../models/status.model';
import { FormResult } from 'src/app/modules/shared-forms/models/form-result.model';
import { Person } from 'src/app/modules/shared-people/models/person.model';
import { FormUtils } from 'src/app/modules/shared-forms';

@Component({
  selector: 'bug-form',
  templateUrl: './bug-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BugFormComponent implements OnInit, OnChanges {
  @Input() bug: Bug | null;
  @Input() people: Person[];

  @Output() submitForm = new EventEmitter<FormResult<BugForm>>();
  @Output() closeForm = new EventEmitter();

  formMode = FormMode;
  mode = FormMode.Create;
  statuses = Object.keys(Status);
  bugForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.bugForm = this._formBuilder.group({
      id: [null],
      title: [null, Validators.required],
      description: [null],
      personId: [null],
    });
    if (this.bug) {
      this.bugForm.addControl(
        'status',
        new FormControl(null, Validators.required)
      );
      FormUtils.CopyMatchingKeyValuesToFormControl(this.bugForm, this.bug);
    }
  }

  ngOnChanges() {
    if (this.bug) {
      this.mode = FormMode.Update;
    }
  }

  onStatusChange(status: Status) {
    if (status === Status.Unassigned || status === Status.Closed) {
      this.bugForm.get('personId').setValue(null);
    }
  }

  onPersonChange(personId: string | null) {
    if (personId !== null && this.mode !== FormMode.Create) {
      this.bugForm.get('status').setValue(Status.Assigned);
    }
  }

  onSubmit() {
    if (this.bugForm.valid) {
      this.submitForm.emit({ value: this.bugForm.value, mode: this.mode });
    }
  }

  onClose() {
    this.closeForm.emit();
  }
}
