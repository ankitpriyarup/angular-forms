import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'template-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'template_form.ng.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateForm {
  protected years: number[] = [];

  constructor() {
    const now = new Date().getUTCFullYear();
    this.years = Array(now - (now - 40))
      .fill('')
      .map((v, idx) => now - idx);
  }
}
