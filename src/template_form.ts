import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from './main';
import { BanWordsDirective } from './validators/ban-words.directive';
import { PasswordShouldMatchDirective } from './validators/password-should-match.directive';
import { UniqueNicknameDirective } from './validators/unique-nickname.directive';

@Component({
  selector: 'template-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BanWordsDirective,
    PasswordShouldMatchDirective,
    UniqueNicknameDirective,
  ],
  templateUrl: 'template_form.ng.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateForm {
  protected readonly years: number[] = [];
  protected formData: UserInfo = {
    firstName: 'Ankit',
    lastName: 'Priyarup',
    nickName: 'x4150',
    email: 'ankitpriyarup@gmail.com',
    yearOfBirth: 2023,
    passportNumber: '',
    street: '',
    city: '',
    postCode: 0,
    password: '',
    confirmPassword: '',
  };

  private initialFormValues: unknown;

  @ViewChild(NgForm)
  formDir!: NgForm;

  constructor() {
    const now = new Date().getUTCFullYear();
    this.years = Array(now - (now - 40))
      .fill('')
      .map((v, idx) => now - idx);
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      // formDir.values is only populated after we queue micro
      // tasks because setControl method is itself a microtask promise.
      console.log(this.formDir.value);
      this.initialFormValues = this.formDir.value;
    });
  }

  onSubmitForm(form: NgForm, submitEvent: SubmitEvent) {
    console.log(form.value);
    form.reset();
    // console.log(submitEvent);
  }

  isAdult(year: number) {
    return new Date().getFullYear() - year >= 18;
  }

  onReset(form: NgForm, e: Event) {
    e.preventDefault();
    this.formDir.reset(this.initialFormValues);
  }
}
