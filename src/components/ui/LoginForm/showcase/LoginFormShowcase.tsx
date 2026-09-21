import { useState } from "react";
import { LoginForm, type LoginFormValues } from "../LoginForm";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function LoginFormShowcase() {
  const [submitted, setSubmitted] = useState<LoginFormValues | null>(null);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">LoginForm</h1>
          <p className="text-sm text-slate-500 mt-1">
            A ready-to-use login block — email, password, remember-me, and submit — built from this library's own
            form primitives.
          </p>
        </div>

        <section>
          <SectionLabel sub="onSubmit reports the current field values — nothing is actually sent anywhere in this demo.">
            Basic
          </SectionLabel>
          <div className="max-w-sm">
            <LoginForm onSubmit={setSubmitted} />
          </div>
          {submitted && (
            <p className="mt-3 text-sm text-slate-500">
              Submitted: <span className="font-medium text-slate-900">{submitted.email}</span>
              {submitted.remember ? " (remembered)" : ""}
            </p>
          )}
          <CodeBlock
            variants={{
              react: `const [values, setValues] = useState(null);

<LoginForm onSubmit={setValues} />`,
              js: `<l-LoginForm id="login"></l-LoginForm>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("login").addEventListener("submit", (e) => {
    console.log(e.detail); // { email, password, remember }
  });
</script>`,
              vue: `<template>
  <l-LoginForm @submit="onSubmit" />
</template>

<script setup>
function onSubmit(values) {
  console.log(values);
}
</script>`,
              angular: `<l-LoginForm (submit)="onSubmit($event)"></l-LoginForm>

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
            <LoginForm
              footer={
                <p className="text-center text-sm text-slate-500">
                  Don&apos;t have an account?{" "}
                  <a className="font-medium text-slate-900" href="#">
                    Sign up
                  </a>
                </p>
              }
            />
          </div>
          <CodeBlock
            variants={{
              react: `<LoginForm
  footer={
    <p>
      Don't have an account? <a href="/signup">Sign up</a>
    </p>
  }
/>`,
              js: `<l-LoginForm>
  <p slot="footer">Don't have an account? <a href="/signup">Sign up</a></p>
</l-LoginForm>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-LoginForm>
    <template #footer>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </template>
  </l-LoginForm>
</template>`,
              angular: `<l-LoginForm>
  <p slot="footer">Don't have an account? <a href="/signup">Sign up</a></p>
</l-LoginForm>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="showRemember={false} showForgotPassword={false} for the minimal variant.">
            Minimal
          </SectionLabel>
          <div className="max-w-sm">
            <LoginForm showRemember={false} showForgotPassword={false} />
          </div>
          <CodeBlock
            variants={{
              react: `<LoginForm showRemember={false} showForgotPassword={false} />`,
              js: `<l-LoginForm showRemember="false" showForgotPassword="false"></l-LoginForm>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-LoginForm :showRemember="false" :showForgotPassword="false" />`,
              angular: `<l-LoginForm [showRemember]="false" [showForgotPassword]="false"></l-LoginForm>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
