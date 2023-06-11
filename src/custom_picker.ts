import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'custom-picker',
  standalone: true,
  imports: [CommonModule],
  template: `It works!`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomPicker {}
