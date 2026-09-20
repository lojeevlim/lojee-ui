import { useState } from "react";
import { Avatar, type AvatarSize, type AvatarShape, type AvatarStatus } from "./Avatar/Avatar";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const SIZES: AvatarSize[] = ["xs", "sm", "md", "lg", "xl"];
const SHAPES: AvatarShape[] = ["circle", "square"];
const STATUSES = ["none", "online", "offline", "busy", "away"] as const;
type StatusOption = (typeof STATUSES)[number];

const SAMPLE_IMAGE = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=128&h=128&fit=crop";

export default function AvatarPlayground() {
  const [size, setSize] = useState<AvatarSize>("md");
  const [shape, setShape] = useState<AvatarShape>("circle");
  const [status, setStatus] = useState<StatusOption>("none");
  const [color, setColor] = useState<ColorName>("indigo");
  const [initials, setInitials] = useState("AB");
  const [useImage, setUseImage] = useState(false);

  const statusProp = status === "none" ? undefined : (status as AvatarStatus);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Avatar
          size={size}
          shape={shape}
          status={statusProp}
          color={color}
          initials={initials || "AB"}
          src={useImage ? SAMPLE_IMAGE : undefined}
        />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Avatar${useImage ? ` src="${SAMPLE_IMAGE}"` : ""} initials="${initials || "AB"}" size="${size}"${
    shape !== "circle" ? ` shape="${shape}"` : ""
  }${statusProp ? ` status="${statusProp}"` : ""}${useImage ? "" : ` color="${color}"`} />`;

  // Custom-element markup for the current configuration — no boolean props
  // on l-avatar, so plain literal attributes mirror the React code exactly.
  const htmlMarkup = `<Avatar${useImage ? ` src="${SAMPLE_IMAGE}"` : ""} initials="${initials || "AB"}" size="${size}"${
    shape !== "circle" ? ` shape="${shape}"` : ""
  }${statusProp ? ` status="${statusProp}"` : ""}${useImage ? "" : ` color="${color}"`}></Avatar>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Initials</span>
        <input
          value={initials}
          onChange={(e) => setInitials(e.target.value.slice(0, 2).toUpperCase())}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="AB"
        />
      </div>

      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
      <OptionGroup label="Shape" options={SHAPES} value={shape} onChange={setShape} />
      <OptionGroup label="Status" options={STATUSES} value={status} onChange={setStatus} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Image</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setUseImage((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (useImage ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            {useImage ? "Using sample photo" : "Use sample photo"}
          </button>
        </div>
      </div>

      {!useImage && <ColorSwatches label="Fallback color" value={color} onChange={setColor} />}
    </PlaygroundLayout>
  );
}
