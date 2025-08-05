import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  visitors: string;
  onExpand: () => void;
}

const ServiceCard = ({ icon, title, visitors, onExpand }: ServiceCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>Site visiting: {visitors}</span>
              </div>
            </div>
          </div>
          <Button variant="expand" size="sm" onClick={onExpand}>
            Click to expand
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;