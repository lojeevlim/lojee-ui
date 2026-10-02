import { useState } from "react";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";
import { wcCode } from "../../webComponentCode";
import { ColorPicker } from "../ColorPicker";

function Controlled() {
  const [color, setColor] = useState("#6366f1");
  return (
    <div className="space-y-3">
      <ColorPicker value={color} onChange={setColor} />
      <div className="flex items-center gap-2 text-xs text-fg-subtle">
        <span className="h-4 w-12 rounded border border-border" style={{ backgroundColor: color }} />
        <span className="font-mono text-fg-muted">{color}</span>
      </div>
    </div>
  );
}

export default function ColorPickerShowcase() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-fg">Color Picker</h1>
        <p className="mt-1 text-sm text-fg-subtle">Pick a color from the system picker, a row of presets, or by typing a hex code.</p>
      </div>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="Click the swatch for the system picker, a preset circle, or type a hex code (3 or 6 digits). `onChange` reports a normalized #rrggbb value.">Basic</SectionLabel>
        <Controlled />
        <CodeBlock
          variants={wcCode({
            react: `const [color, setColor] = useState("#6366f1");

<ColorPicker value={color} onChange={setColor} />`,
            html: `<l-Color-Picker id="color" value="#6366f1"></l-Color-Picker>`,
            vueHtml: `<l-Color-Picker :value="color" @change="color = $event.detail"></l-Color-Picker>`,
            angularHtml: `<l-Color-Picker [value]="color" (change)="color = $event.detail"></l-Color-Picker>`,
            script: `document.getElementById("color").addEventListener("change", (e) => console.log(e.detail)); // "#rrggbb"`,
            vueScript: `const color = ref("#6366f1");`,
            angularClass: `color = "#6366f1";`,
          })}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="`presets` replaces the swatches (an empty list hides them); `showInput={false}` removes the hex field.">Presets and input</SectionLabel>
        <div className="flex flex-wrap gap-8">
          <ColorPicker value="#0ea5e9" presets={["#0ea5e9", "#22c55e", "#f59e0b", "#ef4444"]} />
          <ColorPicker value="#8b5cf6" showInput={false} />
        </div>
        <CodeBlock
          variants={wcCode({
            react: `<ColorPicker presets={["#0ea5e9", "#22c55e", "#f59e0b", "#ef4444"]} />
<ColorPicker showInput={false} />`,
            html: `<l-Color-Picker id="brand"></l-Color-Picker>
<l-Color-Picker show-input="false"></l-Color-Picker>`,
            vueHtml: `<l-Color-Picker :presets="['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444']"></l-Color-Picker>
<l-Color-Picker :show-input="false"></l-Color-Picker>`,
            angularHtml: `<l-Color-Picker [presets]="['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444']"></l-Color-Picker>
<l-Color-Picker [showInput]="false"></l-Color-Picker>`,
            script: `document.getElementById("brand").presets = ["#0ea5e9", "#22c55e", "#f59e0b", "#ef4444"];`,
          })}
        />
      </section>
    </div>
  );
}
