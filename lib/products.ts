export type Product = {
  id: string
  name: string
  description: string
  fullDescription: string
  price: number
  image: string
  category: "Dresses" | "Robes" | "Shirts"
  colors: string[]
  sizes: string[]
}

export const products: Product[] = [
  {
    id: "1",
    name: "Tutankhamun V-Neck Dress",
    description: "Long sleeves, teal fabric with golden mask print",
    fullDescription:
      "Long sleeves, teal fabric with golden mask print. Inspired by ancient Egyptian royalty. This stunning dress features the iconic golden mask of Tutankhamun, Egypt's most famous pharaoh. Printed on premium fabric with vibrant, long-lasting colors.",
    price: 700,
    image: "/egyptian-tutankhamun-dress-with-gold-mask-print-on.jpg",
    category: "Dresses",
    colors: ["Teal", "Black", "Gold"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "2",
    name: "Nefertiti Belted Robe",
    description: "Beige fabric with blue accents, detailed back print of the iconic queen",
    fullDescription:
      "Beige fabric with blue accents, detailed back print of the iconic queen. Celebrate the legendary Queen Nefertiti, known for her timeless beauty. This elegant robe includes a matching belt to accentuate the waist. Made from flowing, comfortable fabric.",
    price: 700,
    image: "/nefertiti-bust-elegant-robe-egyptian-queen-fashion.jpg",
    category: "Robes",
    colors: ["Beige", "Blue", "White"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "3",
    name: "Horus Falcon Long Shirt",
    description: "Orange-gold tones with pyramid backdrop, symbolizing protection and power",
    fullDescription:
      "Orange-gold tones with pyramid backdrop, symbolizing protection and power. A powerful design featuring Horus, the falcon-headed god of kingship and the sky, soaring above the Great Pyramids. This comfortable long-sleeve shirt combines ancient symbolism with modern style.",
    price: 700,
    image: "/egyptian-falcon-with-pyramids-shirt-ancient-egypti.jpg",
    category: "Shirts",
    colors: ["Orange", "Gold", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "4",
    name: "Cleopatra Portrait Dress",
    description: "Elegant dress featuring the legendary Egyptian queen",
    fullDescription:
      "Elegant dress featuring the legendary Egyptian queen Cleopatra. This stunning piece showcases intricate details and vibrant colors that capture the essence of ancient Egyptian royalty.",
    price: 750,
    image: "/cleopatra-portrait-dress-egyptian-queen-elegant-cl.jpg",
    category: "Dresses",
    colors: ["Purple", "Gold", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "5",
    name: "Anubis God Tunic",
    description: "Dark tunic with hieroglyphs and Anubis deity print",
    fullDescription:
      "Dark tunic featuring Anubis, the ancient Egyptian god of the afterlife. Adorned with authentic hieroglyphs and mystical symbols. Perfect for those who appreciate Egyptian mythology.",
    price: 680,
    image: "/anubis-egyptian-god-tunic-with-hieroglyphs-ancient.jpg",
    category: "Shirts",
    colors: ["Black", "Gold", "Brown"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "6",
    name: "Pyramids Sunset Kaftan",
    description: "Luxury kaftan with desert scene and pyramids at sunset",
    fullDescription:
      "Luxury kaftan featuring a breathtaking desert scene with the Great Pyramids at sunset. Made from flowing, comfortable fabric perfect for warm weather. A true statement piece.",
    price: 820,
    image: "/egyptian-pyramids-sunset-kaftan-luxury-desert-scen.jpg",
    category: "Robes",
    colors: ["Orange", "Gold", "Brown"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "7",
    name: "Nefertiti Premium Robe",
    description: "Premium robe with detailed Nefertiti bust print",
    fullDescription:
      "Premium quality robe featuring the iconic bust of Queen Nefertiti. This elegant piece combines comfort with timeless Egyptian beauty. Perfect for special occasions or lounging in style.",
    price: 780,
    image: "/nefertiti-bust-print-on-premium-robe.jpg",
    category: "Robes",
    colors: ["Cream", "Gold", "Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "8",
    name: "Tutankhamun Gold Mask Dress",
    description: "Stunning dress with golden mask of the boy pharaoh",
    fullDescription:
      "Stunning dress featuring the iconic golden death mask of Tutankhamun. This piece captures the majesty and mystery of ancient Egypt's most famous pharaoh. Premium fabric with vibrant, fade-resistant printing.",
    price: 850,
    image: "/tutankhamun-gold-mask-dress-on-model-egyptian-them.jpg",
    category: "Dresses",
    colors: ["Gold", "Black", "Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "9",
    name: "Egyptian Falcon Pyramid Shirt",
    description: "Long shirt with falcon and pyramid ancient Egyptian motif",
    fullDescription:
      "Long shirt featuring the powerful Egyptian falcon soaring above the pyramids. Symbolizes protection, power, and the eternal spirit of ancient Egypt. Comfortable fit for everyday wear.",
    price: 690,
    image: "/egyptian-falcon-with-pyramids-shirt-ancient-egypti.jpg",
    category: "Shirts",
    colors: ["Orange", "Brown", "Gold"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "10",
    name: "Tutankhamun Royal Dress",
    description: "Royal dress with intricate Tutankhamun golden details",
    fullDescription:
      "Royal dress featuring intricate golden details inspired by Tutankhamun's treasures. This elegant piece brings ancient Egyptian luxury to modern fashion. Perfect for making a statement.",
    price: 800,
    image: "/egyptian-tutankhamun-dress-with-gold-mask-print-on.jpg",
    category: "Dresses",
    colors: ["Teal", "Gold", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "11",
    name: "Cleopatra Elegant Robe",
    description: "Flowing robe inspired by Cleopatra's legendary style",
    fullDescription:
      "Flowing robe inspired by the legendary style of Cleopatra. Features elegant draping and rich colors that evoke the opulence of ancient Egyptian royalty. Comfortable and stylish.",
    price: 760,
    image: "/cleopatra-portrait-dress-egyptian-queen-elegant-cl.jpg",
    category: "Robes",
    colors: ["Purple", "Gold", "White"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "12",
    name: "Anubis Hieroglyph Tunic",
    description: "Mystical tunic with Anubis and ancient hieroglyphs",
    fullDescription:
      "Mystical tunic featuring Anubis, guardian of the underworld, surrounded by authentic hieroglyphs. This piece connects you to the spiritual world of ancient Egypt. Unique and eye-catching design.",
    price: 720,
    image: "/anubis-egyptian-god-tunic-with-hieroglyphs-ancient.jpg",
    category: "Shirts",
    colors: ["Black", "Gold", "Red"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "13",
    name: "Desert Pyramids Luxury Kaftan",
    description: "Luxury kaftan with majestic pyramid landscape",
    fullDescription:
      "Luxury kaftan featuring a majestic pyramid landscape at golden hour. The flowing fabric and stunning print make this a perfect choice for elegant occasions or resort wear.",
    price: 880,
    image: "/egyptian-pyramids-sunset-kaftan-luxury-desert-scen.jpg",
    category: "Robes",
    colors: ["Orange", "Gold", "Beige"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "14",
    name: "Nefertiti Fashion Robe",
    description: "Fashion-forward robe with Nefertiti elegance",
    fullDescription:
      "Fashion-forward robe celebrating the timeless elegance of Queen Nefertiti. This piece blends ancient Egyptian aesthetics with contemporary style. Perfect for the modern queen.",
    price: 790,
    image: "/nefertiti-bust-elegant-robe-egyptian-queen-fashion.jpg",
    category: "Robes",
    colors: ["Beige", "Blue", "Gold"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "15",
    name: "Falcon Power Shirt",
    description: "Powerful shirt featuring the sacred Egyptian falcon",
    fullDescription:
      "Powerful shirt featuring the sacred Egyptian falcon, symbol of Horus and divine kingship. The dramatic design with pyramids in the background creates a striking visual impact.",
    price: 710,
    image: "/egyptian-falcon-with-pyramids-shirt-ancient-egypti.jpg",
    category: "Shirts",
    colors: ["Orange", "Black", "Gold"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
]

export const categories = ["All", "Dresses", "Robes", "Shirts"] as const
