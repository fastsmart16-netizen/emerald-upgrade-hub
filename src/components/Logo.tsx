import synfadorLogo from "@/assets/synfador-logo.jpg";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={synfadorLogo} 
        alt="Synfador Logo" 
        className="h-10 md:h-12 w-auto object-contain"
      />
      <span className="text-xl md:text-2xl font-bold text-primary">Fastsmart</span>
    </div>
  );
};

export default Logo;