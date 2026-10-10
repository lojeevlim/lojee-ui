import { useState } from "react";
import { ChatBox, type ChatMessage } from "../ChatBox";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

// `vue` / `angular` default to the plain HTML; pass them when the snippet needs a script (those frameworks bind props and events in the template instead).
const variants = (react: string, html: string, vue = html, angular = html) => ({
  react,
  js: `${html}\n\n<script type="module">import "lojee-ui/elements";</script>`,
  vue,
  angular,
});

const SEED: ChatMessage[] = [
  { id: 1, role: "system", content: "Today" },
  { id: 2, role: "assistant", name: "Lojee AI", time: "10:41", content: "Hi! Ask me anything about the component library." },
];

const SEED_MIX: ChatMessage[] = [
  { id: 1, role: "assistant", name: "Lojee AI", time: "10:41", content: "Hi! How can I help?" },
  { id: 2, role: "user", name: "You", time: "10:42", content: "Show me the chat variants." },
];

/** Controlled chat that fakes an assistant: after each message it "thinks" for a moment, then answers. */
function Controlled() {
  const [messages, setMessages] = useState<ChatMessage[]>(SEED);
  const [thinking, setThinking] = useState(false);
  const ask = (text: string) => {
    setMessages((m) => [...m, { id: `u-${m.length}`, role: "user", content: text }]);
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: `a-${m.length}`, role: "assistant", content: `You said: “${text}”. Here is where a real answer would go.` }]);
      setThinking(false);
    }, 1800);
  };
  return <ChatBox messages={messages} thinking={thinking ? "Reading the docs" : undefined} onSend={ask} heading="Lojee AI" subtitle="Usually replies instantly" height={380} />;
}

