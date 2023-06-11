import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  Validator,
  NG_VALIDATORS,
} from '@angular/forms';

@Directive({
  selector: '[banWords]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: BanWordsDirective,
      multi: true,
    },
  ],
})
export class BanWordsDirective implements Validator {
  @Input()
  set banWords(value: string | string[]) {
    this.bannedWords = Array.isArray(value) ? value : [value];
    this.onChange();
  }
  private bannedWords: string[] = [];

  private onChange: () => void = () => {};

  constructor() {}

  validate(control: AbstractControl<string>): ValidationErrors | null {
    const foundBannedWord = this.bannedWords.find(
      (word) => word.toLowerCase() === control.value?.toLowerCase()
    );
    return !foundBannedWord
      ? null
      : { banWords: { bannedWord: foundBannedWord } };
  }

  registerOnValidatorChange(fn: () => void) {
    this.onChange = fn;
  }
}
