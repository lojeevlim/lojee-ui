import { useNavigate } from "react-router-dom";
import { Icon } from "../ui/Icons/Icon";
import { COMPONENT_MENU } from "../../constant/component_menu";
import { pathFor } from "../../core/routes";

const ALL = [...new Map(COMPONENT_MENU.flatMap((g) => g.items ?? []).map((i) => [i.label, i])).values()];
const HALF = Math.ceil(ALL.length / 2);

function Row({ items, reverse }: { items: typeof ALL; reverse?: boolean }) {
  const navigate = useNavigate();
  // The list is doubled so translating by -50% loops seamlessly.
  const doubled = [...items, ...items];
  return (
    <div className="lp-marquee-wrap overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <div className={`flex w-max gap-3 py-1.5 ${reverse ? "lp-marquee-rev" : "lp-marquee"}`}>
        {doubled.map((it, idx) => (
          <button
            key={`${it.label}-${idx}`}
            type="button"
            onClick={() => navigate(pathFor("components", it.label))}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-500 hover:bg-accent-500/10 hover:text-fg"
          >
            <Icon name={it.icon} size={15} />
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Two counter-scrolling rows of every component — pauses on hover, each chip opens its docs page. */
export default function Marquee() {
  return (
    <div className="space-y-2">
      <Row items={ALL.slice(0, HALF)} />
      <Row items={ALL.slice(HALF)} reverse />
    </div>
  );
}
