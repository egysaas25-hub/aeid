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
    image: "https://via.placeholder.com/250x200?text=Tutankhamun+Dress",
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
    image: "https://via.placeholder.com/250x200?text=Nefertiti+Robe",
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
    image: "https://via.placeholder.com/250x200?text=Horus+Falcon+Shirt",
    category: "Shirts",
    colors: ["Orange", "Gold", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
]

export const categories = ["All", "Dresses", "Robes", "Shirts"] as const
