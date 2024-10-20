import { CATEGORIES, COLORS, SORTINGS } from "./constants"

export type Sorting = keyof typeof SORTINGS

export type Product = {
  id: string
  name: string
  description: string
  color: string
  category: string
  price: number
  rating: number
  imageUrl: string
  createdAtTimestamp: number
}

export type Color = (typeof COLORS)[number]
export type Category = (typeof CATEGORIES)[number]