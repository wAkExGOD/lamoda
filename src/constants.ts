export const MIN_PRODUCT_RATING = 0
export const MAX_PRODUCT_RATING = 5
export const MIN_PRODUCT_PRICE = 10
export const MAX_PRODUCT_PRICE = 9999

export const SORTINGS = {
  firstPopular: "firstPopular",
  firstExpensive: "firstExpensive",
  firstCheap: "firstCheap",
} as const

export const COLORS = [
  "red",
  "green",
  "yellow",
  "orange",
  "blue",
  "pink",
  "violet",
  "black",
  "white",
  "brown",
] as const

export const CATEGORIES = [
  "dress",
  "skirt",
  "jacket",
  "coat",
  "footwear",
] as const

export const MOCK_DATA = {
  productNames: [
    "Basic T-shirt",
    "Classic Shirt",
    "Formal Trousers",
    "Elegant Dress",
    "Flowy Skirt",
    "Practical Jacket",
    "Comfortable Hoodie",
    "Premium Coat",
    "Summer Shorts",
    "Business Suit",
  ],
  productImages: [
    "https://static.zara.net/assets/public/b43c/9b21/5e8e40d59204/a6c477a74609/03411411800-a1/03411411800-a1.jpg?ts=1727429979595&w=418&f=auto",
    "https://static.zara.net/assets/public/67dc/fba4/c0e2403fa288/248f47bd3b11/05854320707-a1/05854320707-a1.jpg?ts=1726156002318&w=418&f=auto",
    "https://static.zara.net/assets/public/ea06/9101/2b144e7c9e8b/27e74ea335a6/09598388505-a1/09598388505-a1.jpg?ts=1729007186801&w=539&f=auto",
    "https://static.zara.net/assets/public/7a51/da4e/79f240ca80fd/bdd32f7ab347/00706648800-p/00706648800-p.jpg?ts=1723548060177&w=418&f=auto",
    "https://static.zara.net/assets/public/1111/96d4/d8d34606a0ed/c372aabf9a5c/06779188401-p/06779188401-p.jpg?ts=1729245018072&w=418&f=auto",
    "https://static.zara.net/assets/public/ae9e/2bfb/8a6f4be187b6/74cdc8fa3526/01165321800-a1/01165321800-a1.jpg?ts=1729236785835&w=613&f=auto",
  ],
} as const
