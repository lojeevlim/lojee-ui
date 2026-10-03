import { useState } from "react";
import { Iframe, type IframeRatio } from "./Iframe/Iframe";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const RATIOS: IframeRatio[] = ["auto", "video", "wide", "square"];
const ON_OFF = ["on", "off"] as const;
const SAMPLES = ["https://example.com", "https://www.openstreetmap.org/export/embed.html", "https://en.wikipedia.org/wiki/Special:Random"];

export default function IframePlayground() {
  const motion = useMotion({ hover: false });
  const [src, setSrc] = useState(SAMPLES[0]);
  const [ratio, setRatio] = useState<IframeRatio>("video");
  const [height, setHeight] = useState(320);
  const [bordered, setBordered] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [showAddress, setShowAddress] = useState(true);
  const [sandbox, setSandbox] = useState(true);

  const sandboxValue = "allow-scripts allow-same-origin allow-popups";

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-full max-w-xl">
          <Iframe
            key={motion.replayKey}
            {...motion.props}
            src={src || "about:blank"}
            title="Embedded page"
            ratio={ratio}
            height={height}
            bordered={bordered}
            showLoader={showLoader}
            showAddress={showAddress}
            sandbox={sandbox ? sandboxValue : undefined}
          />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const lines = [
    `src="${src}"`,
    `title="Embedded page"`,
    ratio !== "auto" ? `ratio="${ratio}"` : height !== 360 ? `height={${height}}` : "",
    !bordered ? "bordered={false}" : "",
    !showLoader ? "showLoader={false}" : "",
    showAddress ? "showAddress" : "",
    sandbox ? `sandbox="${sandboxValue}"` : "",
    ...motion.attrs.trim().split(/ (?=\w+=)/),
  ].filter(Boolean);
  const code = `<Iframe\n  ${lines.join("\n  ")}\n/>`;
  const html = (tag: string) =>
    `<${tag} src="${src}" title="Embedded page"${ratio !== "auto" ? ` ratio="${ratio}"` : height !== 360 ? ` height="${height}"` : ""}${!bordered ? ' bordered="false"' : ""}${!showLoader ? ' showLoader="false"' : ""}${showAddress ? " showAddress" : ""}${sandbox ? ` sandbox="${sandboxValue}"` : ""}${motion.attrs}></${tag}>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${html("l-Iframe")}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: html("l-Iframe"),
    angular: html("l-Iframe"),
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Address</span>
        <input
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          list="iframe-samples"
          className="w-full rounded-md border border-border px-3 py-1.5 font-mono text-xs text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="https://…"
        />
        <datalist id="iframe-samples">
          {SAMPLES.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
        <p className="mt-1 text-[11px] text-fg-subtle">Some sites refuse to be embedded and show a blank frame.</p>
      </div>
      <OptionGroup label="Shape" options={RATIOS} value={ratio} onChange={setRatio} render={(o) => (o === "auto" ? "Fixed height" : o)} />
      {ratio === "auto" && (
        <div>
          <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Height: {height}px</span>
          <input type="range" min={160} max={560} step={10} value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full" />
        </div>
      )}
      <OptionGroup label="Border" options={ON_OFF} value={bordered ? "on" : "off"} onChange={(v) => setBordered(v === "on")} />
      <OptionGroup label="Address bar" options={ON_OFF} value={showAddress ? "on" : "off"} onChange={(v) => setShowAddress(v === "on")} />
      <OptionGroup label="Loading spinner" options={ON_OFF} value={showLoader ? "on" : "off"} onChange={(v) => setShowLoader(v === "on")} />
      <OptionGroup label="Sandbox" options={ON_OFF} value={sandbox ? "on" : "off"} onChange={(v) => setSandbox(v === "on")} />
      {motion.controls}
    </PlaygroundLayout>
  );
}
