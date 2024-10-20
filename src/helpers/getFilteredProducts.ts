import { ProductFilters } from "@/App"
import { isSubstring } from "./isSubstring"
import { generateProducts } from "./generateProducts"
import { Color, Product } from "@/types"
import { SORTINGS } from "@/constants"

const products = generateProducts(50)

export const getFilteredProducts = (options?: ProductFilters) => {
  let filteredProducts = [...products]

  if (options?.searchValue) {
    const { searchValue } = options

    filteredProducts = filteredProducts.filter((product) => {
      const { name, description } = product

      return (
        isSubstring(name, searchValue) || isSubstring(description, searchValue)
      )
    })
  }

  if (options?.colors) {
    const { colors } = options

    if (Object.keys(colors).some((color) => colors[color as Color] === true)) {
      filteredProducts = filteredProducts.filter(
        (product) => colors[product.color as Color] === true
      )
    }
  }

  if (options?.minPrice || options?.maxPrice) {
    const { minPrice, maxPrice } = options

    filteredProducts = filteredProducts.filter((product) => {
      const isValidAtMinimum = minPrice ? product.price >= minPrice : true
      const isValidAtMaximum = maxPrice ? product.price <= maxPrice : true

      return isValidAtMinimum && isValidAtMaximum
    })
  }

  if (options?.sorting) {
    const { sorting } = options

    let sortFunction: (a: Product, b: Product) => number

    switch (sorting) {
      case SORTINGS.firstCheap:
        sortFunction = (a, b) => a.price - b.price
        break
      case SORTINGS.firstExpensive:
        sortFunction = (a, b) => b.price - a.price
        break
      case SORTINGS.firstPopular:
        sortFunction = (a, b) => b.rating - a.rating
        break
    }

    filteredProducts.sort((a, b) => sortFunction(a, b))
  }

  return filteredProducts
}
