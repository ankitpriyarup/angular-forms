import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'reactive-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'reactive_form.ng.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveForm {
  protected readonly years: number[] = [];

  constructor() {
    const now = new Date().getUTCFullYear();
    this.years = Array(now - (now - 40))
      .fill('')
      .map((v, idx) => now - idx);
  }
}
