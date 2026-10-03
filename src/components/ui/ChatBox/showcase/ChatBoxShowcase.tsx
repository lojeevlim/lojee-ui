import { useState } from "react";
import { ChatBox, type ChatMessage } from "../ChatBox";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

const variants = (react: string, html: string) => ({
  react,
  js: `${html}\n\n<script type="module">import "lojee-ui/elements";</script>`,
  vue: html,
  angular: html,
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
          <p className="mt-1 text-sm text-fg-subtle">A chat thread with a message box — user and assistant bubbles, system notes, a "thinking" bubble and auto-scroll. Enter sends, Shift+Enter adds a line.</p>
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
              `<l-ChatBox id="chat" heading="Lojee AI" subtitle="Usually replies instantly"></l-ChatBox>
<script type="module">
  const chat = document.getElementById("chat");
  chat.defaultMessages = [{ id: 1, role: "assistant", content: "Hi! Ask me anything." }];
  chat.addEventListener("send", (e) => console.log(e.detail)); // the text
</script>`
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
              `<l-ChatBox id="chat"></l-ChatBox>
<script type="module">
  const chat = document.getElementById("chat");
  const messages = [];
  chat.addEventListener("send", async (e) => {
    messages.push({ id: messages.length, role: "user", content: e.detail });
    chat.messages = [...messages];
    chat.setAttribute("thinking", "Reading the docs"); // any text, or "" for the default label
    messages.push({ id: messages.length, role: "assistant", content: await callYourModel(e.detail) });
    chat.messages = [...messages];
    chat.removeAttribute("thinking");
  });
</script>`
            )}
          />
        </section>
        <section>
          <SectionLabel sub='variant: "bubble" (default), "outline", "flat" (full-width rows, like an AI assistant page) or "compact" (small, no avatars).'>Variants</SectionLabel>
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
              `<l-ChatBox id="chat" variant="flat"></l-ChatBox>`
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
              `<l-ChatBox thinking="Searching the docs" thinking-variant="shimmer"></l-ChatBox>
<l-ChatBox thinking="" thinking-variant="orb"></l-ChatBox>`
            )}
          />
        </section>
      </div>
    </div>
  );
}
