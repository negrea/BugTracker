import { FormMode } from './form-mode.model';

export interface FormResult<Type> {
  value: Type;
  mode: FormMode;
}
