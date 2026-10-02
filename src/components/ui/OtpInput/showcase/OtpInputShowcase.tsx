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
            html: `<l-Otp-Input id="otp"></l-Otp-Input>`,
            vueHtml: `<l-Otp-Input @complete="verify($event.detail)"></l-Otp-Input>`,
            angularHtml: `<l-Otp-Input (complete)="verify($event.detail)"></l-Otp-Input>`,
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
            html: `<l-Otp-Input length="4"></l-Otp-Input>
<l-Otp-Input length="8" type="alphanumeric" size="sm"></l-Otp-Input>`,
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
            html: `<l-Otp-Input mask="true"></l-Otp-Input>
<l-Otp-Input invalid="true"></l-Otp-Input>
<l-Otp-Input disabled="true"></l-Otp-Input>`,
            vueHtml: `<l-Otp-Input :mask="true"></l-Otp-Input>
<l-Otp-Input :invalid="true"></l-Otp-Input>
<l-Otp-Input :disabled="true"></l-Otp-Input>`,
            angularHtml: `<l-Otp-Input [mask]="true"></l-Otp-Input>
<l-Otp-Input [invalid]="true"></l-Otp-Input>
<l-Otp-Input [disabled]="true"></l-Otp-Input>`,
          })}
        />
      </section>
    </div>
  );
}
