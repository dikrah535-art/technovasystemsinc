export function TechNovaLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden>
        <path d="M6 8 H30 V14 H22 V40 H14 V14 H6 Z" fill="#F3F4F6" />
        <path d="M28 22 L36 10 L44 22 H40 V40 H32 V22 Z" fill="#F59E0B" />
        <path d="M14 14 H22 V22 L14 30 Z" fill="#2563EB" opacity="0.85" />
      </svg>
      <div className="leading-none">
        <div className="text-base font-bold tracking-tight">
          <span className="text-white">tech</span>
          <span className="text-gold">NOVA</span>
        </div>
        <div className="text-[9px] tracking-[0.3em] text-white/60">SYSTEMS</div>
      </div>
    </div>
  );
}