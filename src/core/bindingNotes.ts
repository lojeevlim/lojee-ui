import { useCodeFramework } from "./codeFramework";

// Language-specific captions for the data-binding docs: each one explains only the syntax of the language selected in the header.

/** The four events every form control reports (Events section). `valueNote` describes `detail` for this control. */
export function useFormEventsNote(valueNote = "the new value"): string {
  const { framework } = useCodeFramework();
  switch (framework) {
    case "react":
      return "Four callbacks, the same on every form control, as the native props. onChange: the value was committed. onInput: fires as the user changes it. onFocus: the control gained focus. onInvalid: it failed validation (e.g. required).";
    case "js":
      return `Four events, the same on every form control — listen with addEventListener. update: the value was committed — detail is ${valueNote}. input: fires as the user changes it. focus: the control gained focus. invalid: it failed validation (e.g. required) — detail is the message.`;
    case "vue":
      return `Four events, the same on every form control — listen with @update, @input, @focus, @invalid. update: the value was committed — detail is ${valueNote}. input: fires as the user changes it. focus: the control gained focus. invalid: it failed validation (e.g. required) — detail is the message.`;
    case "angular":
      return `Four events, the same on every form control — listen with (update), (input), (focus), (invalid). update: the value was committed — detail is ${valueNote}. input: fires as the user changes it. focus: the control gained focus. invalid: it failed validation (e.g. required) — detail is the message.`;
  }
}

/** Two-way binding of a checkbox-like control (it works on `checked`, not `value`). */
export function useCheckedBindingNote(): string {
  const { framework } = useCodeFramework();
  switch (framework) {
    case "react":
      return "Two-way binding works on checked (not value, which is the form value): checked + onChange (controlled) or defaultChecked.";
    case "js":
      return "Two-way binding works on checked (not value, which is the form value): set checked to push it in, and listen to update (detail = true / false) to read it back.";
    case "vue":
      return "Two-way binding works on checked (not value, which is the form value): bind :checked.prop and write it back from @update (detail = true / false).";
    case "angular":
      return "Two-way binding works on checked (not value, which is the form value): bind [checked] and write it back from (update) (detail = true / false), or use [(ngModel)] with the LojeeValueAccessor directive from the Data Binding page.";
  }
}