export default function ChatBoxShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">ChatBox</h1>
          <p className="mt-1 text-sm text-fg-subtle">A chat thread with a message box — user and assistant bubbles, system notes, a "thinking" bubble and auto-scroll. Enter sends.</p>
        </div>

        <section>
          <SectionLabel sub="Give it defaultMessages and it keeps the thread itself — your own messages are added when sent. onSend tells you the text.">Uncontrolled</SectionLabel>
          <div className="max-w-md">
            <ChatBox defaultMessages={SEED} heading="Lojee AI" subtitle="Usually replies instantly" height={340} />
          </div>
          <CodeBlock
            variants={variants(
              `<ChatBox
  defaultMessages={[
    { id: 1, role: "assistant", content: "Hi! Ask me anything." },
  ]}
  heading="Lojee AI"
  subtitle="Usually replies instantly"
  onSend={(text) => console.log(text)}
/>`,
              `<l-chat-box heading="Lojee AI" subtitle="Usually replies instantly"></l-chat-box>
<script type="module">
  const chat = document.querySelector("l-chat-box");
  chat.defaultMessages = [{ id: 1, role: "assistant", content: "Hi! Ask me anything." }];
  chat.addEventListener("send", (e) => console.log(e.detail)); // the text
</script>`,
              `<template>
  <l-chat-box
    heading="Lojee AI"
    subtitle="Usually replies instantly"
    :defaultMessages.prop="seed"
    @send="(e) => console.log(e.detail)"
  />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
const seed = [{ id: 1, role: "assistant", content: "Hi! Ask me anything." }];
</script>`,
              `// chat.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-chat",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-chat-box
      heading="Lojee AI"
      subtitle="Usually replies instantly"
      [defaultMessages]="seed"
      (send)="onSend($any($event).detail)"
    ></l-chat-box>
  \`,
})
export class ChatComponent {
  seed = [{ id: 1, role: "assistant", content: "Hi! Ask me anything." }];
  onSend(text: string) {
    console.log(text);
  }
}`
            )}
          />
        </section>

        <section>
          <SectionLabel sub="Pass messages to own the thread — add the user's message in onSend, set thinking to the text to show while you wait and append the answer when it arrives. Try it.">Controlled, with thinking</SectionLabel>
          <div className="max-w-md">
            <Controlled />
          </div>
          <CodeBlock
            variants={variants(
              `const [messages, setMessages] = useState<ChatMessage[]>([]);
const [thinking, setThinking] = useState(false);

async function ask(text: string) {
  setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", content: text }]);
  setThinking(true);
  const answer = await callYourModel(text);
  setMessages((m) => [...m, { id: crypto.randomUUID(), role: "assistant", content: answer }]);
  setThinking(false);
}

<ChatBox messages={messages} thinking={thinking ? "Reading the docs" : undefined} onSend={ask} />`,
              `<l-chat-box></l-chat-box>
<script type="module">
  const chat = document.querySelector("l-chat-box");
  const messages = [];
  chat.addEventListener("send", async (e) => {
    messages.push({ id: messages.length, role: "user", content: e.detail });
    chat.messages = [...messages];
    chat.thinking = "Reading the docs"; // any text (or true for the default label) — a property, so it can be switched off again
    messages.push({ id: messages.length, role: "assistant", content: await callYourModel(e.detail) });
    chat.messages = [...messages];
    chat.thinking = false;
  });
</script>`,
              `<template>
  <!-- messages and thinking are props: thinking shows while it is text (or true) and hides when it is false -->
  <l-chat-box
    :messages.prop="messages"
    :thinking.prop="thinking ? 'Reading the docs' : false"
    @send="(e) => ask(e.detail)"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const messages = ref<{ id: number; role: "user" | "assistant"; content: string }[]>([]);
const thinking = ref(false);

async function ask(text: string) {
  messages.value = [...messages.value, { id: messages.value.length, role: "user", content: text }];
  thinking.value = true;
  const answer = await callYourModel(text);
  messages.value = [...messages.value, { id: messages.value.length, role: "assistant", content: answer }];
  thinking.value = false;
}
</script>`,
              `// chat.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-chat",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-chat-box
      [messages]="messages"
      [thinking]="thinking ? 'Reading the docs' : false"
      (send)="ask($any($event).detail)"
    ></l-chat-box>
  \`,
})
export class ChatComponent {
  messages: { id: number; role: "user" | "assistant"; content: string }[] = [];
  thinking = false;

  async ask(text: string) {
    this.messages = [...this.messages, { id: this.messages.length, role: "user", content: text }];
    this.thinking = true;
    const answer = await callYourModel(text);
    this.messages = [...this.messages, { id: this.messages.length, role: "assistant", content: answer }];
    this.thinking = false;
  }
}`
            )}
          />
        </section>
        <section>
          <SectionLabel sub='variant: "bubble" (default), "outline", "flat" (full-width rows and a plain borderless message field, like an AI assistant page) or "compact" (small, no avatars).'>Variants</SectionLabel>
          <div className="grid gap-4 md:grid-cols-2">
            {(["bubble", "outline", "flat", "compact"] as const).map((v) => (
              <div key={v}>
                <p className="mb-1.5 text-xs font-medium text-fg-subtle">variant="{v}"</p>
                <ChatBox variant={v} defaultMessages={SEED_MIX} height={300} thinking="Thinking" thinkingVariant={v === "flat" ? "orb" : v === "compact" ? "wave" : "dots"} />
              </div>
            ))}
          </div>
          <CodeBlock
            variants={variants(
              `<ChatBox variant="outline" defaultMessages={messages} />
<ChatBox variant="flat" defaultMessages={messages} />
<ChatBox variant="compact" defaultMessages={messages} />`,
              `<l-chat-box variant="flat"></l-chat-box>`
            )}
          />
        </section>

        <section>
          <SectionLabel sub='thinking takes the text to show — thinking="Searching the docs" — or an empty string / true for "Thinking". thinkingVariant changes the indicator: "dots", "wave", "orb" or "shimmer".'>Thinking</SectionLabel>
          <div className="grid gap-4 md:grid-cols-2">
            <ChatBox defaultMessages={SEED} height={220} thinking="Searching the docs" thinkingVariant="shimmer" />
            <ChatBox defaultMessages={SEED} height={220} thinking thinkingVariant="orb" />
          </div>
          <CodeBlock
            variants={variants(
              `<ChatBox thinking="Searching the docs" thinkingVariant="shimmer" />
<ChatBox thinking thinkingVariant="orb" />`,
              `<l-chat-box thinking="Searching the docs" thinking-variant="shimmer"></l-chat-box>
<l-chat-box thinking="true" thinking-variant="orb"></l-chat-box>`
            )}
          />
        </section>
      </div>
    </div>
  );
}
