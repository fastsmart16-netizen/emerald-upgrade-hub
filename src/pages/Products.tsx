import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone, ShoppingCart, Search, Star, Package, Filter, X } from 'lucide-react';
import Logo from '@/components/Logo';
import { useProducts } from '@/hooks/useProducts';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Products = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [sort, setSort] = useState<string>('popular');
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesQ =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.brand || '').toLowerCase().includes(query.toLowerCase());
      const matchesC = category === 'All' || p.category === category;
      return matchesQ && matchesC;
    });
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return list;
  }, [products, query, category, sort]);

  const handleBuy = (name: string) => {
    toast({
      title: 'Order Request Sent',
      description: `Our team will contact you shortly about ${name}.`,
    });
  };

  const discount = (p: { price: number; mrp?: number }) =>
    p.mrp && p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Flipkart-style header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-3 py-2.5 flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-primary-foreground hover:bg-primary-foreground/10 shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="hidden md:block shrink-0">
            <Logo />
          </div>
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for cranes, VFD, PLC, panels..."
              className="pl-9 pr-9 h-10 bg-white text-foreground border-0"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {isAdmin && (
            <Button
              size="sm"
              variant="secondary"
              className="hidden sm:flex"
              onClick={() => navigate('/admin/products')}
            >
              Manage
            </Button>
          )}
        </div>

        {/* Category chips */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-3 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                  category === c
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-slate-100 text-foreground hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 py-3">
        {/* Toolbar */}
        <div className="flex items-center justify-between bg-white rounded-md p-3 mb-3 shadow-sm">
          <div className="text-sm">
            <span className="font-semibold">{filtered.length}</span>{' '}
            <span className="text-muted-foreground">products</span>
            {category !== 'All' && (
              <span className="text-muted-foreground"> in {category}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-xs md:text-sm bg-transparent border-0 focus:outline-none font-medium"
            >
              <option value="popular">Popularity</option>
              <option value="low">Price -- Low to High</option>
              <option value="high">Price -- High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-md p-12 text-center">
            <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
            {filtered.map((p) => {
              const off = discount(p);
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col group"
                >
                  <div className="relative bg-slate-50 aspect-square overflow-hidden">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23e2e8f0"/><text x="50%25" y="50%25" font-family="Arial" font-size="14" fill="%2364748b" text-anchor="middle" dy=".3em">No Image</text></svg>';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    {!p.inStock && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                    {off > 0 && (
                      <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {off}% OFF
                      </span>
                    )}
                  </div>

                  <div className="p-2.5 flex flex-col gap-1 flex-1">
                    {p.brand && (
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide truncate">
                        {p.brand}
                      </p>
                    )}
                    <h3 className="text-sm font-medium leading-tight line-clamp-2 min-h-[2.5rem]">
                      {p.name}
                    </h3>

                    {p.rating && (
                      <div className="flex items-center gap-1.5">
                        <span className="flex items-center gap-0.5 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          {p.rating.toFixed(1)} <Star className="w-2.5 h-2.5 fill-white" />
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          ({p.reviews || 0})
                        </span>
                      </div>
                    )}

                    <div className="flex items-baseline gap-1.5 flex-wrap mt-0.5">
                      <span className="text-base font-bold">
                        ₹{p.price.toLocaleString('en-IN')}
                      </span>
                      {p.mrp && p.mrp > p.price && (
                        <>
                          <span className="text-xs text-muted-foreground line-through">
                            ₹{p.mrp.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-green-600 font-semibold">
                            {off}% off
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex gap-1.5 mt-auto pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open('tel:8097634086')}
                        className="flex-1 h-8 text-xs gap-1 px-2"
                      >
                        <Phone className="w-3 h-3" /> Call
                      </Button>
                      <Button
                        size="sm"
                        disabled={!p.inStock}
                        onClick={() => handleBuy(p.name)}
                        className="flex-1 h-8 text-xs gap-1 px-2 bg-orange-500 hover:bg-orange-600"
                      >
                        <ShoppingCart className="w-3 h-3" /> Buy
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
