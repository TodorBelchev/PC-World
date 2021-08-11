import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, of, Subscription } from "rxjs";
import { delay, map, takeUntil } from "rxjs/operators";


export function sameValueAsFactory(getTargetControl: () => AbstractControl | null, killSubscriptions: Observable<any>) {
    let subscription: Subscription | null = null;
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return of({}).pipe(
            delay(500),
            map(() => {
                if (subscription) { subscription.unsubscribe(); subscription = null; }
                const targetControl = getTargetControl();
                if (!targetControl) { return null; }
                subscription = targetControl.valueChanges
                    .pipe(
                        takeUntil(killSubscriptions),
                        delay(500),
                    )
                    .subscribe({
                        next: () => { control.updateValueAndValidity(); },
                        complete: () => { subscription = null; }
                    });

                return targetControl?.value === control?.value ? null : { sameValue: true }
            })
        )
    };
}