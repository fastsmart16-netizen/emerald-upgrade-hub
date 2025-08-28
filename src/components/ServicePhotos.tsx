import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";

interface ServicePhotosProps {
  images: { src: string; alt: string }[];
  title?: string;
}

const ServicePhotos: FC<ServicePhotosProps> = ({ images, title = "Photos" }) => {
  if (!images?.length) return null;

  return (
    <section aria-labelledby="service-photos-heading" className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <ImageIcon className="w-5 h-5 text-primary" />
        <h2 id="service-photos-heading" className="text-2xl font-bold text-foreground">
          {title}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {images.map((img, idx) => (
          <Card key={idx} className="border-primary/20">
            <CardContent className="p-0">
              <img
                src={img.src}
                alt={img.alt}
                loading={idx === 0 ? "eager" : "lazy"}
                className="w-full h-56 md:h-64 object-cover rounded-lg"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ServicePhotos;
