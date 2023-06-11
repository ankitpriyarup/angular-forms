import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  map,
  Observable,
  of,
  Subscription,
  tap,
  delay,
  startWith,
  bufferCount,
  filter,
} from 'rxjs';

@Component({
  selector: 'reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'reactive_form.ng.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveForm {
  protected readonly years: number[] = [];
  protected readonly phoneLabels = ['Main', 'Mobile', 'Work', 'Home'];
  protected readonly form = this.fb.group({
    firstName: [
      'Ankit',
      [
        Validators.required,
        Validators.minLength(4),
        banWords(['test', 'dummy']),
      ],
    ],
    lastName: ['Priyarup', [Validators.required, Validators.minLength(2)]],
    nickname: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[\w.]+$/),
          banWords(['dummy', 'anonymous']),
        ],
        asyncValidators: [this.uniqueNicknameValidator.bind(this)],
        updateOn: 'blur',
      },
    ],
    email: ['ankitpriyarup@gmail.com', [Validators.email, Validators.required]],
    yearOfBirth: this.fb.nonNullable.control(2023, Validators.required),
    passport: ['', [Validators.pattern(/^[A-Z]{2}[0-9]{6}$/)]],
    address: this.fb.nonNullable.group({
      fullAddress: ['', Validators.required],
      city: ['', Validators.required],
      postCode: [0, Validators.required],
    }),
    phones: this.fb.array([
      this.fb.group({
        label: this.fb.nonNullable.control(this.phoneLabels[0]),
        phone: '',
      }),
    ]),
    // this.fb.group<{[key: string]:boolean}>();
    skills: this.fb.record<boolean>({}),
    password: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: '',
      },
      {
        validators: passwordShouldMatch,
      }
    ),
  });

  private ageValidators!: Subscription;
  private formPendingState!: Subscription;
  skills$!: Observable<string[]>;

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  private initialFormValues: unknown;

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient,
    private cd: ChangeDetectorRef
  ) {
    const now = new Date().getUTCFullYear();
    this.years = Array(now - (now - 40))
      .fill('')
      .map((v, idx) => now - idx);
  }

  ngOnInit(): void {
    this.skills$ = of([
      'Angular',
      'Typescript',
      'Unity',
      'Javascript',
      'RxJs',
    ]).pipe(
      delay(1000),
      tap((skills) => this.buildSkillControls(skills)),
      tap(() => (this.initialFormValues = this.form.value))
    );
    this.ageValidators = this.form.controls.yearOfBirth.valueChanges
      .pipe(
        tap(() => this.form.controls.passport.markAsDirty()),
        startWith(this.form.controls.yearOfBirth.value)
      )
      .subscribe((yearOfBirth) => {
        this.isAdult(yearOfBirth)
          ? this.form.controls.passport.addValidators(Validators.required)
          : this.form.controls.passport.removeValidators(Validators.required);
        this.form.controls.passport.updateValueAndValidity();
      });
    this.formPendingState = this.form.statusChanges
      .pipe(
        bufferCount(2, 1),
        filter(([prevState]) => prevState === 'PENDING')
      )
      .subscribe(() => this.cd.markForCheck());
  }

  ngOnDestroy(): void {
    this.ageValidators.unsubscribe();
    this.formPendingState.unsubscribe();
  }

  addPhone() {
    this.form.controls.phones.insert(
      0,
      new FormGroup({
        label: new FormControl(this.phoneLabels[0], { nonNullable: true }),
        phone: new FormControl(''),
      })
    );
  }

  removePhone(index: number) {
    this.form.controls.phones.removeAt(index);
  }

  onSubmit(e: Event) {
    console.log(this.form.value);
    this.formDir.resetForm(this.form.value);
  }

  onReset(e: Event) {
    e.preventDefault();
    this.formDir.resetForm(this.initialFormValues);
  }

  uniqueNicknameValidator(
    control: AbstractControl<string | null>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.http
      .get<unknown[]>(
        `https://jsonplaceholder.typicode.com/users?username=${control.value}`
      )
      .pipe(
        map((users) =>
          users.length === 0 ? null : { uniqueName: { isTaken: true } }
        ),
        catchError(() => of({ uniqueName: { unknownError: true } }))
      );
  }

  private buildSkillControls(skills: string[]) {
    skills.forEach((skill) =>
      this.form.controls.skills.addControl(
        skill,
        new FormControl(false, { nonNullable: true })
      )
    );
  }

  private isAdult(yearOfBirth: number): boolean {
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth >= 18;
  }
}

export function banWords(bannedWords: string[] = []): ValidatorFn {
  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    const foundBannedWord = bannedWords.find(
      (word) => word.toLowerCase() === control.value?.toLowerCase()
    );
    return !foundBannedWord
      ? null
      : { banWords: { bannedWord: foundBannedWord } };
  };
}

export function passwordShouldMatch(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  const errors = { passwordShouldMatch: { mismatch: true } };

  if (password?.value === confirmPassword?.value) {
    return null;
  }

  confirmPassword?.setErrors(errors);

  return errors;
}
