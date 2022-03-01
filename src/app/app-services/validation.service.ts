import { analyzeAndValidateNgModules } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable()
export class ValidationService {
  

  requireMatch(options: any) {
    return (control: AbstractControl) => {
      const selection: any =
        options && options.find((o: any) => o.value === control.value)
          ? null
          : { requireMatch: true };
      return selection;
    };
  }

  requireMatchWithEmpty(options: any) {
    return (control: AbstractControl) => {
      const selection: any =
        (options && options.find((o: any) => o.value === control.value)) ||
          !control.value
          ? null
          : { requireMatch: true };
      return selection;
    };
  }
}