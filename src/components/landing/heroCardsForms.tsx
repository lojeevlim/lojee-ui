/* eslint-disable react-refresh/only-export-components -- exports card data alongside private demo components */
import { useState, type ReactNode } from "react";
import { HeroCard } from "./HeroCard";
import { Checkbox } from "../ui/Checkbox/Checkbox";
import { Radio } from "../ui/Radio/Radio";
import { RadioGroup } from "../ui/Radio/RadioGroup";
import { Combobox } from "../ui/Combobox/Combobox";
import { ColorPicker } from "../ui/ColorPicker/ColorPicker";
import { DatePicker } from "../ui/DatePicker/DatePicker";
import { FileUpload } from "../ui/FileUpload/FileUpload";
import { Input } from "../ui/Input/Input";
import { Label } from "../ui/Label/Label";
import { MultiSelect } from "../ui/MultiSelect/MultiSelect";
import { NumberInput } from "../ui/NumberInput/NumberInput";
import { OtpInput } from "../ui/OtpInput/OtpInput";
import { PasswordInput } from "../ui/PasswordInput/PasswordInput";
import { RangeSlider } from "../ui/RangeSlider/RangeSlider";
import { Rating } from "../ui/Rating/Rating";
import { SearchInput } from "../ui/SearchInput/SearchInput";
import { Select } from "../ui/Select/Select";
import { Slider } from "../ui/Slider/Slider";
import { Switch } from "../ui/Switch/Switch";
import { TagInput } from "../ui/TagInput/TagInput";
import { Textarea } from "../ui/Textarea/Textarea";
import { TimePicker } from "../ui/TimePicker/TimePicker";

const FRAMEWORKS = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Solid", value: "solid" },
];

const COUNTRIES = [
  { label: "Canada", value: "ca" },
  { label: "Germany", value: "de" },
  { label: "Japan", value: "jp" },
  { label: "Malaysia", value: "my" },
  { label: "Norway", value: "no" },
  { label: "Portugal", value: "pt" },
];

const SWATCHES = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#0ea5e9"];

function Stack({ children, gap = "gap-2" }: { children: ReactNode; gap?: string }) {
  return <div className={`flex flex-col ${gap}`}>{children}</div>;
}

function Row({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-x-4 gap-y-2">{children}</div>;
}

function Tiny({ children }: { children: ReactNode }) {
  return <span className="w-14 shrink-0 font-mono text-[10px] text-fg-subtle">{children}</span>;
}

function SearchDemo() {
  const [q, setQ] = useState("button");
  return <SearchInput value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ("")} placeholder="Search components…" />;
}

function SearchSizes() {
  const [q, setQ] = useState("");
  return (
    <Stack>
      <SearchInput size="sm" placeholder="Small" value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ("")} />
      <SearchInput size="md" placeholder="Medium" />
      <SearchInput size="lg" placeholder="Large" />
    </Stack>
  );
}

function SelectDemo() {
  const [v, setV] = useState("react");
  return <Select options={FRAMEWORKS} value={v} onChange={(e) => setV(e.target.value)} />;
}

function MultiDemo({ initial, color }: { initial: string[]; color?: "accent" | "emerald" | "rose" }) {
  const [v, setV] = useState<string[]>(initial);
  return <MultiSelect options={FRAMEWORKS} value={v} onChange={setV} color={color} placeholder="Pick stacks" />;
}

function ComboDemo() {
  const [v, setV] = useState("");
  return <Combobox options={COUNTRIES} value={v} onChange={setV} placeholder="Search country…" />;
}

function SliderDemo({ color, start }: { color: "accent" | "emerald" | "rose" | "amber" | "violet"; start: number }) {
  const [v, setV] = useState(start);
  return (
    <div className="flex items-center gap-2">
      <Tiny>{color}</Tiny>
      <Slider color={color} value={v} onChange={(e) => setV(Number(e.target.value))} showValue />
    </div>
  );
}

function RangeDemo({ color, start, showValue = true }: { color: "accent" | "emerald" | "amber"; start: [number, number]; showValue?: boolean }) {
  const [v, setV] = useState<[number, number]>(start);
  return <RangeSlider value={v} onChange={setV} color={color} showValue={showValue} />;
}

function PriceRange() {
  const [v, setV] = useState<[number, number]>([200, 650]);
  return (
    <Stack gap="gap-3">
      <RangeSlider min={0} max={1000} step={50} value={v} onChange={setV} color="emerald" />
      <p className="text-xs text-fg-muted">
        ${v[0]} – ${v[1]}
      </p>
    </Stack>
  );
}

function TagDemo({ initial, color, maxTags, placeholder }: { initial: string[]; color?: "accent" | "emerald" | "amber"; maxTags?: number; placeholder?: string }) {
  const [v, setV] = useState<string[]>(initial);
  return <TagInput value={v} onChange={setV} color={color} maxTags={maxTags} placeholder={placeholder} />;
}

