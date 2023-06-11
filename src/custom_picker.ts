import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import '@polymer/paper-input/paper-textarea';

@Component({
  selector: 'custom-picker',
  standalone: true,
  imports: [CommonModule],
  template: `
  <form class="review">
    <h3 class="review-head">Rate us</h3>
    <paper-textarea
      placeholder="Your honest review here..."
      label="Review text"
      rows="2"
      class="review-text"
    >
    </paper-textarea>
    <button class="save">Save</button>
  </form>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomPicker {}
