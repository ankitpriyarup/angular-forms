import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserInfo } from './main';

@Component({
  selector: 'template-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'template_form.ng.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateForm {
  protected readonly years: number[] = [];
  protected readonly formData: UserInfo = {
    firstName: 'Ankit',
    lastName: 'Priyarup',
    nickName: 'x4150',
    email: 'ankitpriyarup@gmail.com',
    yearOfBirth: 2000,
    passportNumber: 'AB123456',
    street: 'Some street 123',
    city: 'New Delhi',
    postCode: 110089,
  };

  constructor() {
    const now = new Date().getUTCFullYear();
    this.years = Array(now - (now - 40))
      .fill('')
      .map((v, idx) => now - idx);
  }
}
