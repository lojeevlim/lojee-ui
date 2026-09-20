import { useState } from "react";
import { SignupForm, type SignupFormValues } from "../SignupForm";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function SignupFormShowcase() {
  const [submitted, setSubmitted] = useState<SignupFormValues | null>(null);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">SignupForm</h1>
          <p className="text-sm text-slate-500 mt-1">
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
            <p className="mt-3 text-sm text-slate-500">
              Submitted: <span className="font-medium text-slate-900">{submitted.name}</span> ({submitted.email})
            </p>
          )}
          <CodeBlock
            variants={{
              react: `const [values, setValues] = useState(null);

<SignupForm onSubmit={setValues} />`,
              js: `<SignupForm id="signup"></SignupForm>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("signup").addEventListener("submit", (e) => {
    console.log(e.detail); // { name, email, password, confirmPassword, agreeTerms }
  });
</script>`,
              vue: `<template>
  <SignupForm @submit="onSubmit" />
</template>

<script setup>
function onSubmit(values) {
  console.log(values);
}
</script>`,
              angular: `<SignupForm (submit)="onSubmit($event)"></SignupForm>

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
                <p className="text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <a className="font-medium text-slate-900" href="#">
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
              js: `<SignupForm>
  <p slot="footer">Already have an account? <a href="/login">Log in</a></p>
</SignupForm>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <SignupForm>
    <template #footer>
      <p>Already have an account? <a href="/login">Log in</a></p>
    </template>
  </SignupForm>
</template>`,
              angular: `<SignupForm>
  <p slot="footer">Already have an account? <a href="/login">Log in</a></p>
</SignupForm>`,
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
              js: `<SignupForm mismatchError="Those passwords don't match — try again."></SignupForm>`,
              vue: `<SignupForm mismatchError="Those passwords don't match — try again." />`,
              angular: `<SignupForm mismatchError="Those passwords don't match — try again."></SignupForm>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
