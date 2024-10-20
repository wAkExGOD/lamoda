import Chance from "chance"
import {
  CATEGORIES,
  COLORS,
  MIN_PRODUCT_PRICE,
  MAX_PRODUCT_PRICE,
  MIN_PRODUCT_RATING,
  MAX_PRODUCT_RATING,
} from "@/constants"
import { Product } from "@/types"

const chance = new Chance()

export const generateProducts = (count: number = 50): Product[] => {
  return Array.from({ length: count }, () => ({
    id: chance.guid(),
    name: getRandomName(),
    description: chance.sentence({ words: 10 }),
    imageUrl: getRandomImage(),
    category: getRandomCategory(),
    color: getRandomColor(),
    rating: chance.floating({
      min: MIN_PRODUCT_RATING,
      max: MAX_PRODUCT_RATING,
      fixed: 1,
    }),
    price: chance.integer({ min: MIN_PRODUCT_PRICE, max: MAX_PRODUCT_PRICE }),
    createdAtTimestamp: Math.floor(Date.now() / 1000),
  }))
}

const getRandomCategory = () => {
  return CATEGORIES[Math.floor(CATEGORIES.length * Math.random())]
}

const getRandomColor = () => {
  return COLORS[Math.floor(COLORS.length * Math.random())]
}

const images = [
  "https://static.zara.net/assets/public/b43c/9b21/5e8e40d59204/a6c477a74609/03411411800-a1/03411411800-a1.jpg?ts=1727429979595&w=418&f=auto",
  "https://static.zara.net/assets/public/67dc/fba4/c0e2403fa288/248f47bd3b11/05854320707-a1/05854320707-a1.jpg?ts=1726156002318&w=418&f=auto",
  "https://static.zara.net/assets/public/ea06/9101/2b144e7c9e8b/27e74ea335a6/09598388505-a1/09598388505-a1.jpg?ts=1729007186801&w=539&f=auto",
  "https://static.zara.net/assets/public/7a51/da4e/79f240ca80fd/bdd32f7ab347/00706648800-p/00706648800-p.jpg?ts=1723548060177&w=418&f=auto",
  "https://static.zara.net/assets/public/2b1f/24b7/bbba49259aac/01029eb92774/00840331800-ult/00840331800-ult.jpg?ts=1726485899250&w=266&f=auto",
  "https://static.zara.net/assets/public/ae9e/2bfb/8a6f4be187b6/74cdc8fa3526/01165321800-a1/01165321800-a1.jpg?ts=1729236785835&w=613&f=auto",
]
const getRandomImage = () => {
  return images[Math.floor(images.length * Math.random())]
}

const names = [
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
]
const getRandomName = () => {
  return names[Math.floor(names.length * Math.random())]
}
