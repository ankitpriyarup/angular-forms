import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import '@polymer/paper-input/paper-textarea';

@Component({
  selector: 'custom-picker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <form [formGroup]="form" class="review" (ngSubmit)="onSubmit()">
    <h2 class="review-head">Rate us</h2>
    <!--
    <paper-textarea
      ngDefaultControl
      formControlName="reviewText"
      placeholder="Your honest review here..."
      label="Review text"
      rows="2"
      class="review-text"
    >
    </paper-textarea>
    -->

    <div class="review-textarea" contenteditable>
      <h3 data-placeholder="Title..."></h3>
      <p data-placeholder="Describe your rating"></p>
    </div>
    <button type="submit" class="save">Save</button>
  </form>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomPicker {
  form = this.fb.group({ reviewText: '' });

  constructor(private readonly fb: FormBuilder) {}

  onSubmit() {
    console.log(this.form.value);
    this.form.reset();
  }
}
