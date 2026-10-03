import { useState } from "react";
import { ChatBox, type ChatBoxVariant, type ChatMessage } from "./ChatBox/ChatBox";
import type { ThinkingVariant } from "./Thinking/Thinking";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const ON_OFF = ["on", "off"] as const;
const VARIANTS: ChatBoxVariant[] = ["bubble", "outline", "flat", "compact"];
const THINKING_STEPS = ["Reading the question", "Searching the docs", "Writing the answer"];
const THINKING_VARIANTS: ThinkingVariant[] = ["dots", "wave", "orb", "shimmer"];
const SEED: ChatMessage[] = [
  { id: 1, role: "system", content: "Today" },
  { id: 2, role: "assistant", name: "Lojee AI", time: "10:41", content: "Hi! Ask me anything about the component library." },
  { id: 3, role: "user", name: "You", time: "10:42", content: "How do I change the accent color?" },
  { id: 4, role: "assistant", name: "Lojee AI", time: "10:42", content: "Set a different accent on ThemeProvider — every component follows it." },
];

export default function ChatBoxPlayground() {
  const motion = useMotion({ hover: false });
  const [title, setTitle] = useState("Lojee AI");
  const [placeholder, setPlaceholder] = useState("Ask something… (Enter to send)");
  const [subtitle, setSubtitle] = useState("Usually replies instantly");
  const [color, setColor] = useState<ColorName>("accent");
  const [variant, setVariant] = useState<ChatBoxVariant>("bubble");
  const [thinking, setThinking] = useState(false);
  const [thinkingText, setThinkingText] = useState("Thinking");
  const [useSteps, setUseSteps] = useState(false);
  const [elapsed, setElapsed] = useState(false);
  const [thinkingVariant, setThinkingVariant] = useState<ThinkingVariant>("dots");
  const [disabled, setDisabled] = useState(false);
  const [seeded, setSeeded] = useState(true);
  const [height, setHeight] = useState(420);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-full max-w-md">
          <ChatBox
            key={`${motion.replayKey}-${seeded}`}
            {...motion.props}
            defaultMessages={seeded ? SEED : []}
            heading={title || undefined}
            subtitle={subtitle || undefined}
            color={color}
            variant={variant}
            thinking={thinking ? thinkingText : undefined}
            thinkingVariant={thinkingVariant}
            thinkingSteps={thinking && useSteps ? THINKING_STEPS : undefined}
            thinkingElapsed={thinking && elapsed}
            disabled={disabled}
            height={height}
            placeholder={placeholder || undefined}
          />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const lines = [
    "defaultMessages={messages}",
    title ? `heading="${title}"` : "",
    subtitle ? `subtitle="${subtitle}"` : "",
    color !== "accent" ? `color="${color}"` : "",
    placeholder ? `placeholder="${placeholder}"` : "",
    variant !== "bubble" ? `variant="${variant}"` : "",
    thinking ? `thinking="${thinkingText}"` : "",
    thinking && thinkingVariant !== "dots" ? `thinkingVariant="${thinkingVariant}"` : "",
    thinking && useSteps ? `thinkingSteps={${JSON.stringify(THINKING_STEPS)}}` : "",
    thinking && elapsed ? "thinkingElapsed" : "",
    disabled ? "disabled" : "",
    height !== 440 ? `height={${height}}` : "",
    "onSend={(text) => ask(text)}",
    ...motion.attrs.trim().split(/ (?=\w+=)/).filter(Boolean),
  ].filter(Boolean);
  const code = `const messages = [
  { id: 1, role: "assistant", content: "Hi! Ask me anything." },
  { id: 2, role: "user", content: "How do I change the accent color?" },
];

<ChatBox
  ${lines.join("\n  ")}
/>`;
  const htmlAttrs = `${title ? ` heading="${title}"` : ""}${subtitle ? ` subtitle="${subtitle}"` : ""}${placeholder ? ` placeholder="${placeholder}"` : ""}${variant !== "bubble" ? ` variant="${variant}"` : ""}${color !== "accent" ? ` color="${color}"` : ""}${thinking ? ` thinking="${thinkingText}"` : ""}${thinking && thinkingVariant !== "dots" ? ` thinking-variant="${thinkingVariant}"` : ""}${thinking && elapsed ? ' thinking-elapsed="true"' : ""}${disabled ? ' disabled="true"' : ""}${height !== 440 ? ` height="${height}"` : ""}${motion.attrs}`;
  const htmlMarkup = `<l-ChatBox id="chat"${htmlAttrs}></l-ChatBox>`;
  const htmlScript = `const chat = document.getElementById("chat");
${thinking && useSteps ? `chat.thinkingSteps = ${JSON.stringify(THINKING_STEPS)};\n` : ""}chat.defaultMessages = [{ id: 1, role: "assistant", content: "Hi! Ask me anything." }];
chat.addEventListener("send", (e) => console.log(e.detail)); // the text`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">\n  import "lojee-ui/elements";\n\n  ${htmlScript.replace(/\n/g, "\n  ")}\n</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Title</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong" />
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Subtitle</span>
        <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong" />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Placeholder</span>
        <input value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} placeholder="Type a message…" className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong" />
      </div>
      <OptionGroup label="Starts with a conversation" options={ON_OFF} value={seeded ? "on" : "off"} onChange={(v) => setSeeded(v === "on")} />
      <OptionGroup label="Style" options={VARIANTS} value={variant} onChange={setVariant} />
      <OptionGroup label="Thinking" options={ON_OFF} value={thinking ? "on" : "off"} onChange={(v) => setThinking(v === "on")} />
      {thinking && (
        <>
          <div>
            <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Thinking text</span>
            <input value={thinkingText} onChange={(e) => setThinkingText(e.target.value)} placeholder="Thinking" className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong" />
          </div>
          <OptionGroup label="Thinking style" options={THINKING_VARIANTS} value={thinkingVariant} onChange={setThinkingVariant} />
          <OptionGroup label="Rotating steps" options={ON_OFF} value={useSteps ? "on" : "off"} onChange={(v) => setUseSteps(v === "on")} />
          <OptionGroup label="Elapsed timer" options={ON_OFF} value={elapsed ? "on" : "off"} onChange={(v) => setElapsed(v === "on")} />
        </>
      )}
      <OptionGroup label="Disabled" options={ON_OFF} value={disabled ? "on" : "off"} onChange={(v) => setDisabled(v === "on")} />
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Height: {height}px</span>
        <input type="range" min={300} max={560} step={10} value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full" />
      </div>
      <ColorSwatches value={color} onChange={setColor} />
      {motion.controls}
    </PlaygroundLayout>
  );
}
