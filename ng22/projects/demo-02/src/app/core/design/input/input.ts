import { Component, input, model, signal } from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';

@Component({
  imports: [],
  selector: 'ind-input',
  styles: ``,
  template: `
    <label for="{{ id() }}" class="form-control">
      <input
        [type]="type()"
        [id]="id()"
        [value]="value()"
        (input)="onChangeValue($event)"
        (blur)="touched.set(true)"
      />
      <span>{{ label() }}</span>
    </label>
    @if (invalid() && touched()) {
      <p class="error">{{ errors()[0]?.message }}</p>
    }
  `,
})
export class Input implements FormValueControl<string> {
  readonly type = input('text');
  readonly label = input.required<string>();
  readonly id = signal<string>(this.#generateID());

  readonly value = model.required<string>();
  readonly touched = model<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly ValidationError[]>([]);

  #generateID() {
    return `input-${Math.random().toString(36).substring(2, 15)}`;
  }

  onChangeValue(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.value.set(inputElement.value);
  }
}
