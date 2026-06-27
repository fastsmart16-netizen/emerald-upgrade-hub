import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Plus, Edit, Trash2, Package } from 'lucide-react';
import Logo from '@/components/Logo';
import { useProducts } from '@/hooks/useProducts';
import { useToast } from '@/hooks/use-toast';

const CATEGORIES = ['Linear', 'Brake', 'VFD', 'PLC', 'Resistance', 'Bore', 'Tower', 'Hoist', 'Other'];

const empty = {
  name: '',
  category: 'VFD',
  description: '',
  price: '',
  image: '',
  inStock: true,
};

const AdminProducts = () => {
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price) {
      toast({ title: 'Missing fields', description: 'Name, category and price are required', variant: 'destructive' });
      return;
    }
    const payload = {
      name: form.name,
      category: form.category,
      description: form.description,
      price: Number(form.price),
      image: form.image || undefined,
      inStock: form.inStock,
    };
    if (editingId) {
      updateProduct(editingId, payload);
      toast({ title: 'Product updated', description: form.name });
    } else {
      addProduct(payload);
      toast({ title: 'Product added', description: form.name });
    }
    setForm(empty);
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    setEditingId(id);
    setForm({
      name: p.name,
      category: p.category,
      description: p.description,
      price: String(p.price),
      image: p.image || '',
      inStock: p.inStock,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    deleteProduct(id);
    toast({ title: 'Product deleted', description: name });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <Button variant="outline" onClick={() => navigate('/admin')} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Admin
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Package className="w-7 h-7 text-primary" /> Manage Products
          </h1>
          <p className="text-muted-foreground">Add, edit and remove spare parts available for sale</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Product' : 'Add New Product'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Product Name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. VFD Drive 5HP" />
                </div>
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Price (₹) *</Label>
                  <Input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="3500" />
                </div>
                <div className="space-y-2">
                  <Label>Image URL (optional)</Label>
                  <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief product description" />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.inStock} onCheckedChange={(v) => setForm({ ...form, inStock: v })} />
                <Label>In Stock</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="submit" className="flex-1 gap-2">
                  {editingId ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {editingId ? 'Update Product' : 'Add Product'}
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" className="flex-1" onClick={() => { setEditingId(null); setForm(empty); }}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Products ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No products yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                  <Card key={p.id}>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">{p.name}</h3>
                          <p className="text-xs text-muted-foreground">{p.category} • ₹{p.price.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(p.id)} className="h-8 w-8 p-0">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(p.id, p.name)} className="h-8 w-8 p-0 text-destructive">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                      <p className="text-xs">{p.inStock ? '✅ In Stock' : '❌ Out of Stock'}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminProducts;
