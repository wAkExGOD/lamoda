import { MAX_PRODUCT_PRICE, MIN_PRODUCT_PRICE, SORTINGS } from "@/constants"
import {
  generateProducts,
  getInitialColorsObject,
  isSubstring,
} from "@/helpers"
import { Product, ProductFilters } from "@/types"
import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react"

export type Notification = {
  text: string
  status?: "success" | "error"
  autoClose?: number
}

export type ProductsContextType = {
  filteredProducts: Product[]
  filters: ProductFilters
  updateFilters: (filters: ProductFilters) => void
}

const ProductsContext = createContext<ProductsContextType | null>(null)

const initialProducts = generateProducts(50)

const ProductsProvider = ({ children }: PropsWithChildren) => {
  const [filters, setFilters] = useState<ProductFilters>({
    searchValue: "",
    colors: getInitialColorsObject(),
    minPrice: MIN_PRODUCT_PRICE,
    maxPrice: MAX_PRODUCT_PRICE,
    sorting: SORTINGS.firstPopular,
  })

  const updateFilters = (filters: ProductFilters) => setFilters(filters)

  const filteredProducts = useMemo(() => {
    const { searchValue, colors, minPrice, maxPrice, sorting } = filters

    return [...initialProducts]
      .filter((product) => {
        const { name, description } = product

        return (
          isSubstring(name, searchValue) ||
          isSubstring(description, searchValue)
        )
      })
      .filter((product) => colors[product.color] === true)
      .filter((product) => {
        const isValidAtMinimum = minPrice ? product.price >= minPrice : true
        const isValidAtMaximum = maxPrice ? product.price <= maxPrice : true

        return isValidAtMinimum && isValidAtMaximum
      })
      .sort((a, b) => {
        switch (sorting) {
          case SORTINGS.firstCheap:
            return a.price - b.price
          case SORTINGS.firstExpensive:
            return b.price - a.price
          case SORTINGS.firstPopular:
            return b.rating - a.rating
          default:
            return 0
        }
      })
  }, [filters])

  return (
    <ProductsContext.Provider
      value={{
        filters,
        filteredProducts,
        updateFilters,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

const useProducts = () => useContext(ProductsContext) as ProductsContextType

// eslint-disable-next-line react-refresh/only-export-components
export { ProductsProvider, useProducts }
