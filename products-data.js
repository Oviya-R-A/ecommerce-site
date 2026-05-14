/**
 * Dressify — product catalog (10 items per category)
 * Images: assets/images/{category}{1-10}.jpg
 */

const CATEGORIES = [
  { slug: "men", label: "Men" },
  { slug: "women", label: "Women" },
  { slug: "kids", label: "Kids" },
  { slug: "footwear", label: "Footwear" },
  { slug: "accessories", label: "Accessories" },
  { slug: "seasonal", label: "Seasonal" },
];

/** INR price per item index (0–9) for each category */
const PRICES = {
  men: [1799, 2199, 2499, 1299, 2999, 1999, 999, 4499, 1699, 2299],
  women: [2499, 5499, 1899, 3299, 1499, 2199, 1799, 4999, 1599, 2799],
  kids: [899, 1199, 699, 1499, 999, 1799, 799, 1999, 499, 1299],
  footwear: [2999, 3999, 2499, 4999, 3499, 1999, 2799, 4299, 1599, 4499],
  accessories: [1299, 8999, 4999, 2499, 1599, 1999, 1799, 3299, 799, 2199],
  seasonal: [3999, 1499, 5499, 1999, 2999, 1299, 999, 6499, 1799, 3299],
};

const PRODUCT_NAMES = {
  men: [
    "Oxford Merino Crew",
    "Tailored Wool Coat",
    "Slim Charcoal Trousers",
    "Linen Summer Shirt",
    "Cashmere Quarter-Zip",
    "Heritage Denim Jacket",
    "Pima Cotton Tee Trio",
    "Structured Blazer",
    "Relaxed Chino",
    "Merino Rib Knit",
  ],
  women: [
    "Silk Bias Slip Dress",
    "Cashmere Wrap Coat",
    "Pleated Midi Skirt",
    "Tailored Vest Set",
    "Organic Cotton Shirt",
    "Wide-Leg Trouser",
    "Merino Turtleneck",
    "Linen Trench",
    "Rib Knit Cardigan",
    "Satin Evening Top",
  ],
  kids: [
    "Soft Cotton Playsuit",
    "Corduroy Overalls",
    "Striped Long-Sleeve Tee",
    "Fleece Zip Hoodie",
    "Canvas Sneakers",
    "Denim Jacket Mini",
    "Organic Leggings",
    "Rain-Ready Parka",
    "Knit Beanie Set",
    "Schoolday Chinos",
  ],
  footwear: [
    "Leather Chelsea Boot",
    "Minimal Leather Sneaker",
    "Suede Loafer",
    "Running Knit Trainer",
    "Heeled Ankle Boot",
    "Strappy Sandal",
    "Court Leather Shoe",
    "Hiking Hybrid Boot",
    "Espadrille Slip-On",
    "Patent Evening Heel",
  ],
  accessories: [
    "Italian Leather Belt",
    "Silk Square Scarf",
    "Structured Leather Tote",
    "Gold-Tone Chain Necklace",
    "Merino Rib Scarf",
    "Aviator Sunglasses",
    "Cashmere Gloves",
    "Minimal Crossbody",
    "Pearl Stud Set",
    "Wool Fedora",
  ],
  seasonal: [
    "Quilted Puffer Jacket",
    "Merino Base Layer",
    "Wool-Blend Peacoat",
    "Thermal Knit Set",
    "Waterproof Shell",
    "Faux-Fur Stole",
    "Chunky Knit Scarf",
    "Insulated Parka",
    "Layered Fleece",
    "Holiday Velvet Dress",
  ],
};

function imagePath(slug, indexOneBased) {
  return "assets/images/" + slug + indexOneBased + ".jpg";
}

function buildProducts() {
  const list = [];
  let id = 1;
  CATEGORIES.forEach(({ slug }) => {
    const names = PRODUCT_NAMES[slug];
    const prices = PRICES[slug];
    for (let i = 0; i < 10; i++) {
      list.push({
        id: id++,
        category: slug,
        name: names[i],
        price: prices[i],
        image: imagePath(slug, i + 1),
      });
    }
  });
  return list;
}

const PRODUCTS = buildProducts();

function getProductsByCategory(slug) {
  return PRODUCTS.filter((p) => p.category === slug);
}

function getCategoryLabel(slug) {
  const found = CATEGORIES.find((c) => c.slug === slug);
  return found ? found.label : "Shop";
}
