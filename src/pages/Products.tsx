import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone, ShoppingCart, Package } from 'lucide-react';
import Logo from '@/components/Logo';
import { useProducts } from '@/hooks/useProducts';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Products = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  const handleBuy = (name: string) => {
    toast({
      title: 'Order Request Sent',
      description: `Our team will contact you shortly about ${name}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="text-center py-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center justify-center gap-2">
            <Package className="w-8 h-8 text-primary" /> Spare Parts & Products
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Genuine industrial spare parts — Linear, Brake, VFD, PLC, Resistance, Bore, Tower & Hoist.
          </p>
          {isAdmin && (
            <Button className="mt-4" onClick={() => navigate('/admin/products')}>
              Manage Products
            </Button>
          )}
        </div>

        {products.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No products listed yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {products.map((p) => (
              <Card key={p.id} className="hover:shadow-lg transition-shadow flex flex-col">
                {p.image && (
                  <img src={p.image} alt={p.name} className="w-full h-44 object-cover rounded-t-lg" />
                )}
                <CardContent className="p-4 flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-base leading-snug">{p.name}</h3>
                    <Badge variant={p.inStock ? 'default' : 'secondary'}>
                      {p.inStock ? 'In Stock' : 'Out'}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="w-fit">{p.category}</Badge>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{p.description}</p>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-lg font-bold text-primary">₹{p.price.toLocaleString('en-IN')}</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open('tel:8097634086')}
                        className="gap-1"
                      >
                        <Phone className="w-3 h-3" /> Call
                      </Button>
                      <Button
                        size="sm"
                        disabled={!p.inStock}
                        onClick={() => handleBuy(p.name)}
                        className="gap-1"
                      >
                        <ShoppingCart className="w-3 h-3" /> Buy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
