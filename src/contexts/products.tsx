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
  filterValues: ProductFilters
  setFilterValues: (filters: ProductFilters) => void
}

const ProductsContext = createContext<ProductsContextType | null>(null)

const initialProducts = generateProducts(50)

const ProductsProvider = ({ children }: PropsWithChildren) => {
  const [filterValues, setFilterValues] = useState<ProductFilters>({
    searchValue: "",
    colors: getInitialColorsObject(),
    minPrice: MIN_PRODUCT_PRICE,
    maxPrice: MAX_PRODUCT_PRICE,
    sorting: SORTINGS.firstPopular,
  })

  const filters: ((products: Product[]) => Product[])[] = [
    (products) => {
      const { searchValue } = filterValues

      return products.filter((product) => {
        const { name, description } = product

        return (
          isSubstring(name, searchValue) ||
          isSubstring(description, searchValue)
        )
      })
    },
    (products) => {
      const { colors } = filterValues

      return products.filter((product) => colors[product.color] === true)
    },
    (products) => {
      const { minPrice, maxPrice } = filterValues

      return products.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      )
    },
    (products) => {
      const { sorting } = filterValues

      let sortFn: (a: Product, b: Product) => number

      switch (sorting) {
        case SORTINGS.firstCheap:
          sortFn = (a, b) => a.price - b.price
          break
        case SORTINGS.firstExpensive:
          sortFn = (a, b) => b.price - a.price
          break
        default:
          sortFn = (a, b) => b.rating - a.rating
          break
      }

      products.sort(sortFn)

      return products
    },
  ] as const

  const filteredProducts = useMemo(() => {
    return filters.reduce(
      (products, filter) => filter(products),
      [...initialProducts]
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues])

  return (
    <ProductsContext.Provider
      value={{
        filterValues,
        filteredProducts,
        setFilterValues,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

const useProducts = () => useContext(ProductsContext) as ProductsContextType

// eslint-disable-next-line react-refresh/only-export-components
export { ProductsProvider, useProducts }
