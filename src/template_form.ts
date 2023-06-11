import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from './main';
import { BanWordsDirective } from './validators/ban-words.directive';

@Component({
  selector: 'template-form',
  standalone: true,
  imports: [CommonModule, FormsModule, BanWordsDirective],
  templateUrl: 'template_form.ng.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateForm {
  protected readonly years: number[] = [];
  protected formData: UserInfo = {
    firstName: '',
    lastName: '',
    nickName: '',
    email: '',
    yearOfBirth: 2023,
    passportNumber: '',
    street: '',
    city: '',
    postCode: 0,
  };

  constructor() {
    const now = new Date().getUTCFullYear();
    this.years = Array(now - (now - 40))
      .fill('')
      .map((v, idx) => now - idx);
  }

  onSubmitForm(form: NgForm, submitEvent: SubmitEvent) {
    console.log(form.value);
    this.formData = {
      firstName: '',
      lastName: '',
      nickName: '',
      email: '',
      yearOfBirth: 2023,
      passportNumber: '',
      street: '',
      city: '',
      postCode: 0,
    };
    // console.log(submitEvent);
  }
}
