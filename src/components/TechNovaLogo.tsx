import faviconAsset from "@/assets/technova-favicon.png.asset.json";

export function TechNovaLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={faviconAsset.url}
        alt="TechNova Systems"
        className="h-9 w-9 object-contain"
      />
      <div className="text-lg font-bold leading-none tracking-tight">
        <span className="text-white">tech</span>
        <span className="text-gold">NOVA</span>
        <span className="ml-1.5 text-white/85">SYSTEMS</span>
      </div>
    </div>
  );
}