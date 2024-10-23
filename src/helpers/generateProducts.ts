import Chance from "chance"
import {
  CATEGORIES,
  COLORS,
  MIN_PRODUCT_PRICE,
  MAX_PRODUCT_PRICE,
  MIN_PRODUCT_RATING,
  MAX_PRODUCT_RATING,
  MOCK_DATA,
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

const getRandomImage = () => {
  const images = MOCK_DATA.productImages

  return images[Math.floor(images.length * Math.random())]
}

const getRandomName = () => {
  const names = MOCK_DATA.productNames

  return names[Math.floor(names.length * Math.random())]
}
