import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  visitors: string;
  image: string;
  onExpand: () => void;
}

const ServiceCard = ({ icon, title, visitors, image, onExpand }: ServiceCardProps) => {
  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40 cursor-pointer group"
      onClick={onExpand}
    >
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white">
                {icon}
              </div>
              <h3 className="font-semibold text-white text-lg">{title}</h3>
            </div>
            <div className="flex items-center gap-1 text-sm text-white/90">
              <MapPin className="w-3 h-3" />
              <span>Site visiting: {visitors}</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <Button 
            variant="expand" 
            size="sm" 
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
          >
            View Services Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;