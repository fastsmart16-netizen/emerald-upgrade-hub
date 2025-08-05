import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  type?: "repair" | "rental" | "service";
  onBook: () => void;
}

const ServiceOption = ({ icon, title, description, price, type = "service", onBook }: ServiceOptionProps) => {
  const getButtonVariant = () => {
    switch (type) {
      case "repair":
        return "success";
      case "rental":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Card className="mb-4 border-primary/20 hover:border-primary/40 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              {icon}
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{title}</h4>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary mb-2">{price}</div>
            <Button variant={getButtonVariant()} size="sm" onClick={onBook}>
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceOption;