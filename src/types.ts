import { CATEGORIES, COLORS, SORTINGS } from "./constants"

export type Sorting = keyof typeof SORTINGS

export type Product = {
  id: string
  name: string
  description: string
  color: Color
  category: string
  price: number
  rating: number
  imageUrl: string
  createdAtTimestamp: number
}

export type ColorsObject = {
  [key in Color]: boolean
}
export type ProductFilters = {
  searchValue: string
  colors: ColorsObject
  minPrice: number
  maxPrice: number
  sorting: Sorting
}

export type Color = (typeof COLORS)[number]
export type Category = (typeof CATEGORIES)[number]