function NumberDemo({ size, start, min, max, step, precision }: { size: "sm" | "md" | "lg"; start: number; min?: number; max?: number; step?: number; precision?: number }) {
  const [v, setV] = useState<number | undefined>(start);
  return <NumberInput size={size} value={v} onChange={setV} min={min} max={max} step={step} precision={precision} />;
}

function OtpDemo({ size, length, mask, invalid, start }: { size: "sm" | "md" | "lg"; length: number; mask?: boolean; invalid?: boolean; start: string }) {
  const [v, setV] = useState(start);
  return <OtpInput size={size} length={length} value={v} onChange={setV} mask={mask} invalid={invalid} />;
}

function RatingDemo({ size, start, half }: { size: "sm" | "md" | "lg"; start: number; half?: boolean }) {
  const [v, setV] = useState(start);
  return (
    <div className="flex items-center gap-3">
      <Tiny>{size}</Tiny>
      <Rating size={size} value={v} onChange={setV} allowHalf={half} />
    </div>
  );
}

function ColorDemo() {
  const [c, setC] = useState("#10b981");
  return <ColorPicker value={c} onChange={setC} presets={SWATCHES} />;
}

function SwatchOnly() {
  const [c, setC] = useState("#f59e0b");
  return <ColorPicker value={c} onChange={setC} showInput={false} presets={["#f59e0b", "#ef4444", "#8b5cf6", "#0ea5e9", "#10b981", "#ec4899"]} />;
}

function DateDemo() {
  const [d, setD] = useState("2026-10-03");
  return <DatePicker value={d} onChange={(e) => setD(e.target.value)} />;
}

function TimeDemo() {
  const [t, setT] = useState("09:30");
  return <TimePicker value={t} onChange={(e) => setT(e.target.value)} />;
}

function UploadDemo() {
  const [n, setN] = useState<string | null>(null);
  return (
    <Stack>
      <FileUpload label="Drop files or click" onFilesSelected={(f) => setN(f && f.length > 0 ? f[0].name : null)} />
      {n && <p className="truncate text-xs text-fg-muted">{n}</p>}
    </Stack>
  );
}

function PlanRadios({ name }: { name: string }) {
  const [plan, setPlan] = useState("pro");
  const opt = (value: string, label: string) => <Radio name={name} value={value} label={label} checked={plan === value} onChange={() => setPlan(value)} />;
  return (
    <RadioGroup>
      {opt("free", "Free")}
      {opt("pro", "Pro")}
      {opt("team", "Team")}
    </RadioGroup>
  );
}

function RadioColors({ name }: { name: string }) {
  const [c, setC] = useState("emerald");
  const opt = (value: "accent" | "emerald" | "amber" | "rose" | "violet") => (
    <Radio key={value} name={name} value={value} color={value} label={value} checked={c === value} onChange={() => setC(value)} />
  );
  return <RadioGroup>{(["accent", "emerald", "amber", "rose", "violet"] as const).map(opt)}</RadioGroup>;
}

function RadioHorizontal({ name }: { name: string }) {
  const [v, setV] = useState("m");
  return (
    <RadioGroup orientation="horizontal">
      {["s", "m", "l", "xl"].map((s) => (
        <Radio key={s} name={name} value={s} label={s.toUpperCase()} checked={v === s} onChange={() => setV(s)} />
      ))}
    </RadioGroup>
  );
}

function SwitchSizes() {
  const [on, setOn] = useState(true);
  return (
    <Stack>
      <Switch size="sm" label="Small" checked={on} onChange={(e) => setOn(e.target.checked)} />
      <Switch size="md" label="Medium" defaultChecked />
      <Switch size="lg" label="Large" />
    </Stack>
  );
}

const COLORS = ["accent", "emerald", "amber", "rose", "violet", "cyan"] as const;

