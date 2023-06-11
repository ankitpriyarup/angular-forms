import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'reactive_form.ng.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveForm {
  protected readonly years: number[] = [];
  protected readonly form = new FormGroup({
    firstName: new FormControl('Ankit'),
    lastName: new FormControl('Priyarup'),
    nickName: new FormControl('x4150'),
    email: new FormControl('ankitpriyarup@gmail.com'),
    yearOfBirth: new FormControl(2023),
    passportNumber: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      postCode: new FormControl(0),
    }),
    password: new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    }),
  });

  constructor() {
    const now = new Date().getUTCFullYear();
    this.years = Array(now - (now - 40))
      .fill('')
      .map((v, idx) => now - idx);
  }
}
