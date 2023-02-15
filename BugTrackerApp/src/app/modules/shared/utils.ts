import { FormGroup } from '@angular/forms';

export function CopyMatchingKeyValuesToFormControl<Type>(
  target: FormGroup,
  source: Type
) {
  Object.keys(source).forEach((propertyName) => {
    let control = target.get(propertyName);
    if (control) {
      control.setValue(source[propertyName as keyof Type]);
    }
  });
}
