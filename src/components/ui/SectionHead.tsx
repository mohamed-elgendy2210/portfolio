import { vars } from "@/lib/util";

export default function SectionHead({ index, label, title, accent, id }: { index: string; label: string; title: string; accent: string; id: string }) {
  return (
    <header className="sec-head">
      <p className="tag rv">
        <b>{index}</b>
        <i />
        {label}
      </p>
      <h2 id={id} className="h2">
        <span className="rv-mask" style={vars({ "--i": 1 })}>
          <span>
            {title} <span className="serif-it">{accent}</span>
          </span>
        </span>
      </h2>
    </header>
  );
}
