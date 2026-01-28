import synfadorLogo from "@/assets/synfador-logo.jpg";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={synfadorLogo} 
        alt="SYNFADOR Logo" 
        className="h-10 md:h-12 w-auto object-contain"
      />
    </div>
  );
};

export default Logo;