import { useState } from "react";
import { SignupForm, type SignupFormValues } from "../SignupForm";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function SignupFormShowcase() {
  const [submitted, setSubmitted] = useState<SignupFormValues | null>(null);

  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">SignupForm</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A ready-to-use signup block — name, email, password, confirm password, and terms — built from this
            library's own form primitives.
          </p>
        </div>

        <section>
          <SectionLabel sub="onSubmit only fires once the two password fields match and terms are agreed to — nothing is actually sent anywhere in this demo.">
            Basic
          </SectionLabel>
          <div className="max-w-sm">
            <SignupForm onSubmit={setSubmitted} />
          </div>
          {submitted && (
            <p className="mt-3 text-sm text-fg-subtle">
              Submitted: <span className="font-medium text-fg">{submitted.name}</span> ({submitted.email})
            </p>
          )}
          <CodeBlock
            variants={{
              react: `const [values, setValues] = useState(null);

<SignupForm onSubmit={setValues} />`,
              js: `<l-SignupForm id="signup"></l-SignupForm>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("signup").addEventListener("submit", (e) => {
    console.log(e.detail); // { name, email, password, confirmPassword, agreeTerms }
  });
</script>`,
              vue: `<template>
  <l-SignupForm @submit="onSubmit" />
</template>

<script setup lang="ts">
function onSubmit(values) {
  console.log(values);
}
</script>`,
              angular: `<l-SignupForm (submit)="onSubmit($event)"></l-SignupForm>

onSubmit(values) {
  console.log(values);
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="footer projects rich content below the form — this component has no opinion about routing.">
            With footer link
          </SectionLabel>
          <div className="max-w-sm">
            <SignupForm
              footer={
                <p className="text-center text-sm text-fg-subtle">
                  Already have an account?{" "}
                  <a className="font-medium text-fg" href="#">
                    Log in
                  </a>
                </p>
              }
            />
          </div>
          <CodeBlock
            variants={{
              react: `<SignupForm
  footer={
    <p>
      Already have an account? <a href="/login">Log in</a>
    </p>
  }
/>`,
              js: `<l-SignupForm>
  <p slot="footer">Already have an account? <a href="/login">Log in</a></p>
</l-SignupForm>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-SignupForm>
    <template #footer>
      <p>Already have an account? <a href="/login">Log in</a></p>
    </template>
  </l-SignupForm>
</template>`,
              angular: `<l-SignupForm>
  <p slot="footer">Already have an account? <a href="/login">Log in</a></p>
</l-SignupForm>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Typing different values into Password and Confirm password, then submitting, shows an inline error under the confirm field instead of calling onSubmit.">
            Password mismatch
          </SectionLabel>
          <div className="max-w-sm">
            <SignupForm mismatchError="Those passwords don't match — try again." />
          </div>
          <CodeBlock
            variants={{
              react: `<SignupForm mismatchError="Those passwords don't match — try again." />`,
              js: `<l-SignupForm mismatchError="Those passwords don't match — try again."></l-SignupForm>`,
              vue: `<l-SignupForm mismatchError="Those passwords don't match — try again." />`,
              angular: `<l-SignupForm mismatchError="Those passwords don't match — try again."></l-SignupForm>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <div className="grid gap-6 sm:grid-cols-2">
            <SignupForm transition="fade" />
            <SignupForm transition="slide-up" />
            <SignupForm transition="zoom" transitionDelay={100} />
            <SignupForm transition="flip" transitionDuration={700} />
            <SignupForm hoverEffect="lift" />
            <SignupForm hoverEffect="glow" />
          </div>
          <CodeBlock
            variants={{
              react: `<SignupForm transition="fade" />
<SignupForm transition="slide-up" />
<SignupForm transition="zoom" transitionDelay={100} />
<SignupForm transition="flip" transitionDuration={700} />
<SignupForm hoverEffect="lift" />
<SignupForm hoverEffect="glow" />`,
              js: `<l-SignupForm transition="fade"></l-SignupForm>
<l-SignupForm transition="slide-up"></l-SignupForm>
<l-SignupForm transition="zoom" transitionDelay="100"></l-SignupForm>
<l-SignupForm transition="flip" transitionDuration="700"></l-SignupForm>
<l-SignupForm hoverEffect="lift"></l-SignupForm>
<l-SignupForm hoverEffect="glow"></l-SignupForm>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-SignupForm transition="fade"></l-SignupForm>
  <l-SignupForm transition="slide-up"></l-SignupForm>
  <l-SignupForm transition="zoom" transitionDelay="100"></l-SignupForm>
  <l-SignupForm transition="flip" transitionDuration="700"></l-SignupForm>
  <l-SignupForm hoverEffect="lift"></l-SignupForm>
  <l-SignupForm hoverEffect="glow"></l-SignupForm>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-SignupForm transition="fade"></l-SignupForm>
    <l-SignupForm transition="slide-up"></l-SignupForm>
    <l-SignupForm transition="zoom" transitionDelay="100"></l-SignupForm>
    <l-SignupForm transition="flip" transitionDuration="700"></l-SignupForm>
    <l-SignupForm hoverEffect="lift"></l-SignupForm>
    <l-SignupForm hoverEffect="glow"></l-SignupForm>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
