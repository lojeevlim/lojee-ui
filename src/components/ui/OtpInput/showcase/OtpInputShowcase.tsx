import { useState } from "react";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";
import { wcCode } from "../../webComponentCode";
import { OtpInput } from "../OtpInput";

function Complete() {
  const [done, setDone] = useState<string | null>(null);
  return (
    <div className="space-y-2">
      <OtpInput onComplete={setDone} onChange={() => setDone(null)} />
      <p className="text-xs text-fg-subtle">{done ? <>Complete: <span className="font-mono text-fg-muted">{done}</span></> : "Type or paste a 6-digit code."}</p>
    </div>
  );
}

export default function OtpInputShowcase() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-fg">OTP Input</h1>
        <p className="mt-1 text-sm text-fg-subtle">One box per character for verification codes. Typing moves forward, Backspace moves back, and pasting a code fills every box.</p>
      </div>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="`onChange` reports the code so far; `onComplete` fires once with the full code when the last box is filled.">Basic</SectionLabel>
        <Complete />
        <CodeBlock
          variants={wcCode({
            react: `<OtpInput onComplete={(code) => verify(code)} />`,
            html: `<l-otp-input id="otp"></l-otp-input>`,
            vueHtml: `<l-otp-input @complete="verify($event.detail)"></l-otp-input>`,
            angularHtml: `<l-otp-input (complete)="verify($event.detail)"></l-otp-input>`,
            script: `document.getElementById("otp").addEventListener("complete", (e) => verify(e.detail)); // string`,
            vueScript: `const verify = (code: string) => console.log(code);`,
            angularClass: `verify(code: string) {
  console.log(code);
}`,
          })}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub={'`length` sets the number of boxes (default 6); `type` is "numeric" (digits only, default) or "alphanumeric".'}>Length and type</SectionLabel>
        <div className="space-y-3">
          <OtpInput length={4} />
          <OtpInput length={8} type="alphanumeric" size="sm" />
        </div>
        <CodeBlock
          variants={wcCode({
            react: `<OtpInput length={4} />
<OtpInput length={8} type="alphanumeric" size="sm" />`,
            html: `<l-otp-input length="4"></l-otp-input>
<l-otp-input length="8" type="alphanumeric" size="sm"></l-otp-input>`,
          })}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="`mask` shows dots instead of the characters, `invalid` draws red borders (e.g. after a wrong code) and `disabled` locks it.">Mask and states</SectionLabel>
        <div className="space-y-3">
          <OtpInput mask value="1234" />
          <OtpInput invalid value="123456" />
          <OtpInput disabled value="12" />
        </div>
        <CodeBlock
          variants={wcCode({
            react: `<OtpInput mask />
<OtpInput invalid />
<OtpInput disabled />`,
            html: `<l-otp-input mask="true"></l-otp-input>
<l-otp-input invalid="true"></l-otp-input>
<l-otp-input disabled="true"></l-otp-input>`,
            vueHtml: `<l-otp-input :mask="true"></l-otp-input>
<l-otp-input :invalid="true"></l-otp-input>
<l-otp-input :disabled="true"></l-otp-input>`,
            angularHtml: `<l-otp-input [mask]="true"></l-otp-input>
<l-otp-input [invalid]="true"></l-otp-input>
<l-otp-input [disabled]="true"></l-otp-input>`,
          })}
        />
      </section>
    </div>
  );
}
