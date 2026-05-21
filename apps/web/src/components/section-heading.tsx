export function SectionHeading({
  eyebrow,
  title,
  body
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-t border-maroon/20 pt-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="font-editorial mt-2 max-w-3xl text-3xl font-black leading-[1.03] text-obsidian md:text-5xl">
          {title}
        </h2>
      </div>
      {body ? <p className="max-w-md text-sm leading-6 text-muted md:text-right">{body}</p> : null}
    </div>
  );
}