export const FORMS_REELS: ReactNode[][] = [
  // Reel 1: text entry
  [
    <HeroCard key="input-sizes" name="Input · sizes">
      <Stack>
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />
      </Stack>
    </HeroCard>,
    <HeroCard key="input-icons" name="Input · icons">
      <Stack>
        <Input leadingIcon="mail" placeholder="you@company.com" />
        <Input leadingIcon="user" trailingIcon="link" placeholder="@handle" />
        <Input leadingIcon="lock" placeholder="Locked field" />
      </Stack>
    </HeroCard>,
    <HeroCard key="input-states" name="Input · states">
      <Stack>
        <Input invalid defaultValue="not-an-email" aria-label="Invalid example" />
        <p className="text-xs text-rose-500">Enter a valid email.</p>
        <Input disabled placeholder="Disabled" />
        <Input defaultValue="Read only" readOnly />
      </Stack>
    </HeroCard>,
    <HeroCard key="label" name="Label">
      <Stack gap="gap-3">
        <div>
          <Label htmlFor="hc-name" required>Full name</Label>
          <Input id="hc-name" placeholder="Ada Lovelace" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="hc-nick">Nickname</Label>
          <Input id="hc-nick" placeholder="Optional" className="mt-1" />
        </div>
      </Stack>
    </HeroCard>,
    <HeroCard key="textarea" name="Textarea" w="w-72">
      <Stack>
        <Textarea rows={2} placeholder="Tell us what you're building…" />
        <Textarea rows={2} invalid resize="none" defaultValue="Too short" aria-label="Invalid textarea" />
        <Textarea rows={1} disabled placeholder="Disabled" />
      </Stack>
    </HeroCard>,
    <HeroCard key="search" name="SearchInput · clearable">
      <SearchDemo />
    </HeroCard>,
    <HeroCard key="search-sizes" name="SearchInput · sizes">
      <SearchSizes />
    </HeroCard>,
    <HeroCard key="password" name="PasswordInput">
      <Stack>
        <PasswordInput size="sm" defaultValue="hunter2hunter2" aria-label="Small password" />
        <PasswordInput placeholder="Password" />
        <PasswordInput size="lg" invalid defaultValue="short" aria-label="Invalid password" />
      </Stack>
    </HeroCard>,
    <HeroCard key="otp" name="OtpInput" w="w-72">
      <Stack gap="gap-3">
        <OtpDemo size="md" length={6} start="482" />
        <OtpDemo size="sm" length={4} mask start="1234" />
      </Stack>
    </HeroCard>,
  ],
  // Reel 2: toggles and choice
  [
    <HeroCard key="checkbox-states" name="Checkbox · states">
      <Stack>
        <Checkbox label="Email me updates" defaultChecked />
        <Checkbox label="Unchecked" />
        <Checkbox label="Disabled checked" defaultChecked disabled />
        <Checkbox label="Disabled" disabled />
      </Stack>
    </HeroCard>,
    <HeroCard key="checkbox-colors" name="Checkbox · colors">
      <Row>
        {COLORS.map((c) => (
          <Checkbox key={c} color={c} label={c} defaultChecked />
        ))}
      </Row>
    </HeroCard>,
    <HeroCard key="radio-group" name="Radio · group">
      <PlanRadios name="hc-plan" />
    </HeroCard>,
    <HeroCard key="radio-colors" name="Radio · colors">
      <RadioColors name="hc-radio-colors" />
    </HeroCard>,
    <HeroCard key="radio-h" name="Radio · horizontal">
      <RadioHorizontal name="hc-radio-size" />
    </HeroCard>,
    <HeroCard key="switch-sizes" name="Switch · sizes">
      <SwitchSizes />
    </HeroCard>,
    <HeroCard key="switch-colors" name="Switch · colors" w="w-72">
      <div className="grid grid-cols-2 gap-2">
        {COLORS.map((c, i) => (
          <Switch key={c} color={c} label={c} defaultChecked={i % 2 === 0} />
        ))}
      </div>
    </HeroCard>,
    <HeroCard key="switch-disabled" name="Switch · disabled">
      <Stack>
        <Switch label="Notifications" defaultChecked />
        <Switch label="Disabled on" defaultChecked disabled />
        <Switch label="Disabled off" disabled />
      </Stack>
    </HeroCard>,
    <HeroCard key="rating-sizes" name="Rating · sizes">
      <Stack gap="gap-3">
        <RatingDemo size="sm" start={3} />
        <RatingDemo size="md" start={4} />
        <RatingDemo size="lg" start={2} />
      </Stack>
    </HeroCard>,
    <HeroCard key="rating-half" name="Rating · half &amp; read-only">
      <Stack gap="gap-3">
        <RatingDemo size="md" start={3.5} half />
        <div className="flex items-center gap-3">
          <Tiny>read-only</Tiny>
          <Rating value={4} readOnly />
        </div>
        <div className="flex items-center gap-3">
          <Tiny>10 stars</Tiny>
          <Rating value={7} max={10} size="sm" readOnly />
        </div>
      </Stack>
    </HeroCard>,
  ],
  // Reel 3: selection and pickers
  [
    <HeroCard key="select" name="Select · sizes" overflowVisible>
      <Stack>
        <Select size="sm" placeholder="Small" options={FRAMEWORKS} />
        <SelectDemo />
        <Select size="lg" placeholder="Large" options={FRAMEWORKS} />
      </Stack>
    </HeroCard>,
    <HeroCard key="select-states" name="Select · states" overflowVisible>
      <Stack>
        <Select invalid placeholder="Required" options={FRAMEWORKS} />
        <Select disabled placeholder="Disabled" options={FRAMEWORKS} />
        <Select placeholder="With a disabled option" options={[...FRAMEWORKS.slice(0, 3), { label: "Ember (legacy)", value: "ember", disabled: true }]} />
      </Stack>
    </HeroCard>,
    <HeroCard key="multiselect" name="MultiSelect · colors" w="w-72">
      <Stack>
        <MultiDemo initial={["react", "vue"]} />
        <MultiDemo initial={["svelte"]} color="emerald" />
        <MultiDemo initial={[]} color="rose" />
      </Stack>
    </HeroCard>,
    <HeroCard key="combobox" name="Combobox · type to filter">
      <ComboDemo />
    </HeroCard>,
    <HeroCard key="datepicker" name="DatePicker · variants">
      <Stack>
        <DateDemo />
        <DatePicker variant="filled" size="sm" defaultValue="2026-12-24" />
        <DatePicker variant="underline" defaultValue="2027-01-15" />
      </Stack>
    </HeroCard>,
    <HeroCard key="datepicker-states" name="DatePicker · sizes &amp; states">
      <Stack>
        <DatePicker size="sm" />
        <DatePicker size="lg" />
        <DatePicker disabled defaultValue="2026-10-03" />
      </Stack>
    </HeroCard>,
    <HeroCard key="timepicker" name="TimePicker">
      <Stack>
        <TimePicker size="sm" defaultValue="08:00" />
        <TimeDemo />
        <TimePicker size="lg" invalid />
      </Stack>
    </HeroCard>,
    <HeroCard key="colorpicker" name="ColorPicker" w="w-72">
      <ColorDemo />
    </HeroCard>,
    <HeroCard key="colorpicker-swatches" name="ColorPicker · swatches only">
      <Stack gap="gap-3">
        <SwatchOnly />
        <ColorPicker value="#8b5cf6" disabled showInput={false} presets={[]} />
      </Stack>
    </HeroCard>,
    <HeroCard key="fileupload" name="FileUpload" w="w-72">
      <UploadDemo />
    </HeroCard>,
  ],
  // Reel 4: sliders, numbers, tags
  [
    <HeroCard key="slider-colors" name="Slider · colors" w="w-72">
      <Stack gap="gap-3">
        <SliderDemo color="accent" start={60} />
        <SliderDemo color="emerald" start={35} />
        <SliderDemo color="amber" start={80} />
        <SliderDemo color="rose" start={20} />
      </Stack>
    </HeroCard>,
    <HeroCard key="slider-states" name="Slider · stepped">
      <Stack gap="gap-3">
        <Slider min={0} max={10} step={1} defaultValue={4} showValue color="violet" />
        <Slider defaultValue={50} disabled />
      </Stack>
    </HeroCard>,
    <HeroCard key="range" name="RangeSlider · colors" w="w-72">
      <Stack gap="gap-4">
        <RangeDemo color="accent" start={[20, 70]} />
        <RangeDemo color="emerald" start={[10, 40]} />
        <RangeDemo color="amber" start={[50, 90]} showValue={false} />
      </Stack>
    </HeroCard>,
    <HeroCard key="range-price" name="RangeSlider · price filter">
      <PriceRange />
    </HeroCard>,
    <HeroCard key="number-sizes" name="NumberInput · sizes">
      <Stack>
        <NumberDemo size="sm" start={3} min={0} max={10} />
        <NumberDemo size="md" start={12} step={2} />
        <NumberDemo size="lg" start={9.99} step={0.01} precision={2} />
      </Stack>
    </HeroCard>,
    <HeroCard key="number-states" name="NumberInput · states">
      <Stack>
        <NumberInput placeholder="Quantity" min={1} max={99} />
        <NumberInput invalid value={-4} aria-label="Invalid" />
        <NumberInput disabled value={7} />
      </Stack>
    </HeroCard>,
    <HeroCard key="taginput" name="TagInput" w="w-72">
      <Stack>
        <TagDemo initial={["react", "ui", "tailwind"]} />
        <TagDemo initial={["draft"]} color="emerald" maxTags={3} placeholder="Max 3 tags…" />
        <TagDemo initial={["urgent", "bug"]} color="amber" />
      </Stack>
    </HeroCard>,
    <HeroCard key="taginput-states" name="TagInput · states" w="w-72">
      <Stack>
        <TagInput invalid value={["a b"]} placeholder="Invalid" />
        <TagInput disabled value={["locked", "tags"]} />
      </Stack>
    </HeroCard>,
    <HeroCard key="otp-states" name="OtpInput · states" w="w-72">
      <Stack gap="gap-3">
        <OtpDemo size="lg" length={4} start="90" />
        <OtpDemo size="md" length={6} invalid start="123456" />
        <OtpInput size="sm" length={6} disabled value="000000" />
      </Stack>
    </HeroCard>,
  ],
];
