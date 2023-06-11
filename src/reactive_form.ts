import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'reactive-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'reactive_form.ng.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveForm {}
