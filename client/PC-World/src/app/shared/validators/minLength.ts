import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";

export function minLengthFactory(length: number): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return of({}).pipe(
            delay(1000),
            map(() => {
                const valueLength = control.value.length;
                return valueLength >= length ? null : { minLength: true }
            })
        )
    };
}
