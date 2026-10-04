// The Angular ControlValueAccessor shown in the docs (verified in an Angular app: [(ngModel)], [formControl] and formControlName, AOT build).
// It is copied into the app rather than shipped, because Angular only compiles directives that are part of the app or a compiled Angular library.
export const VALUE_ACCESSOR_FILE = "lojee-value-accessor.ts";
export const VALUE_ACCESSOR_TAGS = ["l-input", "l-textarea", "l-password-input", "l-search-input", "l-select", "l-checkbox", "l-switch", "l-slider", "l-number-input", "l-date-picker", "l-time-picker", "l-combobox", "l-multi-select", "l-rating", "l-color-picker", "l-otp-input", "l-tag-input", "l-range-slider"];
export const VALUE_ACCESSOR_SOURCE = `import { Directive, ElementRef, forwardRef, HostListener, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// Lets [(ngModel)], formControl and formControlName work on lojee-ui's <l-*> form controls.

@Directive({
  selector:
    'l-input[ngModel], l-input[formControl], l-input[formControlName], ' +
    'l-textarea[ngModel], l-textarea[formControl], l-textarea[formControlName], ' +
    'l-password-input[ngModel], l-password-input[formControl], l-password-input[formControlName], ' +
    'l-search-input[ngModel], l-search-input[formControl], l-search-input[formControlName], ' +
    'l-select[ngModel], l-select[formControl], l-select[formControlName], ' +
    'l-checkbox[ngModel], l-checkbox[formControl], l-checkbox[formControlName], ' +
    'l-switch[ngModel], l-switch[formControl], l-switch[formControlName], ' +
    'l-slider[ngModel], l-slider[formControl], l-slider[formControlName], ' +
    'l-number-input[ngModel], l-number-input[formControl], l-number-input[formControlName], ' +
    'l-date-picker[ngModel], l-date-picker[formControl], l-date-picker[formControlName], ' +
    'l-time-picker[ngModel], l-time-picker[formControl], l-time-picker[formControlName], ' +
    'l-combobox[ngModel], l-combobox[formControl], l-combobox[formControlName], ' +
    'l-multi-select[ngModel], l-multi-select[formControl], l-multi-select[formControlName], ' +
    'l-rating[ngModel], l-rating[formControl], l-rating[formControlName], ' +
    'l-color-picker[ngModel], l-color-picker[formControl], l-color-picker[formControlName], ' +
    'l-otp-input[ngModel], l-otp-input[formControl], l-otp-input[formControlName], ' +
    'l-tag-input[ngModel], l-tag-input[formControl], l-tag-input[formControlName], ' +
    'l-range-slider[ngModel], l-range-slider[formControl], l-range-slider[formControlName]',

  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LojeeValueAccessor), multi: true }],
})
export class LojeeValueAccessor implements ControlValueAccessor {
  private el = inject<ElementRef<HTMLElement & Record<string, unknown>>>(ElementRef).nativeElement;
  private prop = ['l-checkbox', 'l-switch'].includes(this.el.localName) ? 'checked' : 'value';
  private onChange: (v: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(v: unknown) { this.el[this.prop] = v ?? (this.prop === 'checked' ? false : ''); }
  registerOnChange(fn: (v: unknown) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.el['disabled'] = disabled; }

  @HostListener('update', ['$event']) update(e: Event) { this.onChange((e as CustomEvent).detail); }
  @HostListener('focusout') touched() { this.onTouched(); }
}
`;
