const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <span className="text-2xl md:text-3xl font-bold text-primary">FASTSMART</span>
        <div className="flex items-center gap-1 ml-2">
          <div className="w-6 h-1 bg-primary rounded-full"></div>
          <div className="w-4 h-1 bg-primary/70 rounded-full"></div>
          <div className="w-3 h-1 bg-primary/50 rounded-full"></div>
        </div>
      </div>
      <div className="text-primary/80 text-lg md:text-xl font-medium italic">Electric</div>
    </div>
  );
};

export default Logo;