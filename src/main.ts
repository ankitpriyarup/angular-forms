import 'zone.js/dist/zone';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { TemplateForm } from './template_form';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, TemplateForm],
  styles: [
    '.highlight { color: blue; text-decoration: underline }',
    '.header { display: flex; gap: 8px; align-items: center; margin-bottom: 12px }',
    '.header > * { margin: 0 }',
    'a { cursor: pointer }',
  ],
  template: `
    <div class="header">
      <h2 style="margin-right:12px">Angular Forms</h2>
      <a [class.highlight]="selection === 0" (click)="selection = 0">Template Form</a> |
      <a [class.highlight]="selection === 1" (click)="selection = 1">Reactive Form</a>
    </div>

    <template-form *ngIf="selection === 0"></template-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  selection = 0;
}

bootstrapApplication(App);
