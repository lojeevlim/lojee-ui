import { useState } from "react";
import { LoginForm, type LoginFormValues } from "../LoginForm";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

export default function LoginFormShowcase() {
  const [submitted, setSubmitted] = useState<LoginFormValues | null>(null);

  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">LoginForm</h1>
          <p className="text-sm text-fg-subtle mt-1">
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
            <p className="mt-3 text-sm text-fg-subtle">
              Submitted: <span className="font-medium text-fg">{submitted.email}</span>
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

<script setup lang="ts">
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
                <p className="text-center text-sm text-fg-subtle">
                  Don&apos;t have an account?{" "}
                  <a className="font-medium text-fg" href="#">
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
    <div slot="footer">
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
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

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview cols={2}>
            <LoginForm transition="fade" />
            <LoginForm transition="slide-up" />
            <LoginForm transition="zoom" transitionDelay={100} />
            <LoginForm transition="flip" transitionDuration={700} />
          </TransitionPreview>
          <div className="grid gap-6 sm:grid-cols-2">
            <LoginForm hoverEffect="lift" />
            <LoginForm hoverEffect="glow" />
          </div>
          <CodeBlock
            variants={{
              react: `<LoginForm transition="fade" />
<LoginForm transition="slide-up" />
<LoginForm transition="zoom" transitionDelay={100} />
<LoginForm transition="flip" transitionDuration={700} />
<LoginForm hoverEffect="lift" />
<LoginForm hoverEffect="glow" />`,
              js: `<l-LoginForm transition="fade"></l-LoginForm>
<l-LoginForm transition="slide-up"></l-LoginForm>
<l-LoginForm transition="zoom" transitionDelay="100"></l-LoginForm>
<l-LoginForm transition="flip" transitionDuration="700"></l-LoginForm>
<l-LoginForm hoverEffect="lift"></l-LoginForm>
<l-LoginForm hoverEffect="glow"></l-LoginForm>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-LoginForm transition="fade"></l-LoginForm>
  <l-LoginForm transition="slide-up"></l-LoginForm>
  <l-LoginForm transition="zoom" transitionDelay="100"></l-LoginForm>
  <l-LoginForm transition="flip" transitionDuration="700"></l-LoginForm>
  <l-LoginForm hoverEffect="lift"></l-LoginForm>
  <l-LoginForm hoverEffect="glow"></l-LoginForm>
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
    <l-LoginForm transition="fade"></l-LoginForm>
    <l-LoginForm transition="slide-up"></l-LoginForm>
    <l-LoginForm transition="zoom" transitionDelay="100"></l-LoginForm>
    <l-LoginForm transition="flip" transitionDuration="700"></l-LoginForm>
    <l-LoginForm hoverEffect="lift"></l-LoginForm>
    <l-LoginForm hoverEffect="glow"></l-LoginForm>
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
