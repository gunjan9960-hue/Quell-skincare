import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="max-w-xl mb-14">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">One Regime. Total Defense.</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light mb-4">
          Quell Dry Skin Regime
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Formulated to fight hard water, rebuild your skin barrier, and end dryness — for good.
          Choose the pack that suits your commitment.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} index={products.indexOf(product)} />
        ))}
      </div>

      {/* Comparison table */}
      <div className="mt-20">
        <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light mb-8 text-center">
          Compare Packs
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs tracking-widest uppercase text-muted-foreground font-medium"></th>
                {products.map((p) => (
                  <th key={p.id} className="text-center py-3 px-4 font-medium">
                    <span className="block text-xs tracking-widest uppercase text-accent mb-1">{p.subtitle}</span>
                    <span className="text-xl font-semibold font-[family-name:var(--font-cormorant)]">
                      ₹{p.price.toLocaleString("en-IN")}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Size",      vals: ["250 ml", "1 Litre", "3 Litres", "4 × 3 Litres"] },
                { label: "Duration",  vals: ["7 days", "30 days", "3 months", "12 months"] },
                { label: "Per Day",   vals: ["₹21", "₹15", "₹14", "₹14"] },
                { label: "Savings",   vals: ["Try first", "—", "Save ₹48", "Save ₹796"] },
              ].map((row) => (
                <tr key={row.label} className="border-b border-border/50">
                  <td className="py-3 px-4 text-xs tracking-wide uppercase text-muted-foreground">{row.label}</td>
                  {row.vals.map((v, i) => (
                    <td key={i} className="py-3 px-4 text-center text-sm">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
