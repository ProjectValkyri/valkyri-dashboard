export default function MapViewport() {
  return (
    <main className="flex-1 relative overflow-hidden bg-bg-primary">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="w-full h-full flex items-center justify-center relative z-10">
        <span className="font-mono text-xs tracking-widest uppercase text-text-muted opacity-25">
          Map Viewport
        </span>
      </div>
    </main>
  );
}