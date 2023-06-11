import 'zone.js/dist/zone';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { TemplateForm } from './template_form';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveForm } from './reactive_form';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [
    CommonModule,
    TemplateForm,
    ReactiveForm,
    FormsModule,
    HttpClientModule,
  ],
  styles: [
    '.highlight { color: blue; text-decoration: underline }',
    '.header { display: flex; gap: 8px; align-items: center; margin-bottom: 12px }',
    '.header > * { margin: 0 }',
    'a { cursor: pointer }',
    '.search { position: fixed; bottom: 0; left: 0; right: 0; margin: 4px; }',
  ],
  template: `
    <div class="header">
      <h2 style="margin-right:12px">Angular Forms</h2>
      <a [class.highlight]="selection === 0" (click)="selection = 0">Template Form</a> |
      <a [class.highlight]="selection === 1" (click)="selection = 1">Reactive Form</a>
    </div>

    <template-form *ngIf="selection === 0"></template-form>
    <reactive-form *ngIf="selection === 1"></reactive-form>

    <input class="search" [(ngModel)]="globalSearch" placeholder="Search">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  selection = 1;
  globalSearch = '';
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  yearOfBirth: number;
  passportNumber: string;
  street: string;
  city: string;
  postCode: number;
  password: string;
  confirmPassword: string;
}

bootstrapApplication(App);
