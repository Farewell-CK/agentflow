export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
