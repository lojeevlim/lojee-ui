import { useState } from "react";
import { SignupForm, type SignupFormValues } from "../SignupForm";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

export default function SignupFormShowcase() {
  const [submitted, setSubmitted] = useState<SignupFormValues | null>(null);

  return (
    <div>
      <div className="space-y-12">
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
              js: `<l-signup-form id="signup"></l-signup-form>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("signup").addEventListener("submit", (e) => {
    console.log(e.detail); // { name, email, password, confirmPassword, agreeTerms }
  });
</script>`,
              vue: `<template>
  <l-signup-form @submit="onSubmit" />
</template>

<script setup lang="ts">
function onSubmit(values) {
  console.log(values);
}
</script>`,
              angular: `<l-signup-form (submit)="onSubmit($event)"></l-signup-form>

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
              js: `<l-signup-form>
  <p slot="footer">Already have an account? <a href="/login">Log in</a></p>
</l-signup-form>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-signup-form>
    <div slot="footer">
      <p>Already have an account? <a href="/login">Log in</a></p>
    </div>
  </l-signup-form>
</template>`,
              angular: `<l-signup-form>
  <p slot="footer">Already have an account? <a href="/login">Log in</a></p>
</l-signup-form>`,
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
              js: `<l-signup-form mismatchError="Those passwords don't match — try again."></l-signup-form>`,
              vue: `<l-signup-form mismatchError="Those passwords don't match — try again." />`,
              angular: `<l-signup-form mismatchError="Those passwords don't match — try again."></l-signup-form>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview cols={2}>
            <SignupForm transition="fade" />
            <SignupForm transition="slide-up" />
            <SignupForm transition="zoom" transitionDelay={100} />
            <SignupForm transition="flip" transitionDuration={700} />
          </TransitionPreview>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="p-6"><SignupForm hoverEffect="lift" /></div>
            <div className="p-6"><SignupForm hoverEffect="glow" /></div>
          </div>
          <CodeBlock
            variants={{
              react: `<SignupForm transition="fade" />
<SignupForm transition="slide-up" />
<SignupForm transition="zoom" transitionDelay={100} />
<SignupForm transition="flip" transitionDuration={700} />
<SignupForm hoverEffect="lift" />
<SignupForm hoverEffect="glow" />`,
              js: `<l-signup-form transition="fade"></l-signup-form>
<l-signup-form transition="slide-up"></l-signup-form>
<l-signup-form transition="zoom" transitionDelay="100"></l-signup-form>
<l-signup-form transition="flip" transitionDuration="700"></l-signup-form>
<l-signup-form hoverEffect="lift"></l-signup-form>
<l-signup-form hoverEffect="glow"></l-signup-form>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-signup-form transition="fade"></l-signup-form>
  <l-signup-form transition="slide-up"></l-signup-form>
  <l-signup-form transition="zoom" transitionDelay="100"></l-signup-form>
  <l-signup-form transition="flip" transitionDuration="700"></l-signup-form>
  <l-signup-form hoverEffect="lift"></l-signup-form>
  <l-signup-form hoverEffect="glow"></l-signup-form>
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
    <l-signup-form transition="fade"></l-signup-form>
    <l-signup-form transition="slide-up"></l-signup-form>
    <l-signup-form transition="zoom" transitionDelay="100"></l-signup-form>
    <l-signup-form transition="flip" transitionDuration="700"></l-signup-form>
    <l-signup-form hoverEffect="lift"></l-signup-form>
    <l-signup-form hoverEffect="glow"></l-signup-form>
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
