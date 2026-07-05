const COMPATIBLE_SYSTEMS = ["Workday", "Greenhouse", "Lever", "iCIMS", "Taleo", "BambooHR"];

export function TrustStrip() {
  return (
    <section className="border-b border-black/5 bg-[#F5F6FA] py-8">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono-utility text-center text-xs uppercase tracking-widest text-[#0B1226]/40">
          Formatted to parse cleanly on the systems recruiters actually use
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {COMPATIBLE_SYSTEMS.map((system) => (
            <span key={system} className="text-sm font-medium text-[#0B1226]/40">
              {system}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}