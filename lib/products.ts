export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  description: string;
  keyBenefit: string;
  keyBenefits: string[];
  ingredients: { name: string; role: string }[];
  howToUse: string[];
  size: string;
  duration: string;
  perMonth: string;
  inStock: boolean;
  badge?: string;
  highlight?: string;
};

export const products: Product[] = [
  {
    id: "0",
    slug: "quell-dry-skin-regime-7-day-trial",
    name: "Quell Dry Skin Regime",
    subtitle: "7 Day Trial",
    price: 149,
    size: "250 ml Bottle",
    duration: "7 Days",
    perMonth: "₹149 for 7 days",
    description:
      "Not sure yet? Try Quell risk-free for 7 days. One compact 250ml bottle — the same ceramide-rich, hard-water defense formula in a trial size. Feel the difference in your first week before committing to a full regime.",
    keyBenefit: "Risk-free first experience of Quell",
    keyBenefits: [
      "Full-formula trial — same ceramides, EDTA & niacinamide as the 1L",
      "See real post-shower softness in as little as 3–4 uses",
      "No commitment — just try it and see",
    ],
    ingredients: [
      { name: "Ceramide NP, AP & EOP", role: "Barrier rebuilder — mimics your skin's natural lipid matrix" },
      { name: "Disodium EDTA", role: "Chelating agent — binds & removes calcium/magnesium deposits" },
      { name: "Niacinamide (4%)", role: "Brightener & soother — reduces redness, strengthens barrier" },
      { name: "Hyaluronic Acid", role: "Humectant — draws moisture deep into the epidermis" },
      { name: "Glycerin", role: "Occlusant — seals moisture in and prevents TEWL" },
      { name: "Panthenol (Vit B5)", role: "Repair booster — accelerates barrier healing" },
    ],
    howToUse: [
      "Apply to damp skin immediately after showering (within 60 seconds).",
      "Dispense 1–2 pumps and work into face, neck, and body gently.",
      "Use morning and evening for best results.",
      "Do not rinse off. Safe for daily use.",
    ],
    inStock: true,
    badge: "Try First",
    highlight: "Risk-free trial",
  },
  {
    id: "1",
    slug: "quell-dry-skin-regime-30-day",
    name: "Quell Dry Skin Regime",
    subtitle: "30 Day Pack",
    price: 449,
    size: "1 Litre Bottle",
    duration: "1 Month",
    perMonth: "₹449 / month",
    description:
      "Your first month of daily barrier defense. One 1L bottle of the Quell Dry Skin Regime — ceramide-rich, hard-water formulated, built for Indian skin. Designed to chelate mineral deposits left by hard water and begin rebuilding the lipid barrier from day one.",
    keyBenefit: "Start your barrier repair journey",
    keyBenefits: [
      "Chelates hard-water mineral deposits after every shower",
      "Ceramide NP, AP & EOP begin rebuilding your lipid barrier",
      "Niacinamide calms redness and reduces post-shower tightness",
    ],
    ingredients: [
      { name: "Ceramide NP, AP & EOP", role: "Barrier rebuilder — mimics your skin's natural lipid matrix" },
      { name: "Disodium EDTA", role: "Chelating agent — binds & removes calcium/magnesium deposits" },
      { name: "Niacinamide (4%)", role: "Brightener & soother — reduces redness, strengthens barrier" },
      { name: "Hyaluronic Acid", role: "Humectant — draws moisture deep into the epidermis" },
      { name: "Glycerin", role: "Occlusant — seals moisture in and prevents TEWL" },
      { name: "Panthenol (Vit B5)", role: "Repair booster — accelerates barrier healing" },
    ],
    howToUse: [
      "Apply to damp skin immediately after showering (within 60 seconds).",
      "Dispense 2–3 pumps and work into face, neck, and body in gentle circular motions.",
      "Use morning and evening for best results.",
      "Do not rinse off. Safe for daily use.",
    ],
    inStock: true,
    badge: "Start Here",
  },
  {
    id: "2",
    slug: "quell-dry-skin-regime-quarter",
    name: "Quell Dry Skin Regime",
    subtitle: "Quarter Pack",
    price: 1299,
    size: "3 Litre Pack",
    duration: "3 Months",
    perMonth: "₹433 / month",
    description:
      "Three months of consistent barrier defense — the minimum commitment to see real, lasting results against hard water damage. One 3L pack delivers the same ceramide-rich formula at a lower cost per day, giving your skin the time it needs for deep, structural repair.",
    keyBenefit: "Visible barrier repair in 7–12 weeks",
    keyBenefits: [
      "90 days of continuous ceramide replenishment",
      "Measurable reduction in post-shower dryness and tightness",
      "Save ₹48 compared to buying three 30-day packs",
    ],
    ingredients: [
      { name: "Ceramide NP, AP & EOP", role: "Barrier rebuilder — mimics your skin's natural lipid matrix" },
      { name: "Disodium EDTA", role: "Chelating agent — binds & removes calcium/magnesium deposits" },
      { name: "Niacinamide (4%)", role: "Brightener & soother — reduces redness, strengthens barrier" },
      { name: "Hyaluronic Acid", role: "Humectant — draws moisture deep into the epidermis" },
      { name: "Glycerin", role: "Occlusant — seals moisture in and prevents TEWL" },
      { name: "Panthenol (Vit B5)", role: "Repair booster — accelerates barrier healing" },
    ],
    howToUse: [
      "Apply to damp skin immediately after showering (within 60 seconds).",
      "Dispense 2–3 pumps and work into face, neck, and body in gentle circular motions.",
      "Use morning and evening for best results.",
      "Do not rinse off. Safe for daily use.",
    ],
    inStock: true,
    badge: "Best Value",
    highlight: "Save ₹48 vs monthly",
  },
  {
    id: "3",
    slug: "quell-dry-skin-regime-yearly",
    name: "Quell Dry Skin Regime",
    subtitle: "Yearly Pack",
    price: 4999,
    size: "4 × 3 Litre Bottles",
    duration: "12 Months",
    perMonth: "₹417 / month",
    description:
      "A full year of hard-water defense. Four 3L bottles delivered together — your complete annual supply so your skin stays defended every single day. The yearly pack unlocks the lowest price per month and ensures you never run out mid-regime.",
    keyBenefit: "Complete 12-month barrier transformation",
    keyBenefits: [
      "365 days of uninterrupted ceramide defense",
      "Lowest cost per day of any pack — ₹13.7 / day",
      "Save ₹796 compared to buying quarterly packs",
    ],
    ingredients: [
      { name: "Ceramide NP, AP & EOP", role: "Barrier rebuilder — mimics your skin's natural lipid matrix" },
      { name: "Disodium EDTA", role: "Chelating agent — binds & removes calcium/magnesium deposits" },
      { name: "Niacinamide (4%)", role: "Brightener & soother — reduces redness, strengthens barrier" },
      { name: "Hyaluronic Acid", role: "Humectant — draws moisture deep into the epidermis" },
      { name: "Glycerin", role: "Occlusant — seals moisture in and prevents TEWL" },
      { name: "Panthenol (Vit B5)", role: "Repair booster — accelerates barrier healing" },
    ],
    howToUse: [
      "Apply to damp skin immediately after showering (within 60 seconds).",
      "Dispense 2–3 pumps and work into face, neck, and body in gentle circular motions.",
      "Use morning and evening for best results.",
      "Do not rinse off. Safe for daily use.",
    ],
    inStock: true,
    badge: "Most Popular",
    highlight: "Save ₹796 vs quarterly",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
