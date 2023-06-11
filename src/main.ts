import 'zone.js/dist/zone';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { TemplateForm } from './template_form';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, TemplateForm, FormsModule],
  styles: [
    '.highlight { color: blue; text-decoration: underline }',
    '.header { display: flex; gap: 8px; align-items: center; margin-bottom: 12px }',
    '.header > * { margin: 0 }',
    'a { cursor: pointer }',
    '.search { position: absolute; bottom: 0; left: 0; right: 0; margin: 4px; }',
  ],
  template: `
    <div class="header">
      <h2 style="margin-right:12px">Angular Forms</h2>
      <a [class.highlight]="selection === 0" (click)="selection = 0">Template Form</a> |
      <a [class.highlight]="selection === 1" (click)="selection = 1">Reactive Form</a>
    </div>

    <template-form *ngIf="selection === 0"></template-form>

    <input class="search" [(ngModel)]="globalSearch" placeholder="Search">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  selection = 0;
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
}

bootstrapApplication(App);
